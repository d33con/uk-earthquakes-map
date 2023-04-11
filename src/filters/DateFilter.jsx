import { Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

export default function DateFilter({ startDate, endDate, setStartDate, setEndDate, resetDates }) {
  return (
    <Fragment>
      <h4 className="text-center color-main mb-3">Filter by date</h4>
      <div className="d-flex justify-content-center">
        <DatePicker
          selected={new Date(startDate)}
          onChange={(date) => setStartDate(date.toISOString().split("T")[0])}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2022-12-31")}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          openToDate={new Date(startDate)}
        />
        <DatePicker
          selected={new Date(endDate)}
          onChange={(date) => setEndDate(date.toISOString().split("T")[0])}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2022-12-31")}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          openToDate={new Date(endDate)}
        />
      </div>
      <div className="mt-3 text-center">        
        <Button variant="primary" onClick={resetDates}>Reset</Button>  
      </div>
    </Fragment>
  )
}