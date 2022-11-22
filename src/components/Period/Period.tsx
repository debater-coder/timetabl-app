import {
  Skeleton,
  Tooltip,
  Flex,
  useToken,
  As,
  Box,
  Heading,
  Spacer,
  Collapse,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export type PeriodProps = {
  isLoaded?: boolean;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  expandedContent?: ReactNode;
  colour?: string;
  active?: boolean;
  transition?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  tooltip?: boolean;
  periodBg?: string;
  expandable?: boolean;
  expandedSize?: string;
  leftContentSize?: string;
  expanded?: boolean;
  expandedWeight?: string;
  width?: string;
  clickable?: boolean;
};

export const Period = ({
  isLoaded,
  leftContent,
  rightContent,
  expandedContent,
  colour,
  active,
  transition,
  onClick,
  onMouseEnter,
  onMouseLeave,
  tooltip,
  periodBg,
  expandable,
  expandedSize,
  leftContentSize,
  expanded,
  expandedWeight,
  width,
  clickable,
}: PeriodProps) => {
  const grayedOutTextColour = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.700"
  );
  return (
    <Skeleton
      rounded={5}
      mx={!transition && 1}
      mb={!transition && 0.5}
      isLoaded={isLoaded}
      width={width}
    >
      <Tooltip
        label={<Text fontSize={"xs"}>Keep hovering to expand</Text>}
        placement="right"
        isOpen={tooltip ?? false}
      >
        <Flex
          m={0.5}
          bg={periodBg}
          rounded={10}
          _hover={{ bg: useToken("colors", "gray.400") + "22" }}
          shadow={active ? "outline" : expandable && "lg"}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          as={motion.div as As}
          w={"full"}
          layout
          cursor={clickable && "pointer"}
        >
          <Box w={2} roundedLeft={10} bg={colour} />
          <Flex
            direction={"column"}
            px={3}
            py={!transition && expandable && 2.5}
            w="full"
          >
            <Flex gap={6} align="center" w="full">
              <Heading
                size={leftContentSize}
                fontFamily={"Poppins, sans-serif"}
                as={motion.h2 as As}
                layout
                color={!expandable && grayedOutTextColour}
              >
                {!transition && leftContent}
              </Heading>
              <Spacer />
              <Text
                fontWeight={"semibold"}
                as={motion.p as As}
                layout
                color={!expandable && grayedOutTextColour}
              >
                {!transition && rightContent}
              </Text>
            </Flex>
            <Collapse in={expanded || !isLoaded} animateOpacity>
              <Text fontWeight={expandedWeight} fontSize={expandedSize}>
                {expandedContent}
              </Text>
            </Collapse>
          </Flex>
        </Flex>
      </Tooltip>
    </Skeleton>
  );
};
