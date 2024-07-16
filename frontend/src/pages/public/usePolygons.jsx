import { useEffect, useState } from "react";
import L from "leaflet";

function usePolygons(mapRef) {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("https://website.fahri.life/api/polygons")
      .then((response) => response.json())
      .then((data) => {
        // Pastikan data koordinat diparsing sebagai JSON
        const formattedData = data.map((polygon) => ({
          ...polygon,
          coordinates: JSON.parse(polygon.coordinates),
        }));
        setPolygons(formattedData);
      })
      .catch((error) => console.error("Error fetching polygons:", error));
  }, []);

  useEffect(() => {
    // Add polygons to the map
    polygons.forEach((polygon) => {
      try {
        const coordinates = polygon.coordinates;
        if (Array.isArray(coordinates) && coordinates.length > 0) {
          const layer = L.polygon(coordinates).addTo(mapRef.current);
          layer.bindPopup(polygon.name);
        } else {
          console.error("Invalid coordinates:", coordinates);
        }
      } catch (error) {
        console.error("Error parsing coordinates:", error);
      }
    });
  }, [polygons, mapRef]);

  return polygons;
}

export default usePolygons;
