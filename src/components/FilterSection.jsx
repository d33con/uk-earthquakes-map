import React, { Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DateFilter from "../filters/DateFilter";
import LocationFilter from "../filters/LocationFilter";
import MagnitudeFilter from "../filters/MagnitudeFilter";
import ResetAllFilters from "../filters/ResetAllFilters";

export default function FilterSection(props) {
  return (
    <Fragment>
      <Row className="filter-section ps-4 pe-4 pb-4" xs={1} xl={3}>
        <Col className="divider mb-4">
          <DateFilter
            startDate={props.startDate}
            endDate={props.endDate}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            resetDates={props.resetDates}
          />
        </Col>
        <Col className="divider mb-4">
          <LocationFilter
            handleLocationChange={props.handleLocationChange}
            locationFilter={props.locationFilter}
          />
        </Col>
        <Col>
          <MagnitudeFilter
            magnitude={props.magnitude}
            handleSetMagnitude={props.handleSetMagnitude}
            resetMagnitudeSlider={props.resetMagnitudeSlider}
          />
        </Col>
      </Row>
      <ResetAllFilters
        resetFilters={props.resetFilters}
        totalFiltered={props.totalFiltered}
        totalEarthquakes={props.totalEarthquakes}
      />
    </Fragment>
  );
}
