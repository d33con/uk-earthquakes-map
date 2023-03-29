import { useMapEvents } from "react-leaflet";

export default function MapMove({ handleMapMove }) {
  const map = useMapEvents({
    moveend: () => {
      const maxLatitude = parseFloat(map.getBounds().getNorth().toFixed(3))
      const minLatitude = parseFloat(map.getBounds().getSouth().toFixed(3))
      const maxLongitude = parseFloat(map.getBounds().getEast().toFixed(3))
      const minLongitude = parseFloat(map.getBounds().getWest().toFixed(3))

      handleMapMove({
        maxLatitude,
        minLatitude,
        maxLongitude,
        minLongitude
      })
    }
  })
  return null
}