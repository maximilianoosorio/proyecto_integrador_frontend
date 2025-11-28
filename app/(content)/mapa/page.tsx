"use client";

import { usePets } from "@/contexts/PetsContext";
import dynamic from "next/dynamic";
import { useState } from "react";

const MapaDinamico = dynamic(() => import("@/features/mapa/Mapa"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
      Cargando mapa en tiempo real...
    </div>
  ),
});

// Actualizamos los tipos de categoría
type Categoria = "todos" | "perdidos" | "refugios";

// --- DATOS FIJOS DE REFUGIOS EN MEDELLÍN ---
const REFUGIOS_MEDELLIN = [
  {
    id: "refugio-1",
    nombre: "Centro de Bienestar La Perla",
    tipo: "Refugio",
    estado: "refugio",
    ubicacionTexto: "Corregimiento Altavista",
    coordenadas: [6.2796, -75.6320], // Ubicación aproximada La Perla
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
    coordenadas: [6.2467, -75.5925], // Ubicación aproximada
    fecha: "Lunes a Sábado",
    descripcion: "Fundación dedicada al rescate y protección.",
    imagen: "🏠"
  }
];

export default function MapaPage() {
  const { pets } = usePets();
  const [filtro, setFiltro] = useState<Categoria>("todos");

  // 1. PROCESAR ALERTAS DE LA API (Mascotas perdidas)
  const marcadoresMascotas = pets.map((mascota) => {
    let lat = 6.2476;
    let lng = -75.5658;
    const c = mascota.coordenadas;

    if (Array.isArray(c) && c.length >= 2) {
      lat = Number(c[0]);
      lng = Number(c[1]);
    } else if (typeof c === "string") {
      try {
        const parsed = JSON.parse(c);
        if (Array.isArray(parsed)) {
          lat = Number(parsed[0]);
          lng = Number(parsed[1]);
        }
      } catch (e) {
        console.log("Error coord:", c);
      }
    }

    return {
      id: mascota.id || Math.random().toString(),
      position: [lat, lng] as [number, number],
      title: mascota.nombre,
      categoria: 'perdidos' // Las de la API son mascotas perdidas
    };
  });

  // 2. PROCESAR REFUGIOS (Datos Fijos)
  const marcadoresRefugios = REFUGIOS_MEDELLIN.map((refugio) => ({
    id: refugio.id,
    position: [refugio.coordenadas[0], refugio.coordenadas[1]] as [number, number],
    title: refugio.nombre,
    categoria: 'refugios' // Categoría nueva
  }));

  // 3. UNIR TODO (Mascotas API + Refugios Fijos)
  const todosLosMarcadores = [...marcadoresMascotas, ...marcadoresRefugios];

  // 4. FILTRAR
  const marcadoresVisibles = todosLosMarcadores.filter((m) => {
    if (filtro === "todos") return true;
    return m.categoria === filtro;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] p-4 gap-4">
      {/* Encabezado */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">VeciPets Medellín 🗺️</h1>
          <p className="text-sm text-gray-500">
            Mostrando {marcadoresVisibles.length} puntos de interés
          </p>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setFiltro("todos")} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filtro === "todos" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Todo
          </button>
          
          <button 
            onClick={() => setFiltro("perdidos")} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filtro === "perdidos" ? "bg-orange-500 shadow text-white" : "text-gray-500 hover:text-orange-600"}`}
          >
            Mascotas 🐾
          </button>
          
          {/* BOTÓN NUEVO: REFUGIOS */}
          <button 
            onClick={() => setFiltro("refugios")} 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filtro === "refugios" ? "bg-blue-600 shadow text-white" : "text-gray-500 hover:text-blue-600"}`}
          >
            Refugios 🏠
          </button>
        </div>
      </div>

      {/* El Mapa */}
      <div className="grow w-full border border-gray-300 rounded-xl overflow-hidden shadow-md relative z-0">
        {/* Nota: En tu componente Mapa.tsx, todo lo que no sea 'perdidos' saldrá azul por defecto, 
            así que los refugios saldrán azules automáticamente sin tocar el otro archivo. */}
        <MapaDinamico markers={marcadoresVisibles} />
      </div>
    </div>
  );
}