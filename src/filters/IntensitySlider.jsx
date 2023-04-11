import ReactSlider from 'react-slider'
import '../slider-styles.css';

export default function IntensitySlider(props) {
  return (
    <ReactSlider
      className="intensity-slider"
      thumbClassName="intensity-slider-thumb"
      trackClassName="intensity-slider-track"
      markClassName="intensity-slider-marks"
      defaultValue={[0, 6]}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={state => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
      step={1}
      minDistance={1}
      min={0}
      max={6}
      marks
      onAfterChange={(value) => props.handleSetIntensity(value)}
      value={props.intensity}
    />
  );
}
