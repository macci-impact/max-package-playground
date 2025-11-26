import type { Preview } from "@storybook/vue3";
import { initialize, mswLoader } from "msw-storybook-addon";
import { handlers, stubWindowFns } from "../src/shared/mocks/handlers";
import "../src/shared/assets/styles.css";

// Initialize MSW with our already-defined handlers
initialize(
  {
    serviceWorker: {
      // Since we deploy Storybook not at the root directory, we need to specify the service worker
      // is in the same directory as the Storybook's index.html
      url: "./mockServiceWorker.js",
    },
  },
  [...handlers]
);

stubWindowFns();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  //Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
