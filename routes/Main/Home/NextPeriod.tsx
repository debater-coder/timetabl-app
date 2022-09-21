import { DateTime } from "luxon";
import { useEffect } from "react";
import Period from "./Period";

export default ({ periods, date, countdown, setCountdown, isLoaded }) => {
  const activePeriod = periods.findIndex(
    ({ time, endTime }) =>
      (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
        DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
      false
  );

  const nextPeriod = periods[activePeriod + 1];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(
        DateTime.fromISO(`${date}T${nextPeriod.time}`)
          .diffNow()
          .toFormat("hh:mm:ss")
      );
    }, 1000);

    return () => clearTimeout(timer);
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
