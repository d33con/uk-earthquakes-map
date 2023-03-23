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

  useEffect(() => (resetFilters()), [])

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

  function resetIntensitySlider() {
    setIntensity([0, 6])
    const newDataset = dataset.filter(d => (d.ml >= 0 && d.ml <= 6))
    setDataset(newDataset)
  }

  return (
    <Container fluid className="main-container">
      <Row className="title-section p-4">
        <h1 className="text-center color-main pb-4">Earthquakes in the UK 2022</h1>
        <hr />
      </Row>
      <Row className="filter-section ps-4 pe-4 pb-4">
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
          handleSetIntensity={handleSetIntensity}
          resetIntensitySlider={resetIntensitySlider} />
        <h5 className="text-center color-main mt-4">{`Showing ${dataset.length} of ${data.length} total earthquakes`}</h5>
        <div className="text-center mb-4">        
          <Button variant="outline-secondary" onClick={resetFilters}>Show all</Button>
        </div>
        <hr />
      </Row>  
      <Row className="mb-4">
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
                <h5 className="color-main text-center">Intensity: <span className="font-weight-bold">{point.ml}</span></h5>
                <hr />
                <div>Date: <span className="font-weight-bold">{format(new Date(point.date), 'dd/MM/yyyy')}</span></div>
                <div>Time: <span className="font-weight-bold">{point.time.split(":").slice(0,2).join(":")}</span></div>
                <div>Location: <span className="font-weight-bold">{point.locality}{point.county && `, ${point.county}`}</span></div>
                <div>Depth: <span className="font-weight-bold">{point.depth} km</span></div>
              </Tooltip>
            </Marker>
            ))}
          </MapContainer>
        </Col>
        <Col xs={6}>        
          <DisplayTable dataset={dataset} />
        </Col>
      </Row>
      <Row>
        <p as="a" className="text-center"><a href="https://github.com/d33con" target="_blank">By Oliver Bullen</a></p>
      </Row>
    </Container>
  );
}

