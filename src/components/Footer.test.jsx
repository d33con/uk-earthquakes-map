import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import Footer from "./Footer";
import React from "react";

describe("Footer - rendering", () => {
  it("should render a link to the BGS", () => {
    render(<Footer />);
    const BGSLink = screen.getByRole("link", {
      name: "BGS",
    });
    expect(BGSLink).toBeInTheDocument();
  });

  it("should render a link to my Github", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", {
      name: "Oliver Bullen",
    });
    expect(githubLink).toBeInTheDocument();
  });
});
