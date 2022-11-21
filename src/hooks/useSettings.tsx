import { useState } from "react";
import contextualise from "../utils/contextualise";

/**
 * Creates state which persists in `localStorage`
 */
export const usePersistentState = (
  name: string,
  initalValue: string
): [string, (value: string) => void, () => void] => {
  const [state, setState] = useState(localStorage.getItem(name) ?? initalValue);

  return [
    state,
    (value) => {
      localStorage.setItem(name, value);
      setState(value);
    },
    () => {
      localStorage.setItem(name, initalValue);
      setState(initalValue);
    },
  ];
};

const [useSettings, SettingsProvider] = contextualise(() => {
  const [primary, setPrimary, resetPrimary] = usePersistentState(
    "primary",
    "blue"
  );
  const [periodColours, setPeriodColours, resetPeriodColours] =
    usePersistentState("periodColours", "default");
  const [expanded, setExpanded, resetExpanded] = usePersistentState(
    "expanded",
    "false"
  );

  const [hoverExpand, setHoverExpand, resetHoverExpand] = usePersistentState(
    "hoverExpand",
    "false"
  );

  const [
    showTimesInsteadOfRooms,
    setShowTimesInsteadOfRooms,
    resetShowTimesInsteadOfRooms,
  ] = usePersistentState("showTimesInsteadOfRooms", "false");

  return {
    primary,
    setPrimary,
    periodColours,
    setPeriodColours,
    expanded,
    setExpanded,
    hoverExpand,
    setHoverExpand,
    showTimesInsteadOfRooms,
    setShowTimesInsteadOfRooms,
    reset: () => {
      resetPrimary();
      resetExpanded();
      resetHoverExpand();
      resetPeriodColours();
      resetShowTimesInsteadOfRooms();
    },
  };
});

export { SettingsProvider };
export default useSettings;
