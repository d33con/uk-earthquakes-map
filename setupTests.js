import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import * as ResizeObserverModule from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserverModule.default;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
