import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"
import IntensitySlider from './IntensitySlider';

export default function FilterSection(props) {
  return (
    <>   
      <Row className="filter-section mb-5">
        <hr />
        <h4 className="text-center">Filter by date</h4>
        <Col>
          <DatePicker
            selected={new Date(props.startDate)}
            onChange={(date) => props.setStartDate(date.toISOString().split("T")[0])}
            selectsStart
            startDate={props.startDate}
            endDate={props.endDate}
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2022-12-31")}
            dateFormat="dd/MM/yyyy"
            withPortal
          />
        </Col>
        <Col>      
          <DatePicker
            selected={new Date(props.endDate)}
            onChange={(date) => props.setEndDate(date.toISOString().split("T")[0])}
            selectsEnd
            startDate={props.startDate}
            endDate={props.endDate}
            minDate={new Date("2022-01-01")}
            maxDate={new Date("2022-12-31")}
            dateFormat="dd/MM/yyyy"
            withPortal
          />
        </Col>
        <Col>      
          <Button onClick={props.resetFilters}>Reset</Button>  
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <hr />
        <h4 className="text-center">Filter by location</h4>
        <Stack direction="horizontal" gap={3}>  
          <Button onClick={props.showLandQuakes}>Show on-shore quakes</Button>    
          <Button onClick={props.showSeaQuakes}>Show off-shore quakes</Button>
          <Button onClick={props.showSeaAndLandQuakes}>Show both</Button>
        </Stack>    
      </Row>
      <Row className="intensity-slider-container mb-5">
        <hr />
        <h4 className="text-center">Filter by intensity</h4>
        <Col xs={{ span: 4, offset: 4 }}>        
          <IntensitySlider
            intensity={props.intensity}
            handleSetIntensity={props.handleSetIntensity} />
        </Col>
      </Row>
    </>
  )
}

