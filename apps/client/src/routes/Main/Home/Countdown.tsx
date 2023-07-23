import {
  Flex,
  useToken,
  useColorModeValue,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useDtt } from "../../../services/sbhsApi/useDtt";
import { DateTime } from "luxon";
import { useEffect } from "react";

export default function Countdown({
  countdown,
  setCountdown,
}: {
  countdown: string;
  setCountdown: (countdown: string) => void;
}) {
  const { data: dtt } = useDtt();
  const isLoaded = !!dtt;

  const activeIndex = dtt?.periods.findIndex(
    ({ startTime, endTime }) =>
      DateTime.fromISO(startTime) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(endTime)
  );

  const nextPeriod =
    activeIndex && activeIndex > 0 ? dtt?.periods[activeIndex + 1] : undefined;

  if (!nextPeriod) return null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(
        DateTime.fromISO(nextPeriod.startTime).diffNow().toFormat("hh:mm:ss")
      );
    }, 500);

    return () => clearInterval(timer);
  });

  return (
    <Skeleton isLoaded={isLoaded}>
      <Flex
        direction={"column"}
        p={3}
        bg={
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
        }
        rounded={"lg"}
        align={"center"}
      >
        <Heading size={"xs"} fontFamily={"Poppins, sans-serif"}>
          {nextPeriod.name} in
        </Heading>
        <Heading
          size={"lg"}
          fontFamily={"Poppins, sans-serif"}
          fontWeight={"normal"}
        >
          {countdown}
        </Heading>
      </Flex>
    </Skeleton>
  );
}
