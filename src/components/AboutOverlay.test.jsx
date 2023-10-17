import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { it, describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import AboutOverlay from "./AboutOverlay";
import React from "react";

describe("About Overlay - behaviour", () => {
  it("should display a popover when the button is hovered", async () => {
    render(<AboutOverlay />);
    const button = screen.getByRole("button", { name: "?" });
    const user = userEvent.setup();
    await user.hover(button);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("should display a popover with placement to the right when the button is hovered", async () => {
    render(<AboutOverlay />);
    const button = screen.getByRole("button", { name: "?" });
    const user = userEvent.setup();
    await user.hover(button);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByRole("tooltip")).toHaveAttribute(
      "data-popper-placement",
      "right"
    );
  });

  it("should remove the popover when the cursor leaves the button after showing", async () => {
    render(<AboutOverlay />);
    const button = screen.getByRole("button", { name: "?" });
    const user = userEvent.setup();
    await user.hover(button);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    await waitForElementToBeRemoved(() => screen.getByRole("tooltip"));
  });
});
