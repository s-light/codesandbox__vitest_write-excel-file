import { beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform
// https://stackoverflow.com/a/76220429/574981
// https://stackoverflow.com/a/70704588/574981
// resize-observer-polyfill
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// runs a cleanup beforeq each test case (e.g. clearing jsdom)
beforeEach(() => {});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
