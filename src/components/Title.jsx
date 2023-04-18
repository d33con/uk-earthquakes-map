import Row from 'react-bootstrap/Row';
import AboutOverlay from './AboutOverlay';

export default function Title() {
  return (
    <Row className="title-section p-4">
      <h1 className="text-center color-main pb-4">
        Earthquakes in the UK 2022
        <AboutOverlay />
      </h1>
      <hr />
    </Row>
  )
}
