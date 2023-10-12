import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import Title from "./Title";
import React from "react";

describe("Title - rendering", () => {
  it("should have 'Earthquakes in the UK 2022' as a heading", () => {
    render(<Title />);
    const titleText = screen.getByText(/Earthquakes in the UK 2022/i);
    expect(titleText).toBeInTheDocument();
  });
});
