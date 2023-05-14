import { chakra, useBoolean, useMediaQuery } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import { TimetablPeriod } from "../../services/sbhsApi/schemas";
import { useSettingsStore } from "../../stores/settings";
import { Period } from "../Period";

export const DTTPeriod = ({
  period,
  isLoaded,
  active,
}: {
  period: TimetablPeriod;
  isLoaded: boolean;
  active: boolean;
}) => {
  const showTimesInsteadOfRooms = useSettingsStore(
    (state) => state.showTimesInsteadOfRooms
  );
  const defaultExpanded = useSettingsStore((state) => state.expanded);
  const hoverExpand = useSettingsStore((state) => state.hoverExpand);
  const periodColours = useSettingsStore((state) => state.periodColours);
  const [expanded, setExpanded] = useBoolean(defaultExpanded);
  const [hoverable] = useMediaQuery("(any-hover: hover)");
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  return (
    <Period
      active={active}
      colour={
        period.room &&
        {
          default: period.colour,
          primary: "primary.500",
          none: "transparent",
        }[periodColours]
      }
      leftContent={period.name}
      leftContentSize={"xs"}
      transition={
        period?.time
          ? period?.name === "Transition" ||
            DateTime.fromISO(`${period?.date}T15:15`) <= period?.time ||
            period?.time <= DateTime.fromISO(`${period?.date}T09:00`)
          : true
      }
      isLoaded={isLoaded}
      rightContent={
        showTimesInsteadOfRooms ? (
          period?.time?.toLocaleString(DateTime.TIME_SIMPLE)
        ) : period.room ? (
          <chakra.span
            bg={period.roomTo && "primary.100"}
            p={period.roomTo && 1}
            color={period.roomTo && "gray.700"}
            rounded={period.roomTo && "10%"}
          >
            {period.roomTo ?? period.room}
          </chakra.span>
        ) : (
          period?.time?.toLocaleString(DateTime.TIME_SIMPLE)
        )
      }
      expandedContent={
        <>
          at{" "}
          {!showTimesInsteadOfRooms
            ? period?.time?.toLocaleString(DateTime.TIME_SIMPLE)
            : period.room}{" "}
          with{" "}
          <chakra.span
            bg={period.casual && "primary.100"}
            p={period.casual && 1}
            color={period.casual && "gray.700"}
            rounded={period.casual && "full"}
          >
            {period?.casual ?? period?.teacher ?? "No one"}
          </chakra.span>
        </>
      }
      expandable={!!period.room}
      clickable={!!period.room}
      expanded={!!period.room && expanded}
      onClick={setExpanded.toggle}
      expandedSize={"xs"}
      expandedWeight={"semibold"}
      onMouseEnter={
        hoverable && hoverExpand
          ? () => {
              setHoverTimeout(
                setTimeout(() => {
                  setHoverTimeout(null);
                  setExpanded.on();
                }, 250)
              );
            }
          : undefined
      }
      onMouseLeave={
        hoverable && hoverExpand
          ? () => {
              if (hoverTimeout) {
                clearTimeout(hoverTimeout);
              }
              setHoverTimeout(null);
              setExpanded.off();
            }
          : undefined
      }
      tooltip={!!hoverTimeout}
    />
  );
};
