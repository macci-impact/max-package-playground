/// <reference types="vitest" />
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => ({
  define: {
    "process.env": { NODE_ENV: mode },
  },
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: "src/landing-pages/main.ts",
      formats: ["iife"],
      name: "on_landing_page",
    },
    rollupOptions: {
      output: {
        entryFileNames: "landing-pages.js",
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("../../src", import.meta.url)),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
}));
