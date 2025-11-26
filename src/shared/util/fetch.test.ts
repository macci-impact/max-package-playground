import { fetchJson } from "./fetch";
import { HELLO_WORLD_FAKE_ENDPOINT } from "@/landing-pages/data/endpoints";
import { it, expect } from "vitest";

it("Resolves the endpoint correctly", async () => {
  const available = await fetchJson(HELLO_WORLD_FAKE_ENDPOINT);

  expect(window.getCsrfToken).toBeCalledTimes(1);
  expect(available).toEqual("Hello, World from the backend API mock!");
});
