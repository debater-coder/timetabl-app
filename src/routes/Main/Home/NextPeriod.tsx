import { DateTime } from "luxon";
import { useEffect } from "react";
import { TimetablPeriod } from "../../../hooks/sbhsQuery/use/useDTT";
import { Period } from "../../../components/Period/Period";
import useSettings from "../../../hooks/useSettings";

type NextPeriodProps = {
  periods: TimetablPeriod[];
  date: string;
  countdown: string;
  setCountdown: (countdown: string) => void;
  isLoaded: boolean;
};

export default ({
  periods,
  date,
  countdown,
  setCountdown,
  isLoaded,
}: NextPeriodProps) => {
  const activePeriod = periods.findIndex(
    ({ time, endTime }: { time: string; endTime: string }) =>
      (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
        DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
      false
  );

  const nextPeriod = periods[activePeriod + 1];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(
        DateTime.fromISO(`${date}T${nextPeriod.time}`)
          .diffNow()
          .toFormat("hh:mm:ss")
      );
    }, 500);

    return () => clearInterval(timer);
  });

  const { showTimesInsteadOfRooms, periodColours } = useSettings();

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
      leftContentSize={"xs"}
      rightContent={
        showTimesInsteadOfRooms === "true"
          ? nextPeriod.time
          : nextPeriod.room ?? nextPeriod.time
      }
      expandedContent={<>IN {countdown}</>}
      expandedSize={"xl"}
      expanded
      expandable
    />
  );
};
