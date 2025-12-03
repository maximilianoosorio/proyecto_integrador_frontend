"use client";

import { useState } from "react";

/**
 * Hook encargado de manejar el estado de ubicación seleccionada en el mapa.
 *
 * Beneficios:
 * - Centraliza la lógica de coordenadas en un solo lugar.
 * - Facilita compartir la ubicación entre distintos componentes.
 * - Evita duplicar estados dentro de los componentes del mapa.
 * - Mejora la separación de responsabilidades (UI vs. Lógica).
 */
export function useMapLocation() {
  // Estado que almacena la ubicación seleccionada. Null si no hay selección aún.
  const [location, setLocation] = useState<[number, number] | null>(null);

  /**
   * Actualiza la ubicación seleccionada.
   * Se invoca cuando el usuario hace clic en el mapa.
   *
   * @param coords - Coordenadas [lat, lng] recibidas desde el mapa
   */
  const updateLocation = (coords: [number, number]) => {
    setLocation(coords);
  };

  return {
    location,       // Ubicación actual almacenada  
    updateLocation, // Función para cambiarla  
  };
}
