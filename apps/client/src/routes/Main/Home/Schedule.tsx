import { Flex } from "@chakra-ui/react";
import Period from "./Period";
import { DateTime } from "luxon";
import { useDtt } from "../../../consumers/sbhsApi/useDtt";
import { TimetablPeriod } from "../../../consumers/sbhsApi/schemas";
import Empty from "../../../components/Empty";
import { GiFrenchFries } from "react-icons/gi";

function generateLoadingPeriods() {
  return Array(7)
    .fill({
      name: "Loading... Loading... Loading",
      room: 605,
    })
    .map((period, i) => ({ ...period, key: `loading ${i}` }));
}

export default function Schedule({ date }: { date?: string }) {
  const { data: dtt } = useDtt(date);

  const activeKey = dtt?.periods.find(
    ({ startTime, endTime }) =>
      DateTime.fromISO(startTime) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(endTime)
  )?.key;

  const periods: TimetablPeriod[] = dtt?.periods ?? generateLoadingPeriods();

  return (
    <Flex direction={"column"}>
      {periods.length ? (
        periods
          .filter((period) => !period.name.startsWith("Transition"))
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
          })
      ) : (
        <Empty
          icon={GiFrenchFries}
          colour="yellow.500"
          size="lg"
          heading="No periods on this day"
          text="Chill out, grab some snacks, and enjoy your day off!"
        />
      )}
    </Flex>
  );
}
