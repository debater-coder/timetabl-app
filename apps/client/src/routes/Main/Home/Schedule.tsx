import { Flex, useColorModeValue, Box, Skeleton } from "@chakra-ui/react";
import Period from "./Period";
import { TimetablDtt } from "../../../services/sbhsApi/schemas";
import { DateTime } from "luxon";

const startHour = 8;
const endHour = 15;

function generateHours(startHour: number, endHour: number) {
  const hours = [];

  for (let i = startHour; i <= endHour; i++) {
    let hour = i % 12;
    if (hour === 0) {
      hour = 12;
    }
    const ampm = i < 12 ? "AM" : "PM";
    hours.push(`${hour} ${ampm}`);
  }

  return hours;
}

const times = generateHours(startHour, endHour);

function minutes(nMinutes: number) {
  return `calc(100% / ${(times.length + 1) * 60} * ${nMinutes})`;
}

function offsetMinutes(nMinutes: number) {
  return minutes(nMinutes + 30);
}

export default function Schedule({ dtt }: { dtt?: TimetablDtt }) {
  const startDateTime =
    dtt && DateTime.fromISO(dtt?.date).set({ hour: startHour });

  return (
    <Skeleton isLoaded={!!dtt} h="full">
      <Flex h="full">
        <Flex direction={"column"} w="7ch" h="full" mr={1}>
          {times.map((time) => (
            <Flex
              h={minutes(60)}
              align={"center"}
              justify={"right"}
              color={useColorModeValue("gray.700", "gray.300")}
              key={time}
            >
              {time}
            </Flex>
          ))}
          <Flex h={minutes(30)} />
        </Flex>
        <Flex direction={"column"} w="full" h="full" position={"relative"}>
          <Flex h={minutes(30)} />
          {times.map((time, index) => (
            <Flex
              key={`${time} grid line`}
              h={minutes(60)}
              border={"1px solid"}
              borderBottom={index !== times.length - 1 ? "none" : undefined}
              borderColor={"gray.500"}
              opacity={"30%"}
              roundedTop={index === 0 ? "lg" : undefined}
              roundedBottom={index === times.length - 1 ? "lg" : undefined}
            ></Flex>
          ))}

          {dtt?.periods
            .filter((period) => period.name !== "Transition")
            .map((period) => {
              if (period.endTime === null || !startDateTime) {
                return null;
              }

              const startTime = DateTime.fromISO(period.startTime);
              const endTime = DateTime.fromISO(period.endTime);

              if (startTime.hour < startHour || endTime.hour > endHour) {
                return null;
              }

              const duration = endTime.diff(startTime).as("minutes");

              if (duration <= 10) {
                return null;
              }

              if (period.name === "RC 9E") {
                console.log(period);
              }

              return (
                <Box
                  position={"absolute"}
                  left={0}
                  w="full"
                  top={offsetMinutes(
                    startTime.diff(startDateTime).as("minutes")
                  )}
                  h={minutes(duration)}
                  key={period.key}
                >
                  <Period {...period} />
                </Box>
              );
            })}
        </Flex>
      </Flex>
    </Skeleton>
  );
}
