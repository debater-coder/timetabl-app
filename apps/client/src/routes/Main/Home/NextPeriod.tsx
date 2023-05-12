import { DateTime } from "luxon";
import { useEffect } from "react";
import { Period } from "../../../components/Period/Period";
import { useToken, useColorModeValue } from "@chakra-ui/react";
import { TimetablPeriod } from "../../../services/sbhsApi/schemas";
import { useSettingsStore } from "../../../stores/settings";

type NextPeriodProps = {
  periods: TimetablPeriod[];
  date: string;
  countdown: string;
  setCountdown: (countdown: string) => void;
  isLoaded: boolean;
};

export default ({
  periods,
  countdown,
  setCountdown,
  isLoaded,
}: NextPeriodProps) => {
  const activePeriod = periods.findIndex(
    ({ time, endTime }) =>
      (time < DateTime.now() && DateTime.now() < endTime) ?? false
  );

  const nextPeriod = periods[activePeriod + 1];

  if (!nextPeriod) return null;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(nextPeriod.time.diffNow().toFormat("hh:mm:ss"));
    }, 500);

    return () => clearInterval(timer);
  });

  const showTimesInsteadOfRooms = useSettingsStore(
    (state) => state.showTimesInsteadOfRooms
  );
  const periodColours = useSettingsStore((state) => state.periodColours);

  return (
    <Period
      isLoaded={isLoaded}
      colour={
        nextPeriod.room &&
        {
          default: nextPeriod.colour,
          primary: "primary.500",
          none: "transparent",
        }[periodColours]
      }
      leftContent={nextPeriod.name}
      leftContentSize={"lg"}
      rightContent={
        showTimesInsteadOfRooms
          ? nextPeriod?.time?.toLocaleString(DateTime.TIME_SIMPLE)
          : nextPeriod.room ??
            nextPeriod?.time?.toLocaleString(DateTime.TIME_SIMPLE)
      }
      expandedContent={<>IN {countdown}</>}
      expandedSize={"xl"}
      expanded
      expandable
      width="full"
      periodBg={
        useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"
      }
    />
  );
};
