import { chakra, useBoolean, useMediaQuery } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import useSettings from "../../hooks/useSettings";
import { TimetablPeriod } from "../../services/sbhsApi/types";
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
  const {
    showTimesInsteadOfRooms,
    expanded: defaultExpanded,
    hoverExpand,
    periodColours,
  } = useSettings();
  const [expanded, setExpanded] = useBoolean(defaultExpanded === "true");
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
        period?.name === "Transition" ||
        DateTime.fromISO(`${period?.date}T15:15`) <= period.time ||
        period.time <= DateTime.fromISO(`${period?.date}T09:00`)
      }
      isLoaded={isLoaded}
      rightContent={
        showTimesInsteadOfRooms === "true" ? (
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
          {showTimesInsteadOfRooms !== "true"
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
        hoverable && hoverExpand === "true"
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
        hoverable && hoverExpand === "true"
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
