import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import LocationFilter from "./LocationFilter";
import React from "react";

describe("LocationFilter - rendering", () => {
  it("should render 3 radio buttons", () => {
    render(<LocationFilter />);

    const locationRadios = screen.queryAllByRole("radio");

    expect(locationRadios).toHaveLength(3);
  });

  it("should render the 'All' radio button as selected when passed the both value", () => {
    render(<LocationFilter locationFilter="both" />);

    const allRadioButton = screen.getByRole("radio", {
      name: "All",
    });

    expect(allRadioButton).toBeChecked();
  });

  it("should render the 'Land' radio button as selected when passed the land value", () => {
    render(<LocationFilter locationFilter="land" />);

    const landRadioButton = screen.getByRole("radio", {
      name: "On-shore",
    });

    expect(landRadioButton).toBeChecked();
  });

  it("should render the 'Sea' radio button as selected when passed the sea value", () => {
    render(<LocationFilter locationFilter="sea" />);

    const seaRadioButton = screen.getByRole("radio", {
      name: "Off-shore",
    });

    expect(seaRadioButton).toBeChecked();
  });
});

describe("LocationFilter - behaviour", () => {
  it("should call the location change function when a button is clicked", async () => {
    const handleLocationChange = vi.fn();
    const user = userEvent.setup();
    render(
      <LocationFilter
        locationFilter="land"
        handleLocationChange={handleLocationChange}
      />
    );

    const seaRadioButton = screen.getByRole("radio", {
      name: "Off-shore",
    });
    await user.click(seaRadioButton);

    expect(handleLocationChange).toHaveBeenCalledOnce();
  });
});
