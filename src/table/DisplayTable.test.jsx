import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";

import DisplayTable from "./DisplayTable";
import React from "react";

const dataset = [
  {
    date: "2022-01-01",
    time: "12:00 PM",
    ml: 5.0,
    depth: 10,
    locality: "City",
    county: "County",
  },
  {
    date: "2022-01-02",
    time: "01:00 PM",
    ml: 4.5,
    depth: 15,
    locality: "Town",
    county: null,
  },
];
const updateCurrentlySelectedQuake = vi.fn();
const currentlySelectedQuake = null;

describe("DisplayTable - rendering", () => {
  it("should render a table with the correct headers", () => {
    render(
      <DisplayTable
        dataset={dataset}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
    );

    const header = screen.getAllByRole("columnheader");

    expect(header).toHaveLength(5);

    expect(header[0]).toHaveTextContent("Date");
    expect(header[1]).toHaveTextContent("Time");
    expect(header[2]).toHaveTextContent("Magnitude");
    expect(header[3]).toHaveTextContent("Depth (km)");
    expect(header[4]).toHaveTextContent("Location");
  });

  it("should render table rows with the correctly formatted data", () => {
    render(
      <DisplayTable
        dataset={dataset}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
    );

    expect(screen.getByText("01/01/2022")).toBeInTheDocument();
    expect(screen.getByText("12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("City, County")).toBeInTheDocument();
    expect(screen.getByText("02/01/2022")).toBeInTheDocument();
    expect(screen.getByText("01:00 PM")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Town")).toBeInTheDocument();
  });
});
