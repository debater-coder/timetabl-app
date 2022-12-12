import { chakra, useBoolean, useMediaQuery } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useState } from "react";
import { TimetablPeriod } from "../../hooks/sbhsQuery/use/useDTT";
import useSettings from "../../hooks/useSettings";
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
        period?.name == "Transition" ||
        DateTime.fromISO("15:15") <= DateTime.fromISO(period.time) ||
        DateTime.fromISO(period.time) <= DateTime.fromISO("09:00")
      }
      isLoaded={isLoaded}
      rightContent={
        showTimesInsteadOfRooms === "true" ? (
          period.time
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
          period.time
        )
      }
      expandedContent={
        <>
          at {showTimesInsteadOfRooms !== "true" ? period.time : period.room}{" "}
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
