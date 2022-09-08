import { useState } from "react";
import contextualise from "../utils/contextualise";

const [useDynamicTheme, DynamicThemeProvider] = contextualise(() => {
  const [primary, setPrimary] = useState(
    localStorage.getItem("primary") || "blue"
  );

  return {
    primary,
    setPrimary: (color) => {
      localStorage.setItem("primary", color);
      setPrimary(color);
    },
  };
});

export { DynamicThemeProvider };
export default useDynamicTheme;
