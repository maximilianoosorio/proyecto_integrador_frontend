"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Corrección de iconos (igual que antes)
const fixIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

// Este sub-componente maneja los eventos del clic
function LocationMarker({ setLocation }: { setLocation: (latlng: [number, number]) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(newPos);
      setLocation(newPos); // Enviamos la coordenada al formulario padre
    },
  });

  return position ? <Marker position={position} /> : null;
}

interface SelectorProps {
  onLocationSelect: (coords: [number, number]) => void;
}

const MapSelector = ({ onLocationSelect }: SelectorProps) => {
  useEffect(() => { fixIcons(); }, []);

  return (
    <MapContainer
      center={[3.4516, -76.5320]} // Cali
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <LocationMarker setLocation={onLocationSelect} />
    </MapContainer>
  );
};

export default MapSelector;