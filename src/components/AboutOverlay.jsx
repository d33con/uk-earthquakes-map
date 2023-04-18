import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';

const popover = (
  <Popover id="about-popover">
    <Popover.Header as="h5">About</Popover.Header>
    <Popover.Body>
      <Row>
        <h6>Filters</h6>
        <p>Set a date range using the date pickers</p>
        <p>Show land or sea earthquakes, or both locations</p>
        <p>Use the slider to filter the earthquakes by magnitude</p>
        <h6>Map</h6>
        <p>The list of earthquakes will update as the map is moved or zoomed</p>
        <h6>Table</h6>
        <p>The table updates automatically and can be sorted by Date, Magnitude, Depth and Location</p>
        <p>Click a table row to zoom in to the earthquake's location on the map</p>
      </Row>
    </Popover.Body>
  </Popover>
);

export default function AboutOverlay() {
  return (
    <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
      <Button variant="primary" className="btn-about">?</Button>
    </OverlayTrigger>
  )
}