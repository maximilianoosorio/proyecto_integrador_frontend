"use client"; // 1. Obligatorio porque usamos hooks (usePets)

import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";
// 2. Importamos los datos que vienen de la API
import { usePets } from "@/contexts/PetsContext";

export default function AlertasPage() {
  // 3. Obtenemos las mascotas reales y el estado de carga
  const { pets, isLoading } = usePets();

  // Filtrar para no mostrar veterinarias en la sección de alertas de perdidos
  // (Opcional: si quieres mostrar todo, quita el .filter)
  const alertasActivas = pets.filter(p => p.estado === 'perdido' || p.estado === 'encontrado');

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-10 flex justify-center">
        <div className="text-orange-600 font-bold text-lg animate-pulse">
          Cargando alertas de la API...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-[#4a3426]">Alertas Recientes 🔔</h1>
          <p className="text-gray-600">Ayuda a reunir a estas mascotas con sus familias.</p>
        </div>
        
        <Link 
          href="/reportar" 
          className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition shadow-md flex items-center gap-2"
        >
          <FaExclamationCircle /> Publicar Alerta
        </Link>
      </div>

      {/* Grid de Tarjetas (Datos de la API) */}
      {alertasActivas.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-xl text-gray-500">No hay alertas activas en este momento. 🎉</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alertasActivas.map((mascota) => (
            <div key={mascota.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
              
              {/* Imagen (Emoji o Foto) */}
              <div className="h-48 bg-gray-100 flex items-center justify-center text-6xl relative">
                {mascota.imagen}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${mascota.estado === 'perdido' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                  {mascota.estado === 'perdido' ? 'Se Busca' : 'Encontrado'}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-5 flex flex-col gap-3 flex-grow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-gray-800">{mascota.nombre}</h2>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                    {mascota.tipo}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-2">
                  {mascota.descripcion}
                </p>

                <div className="mt-auto space-y-2 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaMapMarkerAlt className="text-red-400" />
                    {/* Usamos 'ubicacionTexto' que definimos en el Contexto */}
                    {mascota.ubicacionTexto || "Ubicación en mapa"}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FaCalendarAlt className="text-blue-400" />
                    {mascota.fecha}
                  </div>
                </div>

                <Link href="/mapa">
                    <button className="w-full mt-3 border-2 border-[#4a3426]/10 text-[#4a3426] font-bold py-2 rounded-xl hover:bg-[#4a3426] hover:text-white transition">
                        Ver en Mapa
                    </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje informativo */}
      <div className="bg-blue-50 rounded-xl p-6 text-center text-blue-800 text-sm border border-blue-100">
        <p>🌍 <strong>Sincronización en tiempo real:</strong> Estas alertas provienen de nuestra API y se muestran también en el Mapa Interactivo.</p>
      </div>

    </div>
  );
}