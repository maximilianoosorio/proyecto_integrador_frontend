"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { FaCamera, FaCheckCircle, FaDog, FaCat } from "react-icons/fa";
import dynamic from "next/dynamic";
import { usePets, Mascota } from "@/contexts/PetsContext";

const DynamicSelector = dynamic(() => import("@/features/mapa/DynamicSelector"), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse">Cargando mapa...</div>,
});

export default function ReportarPage() {
  const router = useRouter();
  const { addPet } = usePets();

  const [tipo, setTipo] = useState<"Perro" | "Gato">("Perro");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState<[number, number] | null>(null);
  const [guardando, setGuardando] = useState(false); // Estado para bloquear botón

  const handleSubmit = async (e: React.FormEvent) => { // OJO: Ahora es async
    e.preventDefault();
    
    if (!ubicacion) return alert("⚠️ Por favor marca la ubicación en el mapa.");

    setGuardando(true); // Bloqueamos el botón para que no le den doble clic

    const nuevaMascota: Mascota = {
      id: Date.now().toString(),
      nombre: nombre || "Sin nombre",
      tipo: tipo,
      estado: "perdido",
      ubicacionTexto: "Medellín (Reportado)",
      coordenadas: ubicacion,
      fecha: new Date().toLocaleDateString(), // Fecha real de hoy
      descripcion: `Mascota reportada como perdida. Ayuda a encontrarla.`,
      imagen: tipo === "Perro" ? "🐶" : "🐱",
    };

    // 1. ESPERAMOS a que el contexto termine de hablar con la API
    await addPet(nuevaMascota);
    
    // 2. SOLO AHORA redireccionamos
    alert("¡Alerta publicada con éxito! ✅");
    router.push("/alertas"); 
    setGuardando(false);
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <h1 className="text-3xl font-bold text-[#4a3426] text-center py-6">Reportar Mascota 📢</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Tipo */}
        <div className="flex gap-4">
          <button type="button" onClick={() => setTipo("Perro")} className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center ${tipo === 'Perro' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
            <FaDog className="text-2xl" /> Perro
          </button>
          <button type="button" onClick={() => setTipo("Gato")} className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center ${tipo === 'Gato' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
            <FaCat className="text-2xl" /> Gato
          </button>
        </div>

        {/* Nombre */}
        <div>
            <label className="font-bold text-gray-700">Nombre</label>
            <input 
              type="text" 
              placeholder="Ej: Max" 
              className="w-full p-3 border rounded-xl mt-1"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
        </div>

        {/* Mapa */}
        <div>
           <label className="font-bold text-gray-700">Ubicación (Clic en el mapa)</label>
           <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 mt-2">
             <DynamicSelector onLocationSelect={setUbicacion} />
           </div>
           {ubicacion && <p className="text-green-600 text-sm mt-1 font-bold flex items-center gap-1"><FaCheckCircle/> Ubicación guardada</p>}
        </div>

        <button 
          type="submit" 
          disabled={guardando}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-md transition ${guardando ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {guardando ? "Guardando..." : "Publicar Alerta"}
        </button>
      </form>
    </div>
  );
}