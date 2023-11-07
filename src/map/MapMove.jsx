import { useMapEvents } from "react-leaflet";

export default function MapMove({ handleMapMove }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      const maxLatitude = parseFloat(bounds.getNorth().toFixed(3));
      const minLatitude = parseFloat(bounds.getSouth().toFixed(3));
      const maxLongitude = parseFloat(bounds.getEast().toFixed(3));
      const minLongitude = parseFloat(bounds.getWest().toFixed(3));

      handleMapMove({
        maxLatitude,
        minLatitude,
        maxLongitude,
        minLongitude,
      });
    },
  });
  return null;
}
