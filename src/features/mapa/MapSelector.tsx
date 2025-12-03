"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// =========================================================
// 1. INTERFAZ: Definimos qué recibe este componente del padre
// =========================================================
interface MapSelectorProps {
  // Función para avisar al padre (page.tsx) que hubo un clic
  onLocationSelect: (coords: [number, number]) => void;
  // La ubicación actual que tiene el padre
  selectedLocation: [number, number] | null;
}

// =========================================================
// 2. UTILIDAD: Arreglar iconos rotos de Leaflet en Next.js
// =========================================================
const fixIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
};

// =========================================================
// 3. COMPONENTE INTERNO: Manejador de Clics
// =========================================================
function ClickHandler({ onLocationSelect }: { onLocationSelect: (coords: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      // Al hacer clic, extraemos lat/lng y se lo mandamos al padre
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      onLocationSelect(coords); 
    },
  });
  return null;
}

// =========================================================
// 4. COMPONENTE PRINCIPAL
// =========================================================
export default function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  
  // Arreglamos los iconos al montar el componente
  useEffect(() => { fixIcons(); }, []);

  // Coordenada inicial (por defecto Cali), o la que el padre nos diga
  const centerPosition: [number, number] = selectedLocation || [3.4516, -76.5320];

  return (
    <MapContainer
      center={centerPosition}
      zoom={13}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Componente invisible que detecta los clics */}
      <ClickHandler onLocationSelect={onLocationSelect} />

      {/* Si el padre tiene una ubicación (selectedLocation), mostramos el marcador */}
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}