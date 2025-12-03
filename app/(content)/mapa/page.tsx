"use client"; 
/**
 * Declaramos este componente como Client Component porque:
 * - Usa hooks de React (useState, useContext).
 * - Renderiza un mapa interactivo (Leaflet) que requiere acceso al DOM.
 */

import { usePets } from "@/contexts/PetsContext";
import dynamic from "next/dynamic";
import { useState } from "react";

/**
 * Carga dinámica del componente del mapa.
 * Se deshabilita el SSR porque Leaflet depende del objeto `window`
 * y solo puede ejecutarse del lado del cliente.
 * Además, mostramos un placeholder mientras se carga.
 */
const MapaDinamico = dynamic(() => import("@/features/mapa/Mapa"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
      Cargando mapa en tiempo real...
    </div>
  ),
});

/**
 * Tipos de categoría que el usuario puede seleccionar para filtrar el mapa.
 * Esto permite validar y restringir los valores posibles del estado de filtro.
 */
type Categoria = "todos" | "perdidos" | "refugios";

/**
 * Datos estáticos de refugios en Medellín.
 * Estos NO dependen de la API y se cargan directamente en el cliente.
 * Se usan como marcadores adicionales en el mapa.
 */
const REFUGIOS_MEDELLIN = [
  {
    id: "refugio-1",
    nombre: "Centro de Bienestar La Perla",
    tipo: "Refugio",
    estado: "refugio",
    ubicacionTexto: "Corregimiento Altavista",
    coordenadas: [6.2796, -75.6320],
    fecha: "Siempre abierto",
    descripcion: "Centro de bienestar animal público de Medellín.",
    imagen: "🏠"
  },
  {
    id: "refugio-2",
    nombre: "Fundación Orca",
    tipo: "Refugio",
    estado: "refugio",
    ubicacionTexto: "Sector Laureles/Estadio",
    coordenadas: [6.2467, -75.5925],
    fecha: "Lunes a Sábado",
    descripcion: "Fundación dedicada al rescate y protección.",
    imagen: "🏠"
  }
];

export default function MapaPage() {
  /**
   * Hook personalizado del contexto global de mascotas.
   * Proporciona las alertas de mascotas perdidas que vienen desde la API.
   */
  const { pets } = usePets();

  /**
   * Estado de filtrado del mapa.
   * Controla qué tipo de marcadores se deben renderizar:
   * - todos
   * - mascotas perdidas
   * - refugios
   */
  const [filtro, setFiltro] = useState<Categoria>("todos");

  // ----------------------------------------------------------
  // 1. PROCESAMIENTO DE MASCOTAS (DATOS DE LA API)
  // ----------------------------------------------------------

  /**
   * Convertimos las alertas de mascotas en marcadores listos para Leaflet.
   */
  const marcadoresMascotas = pets.map((mascota) => {
    let lat = 6.2476;
    let lng = -75.5658;

    /**
     * Algunas mascotas vienen con coordenadas como:
     * - array [lat, lng]
     * - string JSON ("[6.24, -75.56]")
     */
    const c = mascota.coordenadas;

    if (Array.isArray(c) && c.length >= 2) {
      lat = Number(c[0]);
      lng = Number(c[1]);
    } else if (typeof c === "string") {
      // Intentamos parsear el string como JSON
      try {
        const parsed = JSON.parse(c);
        if (Array.isArray(parsed)) {
          lat = Number(parsed[0]);
          lng = Number(parsed[1]);
        }
      } catch (e) {
        console.log("Error al leer coordenadas:", c);
      }
    }

    return {
      id: mascota.id || Math.random().toString(),
      position: [lat, lng] as [number, number],
      title: mascota.nombre,
      categoria: "perdidos"
    };
  });

  // ----------------------------------------------------------
  // 2. PROCESAMIENTO DE REFUGIOS (DATOS FIJOS)
  // ----------------------------------------------------------

  /**
   * Adaptamos los refugios para integrarlos como marcadores en el mapa.
   */
  const marcadoresRefugios = REFUGIOS_MEDELLIN.map((refugio) => ({
    id: refugio.id,
    position: [refugio.coordenadas[0], refugio.coordenadas[1]] as [number, number],
    title: refugio.nombre,
    categoria: "refugios",
  }));

  // ----------------------------------------------------------
  // 3. UNIFICACIÓN DE DATOS (API + LOCAL)
  // ----------------------------------------------------------

  /**
   * Unimos los marcadores dinámicos (mascotas) con los estáticos (refugios).
   */
  const todosLosMarcadores = [...marcadoresMascotas, ...marcadoresRefugios];

  // ----------------------------------------------------------
  // 4. FILTRO FINAL (CONTROLADO POR EL USUARIO)
  // ----------------------------------------------------------

  /**
   * Solo mostramos los marcadores de la categoría seleccionada.
   * Si el filtro es "todos", no se aplica ningún filtro.
   */
  const marcadoresVisibles = todosLosMarcadores.filter((m) => {
    if (filtro === "todos") return true;
    return m.categoria === filtro;
  });

  // ----------------------------------------------------------
  // 5. RENDERIZADO DEL COMPONENTE
  // ----------------------------------------------------------

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] p-4 gap-4">
      
      {/* Encabezado con título y selector de filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Información general */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">VeciPets Medellín 🗺️</h1>
          <p className="text-sm text-gray-500">
            Mostrando {marcadoresVisibles.length} puntos de interés
          </p>
        </div>

        {/* Controles de filtrado */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">

          <button 
            onClick={() => setFiltro("todos")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filtro === "todos" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Todo
          </button>

          <button 
            onClick={() => setFiltro("perdidos")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filtro === "perdidos" ? "bg-orange-500 shadow text-white" : "text-gray-500 hover:text-orange-600"
            }`}
          >
            Mascotas 🐾
          </button>

          <button 
            onClick={() => setFiltro("refugios")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filtro === "refugios" ? "bg-blue-600 shadow text-white" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Refugios 🏠
          </button>

        </div>
      </div>

      {/* Contenedor principal del mapa */}
      <div className="grow w-full border border-gray-300 rounded-xl overflow-hidden shadow-md relative z-0">
        {/*
          MapaDinamico -> cliente
          markers -> lista filtrada de puntos
        */}
        <MapaDinamico markers={marcadoresVisibles} />
      </div>
    </div>
  );
}
