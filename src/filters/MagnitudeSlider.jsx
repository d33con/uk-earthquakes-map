import React from "react";
import ReactSlider from "react-slider";
import "../styles/slider-styles.css";

export default function MagnitudeSlider({ magnitude, handleSetMagnitude }) {
  return (
    <ReactSlider
      className="magnitude-slider"
      thumbClassName="magnitude-slider-thumb"
      trackClassName="magnitude-slider-track"
      markClassName="magnitude-slider-marks"
      defaultValue={[0, 6]}
      ariaLabel={["Minimum magnitude", "Maximum magnitude"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
      step={1}
      minDistance={1}
      min={0}
      max={6}
      marks
      onAfterChange={(value) => handleSetMagnitude(value)}
      value={magnitude}
    />
  );
}
