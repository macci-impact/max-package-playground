import { handlers as landingPageHandlers } from "@/landing-pages/mocks/handlers";

// Mocks that will be used both in Storybook and Vitest
export const handlers = [...landingPageHandlers];

// Stub global window fns needed to work with core fetches
export const stubWindowFns = () => {
  if (typeof window !== "undefined") {
    (<any>window).getCsrfToken = function () {
      return "fakeToken";
    };
    (<any>window).parent.getCsrfToken = function () {
      return "fakeToken";
    };
  }
};
