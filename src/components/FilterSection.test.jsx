import { render, screen } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import FilterSection from "./FilterSection";
import React from "react";

describe("FilterSection - rendering", () => {
  it("should render the DateFilter, LocationFilter, and MagnitudeFilter components", () => {
    render(
      <FilterSection
        startDate="2022-01-01"
        endDate="2022-12-31"
        locationFilter="land"
        magnitude={5}
        totalFiltered={10}
        totalEarthquakes={20}
      />
    );

    expect(screen.getByText("Filter by date")).toBeInTheDocument();
    expect(screen.getByText("Filter by location")).toBeInTheDocument();
    expect(screen.getByText("Filter by magnitude")).toBeInTheDocument();
  });

  it("should render a Show all button", () => {
    render(
      <FilterSection
        startDate="2022-01-01"
        endDate="2022-12-31"
        locationFilter="land"
        magnitude={5}
        totalFiltered={10}
        totalEarthquakes={20}
      />
    );

    const showAllButton = screen.getByRole("button", { name: "Show all" });

    expect(showAllButton).toBeInTheDocument();
  });
});
