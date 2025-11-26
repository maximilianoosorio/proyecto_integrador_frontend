"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Importación dinámica
const MapaDinamico = dynamic(() => import("@/features/mapa/Mapa"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
      Cargando mapa de Medellín...
    </div>
  ),
});

type Categoria = "todos" | "perdidos" | "veterinarias";

export default function MapaPage() {
  const [filtro, setFiltro] = useState<Categoria>("todos");

  // DATOS REALES DE MEDELLÍN Y ÁREA METROPOLITANA
  const todosLosMarcadores = [
    // Mascotas Perdidas (Naranja)
    { 
      id: "1", 
      position: [6.2086, -75.5677] as [number, number], // El Poblado / Parque Lleras
      title: "🐶 Tommy - Perdido en El Poblado", 
      categoria: "perdidos" 
    },
    { 
      id: "2", 
      position: [6.3373, -75.5575] as [number, number], // Bello / Niquía
      title: "🐱 Minina - Vista en Bello", 
      categoria: "perdidos" 
    },
    
    // Veterinarias y Refugios (Azul)
    { 
      id: "3", 
      position: [6.2425, -75.5894] as [number, number], // Laureles
      title: "🏥 Vet. Laureles 24h", 
      categoria: "veterinarias" 
    },
    { 
      id: "4", 
      position: [6.1759, -75.5917] as [number, number], // Envigado Centro
      title: "🚑 Refugio Envigado", 
      categoria: "veterinarias" 
    },
  ];

  // Filtramos los datos
  const marcadoresVisibles = todosLosMarcadores.filter((m) => {
    if (filtro === "todos") return true;
    return m.categoria === filtro;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] p-4 gap-4">
      {/* Encabezado y Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">VeciPets Medellín 🗺️</h1>
          <p className="text-sm text-gray-500">Explora alertas en el Valle de Aburrá</p>
        </div>

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
            onClick={() => setFiltro("veterinarias")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              filtro === "veterinarias" ? "bg-blue-600 shadow text-white" : "text-gray-500 hover:text-blue-600"
            }`}
          >
            Veterinarias 🏥
          </button>
        </div>
      </div>

      {/* El Mapa */}
      <div className="grow w-full border border-gray-300 rounded-xl overflow-hidden shadow-md relative z-0">
        <MapaDinamico markers={marcadoresVisibles} />
      </div>
    </div>
  );
}