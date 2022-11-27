import replace from "@rollup/plugin-replace";
import { injectManifest } from "rollup-plugin-workbox";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    // This makes typescript angry but it works (I don't want to mess with build files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    injectManifest({
      swSrc: "sw.js",
      swDest: "dist/sw.js",
      globDirectory: "dist",
      globPatterns: [
        "**/*.js",
        "**/*.css",
        "**/*.svg",
        "**/*.html",
        "**/*.woff",
        "**/*.woff2",
        "**/*.svg",
      ],
      mode: "production", // this inlines the module imports when using yarn build
    }),
    replace({
      is_vite_preview: true, // this is used to conditionally call Workbox's precacheAndRoute function
      preventAssignment: true,
    }),
    react(),
  ],
  build: { sourcemap: true },
});
