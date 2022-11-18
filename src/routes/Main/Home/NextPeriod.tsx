import { DateTime } from "luxon";
import { useEffect } from "react";
import { TimetablPeriod } from "../../../hooks/useSBHSQuery";
import Period from "./Period";

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

  return (
    <Period
      isLoaded={isLoaded}
      periodData={nextPeriod}
      upcoming
      countdown={countdown}
    />
  );
};
