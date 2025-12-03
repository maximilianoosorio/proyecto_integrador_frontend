"use client";

import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";
import { usePets } from "@/contexts/PetsContext";
import DeleteButton from "@/features/alertas/DeleteButton";

export default function AlertasPage() {
  // ------------------------------------------------------------
  // 📌 usePets() — Hook del contexto que trae:
  // pets: lista de mascotas desde MockAPI
  // isLoading: indica si la API todavía está cargando datos
  // ------------------------------------------------------------
  const { pets, isLoading } = usePets();

  // Si pets viene vacío o undefined, dejamos un arreglo vacío
  const alertasActivas = pets || [];

  // ------------------------------------------------------------
  // ⏳ Mientras la API carga, mostramos un mensaje agradable
  // ------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-10 flex justify-center">
        <div className="text-orange-600 font-bold text-lg animate-pulse">
          Cargando alertas de la API...
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // 🌟 Render principal del componente
  // ------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10 bg-[#F8F9FA]">

      {/* --------------------------------------------------------
          🔺 ENCABEZADO DE LA PÁGINA
          Contiene el título y el botón para registrar una mascota
      ---------------------------------------------------------*/}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-red-500"> centro  de control de reportes 🐾</h1>
          <p className="text-black">Indice de casos reportados</p>
        </div>

        {/* Botón que redirige al formulario de reporte */}
        <Link
          href="/reportar"
          className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition shadow-md flex items-center gap-2"
        >
          <FaExclamationCircle /> Registrar Mascota
        </Link>
      </div>

      {/* --------------------------------------------------------
          🚫 SI NO HAY MASCOTAS
      ---------------------------------------------------------*/}
      {alertasActivas.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-xl text-gray-500">No hay mascotas registradas.</p>
        </div>
      ) : (

        /* --------------------------------------------------------
            🟩 GRID DE TARJETAS DE MASCOTAS
        ---------------------------------------------------------*/
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {alertasActivas.map((mascota) => (
            <div
              key={mascota.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col relative group"
            >
              {/* --------------------------------------------------------
                  ❌ BOTÓN PARA ELIMINAR LA ALERTA
                  (Componente separado)
              ---------------------------------------------------------*/}
              <DeleteButton id={mascota.id} />

              {/* --------------------------------------------------------
                  🖼️ FOTO DE LA MASCOTA
              ---------------------------------------------------------*/}
              <div className="h-56 bg-gray-100 flex items-center justify-center">
                {mascota.foto ? (
                  <img
                    src={mascota.foto}
                    alt={mascota.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-7xl">🐶</span>
                )}
              </div>

              {/* --------------------------------------------------------
                  📌 CONTENIDO DE LA TARJETA
              ---------------------------------------------------------*/}
              <div className="p-5 space-y-3">
                {/* Nombre */}
                <h2 className="text-xl font-bold text-gray-800">
                  {mascota.nombre}
                </h2>

                {/* Tipo */}
                <p className="text-gray-600 text-sm">
                  <strong>Tipo:</strong> {mascota.tipo}
                </p>

                {/* Raza */}
                <p className="text-gray-600 text-sm">
                  <strong>Raza:</strong> {mascota.raza}
                </p>

                {/* Edad */}
                <p className="text-gray-600 text-sm">
                  <strong>Edad:</strong> {mascota.edad}
                </p>

                {/* Barrio */}
                <p className="text-gray-600 text-sm">
                  <strong>Barrio:</strong> {mascota.ubicacionTexto}
                </p>

                {/* Fecha */}
                <p className="text-gray-600 text-sm">
                  <strong>Fecha:</strong> {mascota.fecha}
                </p>

                {/* Descripción */}
                <p className="text-gray-600 text-sm">
                  <strong>Descripción:</strong> {mascota.descripcion}
                </p>

               
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
