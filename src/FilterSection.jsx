import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import IntensitySlider from './IntensitySlider';

export default function FilterSection(props) {
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
        <div className="d-flex justify-content-around">  
          <Button onClick={props.showLandQuakes}>Show on-shore quakes</Button>    
          <Button onClick={props.showSeaQuakes}>Show off-shore quakes</Button>
        </div>
        <div className="mt-3 text-center">
          <Button onClick={props.resetLocation}>Show both</Button>
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

