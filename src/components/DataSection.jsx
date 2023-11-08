import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EarthquakeMap from "../map/EarthquakeMap";
import DisplayTable from "../table/DisplayTable";

export default function DataSection({
  mapCenter,
  mapDefaultZoom,
  setMap,
  dataset,
  handleMapMove,
  updateCurrentlySelectedQuake,
  currentlySelectedQuake,
}) {
  return (
    <Row className="mb-4">
      <Col xs={12} xl={6} className="mb-4 mb-xl-0">
        <EarthquakeMap
          mapCenter={mapCenter}
          dataset={dataset}
          handleMapMove={handleMapMove}
          setMap={setMap}
          mapDefaultZoom={mapDefaultZoom}
          updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
          currentlySelectedQuake={currentlySelectedQuake}
        />
      </Col>
      <Col xs={12} xl={6}>
        <DisplayTable
          dataset={dataset}
          updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
          currentlySelectedQuake={currentlySelectedQuake}
        />
      </Col>
    </Row>
  );
}
