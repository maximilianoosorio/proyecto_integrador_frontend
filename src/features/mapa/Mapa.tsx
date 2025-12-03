"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"; 

/**
 * Genera un ícono de marcador personalizado, permitiendo diferenciar visualmente
 * categorías como mascotas perdidas (naranja) o refugios (azul).
 *
 * Esta función mejora la UX al dar retroalimentación visual inmediata.
 */
const getIcon = (color: string) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

/**
 * Componente encargado de mover automáticamente la cámara del mapa
 * cuando se reciben parámetros (lat, lng) desde la URL.
 *
 * Ejemplo: /mapa?lat=6.25&lng=-75.56
 *
 * Este patrón permite un enrutamiento avanzado basado en ubicación,
 * útil para compartir enlaces o enfocarse en una alerta específica.
 */
function AutoZoom() {
  const map = useMap();
  const params = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  useEffect(() => {
    if (lat && lng && map) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      // Validamos que sean números válidos
      if (!isNaN(latNum) && !isNaN(lngNum)) {
        map.flyTo([latNum, lngNum], 16, {
          animate: true,
          duration: 1.5,
        });
      }
    }
  }, [lat, lng, map]);

  return null;
}

/**
 * Tipado del componente principal del mapa.
 * Cada marcador tiene:
 * - id: identificador único
 * - position: latitud y longitud
 * - title: texto que muestra el popup
 * - categoria: determina su color y comportamiento
 */
interface MapProps {
  markers?: {
    id: string;
    position: [number, number];
    title: string;
    categoria?: string;
  }[];
}

/**
 * Componente principal del mapa.
 * Renderiza:
 * - El mapa base (OpenStreetMap)
 * - Marcadores dinámicos
 * - Popups condicionales según categoría
 * - Auto-zoom basado en parámetros de la URL
 *
 * Se usa `useState` para evitar problemas de renderización durante SSR.
 */
const Mapa = ({ markers = [] }: MapProps) => {
  const centroMedellin: [number, number] = [6.2476, -75.5658];

  const [isMounted, setIsMounted] = useState(false);

  /**
   * Esto evita errores al renderizar Leaflet con Next.js.
   * Leaflet depende de objetos del DOM (window, document),
   * los cuales no existen durante el renderizado en servidor.
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mientras el componente se monta, mostramos un placeholder
  if (!isMounted)
    return <div className="h-full w-full bg-gray-100 animate-pulse rounded-xl" />;

  return (
    <MapContainer
      key="mapa-principal"
      center={centroMedellin}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Cámara automática basada en parámetros */}
      <AutoZoom />

      {/* Capa base del mapa */}
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render dinámico de marcadores */}
      {markers.map((marker) => {
        // Color por categoría
        let colorIcono = "blue";
        if (marker.categoria === "perdidos") colorIcono = "orange";

        return (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={getIcon(colorIcono)}
          >
            <Popup>
              {/* Contenido del popup con diseño profesional */}
              <div className="flex flex-col gap-2 text-center min-w-[150px]">
                <strong
                  className={`text-base ${
                    colorIcono === "orange"
                      ? "text-orange-600"
                      : "text-blue-600"
                  }`}
                >
                  {marker.title}
                </strong>

                {/* Popup condicional según categoría */}
                {marker.categoria === "perdidos" ? (
                <Link
                href={`/alertas/${marker.id}`}
                className="mt-1 bg-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-orange-600 transition no-underline shadow-sm"
              >
                Ver Alerta 🔔
                </Link>

                ) : (
                  <span className="text-xs text-gray-500 font-medium">
                    Refugio / Veterinaria 🏥
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Mapa;
