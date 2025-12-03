"use client"; 
// Indica que este componente se ejecuta del lado del cliente.

import { use } from "react";
// "use" permite resolver promesas directamente en un componente cliente.

import { usePets } from "@/contexts/PetsContext";
// Contexto global donde están guardadas todas las mascotas.

import { notFound, useRouter } from "next/navigation";
// notFound para mostrar 404.
// useRouter permite navegar entre páginas (lo usamos para el botón de volver).


// Componente de detalle de alerta individual
export default function AlertaDetallePage(props: { params: Promise<{ id: string }> }) {

  // Next.js entrega params como PROMESA, así que debemos resolverla.
  const { id } = use(props.params);

  // Obtenemos mascotas y estado de carga desde el contexto global.
  const { pets, isLoading } = usePets();

  // Router para manejar el botón "Volver"
  const router = useRouter();

  // Mientras carga la información mostramos mensaje
  if (isLoading) return <p>Cargando...</p>;

  // Buscamos la mascota correspondiente al ID recibido
  const mascota = pets.find((p) => p.id === id);

  // Si no existe, mostramos página 404
  if (!mascota) return notFound();


  // Render del detalle
  return (
    <div className="flex justify-center p-6">

      {/* Contenedor principal del card */}
      <div className="bg-white border rounded-xl shadow-lg p-6 w-full max-w-md">

        {/* BOTÓN VOLVER */}
        {/* Navega de regreso a la ruta /alertas */}
        <button
          onClick={() => router.push("/alertas")}
          className="mb-4 px-4 py-2 bg-blue-100 text-gray-500 rounded-lg hover:bg-gray-200 transition"
        >
          ← Volver a Alertas
        </button>

        {/* Título del detalle */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Detalle de Alerta
        </h1>

        {/* Imagen de la mascota */}
        {mascota.foto && (
          <img
            src={mascota.foto}
            alt={mascota.nombre}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
        )}

        {/* Nombre */}
        <h2 className="text-xl font-semibold mb-2 text-center">
          {mascota.nombre}
        </h2>

        {/* Información */}
        <p><strong>Tipo:</strong> {mascota.tipo}</p>
        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Edad:</strong> {mascota.edad}</p>
        <p><strong>Estado:</strong> {mascota.estado}</p>
        <p><strong>Ubicación:</strong> {mascota.ubicacionTexto}</p>
        <p><strong>Fecha:</strong> {mascota.fecha}</p>

        {/* Descripción */}
        <p className="mt-2">
          <strong>Descripción:</strong> {mascota.descripcion}
        </p>

      </div>
    </div>
  );
}
