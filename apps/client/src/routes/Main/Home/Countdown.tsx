import { useDtt } from "../../../consumers/sbhsApi/useDtt";
import {
  Flex,
  useToken,
  useColorModeValue,
  Heading,
  Skeleton,
  IconButton,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { PictureInPicture } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

declare const documentPictureInPicture: any;

export default function Countdown({
  countdown,
  setCountdown,
}: {
  countdown: string;
  setCountdown: (countdown: string) => void;
}) {
  const { data: dtt } = useDtt();
  const isLoaded = !!dtt;
  const pipColor = useColorModeValue("gray.100", "gray.900");
  const bgColor =
    useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55";
  const textColor = useColorModeValue("gray.900", "gray.100");

  const activeIndex = dtt?.periods.findIndex(
    ({ startTime, endTime }) =>
      DateTime.fromISO(startTime) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(endTime)
  );

  const nextPeriod =
    activeIndex && activeIndex > 0 ? dtt?.periods[activeIndex + 1] : undefined;

  useEffect(() => {
    if (!nextPeriod) return;

    const timer = setInterval(() => {
      const duration = DateTime.fromISO(nextPeriod.startTime).diffNow();

      setCountdown(
        duration.milliseconds > 0 ? duration.toFormat("hh:mm:ss") : "Now"
      );
    }, 500);

    return () => clearInterval(timer);
  });

  const countdownRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const handlePictureInPicture = async () => {
    if (!countdownRef.current) return;

    setFullScreen(true);

    const pipWindow = await documentPictureInPicture.requestWindow();

    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .join("");
        const style = document.createElement("style");

        style.textContent = cssRules.toString();
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.type = (styleSheet.type as string) ?? "";
        link.media = styleSheet.media?.toString() ?? "";
        link.href = styleSheet.href ?? "";
        pipWindow.document.head.appendChild(link);
      }
    });

    pipWindow.document.body.append(countdownRef.current);

    pipWindow.addEventListener("pagehide", (event: any) => {
      const pipPlayer = event.target.body.firstChild;
      skeletonRef.current?.append(pipPlayer);
      setFullScreen(false);
    });
  };

  if (!nextPeriod) return null;

  return (
    <Skeleton ref={skeletonRef} isLoaded={isLoaded}>
      <Box
        ref={countdownRef}
        h={fullScreen ? "full" : "auto"}
        w="full"
        bg={fullScreen ? pipColor : "transparent"}
      >
        <Flex
          direction={"column"}
          p={3}
          bg={bgColor}
          rounded={fullScreen ? "none" : "lg"}
          align={"center"}
          h="full"
          w="full"
          justify={"center"}
        >
          <Flex w="full">
            <Spacer />
            <Flex direction={"column"} align={"center"}>
              <Heading
                size={fullScreen ? "xl" : "xs"}
                fontFamily={"Poppins, sans-serif"}
                color={textColor}
              >
                {nextPeriod?.name ?? "Nothing"} in
              </Heading>
              <Heading
                size={fullScreen ? "2xl" : "lg"}
                fontFamily={"Poppins, sans-serif"}
                fontWeight={"normal"}
                color={textColor}
              >
                {countdown}
              </Heading>
            </Flex>
            <Spacer />
            {"documentPictureInPicture" in window && !fullScreen && (
              <IconButton
                icon={<PictureInPicture weight="fill" />}
                aria-label="Open Picture in Picture"
                alignSelf={"start"}
                variant={"ghost"}
                colorScheme="gray"
                onClick={handlePictureInPicture}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </Skeleton>
  );
}
