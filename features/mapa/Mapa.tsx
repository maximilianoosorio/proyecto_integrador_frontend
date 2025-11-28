"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"; // 1. Importamos Link

// Iconos personalizados
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

// Componente AutoZoom
function AutoZoom() {
  const map = useMap();
  const params = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  useEffect(() => {
    if (lat && lng && map) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      
      if (!isNaN(latNum) && !isNaN(lngNum)) {
        map.flyTo([latNum, lngNum], 16, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }, [lat, lng, map]);

  return null;
}

interface MapProps {
  markers?: { 
    id: string; 
    position: [number, number]; 
    title: string;
    categoria?: string; 
  }[];
}

const Mapa = ({ markers = [] }: MapProps) => {
  const centroMedellin: [number, number] = [6.2476, -75.5658];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />;

  return (
    <MapContainer 
      key="mapa-principal" 
      center={centroMedellin} 
      zoom={12} 
      style={{ height: "100%", width: "100%" }}
    >
      <AutoZoom />

      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markers.map((marker) => {
        let colorIcono = 'blue'; 
        if (marker.categoria === 'perdidos') colorIcono = 'orange';

        return (
          <Marker 
            key={marker.id} 
            position={marker.position}
            icon={getIcon(colorIcono)}
          >
            <Popup>
              {/* --- 2. CONTENIDO DEL POPUP MEJORADO --- */}
              <div className="flex flex-col gap-2 text-center min-w-[150px]">
                <strong className={`text-base ${colorIcono === 'orange' ? 'text-orange-600' : 'text-blue-600'}`}>
                  {marker.title}
                </strong>
                
                {/* Si es una mascota perdida, mostramos el botón */}
                {marker.categoria === 'perdidos' ? (
                  <Link 
                    href="/alertas"
                    className="mt-1 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-orange-600 transition no-underline shadow-sm"
                  >
                    Ver Alerta 🔔
                  </Link>
                ) : (
                  // Si es refugio, solo mostramos un texto pequeño
                  <span className="text-xs text-gray-500 font-medium">
                    Refugio / Veterinaria 🏥
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  );
};

export default Mapa;