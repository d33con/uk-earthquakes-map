import { Fragment } from "react";
import Button from 'react-bootstrap/Button'
import IntensitySlider from './IntensitySlider'

export default function IntensityFilter({ intensity, handleSetIntensity, resetIntensitySlider }) {
  return (
    <Fragment>    
      <h4 className="text-center color-main mb-3">Filter by intensity</h4>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <small className="font-weight-light me-1">Min</small>        
        <IntensitySlider
          intensity={intensity}
          handleSetIntensity={handleSetIntensity} />
        <small className="font-weight-light">Max</small>
      </div>
      <div className="text-center">
        <Button onClick={resetIntensitySlider}>Reset</Button>
      </div>
    </Fragment>
  )
}