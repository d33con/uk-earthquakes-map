import { render, screen, within, waitFor, act } from "@testing-library/react";
import { it, describe, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import React from "react";
import data from "../data/earthquakeData";
import format from "date-fns/format";

describe("App - rendering", () => {
  it("should render a map", async () => {
    const { container } = render(<App />);

    const mapPane = container.querySelector(".leaflet-map-pane");

    expect(mapPane).toBeInTheDocument();
  });

  it("should render a map with the correct number of markers", () => {
    const { container } = render(<App />);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    expect(markers).toHaveLength(285);
  });

  it("should render a table with the correct number of rows", () => {
    const { container } = render(<App />);

    const tableRows = container.querySelectorAll(".pointer");

    expect(tableRows).toHaveLength(285);
  });

  it("should render a tooltip when a marker is hovered", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await user.hover(markers[0]);

    const tooltips = screen.queryAllByRole("tooltip");

    expect(tooltips).toHaveLength(1);
  });

  it("should render a tooltip with the correct content when a marker is hovered", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await user.hover(markers[0]);

    const tooltip = screen.queryAllByRole("tooltip");

    const magnitudeText = within(tooltip[0]).getByText(data[0].ml);
    const dateText = within(tooltip[0]).getByText(
      format(new Date(data[0].date), "dd/MM/yyyy")
    );
    const timeText = within(tooltip[0]).getByText(
      data[0].time.split(":").slice(0, 2).join(":")
    );
    const depthText = within(tooltip[0]).getByText(`${data[0].depth} km`);
    const localityText = within(tooltip[0]).getByText(data[0].locality);

    expect(magnitudeText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    expect(timeText).toBeInTheDocument();
    expect(depthText).toBeInTheDocument();
    expect(localityText).toBeInTheDocument();
  });

  it("should render both the locality and county in the tooltip when an earthquake has both of those", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await user.hover(markers[1]);

    const tooltip = screen.queryAllByRole("tooltip");

    const localityAndCountyText = within(tooltip[0]).getByText(
      `${data[1].locality}, ${data[1].county}`
    );
    expect(localityAndCountyText).toBeInTheDocument();
  });
});
