import React from "react";
import Button from "react-bootstrap/Button";
import MagnitudeSlider from "./MagnitudeSlider";

export default function MagnitudeFilter({
  magnitude,
  handleSetMagnitude,
  resetMagnitudeSlider,
}) {
  return (
    <>
      <h4 className="text-center color-main mb-3">Filter by magnitude</h4>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <small className="font-weight-light me-1">Min</small>
        <MagnitudeSlider
          magnitude={magnitude}
          handleSetMagnitude={handleSetMagnitude}
        />
        <small className="font-weight-light">Max</small>
      </div>
      <div className="text-center">
        <Button onClick={resetMagnitudeSlider} data-testid="reset-magnitude">
          Reset
        </Button>
      </div>
    </>
  );
}
