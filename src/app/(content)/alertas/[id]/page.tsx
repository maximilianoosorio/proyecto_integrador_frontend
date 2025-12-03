"use client"; 
// Indica que este componente se ejecuta del lado del cliente (browser).
// Necesario para usar hooks como useState, useEffect o contextos.

import { use } from "react";
// "use" permite resolver promesas directamente dentro de componentes cliente en Next.js 14+.

import { usePets } from "@/contexts/PetsContext";
// Importamos el contexto donde están todas las mascotas guardadas globalmente.

import { notFound } from "next/navigation";
// Función que nos permite redirigir a la página 404 si no se encuentra la mascota.


// Componente de detalle de alerta individual
export default function AlertaDetallePage(props: { params: Promise<{ id: string }> }) {

  // Next.js envía "params" como una PROMESA, así que debemos resolverla.
  // Aquí extraemos el ID que viene en la URL "/alertas/[id]"
  const { id } = use(props.params);

  // Obtenemos del contexto:
  // - pets: todas las mascotas disponibles
  // - isLoading: indica si el contexto está cargando los datos
  const { pets, isLoading } = usePets();

  // Mientras los datos cargan, mostramos un texto simple
  if (isLoading) return <p>Cargando...</p>;

  // Buscamos la mascota cuyo ID coincida con el de la URL
  const mascota = pets.find((p) => p.id === id);

  // Si no existe una mascota con ese ID → mostramos página 404
  if (!mascota) return notFound();


  // Si la mascota se encuentra, mostramos la tarjeta con la información
  return (
    <div className="flex justify-center p-6">
      {/* Contenedor de la tarjeta */}
      <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md">

        {/* Título del detalle */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Detalle de Alerta
        </h1>

        {/* Imagen de la mascota (solo si existe la propiedad "foto") */}
        {mascota.foto && (
          <img
            src={mascota.foto}        // URL de la imagen
            alt={mascota.nombre}      // Texto alternativo
            className="w-full h-56 object-cover rounded-lg mb-4"
            // w-full → imagen ocupa todo el ancho de la tarjeta
            // h-56 → altura fija para mantener el diseño compacto
            // object-cover → recorta la imagen sin deformarla
            // rounded-lg → esquinas redondeadas
          />
        )}

        {/* Nombre de la mascota */}
        <h2 className="text-xl font-semibold mb-2 text-center">
          {mascota.nombre}
        </h2>

        {/* Información detallada */}
        <p><strong>Tipo:</strong> {mascota.tipo}</p>
        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Edad:</strong> {mascota.edad}</p>
        <p><strong>Estado:</strong> {mascota.estado}</p>
        <p><strong>Ubicación:</strong> {mascota.ubicacionTexto}</p>
        <p><strong>Fecha:</strong> {mascota.fecha}</p>

        {/* Descripción con margen superior */}
        <p className="mt-2">
          <strong>Descripción:</strong> {mascota.descripcion}
        </p>

      </div>
    </div>
  );
}
