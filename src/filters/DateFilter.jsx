import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  resetDates,
}) {
  return (
    <Fragment>
      <h4 className="text-center color-main mb-3">Filter by date</h4>
      <div className="d-flex justify-content-center">
        <label id="start-date" className="react-datepicker-label">
          Start date
        </label>
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) => setStartDate(format(date, "yyyy-MM-dd"))}
          selectsStart
          startDate={startDate}
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2022-12-31")}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          openToDate={new Date(startDate)}
          name="startDate"
          ariaLabelledBy="start-date"
        />
        <label id="end-date" className="react-datepicker-label">
          End date
        </label>
        <DatePicker
          selected={new Date(endDate)}
          onChange={(date) => setEndDate(format(date, "yyyy-MM-dd"))}
          selectsEnd
          endDate={endDate}
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2022-12-31")}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          openToDate={new Date(endDate)}
          name="endDate"
          ariaLabelledBy="end-date"
        />
      </div>
      <div className="mt-3 text-center">
        <Button
          variant="primary"
          onClick={resetDates}
          data-testid="reset-dates"
        >
          Reset
        </Button>
      </div>
    </Fragment>
  );
}
