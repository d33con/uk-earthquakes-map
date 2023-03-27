import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './data'
import Title from './Title'
import Footer from "./Footer";
import ResetAllFilters from "./ResetAllFilters";
import DisplayTable from './DisplayTable'
import FilterSection from './FilterSection'
import EarthquakeMap from "./EarthquakeMap";
import "./App.css";

export default function App() {
  const YEAR_START = "2022-01-01"
  const YEAR_END = "2022-12-31"
  const MAP_CENTER = [55.50, -2.32]
  const maxIntensity = Math.ceil(Math.max(...data.map(o => Number(o.ml))))

  const [dataset, setDataset] = useState(data)
  const [filters, setFilters] = useState({
    date: {
      startDate: YEAR_START,
      endDate: YEAR_END
    },
    intensity: [0, maxIntensity],
    location: "both"
  })

  // Filter table as map is zoomed in?

  useEffect(() => (filterDataset()), [filters])

  function resetFilters() {
    setDataset(data)
    setFilters({
      date: {
        startDate: YEAR_START,
        endDate: YEAR_END
      },
      intensity: [0, maxIntensity],
      location: "both"
    })
  }

  function filterDataset() {
    const filteredDataset = data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]))
    if (filters.location === "land") {
      return setDataset(filteredDataset.filter(d => d.county !== ""))
    } else if (filters.location === "sea") {
      return setDataset(filteredDataset.filter(d => d.county === ""))
    }
    return setDataset(filteredDataset)
  }

  function handleStartDateChange(newDate) {
    setFilters(prevState => ({ ...prevState, date: { startDate: newDate, endDate: prevState.date.endDate }}))
  }

  function handleEndDateChange(newDate) {
    setFilters(prevState => ({ ...prevState, date: { startDate: prevState.date.startDate, endDate: newDate }}))
  }

  function resetDates() {
    setFilters(prevState => ({ ...prevState, date: { startDate: YEAR_START, endDate: YEAR_END }}))
  }
  
  function handleLocationChange(evt) {
    setFilters(prevState => ({ ...prevState, location: evt.target.value }))
  }

  function handleSetIntensity(valueArray) {
    setFilters(prevState => ({ ...prevState, intensity: valueArray }))
  }

  function resetIntensitySlider() {
    setFilters(prevState => ({ ...prevState, intensity: [0, maxIntensity] }))
  }

  return (
    <Container fluid className="main-container">
      <Title />
      <FilterSection
        startDate={filters.date.startDate}
        setStartDate={handleStartDateChange}
        endDate={filters.date.endDate}
        setEndDate={handleEndDateChange}
        resetDates={resetDates}
        locationFilter={filters.location}
        handleLocationChange={handleLocationChange}
        intensity={filters.intensity}
        handleSetIntensity={handleSetIntensity}
        resetIntensitySlider={resetIntensitySlider}
      />
      <ResetAllFilters
        resetFilters={resetFilters}
        totalFiltered={dataset.length}
        totalEarthquakes={data.length}
      />  
      <Row className="mb-4">
        <Col xs={6}>
          <EarthquakeMap mapCenter={MAP_CENTER} dataset={dataset} />
        </Col>
        <Col xs={6}>        
          <DisplayTable dataset={dataset} />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

