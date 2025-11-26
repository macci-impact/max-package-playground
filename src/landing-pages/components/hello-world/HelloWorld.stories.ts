import { http, HttpResponse } from "msw";
import HelloWorld from "./HelloWorld.vue";
import HelloWorldController from "./HelloWorldController.vue";
import { HELLO_WORLD_FAKE_ENDPOINT } from "@/landing-pages/data/endpoints";

export default {
  component: HelloWorld,
  title: "Components/HelloWorld",
};

/**
 * A simple story that renders the HelloWorld view component directly.
 * No mocking is involved, this is purely display
 */
export const View = {
  render: (args: unknown) => ({
    components: { HelloWorld },
    setup() {
      return { args };
    },
    template: `<HelloWorld :message="args.text"></HelloWorld>`,
  }),
  args: {
    text: "Hello, World!",
  },
};

/**`
 * A simple story that renders the HelloWorldController with mocked endpoint.
 * This is useful for testing the controller and hook logic, since the controller
 * also imports the hook
 */
export const Controller = {
  render: (args: unknown) => ({
    components: { HelloWorldController },
    setup() {
      return { args };
    },
    template: `<HelloWorldController></HelloWorldController>`,
  }),
};

/**`
 * Story that overrides the Hello World endpoint.
 * This is useful for testing other controller states, such as loading and error
 */
export const FetchError = {
  ...Controller,
  parameters: {
    msw: {
      handlers: [
        http.get(HELLO_WORLD_FAKE_ENDPOINT, () => {
          return new HttpResponse("There was an error", { status: 400 });
        }),
      ],
    },
  },
};
