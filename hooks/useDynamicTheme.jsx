import { useState } from "react";
import contextualise from "../utils/contextualise";

const [useDynamicTheme, DynamicThemeProvider] = contextualise(() => {
  const [primary, setPrimary] = useState("blue");

  return { primary, setPrimary };
});

export { DynamicThemeProvider };
export default useDynamicTheme;
