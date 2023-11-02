import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import MagnitudeSlider from "./MagnitudeSlider";
import React from "react";

describe("MagnitudeSlider - rendering", () => {
  it("should render the slider with the correct values", () => {
    const minMagnitude = Math.floor(Math.random() * 5);
    const maxMagnitude = minMagnitude + 1;
    render(<MagnitudeSlider magnitude={[minMagnitude, maxMagnitude]} />);

    const minimumThumb = screen.getByRole("slider", {
      name: "Minimum magnitude",
    });

    const maximumThumb = screen.getByRole("slider", {
      name: "Maximum magnitude",
    });

    expect(minimumThumb).toHaveTextContent(minMagnitude);
    expect(maximumThumb).toHaveTextContent(maxMagnitude);
  });
});
