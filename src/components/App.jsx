import { format } from "date-fns";
import L from "leaflet";
import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import initialData from "../data/earthquakeData";
import "../styles/App.css";
import DataSection from "./DataSection";
import FilterSection from "./FilterSection";
import Footer from "./Footer";
import Title from "./Title";

const YEAR_START = "2022-01-01";
const YEAR_END = "2022-12-31";
const MAP_CENTER = [56.047, -1.977];
const MAP_DEFAULT_ZOOM = 6;
const maxMagnitude = Math.ceil(
  Math.max(...initialData.map((o) => Number(o.ml)))
);
const minLongitude = Math.min(...initialData.map((o) => Number(o.long)));
const maxLongitude = Math.max(...initialData.map((o) => Number(o.long)));
const minLatitude = Math.min(...initialData.map((o) => Number(o.lat)));
const maxLatitude = Math.max(...initialData.map((o) => Number(o.lat)));

export default function App() {
  const [map, setMap] = useState(null);
  const [currentlySelectedQuake, setCurrentlySelectedQuake] = useState("");
  const [filters, setFilters] = useState({
    date: {
      startDate: YEAR_START,
      endDate: YEAR_END,
    },
    magnitude: [0, maxMagnitude],
    location: "both",
    mapBounds: {
      maxLatitude,
      minLatitude,
      maxLongitude,
      minLongitude,
    },
  });

  function resetFilters() {
    setFilters({
      date: {
        startDate: YEAR_START,
        endDate: YEAR_END,
      },
      magnitude: [0, maxMagnitude],
      location: "both",
      mapBounds: {
        maxLatitude,
        minLatitude,
        maxLongitude,
        minLongitude,
      },
    });
    setCurrentlySelectedQuake("");
    map.getPanes().tooltipPane.innerHTML = "";
    map.flyTo(MAP_CENTER, MAP_DEFAULT_ZOOM);
  }

  const dataset = useMemo(() => {
    const filteredDataset = initialData.filter(
      (d) =>
        d.date >= filters.date.startDate &&
        d.date <= filters.date.endDate &&
        d.ml >= filters.magnitude[0] &&
        d.ml <= filters.magnitude[1] &&
        parseFloat(d.lat) <= filters.mapBounds.maxLatitude &&
        parseFloat(d.lat) >= filters.mapBounds.minLatitude &&
        parseFloat(d.long) <= filters.mapBounds.maxLongitude &&
        parseFloat(d.long) >= filters.mapBounds.minLongitude
    );
    if (filters.location === "land") {
      return filteredDataset.filter((d) => d.county !== "");
    } else if (filters.location === "sea") {
      return filteredDataset.filter((d) => d.county === "");
    }
    return filteredDataset;
  }, [filters]);

  function handleStartDateChange(newDate) {
    const formattedDate = format(newDate, "yyyy-MM-dd");
    setFilters((prevState) => ({
      ...prevState,
      date: { startDate: formattedDate, endDate: prevState.date.endDate },
    }));
  }

  function handleEndDateChange(newDate) {
    const formattedDate = format(newDate, "yyyy-MM-dd");
    setFilters((prevState) => ({
      ...prevState,
      date: { startDate: prevState.date.startDate, endDate: formattedDate },
    }));
  }

  function resetDates() {
    setFilters((prevState) => ({
      ...prevState,
      date: { startDate: YEAR_START, endDate: YEAR_END },
    }));
  }

  function handleLocationChange(evt) {
    setFilters((prevState) => ({ ...prevState, location: evt.target.value }));
  }

  function handleSetMagnitude(valueArray) {
    setFilters((prevState) => ({ ...prevState, magnitude: valueArray }));
  }

  function resetMagnitudeSlider() {
    setFilters((prevState) => ({ ...prevState, magnitude: [0, maxMagnitude] }));
  }

  function handleMapMove(latLngObject) {
    setFilters((prevState) => ({ ...prevState, mapBounds: latLngObject }));
  }

  function updateCurrentlySelectedQuake(clickedId) {
    const clickedQuake = dataset.find((d) => d.id === clickedId);
    const latLng = [
      parseFloat(clickedQuake.lat),
      parseFloat(clickedQuake.long),
    ];
    setCurrentlySelectedQuake(clickedId);
    map.flyTo(latLng, 11);
    // clear any showing tooltips
    map.getPanes().tooltipPane.innerHTML = "";
    // add the tooltip for the selected earthquake
    L.tooltip(latLng, {
      content: `<h5 class="color-main text-center">Magnitude: <span class="font-weight-bold">${
        clickedQuake.ml
      }</span></h5>
      <hr />
      <div>Date: <span class="font-weight-bold">${format(
        new Date(clickedQuake.date),
        "dd/MM/yyyy"
      )}</span></div>
      <div>Time: <span class="font-weight-bold">${clickedQuake.time
        .split(":")
        .slice(0, 2)
        .join(":")}</span></div>
        <div>Depth: <span class="font-weight-bold">${
          clickedQuake.depth
        } km</span></div>
      <div>Location: <span class="font-weight-bold">${clickedQuake.locality}${
        clickedQuake.county && `, ${clickedQuake.county}`
      }</span></div>`,
      offset: [15, -30],
    }).addTo(map);
  }

  return (
    <Container fluid className="main-container">
      <Title />
      <FilterSection
        startDate={filters.date.startDate}
        setStartDate={handleStartDateChange}
        minDate={YEAR_START}
        endDate={filters.date.endDate}
        setEndDate={handleEndDateChange}
        maxDate={YEAR_END}
        resetDates={resetDates}
        locationFilter={filters.location}
        handleLocationChange={handleLocationChange}
        magnitude={filters.magnitude}
        handleSetMagnitude={handleSetMagnitude}
        resetMagnitudeSlider={resetMagnitudeSlider}
        resetFilters={resetFilters}
        totalFiltered={dataset.length}
        totalEarthquakes={initialData.length}
      />
      <DataSection
        mapCenter={MAP_CENTER}
        dataset={dataset}
        handleMapMove={handleMapMove}
        setMap={setMap}
        mapDefaultZoom={MAP_DEFAULT_ZOOM}
        updateCurrentlySelectedQuake={updateCurrentlySelectedQuake}
        currentlySelectedQuake={currentlySelectedQuake}
      />
      <Footer />
    </Container>
  );
}
