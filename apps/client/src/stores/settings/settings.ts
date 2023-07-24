import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { ColourScheme } from "../../theme";

export type Actions = {
  setPrimary: (primary: ColourScheme) => void;
  setPeriodColours: (periodColours: "default" | "primary" | "none") => void;
  reset: () => void;
  setBgImage: (bgImage: string) => void;
  setDarkenBlur: (darkenBlur: boolean) => void;
};

export type SettingsState = {
  primary: ColourScheme;
  periodColours: "default" | "primary" | "none";
  bgImage: string;
  darkenBlur: boolean;
};

export const initialState: SettingsState = {
  primary: "blue",
  periodColours: "default",
  bgImage: "",
  darkenBlur: true,
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
        reset: () => set(initialState),
      }),
      {
        name: "settings-storage",
        version: 1,
      }
    )
  )
);
