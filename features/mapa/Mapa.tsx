"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// --- 1. Iconos personalizados por color ---
const getIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

// --- 2. Definición de Tipos ---
interface MapProps {
  markers?: { 
    id: string; 
    position: [number, number]; 
    title: string;
    categoria?: string; 
  }[];
}

const Mapa = ({ markers = [] }: MapProps) => {
  // CAMBIO: Coordenadas del Centro de Medellín (La Alpujarra aprox)
  const centroMedellin: [number, number] = [6.2476, -75.5658];

  return (
    <MapContainer 
      center={centroMedellin} 
      zoom={12} // Zoom ajustado para ver desde Bello hasta Envigado
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markers.map((marker) => {
        // Lógica de color: Naranja si es perdido, Azul si es veterinaria
        let colorIcono = 'blue'; 
        if (marker.categoria === 'perdidos') colorIcono = 'orange';

        return (
          <Marker 
            key={marker.id} 
            position={marker.position}
            icon={getIcon(colorIcono)}
          >
            <Popup>
              <strong className={colorIcono === 'orange' ? 'text-orange-600' : 'text-blue-600'}>
                {marker.title}
              </strong>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default Mapa;