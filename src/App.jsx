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
  const YEAR_START = "2022-01-01"
  const YEAR_END = "2022-12-31"
  const MAP_CENTER = [55.50, -2.32]
  const maxIntensity = Math.ceil(Math.max(...data.map(o => Number(o.ml))))
  const minLongitude = Math.min(...data.map(o => Number(o.long)))
  const maxLongitude = Math.max(...data.map(o => Number(o.long)))
  const minLatitude = Math.min(...data.map(o => Number(o.lat)))
  const maxLatitude = Math.max(...data.map(o => Number(o.lat)))
  const bounds = [[minLatitude, minLongitude], [maxLatitude, maxLongitude]]

  const [dataset, setDataset] = useState(data.map(d => ({ id: uuidv4(), ...d })))
  const [filters, setFilters] = useState({
    date: {
      startDate: YEAR_START,
      endDate: YEAR_END
    },
    intensity: [0, maxIntensity],
    location: "both"
  })

  // useEffect(() => (resetFilters()), [])

  function resetFilters() {
    setDataset(data.map(d => ({ id: uuidv4(), ...d })))
    setFilters({
      date: {
        startDate: YEAR_START,
        endDate: YEAR_END
      },
      intensity: [0, maxIntensity],
      location: "both"
    })
  }

  function locationFilterMapper(currentData) {
    if (filters.location === "land") {
      return currentData.filter(d => d.county !== "")
    } else if (filters.location === "sea") {
      return currentData.filter(d => d.county === "")
    }
    return currentData
  }

  function showSeaQuakes() {
    setFilters(prevState => ({ ...prevState, location: "sea" }))
    setDataset(data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]) && (d.county === "")))
  }

  function showLandQuakes() {
    setFilters(prevState => ({ ...prevState, location: "land" }))
    setDataset(data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]) && (d.county !== "")))
  }

  function resetLocation() {
    setFilters(prevState => ({ ...prevState, location: "both" }))
    setDataset(data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1])))
  }

  function handleStartDateChange(newDate) {
    setFilters(prevState => ({ ...prevState, date: {startDate: newDate, endDate: prevState.date.endDate }}))
    const filteredData = data.filter(d => (d.date >= newDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]))
    setDataset(locationFilterMapper(filteredData))
  }

  function handleEndDateChange(newDate) {
    setFilters(prevState => ({ ...prevState, date: {startDate: prevState.date.startDate, endDate: newDate }}))
    const filteredData = data.filter(d => (d.date >= filters.date.startDate && d.date <= newDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]))
    setDataset(locationFilterMapper(filteredData))
  }

  function resetDates() {
    setFilters(prevState => ({
      date: {
        startDate: YEAR_START,
        endDate: YEAR_END
      },
      ...prevState
    }))
    const filteredData = data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]))
    setDataset(locationFilterMapper(filteredData))
  }

  function handleSetIntensity(valueArray) {
    setFilters(prevState => ({ ...prevState, intensity: valueArray }))
    const filteredData = data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= valueArray[0] && d.ml <= valueArray[1]))
    setDataset(locationFilterMapper(filteredData))
  }

  function resetIntensitySlider() {
    setFilters(prevState => ({ ...prevState, intensity: [0, maxIntensity] }))
    const filteredData = data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate))
    setDataset(locationFilterMapper(filteredData))
  }

  return (
    <Container fluid className="main-container">
      <Row className="title-section p-4">
        <h1 className="text-center color-main pb-4">Earthquakes in the UK 2022</h1>
        <hr />
      </Row>
      <Row className="filter-section ps-4 pe-4 pb-4" xs={1} xl={3}>
        <FilterSection
          showSeaQuakes={showSeaQuakes}
          showLandQuakes={showLandQuakes}
          resetLocation={resetLocation}
          startDate={filters.date.startDate}
          setStartDate={handleStartDateChange}
          endDate={filters.date.endDate}
          setEndDate={handleEndDateChange}
          resetDates={resetDates}
          intensity={filters.intensity}
          handleSetIntensity={handleSetIntensity}
          resetIntensitySlider={resetIntensitySlider} />
      </Row>
      <Row>          
        <h5 className="text-center color-main mt-4">{`Showing ${dataset.length} of ${data.length} total earthquakes`}</h5>
        <div className="text-center mb-4">        
          <Button variant="outline-secondary" disabled={dataset.length < data.length ? false : true} onClick={resetFilters}>Show all</Button>
        </div>
        <hr />
      </Row>  
      <Row className="mb-4">
        <Col xs={6}>
          <MapContainer center={MAP_CENTER} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataset.map(point => (
              <Marker
                position={[point.lat, point.long]}
                eventHandlers={{
                mouseover: () => {
                  return;
                },
                }}
                key={point.id}>
                <Tooltip>
                  <h5 className="color-main text-center">Magnitude: <span className="font-weight-bold">{point.ml}</span></h5>
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
        <p className="text-center">
          Data from <a href="https://earthquakes.bgs.ac.uk/earthquakes/home.html" target="_blank">BGS</a> - by{' '}
          <a href="https://github.com/d33con" target="_blank">Oliver Bullen</a>
        </p>
      </Row>
    </Container>
  );
}

