import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { it, describe, expect, vi } from "vitest";
import ResetAllFilters from "./ResetAllFilters";
import React from "react";

describe("ResetAllFilters - rendering", () => {
  it("should disable the Show all button if the number of shown earthquakes is equal to the total number of earthquakes", () => {
    render(<ResetAllFilters totalFiltered={20} totalEarthquakes={20} />);

    const showAllButton = screen.getByRole("button", { name: "Show all" });

    expect(showAllButton).toBeInTheDocument();
    expect(showAllButton).toBeDisabled();
  });

  it("should enable the Show all button if the number of shown earthquakes is less than the total number of earthquakes", () => {
    render(<ResetAllFilters totalFiltered={10} totalEarthquakes={20} />);

    const showAllButton = screen.getByRole("button", { name: "Show all" });

    expect(showAllButton).toBeInTheDocument();
    expect(showAllButton).not.toBeDisabled();
  });

  it("should show the correct number of filtered and total earthquakes", () => {
    const totalFiltered = 10;
    const totalEarthquakes = 20;
    render(
      <ResetAllFilters
        totalFiltered={totalFiltered}
        totalEarthquakes={totalEarthquakes}
      />
    );

    const headingElement = screen.getByRole("heading");

    expect(headingElement).toHaveTextContent(
      `Showing ${totalFiltered} of ${totalEarthquakes} total earthquakes`
    );
  });
});

describe("ResetAllFilters - behaviour", () => {
  it("should call the resetFilters function when Show All button is clicked", async () => {
    const user = userEvent.setup();
    const resetHandler = vi.fn();
    render(
      <ResetAllFilters
        totalFiltered={10}
        totalEarthquakes={20}
        resetFilters={resetHandler}
      />
    );

    const showAllButton = screen.getByRole("button", { name: "Show all" });
    await user.click(showAllButton);

    expect(resetHandler).toHaveBeenCalledOnce();
  });
});
