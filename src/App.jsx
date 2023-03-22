import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { format } from "date-fns";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid'
import data from './data'
import DisplayTable from './DisplayTable'
import FilterSection from './FilterSection'
import "./App.css";

export default function App() {
  const position = [55.50, -2.32]
  const [dataset, setDataset] = useState([])
  const [startDate, setStartDate] = useState("2022-01-01")
  const [endDate, setEndDate] = useState("2022-12-31")
  const [intensity, setIntensity] = useState([0, 6])

  useEffect(() => {
    setDataset(data.map(d => ({id: uuidv4(), ...d})))
  }, [])

  function resetFilters() {
    setDataset(data.map(d => ({id: uuidv4(), ...d})))
  }

  function showSeaQuakes() {
    setDataset(prevState => prevState.filter(q => q.county === ""))
  }

  function showLandQuakes() {
    setDataset(prevState => prevState.filter(q => q.county !== ""))
  }

  function showSeaAndLandQuakes() {
    setDataset(data.map(d => ({id: uuidv4(), ...d})))
  }

  function handleStartDateChange(date) {
    setStartDate(date)
    const newDataset = dataset.filter(d => d.date >= date && d.date <= endDate)
    setDataset(newDataset)
  }

  function handleEndDateChange(date) {
    setEndDate(date)
    const newDataset = dataset.filter(d => d.date >= startDate && d.date <= date)
    setDataset(newDataset)
  }

  function handleSetIntensity(value) {
    setIntensity(value)
    const newDataset = dataset.filter(d => (d.ml >= value[0] && d.ml <= value[1]))
    setDataset(newDataset)
  }

  return (
    <Container fluid>
      <Row>
        <h1 className="text-center">Earthquakes in the UK 2022</h1>
      </Row>
      <FilterSection
        resetFilters={resetFilters}
        showSeaQuakes={showSeaQuakes}
        showLandQuakes={showLandQuakes}
        showSeaAndLandQuakes={showSeaAndLandQuakes}
        startDate={startDate}
        setStartDate={handleStartDateChange}
        endDate={endDate}
        setEndDate={handleEndDateChange}
        intensity={intensity}
        handleSetIntensity={handleSetIntensity} />    
      <Row>
        <hr />
        <h3 className="text-center">{`Showing ${dataset.length} of ${data.length} total earthquakes`}</h3>
        <div className="text-center">        
          <Button variant="secondary" onClick={resetFilters}>Reset</Button>
        </div>
      </Row>
      <Row className="mt-5 mb-5">
        <Col xs={6}>
          <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataset.map(point => (
            <Marker
              position={[point.lat, point.long]}
              radius={100}
              fillColor="#333"
              eventHandlers={{
              mouseover: () => {
                return;
              },
              }}
              key={point.id}
              >
              <Tooltip>
                <div>{format(new Date(point.date), 'dd/MM/yyyy')}</div>
                <div>{point.time.split(":").slice(0,2).join(":")}</div>
                <div>{point.locality}{point.county && ` - ${point.county}`}</div>
                <div>{point.ml}</div>
                <div>{point.depth}</div>
              </Tooltip>
            </Marker>
            ))}
          </MapContainer>
        </Col>
        <Col xs={6}>        
          <DisplayTable dataset={dataset} />
        </Col>
      </Row>
    </Container>
  );
}

