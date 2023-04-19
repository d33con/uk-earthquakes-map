import Row from 'react-bootstrap/Row';

export default function Footer() {
  return (
    <Row>
      <p className="text-center">
        Data from <a href="https://earthquakes.bgs.ac.uk/earthquakes/home.html" target="_blank">BGS</a> - by{' '}
        <a href="https://github.com/d33con" target="_blank">Oliver Bullen</a>
      </p>
    </Row>
  );
}