import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import format from "date-fns/format";
import React from "react";
import { describe, expect, it } from "vitest";
import data from "../data/earthquakeData";
import App from "./App";

describe("App - rendering", () => {
  it("should render a map", async () => {
    const { container } = render(<App />);

    const mapPane = container.querySelector(".leaflet-map-pane");

    expect(mapPane).toBeInTheDocument();
  });

  it("should render a map with the correct number of markers", () => {
    const { container } = render(<App />);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    expect(markers).toHaveLength(data.length);
  });

  it("should render a table with the correct number of rows", () => {
    const { container } = render(<App />);

    const tableRows = container.querySelectorAll(".pointer");

    expect(tableRows).toHaveLength(data.length);
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

describe("App - behaviour", () => {
  it("should filter the earthquakes by start date", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const startDateLabel = screen.getByLabelText("Start date");
    await user.click(startDateLabel);

    const firstOfFeb = screen.getByRole("option", {
      name: /Choose Tuesday, February 1st, 2022/i,
    });
    await user.click(firstOfFeb);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(
        data.filter((d) => d.date >= "2022-02-01").length
      )
    );
  });

  it("should filter the earthquakes by end date", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const endDateLabel = screen.getByLabelText("End date");
    await user.click(endDateLabel);

    const firstOfDec = screen.getByRole("option", {
      name: /Choose Thursday, December 1st, 2022/i,
    });
    await user.click(firstOfDec);

    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(
        data.filter((d) => d.date <= "2022-12-01").length
      )
    );
  });

  it("should reset the list aftering filtering the earthquakes by date", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const startDateLabel = screen.getByLabelText("Start date");
    await user.click(startDateLabel);

    const firstOfFeb = screen.getByRole("option", {
      name: /Choose Tuesday, February 1st, 2022/i,
    });
    await user.click(firstOfFeb);

    let markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(
        data.filter((d) => d.date >= "2022-02-01").length
      )
    );

    const dateResetButton = screen.queryByTestId("reset-dates");

    await user.click(dateResetButton);

    markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() => expect(markers).toHaveLength(data.length));
  });

  it("should filter the earthquakes by location for land", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const onShoreButton = screen.getByRole("radio", {
      name: /on-shore/i,
    });

    await user.click(onShoreButton);
    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(data.filter((d) => d.county !== "").length)
    );
  });

  it("should filter the earthquakes by location for sea", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const offShoreButton = screen.getByRole("radio", {
      name: /off-shore/i,
    });

    await user.click(offShoreButton);
    const markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(data.filter((d) => d.county === "").length)
    );
  });

  it("should reset the list aftering filtering the earthquakes by location", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const offShoreButton = screen.getByRole("radio", {
      name: /off-shore/i,
    });

    await user.click(offShoreButton);
    let markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() =>
      expect(markers).toHaveLength(data.filter((d) => d.county === "").length)
    );

    const locationResetButton = screen.getByRole("radio", {
      name: /all/i,
    });

    await user.click(locationResetButton);

    markers = container.querySelectorAll(".leaflet-marker-icon");

    await waitFor(() => expect(markers).toHaveLength(data.length));
  });
});
