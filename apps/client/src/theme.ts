import {
  extendTheme,
  StyleFunctionProps,
  theme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import { mode } from "@chakra-ui/theme-tools";

export const themeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
} as const;

export type ColourScheme = keyof typeof theme.colors;

const themeGen = (primary: ColourScheme) =>
  extendTheme(
    {
      config,
      colors: {
        primary: theme.colors[primary],
      },
      styles: (props: StyleFunctionProps) => ({
        global: {
          body: {
            bg: mode("gray.50", "gray.900")(props),
          },
        },
      }),
    },
    withDefaultColorScheme({ colorScheme: "primary" }),
    withProse({ baseStyle: { p: { margin: 1 }, a: { color: "primary.500" } } })
  );

export default themeGen;
