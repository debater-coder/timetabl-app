import { Flex, Skeleton } from "@chakra-ui/react";
import Period from "./Period";
import { DateTime } from "luxon";
import { useDtt } from "../../../services/sbhsApi/useDtt";

export default function Schedule({ date }: { date?: string }) {
  const { data: dtt } = useDtt(date);

  return (
    <Skeleton isLoaded={!!dtt}>
      <Flex direction={"column"}>
        {dtt?.periods
          .filter((period) => period.name !== "Transition")
          .map((period) => {
            if (period.endTime === null) {
              return null;
            }

            const startTime = DateTime.fromISO(period.startTime);
            const endTime = DateTime.fromISO(period.endTime);

            const duration = endTime.diff(startTime).as("minutes");

            if (duration <= 10) {
              return null;
            }

            if (period.name === "RC 9E") {
              console.log(period);
            }

            // eslint-disable-next-line react/jsx-key -- because key is included in period
            return <Period {...period} />;
          })}
      </Flex>
    </Skeleton>
  );
}
