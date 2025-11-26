/// <reference types="vitest" />
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  define: {
    "process.env": {},
  },
  plugins: [vue(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: "src/main.ts",
      formats: ["umd", "es"],
      name: "platform_user_management",
    },
    rollupOptions: {
      // Make sure to set 'umd' as the output format

      output: {
        amd: { define: "false" },
        format: "umd",
        // Add globals if needed
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/shared/mocks/vitest.setup.js",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
