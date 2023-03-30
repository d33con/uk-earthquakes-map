import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { format } from "date-fns";
import MapMove from './MapMove'

export default function EarthquakeMap({ mapCenter, dataset, handleMapMove, setMap, mapDefaultZoom }) {
  return (
    <MapContainer center={mapCenter} zoom={mapDefaultZoom} scrollWheelZoom={false} ref={setMap}>
      <MapMove handleMapMove={handleMapMove} />
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
  )
}