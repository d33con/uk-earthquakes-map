import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
// import userEvent from "@testing-library/user-event";
import MagnitudeFilter from "./MagnitudeFilter";
import React from "react";

describe("MagnitudeFilter - rendering", () => {
  it("should render the MagnitudeSlider component with 2 thumb sliders", () => {
    render(<MagnitudeFilter />);

    const sliders = screen.queryAllByRole("slider");

    expect(sliders).toHaveLength(2);
  });

  it("should render a Reset button", () => {
    render(<MagnitudeFilter />);

    const resetButton = screen.queryByTestId("reset-magnitude");

    expect(resetButton).toBeInTheDocument();
  });
});
