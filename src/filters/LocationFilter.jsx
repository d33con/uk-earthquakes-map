import React, { Fragment } from "react";
import ToggleButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

export default function LocationFilter({
  locationFilter,
  handleLocationChange,
}) {
  const locationRadios = [
    {
      buttonText: "On-shore",
      value: "land",
    },
    {
      buttonText: "Off-shore",
      value: "sea",
    },
    {
      buttonText: "All",
      value: "both",
    },
  ];

  return (
    <Fragment>
      <h4 className="text-center color-main mb-3">Filter by location</h4>
      <div className="d-flex justify-content-center">
        <ToggleButtonGroup
          className="mb-2"
          onChange={(evt) => handleLocationChange(evt)}
        >
          {locationRadios.map((location) => (
            <ToggleButton
              key={location.value}
              id={location.value}
              type="radio"
              variant="primary"
              name="locationFilter"
              value={location.value}
              checked={locationFilter === location.value}
            >
              {location.buttonText}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </Fragment>
  );
}
