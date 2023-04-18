
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EarthquakeMap from "../map/EarthquakeMap";
import DisplayTable from '../table/DisplayTable';

export default function DataSection(props) {
  return (
    <Row className="mb-4">
      <Col xs={12} xl={6} className="mb-4 mb-xl-0">
        <EarthquakeMap
          mapCenter={props.mapCenter}
          dataset={props.dataset}
          handleMapMove={props.handleMapMove}
          setMap={props.setMap}
          mapDefaultZoom={props.mapDefaultZoom}
        />
      </Col>
      <Col xs={12} xl={6}>        
        <DisplayTable
          dataset={props.dataset}
          updateCurrentlySelectedQuake={props.updateCurrentlySelectedQuake}
          currentlySelectedQuake={props.currentlySelectedQuake}
        />
      </Col>
    </Row>
  );
}