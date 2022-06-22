import replace from "@rollup/plugin-replace";
import { injectManifest } from "rollup-plugin-workbox";

export default {
  plugins: [
    injectManifest({
      swSrc: "sw.js",
      swDest: "dist/sw.js",
      globDirectory: "dist",
      globPatterns: ["**/*.js", "**/*.css", "**/*.svg", "**/*.html"],
      mode: "production", // this inlines the module imports when using yarn build
    }),
    replace({
      is_vite_preview: true, // this is used to conditionally call Workbox's precacheAndRoute function
    }),
  ],
};
