import { Flex } from "@chakra-ui/react";
import Period from "./Period";
import { DateTime } from "luxon";
import { useDtt } from "../../../services/sbhsApi/useDtt";
import { TimetablPeriod } from "../../../services/sbhsApi/schemas";

export default function Schedule({ date }: { date?: string }) {
  const { data: dtt } = useDtt(date);

  const activeKey = dtt?.periods.find(
    ({ startTime, endTime }) =>
      DateTime.fromISO(startTime) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(endTime)
  )?.key;

  const periods: TimetablPeriod[] =
    dtt?.periods ??
    Array(7).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  return (
    <Flex direction={"column"}>
      {periods
        .filter((period) => period.name !== "Transition")
        .map((period) => {
          const startTime = DateTime.fromISO(period.startTime);
          const endTime = DateTime.fromISO(period.endTime);

          const duration = endTime.diff(startTime).as("minutes");

          if (duration <= 10) {
            return null;
          }

          return (
            // eslint-disable-next-line react/jsx-key -- because key is included in period
            <Period
              isLoaded={!!dtt}
              {...period}
              active={period.key === activeKey}
            />
          );
        })}
    </Flex>
  );
}
