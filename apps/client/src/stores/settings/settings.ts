import { ColourScheme } from "../../theme";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Actions = {
  setPrimary: (primary: ColourScheme) => void;
  setPeriodColours: (periodColours: "default" | "primary" | "none") => void;
  reset: () => void;
  setBgImage: (bgImage: string) => void;
  setDarkenBlur: (darkenBlur: boolean) => void;
  setShowTimes: (showTimes: boolean) => void;
};

type SettingsState = {
  primary: ColourScheme;
  periodColours: "default" | "primary" | "none";
  bgImage: string;
  darkenBlur: boolean;
  showTimes: boolean;
};

const initialState: SettingsState = {
  primary: "blue",
  periodColours: "default",
  bgImage: "",
  darkenBlur: true,
  showTimes: true,
};

export const useSettingsStore = create<SettingsState & Actions>()(
  devtools(
    persist(
      (set): SettingsState & Actions => ({
        ...initialState,
        setPrimary: (primary) => set({ primary }),
        setPeriodColours: (periodColours) => set({ periodColours }),
        setBgImage: (bgImage) => set({ bgImage }),
        setDarkenBlur: (darkenBlur) => set({ darkenBlur }),
        setShowTimes: (showTimes) => set({ showTimes }),
        reset: () => set(initialState),
      }),
      {
        name: "settings-storage",
        version: 1,
      }
    )
  )
);
