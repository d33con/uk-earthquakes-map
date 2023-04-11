import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import data from './data'
import Title from './Title'
import Footer from "./Footer";
import ResetAllFilters from "./filters/ResetAllFilters";
import DisplayTable from './DisplayTable'
import FilterSection from './FilterSection'
import EarthquakeMap from "./EarthquakeMap";
import "./App.css";
import L from 'leaflet'
import { format } from "date-fns";

export default function App() {
  const YEAR_START = "2022-01-01"
  const YEAR_END = "2022-12-31"
  const MAP_CENTER = [56.047, -1.977]
  const MAP_DEFAULT_ZOOM = 6
  const maxIntensity = Math.ceil(Math.max(...data.map(o => Number(o.ml))))
  const minLongitude = Math.min(...data.map(o => Number(o.long)))
  const maxLongitude = Math.max(...data.map(o => Number(o.long)))
  const minLatitude = Math.min(...data.map(o => Number(o.lat)))
  const maxLatitude = Math.max(...data.map(o => Number(o.lat)))
  
  const [map, setMap] = useState(null)
  const [currentlySelectedQuake, setCurrentlySelectedQuake] = useState("")
  const [dataset, setDataset] = useState(data)
  const [filters, setFilters] = useState({
    date: {
      startDate: YEAR_START,
      endDate: YEAR_END
    },
    intensity: [0, maxIntensity],
    location: "both",
    mapBounds: {
      maxLatitude,
      minLatitude,
      maxLongitude,
      minLongitude
    }
  })

  useEffect(() => (filterDataset()), [filters])

  function resetFilters() {
    setDataset(data)
    setFilters({
      date: {
        startDate: YEAR_START,
        endDate: YEAR_END
      },
      intensity: [0, maxIntensity],
      location: "both",
      mapBounds: {
        maxLatitude,
        minLatitude,
        maxLongitude,
        minLongitude
      }
    })
    setCurrentlySelectedQuake("")
    map.getPanes().tooltipPane.innerHTML = ''
    map.flyTo(MAP_CENTER, MAP_DEFAULT_ZOOM)
  }

  function filterDataset() {
    const filteredDataset = data.filter(d => (d.date >= filters.date.startDate && d.date <= filters.date.endDate) && (d.ml >= filters.intensity[0] && d.ml <= filters.intensity[1]) && (parseFloat(d.lat) < filters.mapBounds.maxLatitude && parseFloat(d.lat) > filters.mapBounds.minLatitude) && (parseFloat(d.long) < filters.mapBounds.maxLongitude && parseFloat(d.long) > filters.mapBounds.minLongitude))
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

  function handleMapMove(latLngObject) {
    setFilters(prevState => ({ ...prevState, mapBounds: latLngObject }))
  }

  function updateCurrentlySelectedQuake(clickedId) {
    const clickedQuake = dataset.find(d => d.id === clickedId)
    const latLng = [parseFloat(clickedQuake.lat), parseFloat(clickedQuake.long)]
    setCurrentlySelectedQuake(clickedId)
    map.flyTo(latLng, 11)
    // clear any showing tooltips
    map.getPanes().tooltipPane.innerHTML = ''
    // add the tooltip for the selected earthquake
    L.tooltip(latLng, { 
      content: `<h5 class="color-main text-center">Magnitude: <span class="font-weight-bold">${clickedQuake.ml}</span></h5>
      <hr />
      <div>Date: <span class="font-weight-bold">${format(new Date(clickedQuake.date), 'dd/MM/yyyy')}</span></div>
      <div>Time: <span class="font-weight-bold">${clickedQuake.time.split(":").slice(0,2).join(":")}</span></div>
      <div>Location: <span class="font-weight-bold">${clickedQuake.locality}${clickedQuake.county && `, ${clickedQuake.county}`}</span></div>
      <div>Depth: <span class="font-weight-bold">${clickedQuake.depth} km</span></div>`,
      offset: [15,-30]
    })
    .addTo(map);    
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
        <Col xs={12} xl={6} className="mb-4 mb-xl-0">
          <EarthquakeMap
            mapCenter={MAP_CENTER}
            dataset={dataset}
            handleMapMove={handleMapMove}
            setMap={setMap}
            mapDefaultZoom={MAP_DEFAULT_ZOOM}
          />
        </Col>
        <Col xs={12} xl={6}>        
          <DisplayTable
            dataset={dataset}
            setCurrentlySelectedQuake={updateCurrentlySelectedQuake}
            currentlySelectedQuake={currentlySelectedQuake}
          />
        </Col>
      </Row>
      <Footer />
    </Container>
  );
}

