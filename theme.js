import { extendTheme, theme, withDefaultColorScheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const themeGen = (primary) =>
  extendTheme(
    {
      config,
      colors: {
        primary: theme.colors[primary],
      },
    },
    withDefaultColorScheme({ colorScheme: "primary" })
  );

export default themeGen;
