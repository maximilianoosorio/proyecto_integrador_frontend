"use client";

import { use } from "react";
import { usePets } from "@/contexts/PetsContext";
import { notFound } from "next/navigation";

export default function AlertaDetallePage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const { pets, isLoading } = usePets();

  if (isLoading) return <p>Cargando...</p>;

  const mascota = pets.find((p) => p.id === id);
  if (!mascota) return notFound();

    return (
  <div className="flex justify-center p-6">
    <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md">

      <h1 className="text-2xl font-bold mb-4 text-center">
        Detalle de Alerta
      </h1>

      {/* Imagen */}
      {mascota.foto && (
        <img
          src={mascota.foto}
          alt={mascota.nombre}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
      )}

      {/* Contenido */}
      <h2 className="text-xl font-semibold mb-2 text-center">{mascota.nombre}</h2>

      <p><strong>Tipo:</strong> {mascota.tipo}</p>
      <p><strong>Raza:</strong> {mascota.raza}</p>
      <p><strong>Edad:</strong> {mascota.edad}</p>
      <p><strong>Estado:</strong> {mascota.estado}</p>
      <p><strong>Ubicación:</strong> {mascota.ubicacionTexto}</p>
      <p><strong>Fecha:</strong> {mascota.fecha}</p>
      <p className="mt-2"><strong>Descripción:</strong> {mascota.descripcion}</p>

    </div>
  </div>
);
}