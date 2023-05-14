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
  setBgImage: (bgImage: string) => void;
  setDarkenBlur: (darkenBlur: boolean) => void;
};

export type SettingsState = {
  primary: ColourScheme;
  expanded: boolean;
  periodColours: "default" | "primary" | "none";
  hoverExpand: boolean;
  showTimesInsteadOfRooms: boolean;
  bgImage: string;
  darkenBlur: boolean;
};

export const initialState: SettingsState = {
  primary: "blue",
  expanded: false,
  periodColours: "default",
  hoverExpand: false,
  showTimesInsteadOfRooms: false,
  bgImage: "",
  darkenBlur: true,
};

export const useSettingsStore = create<SettingsState & Actions>()(
  devtools(
    persist(
      (set): SettingsState & Actions => ({
        ...initialState,
        setPrimary: (primary) => set({ primary }),
        setExpanded: (expanded) => set({ expanded }),
        setPeriodColours: (periodColours) => set({ periodColours }),
        setHoverExpand: (hoverExpand) => set({ hoverExpand }),
        setShowTimesInsteadOfRooms: (showTimesInsteadOfRooms) =>
          set({ showTimesInsteadOfRooms }),
        setBgImage: (bgImage) => set({ bgImage }),
        setDarkenBlur: (darkenBlur) => set({ darkenBlur }),
        reset: () => set(initialState),
      }),
      {
        name: "settings-storage",
        version: 1,
      }
    )
  )
);
