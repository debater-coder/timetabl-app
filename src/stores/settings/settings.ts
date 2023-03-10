import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { ColourScheme } from "../../theme";

export type Actions = {
  setPrimary: (primary: ColourScheme) => void;
  setExpanded: (expanded: boolean) => void;
  setPeriodColours: (periodColours: "default" | "primary" | "none") => void;
  setHoverExpand: (hoverExpande: boolean) => void;
  setShowTimesInsteadOfRooms: (showTimesInsteadOfRooms: boolean) => void;
  reset: () => void;
};

export type SettingsState = {
  primary: ColourScheme;
  expanded: boolean;
  periodColours: "default" | "primary" | "none";
  hoverExpand: boolean;
  showTimesInsteadOfRooms: boolean;
  actions: Actions;
};

export const initialState: Omit<SettingsState, "actions"> = {
  primary: "blue",
  expanded: false,
  periodColours: "default",
  hoverExpand: false,
  showTimesInsteadOfRooms: false,
};

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set): SettingsState => ({
        ...initialState,
        actions: {
          setPrimary: (primary) => set({ primary }),
          setExpanded: (expanded) => set({ expanded }),
          setPeriodColours: (periodColours) => set({ periodColours }),
          setHoverExpand: (hoverExpand) => set({ hoverExpand }),
          setShowTimesInsteadOfRooms: (showTimesInsteadOfRooms) =>
            set({ showTimesInsteadOfRooms }),
          reset: () => set(initialState),
        },
      }),
      {
        name: "settings-storage",
      }
    )
  )
);
