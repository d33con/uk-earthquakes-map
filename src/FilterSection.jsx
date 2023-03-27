import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import IntensitySlider from './IntensitySlider'

export default function FilterSection(props) {
  const locationRadios = [
    {
      buttonText: 'On-shore',
      value: 'land'
    },
    {
      buttonText: 'Off-shore',
      value: 'sea'
    },
    {
      buttonText: 'All',
      value: 'both'
    }
  ]

  return (
    <Row className="filter-section ps-4 pe-4 pb-4" xs={1} xl={3}>   
      <Col className="divider">
        <h4 className="text-center color-main mb-3">Filter by date</h4>
        <div className="d-flex justify-content-around">        
          <DatePicker
            selected={new Date(props.startDate)}
            onChange={(date) => props.setStartDate(date.toISOString().split("T")[0])}
            selectsStart
            startDate={props.startDate}
            endDate={props.endDate}
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2022-12-31")}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            openToDate={new Date(props.startDate)}
          />
          <DatePicker
            selected={new Date(props.endDate)}
            onChange={(date) => props.setEndDate(date.toISOString().split("T")[0])}
            selectsEnd
            startDate={props.startDate}
            endDate={props.endDate}
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2022-12-31")}
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            openToDate={new Date(props.endDate)}
          />
        </div>
        <div className="mt-3 text-center">        
          <Button variant="primary" onClick={props.resetDates}>Reset</Button>  
        </div>
      </Col>
      <Col className="divider">
        <h4 className="text-center color-main mb-3">Filter by location</h4>
        <div className="d-flex justify-content-center">  
          <ToggleButtonGroup className="mb-2" onChange={(evt) => props.handleLocationChange(evt)}
          >
            {locationRadios.map(location => (
              <ToggleButton
                key={location.value}
                id={location.value}
                type="radio"
                variant="primary"
                name="locationFilter"
                value={location.value}
                checked={props.locationFilter === location.value}
              >
                {location.buttonText}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>   
      </Col>
      <Col>      
        <h4 className="text-center color-main mb-3">Filter by intensity</h4>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <small className="font-weight-light me-1">Min</small>        
          <IntensitySlider
            intensity={props.intensity}
            handleSetIntensity={props.handleSetIntensity} />
          <small className="font-weight-light">Max</small>
        </div>
        <div className="text-center">
          <Button onClick={props.resetIntensitySlider}>Reset</Button>
        </div>
      </Col>
    </Row>
  )
}

