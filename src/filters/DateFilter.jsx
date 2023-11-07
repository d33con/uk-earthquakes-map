import React from "react";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFilter({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  minDate,
  maxDate,
  resetDates,
}) {
  return (
    <>
      <h4 className="text-center color-main mb-3">Filter by date</h4>
      <div className="d-flex justify-content-center">
        <label id="start-date" className="react-datepicker-label">
          Start date
        </label>
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
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
          onChange={(date) => setEndDate(date)}
          selectsEnd
          endDate={endDate}
          minDate={new Date(minDate)}
          maxDate={new Date(maxDate)}
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
    </>
  );
}
