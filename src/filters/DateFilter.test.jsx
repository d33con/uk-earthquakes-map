import { render, screen } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import DateFilter from "./DateFilter";
import React from "react";

describe("DateFilter - rendering", () => {
  it("should render 2 DatePicker components", () => {
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    render(<DateFilter startDate={startDate} endDate={endDate} />);

    const dateInputs = screen.queryAllByRole("textbox");

    expect(dateInputs).toHaveLength(2);
    expect(dateInputs[0]).toHaveValue("01/01/2022");
    expect(dateInputs[1]).toHaveValue("31/12/2022");
  });

  it("should render a Reset button", () => {
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    render(<DateFilter startDate={startDate} endDate={endDate} />);

    const resetButton = screen.queryByTestId("reset-dates");

    expect(resetButton).toBeInTheDocument();
  });
});

describe("DateFilter - behaviour", () => {
  it("should show the datepicker when the start date input is clicked", async () => {
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    render(<DateFilter startDate={startDate} endDate={endDate} />);

    const startDateLabel = screen.getByLabelText("Start date");
    const user = userEvent.setup();
    await user.click(startDateLabel);

    expect(
      screen.getByRole("listbox", { name: "month 2022-01" })
    ).toBeInTheDocument();
  });

  it("should show the datepicker when the end date input is clicked", async () => {
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    render(<DateFilter startDate={startDate} endDate={endDate} />);

    const endDateLabel = screen.getByLabelText("End date");
    const user = userEvent.setup();
    await user.click(endDateLabel);

    expect(
      screen.getByRole("listbox", { name: "month 2022-12" })
    ).toBeInTheDocument();
  });

  it("should call the reset function when the button is clicked", async () => {
    const resetDates = vi.fn();
    const startDate = "2022-01-01";
    const endDate = "2022-12-31";
    render(
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        resetDates={resetDates}
      />
    );

    const resetButton = screen.queryByTestId("reset-dates");

    const user = userEvent.setup();
    await user.click(resetButton);

    expect(resetDates).toHaveBeenCalledOnce();
  });
});
