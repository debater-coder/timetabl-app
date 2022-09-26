import { useState } from "react";
import contextualise from "../utils/contextualise";

export const usePersistentState = (name: string, initalValue: string) => {
  const [state, setState] = useState(localStorage.getItem(name) ?? initalValue);

  return [
    state,
    (value: string) => {
      localStorage.setItem(name, value);
      setState(value);
    },
  ];
};

const [useSettings, SettingsProvider] = contextualise(() => {
  const [primary, setPrimary] = usePersistentState("primary", "blue");
  const [periodColours, setPeriodColours] = usePersistentState(
    "periodColours",
    "default"
  );
  const [expanded, setExpanded] = usePersistentState("expanded", "false");

  return {
    primary,
    setPrimary,
    periodColours,
    setPeriodColours,
    expanded,
    setExpanded,
  };
});

export { SettingsProvider };
export default useSettings;
