/// <reference types="vitest" />
import replace from "@rollup/plugin-replace";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { injectManifest } from "rollup-plugin-workbox";
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    open: false,
  },
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    replace({
      is_vite_preview: true, // this is used to conditionally call Workbox's precacheAndRoute function
      preventAssignment: true,
    }),
    react(),
    sentryVitePlugin({
      org: "hamzah-lc",
      project: "timetabl",
    }),
  ],
  build: { sourcemap: true },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
  },
});
