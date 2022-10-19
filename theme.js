import { extendTheme, theme, withDefaultColorScheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

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
    withDefaultColorScheme({ colorScheme: "primary" }),
    withProse({ baseStyle: { p: { margin: 1 }, a: { color: "primary.500" } } })
  );

export default themeGen;
