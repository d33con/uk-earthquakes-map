import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import DisplayTable from "./DisplayTable";
import React from "react";
import data from "../data/earthquakeData";

const mockDataset = [
  {
    date: "2022-01-01",
    time: "05:05:44",
    lat: "53.968",
    long: "-3.317",
    depth: "2.7",
    ml: "1.6",
    nsta: "12",
    rms: "0.3",
    intensity: "",
    induced: "",
    locality: "IRISH SEA",
    county: "",
  },
  {
    date: "2022-01-03",
    time: "22:57:20",
    lat: "53.325",
    long: "-0.036",
    depth: "18.7",
    ml: "1.1",
    nsta: "8",
    rms: "0.2",
    intensity: "",
    induced: "",
    locality: "LOUTH",
    county: "LINCOLNSHIRE",
  },
];

const updateCurrentlySelectedQuake = vi.fn();
const currentlySelectedQuake = null;

describe("DisplayTable - rendering", () => {
  it("should render a table with the correct headers", () => {
    render(
      <DisplayTable
        dataset={data}
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

  it("should render a table with the correct number of rows", async () => {
    const { container } = render(
      <DisplayTable
        dataset={data}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
    );

    const tableRows = container.querySelectorAll(".pointer");

    expect(tableRows).toHaveLength(data.length);
  });

  it("should render table rows with the correctly formatted data", () => {
    render(
      <DisplayTable
        dataset={mockDataset}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
    );

    expect(screen.getByText("01/01/2022")).toBeInTheDocument();
    expect(screen.getByText("05:05:44")).toBeInTheDocument();
    expect(screen.getByText("1.6")).toBeInTheDocument();
    expect(screen.getByText("2.7")).toBeInTheDocument();
    expect(screen.getByText(/IRISH SEA/i)).toBeInTheDocument();
    expect(screen.getByText("03/01/2022")).toBeInTheDocument();
    expect(screen.getByText("22:57:20")).toBeInTheDocument();
    expect(screen.getByText("1.1")).toBeInTheDocument();
    expect(screen.getByText("18.7")).toBeInTheDocument();
    expect(screen.getByText(/LOUTH, LINCOLNSHIRE/i)).toBeInTheDocument();
  });
});

describe("DisplayTable - behaviour", () => {
  it("should call the updateCurrentlySelectedQuake function when a row in the table is clicked", async () => {
    const { container } = render(
      <DisplayTable
        dataset={mockDataset}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
    );

    const tableRow = container.querySelector(".pointer");

    const user = userEvent.setup();
    await user.click(tableRow);

    expect(updateCurrentlySelectedQuake).toHaveBeenCalledOnce();
  });
});
