"use client";
/**
 * Este archivo se declara como Client Component porque:
 * - Usa dinámicamente un componente que depende del DOM.
 * - El selector del mapa utiliza interactividad y no puede renderizarse en el servidor.
 */

import dynamic from "next/dynamic";

/**
 * Carga dinámica del componente `MapSelector`.
 *
 * Razones técnicas para usar `dynamic()`:
 * - El mapa y sus selectores dependen del API del navegador, por lo que requieren un entorno client-side.
 * - Evitamos errores causados por SSR (Server-Side Rendering), ya que Leaflet y elementos del mapa requieren `window`.
 * - Permite reducir el tiempo de carga inicial de la página cargando este módulo únicamente cuando el cliente lo necesite.
 *
 * Configuración clave:
 * - `ssr: false`: deshabilita el renderizado en servidor.
 * - `loading`: placeholder visual para mejorar la experiencia del usuario mientras se importa el componente real.
 */
const DynamicSelector = dynamic(() => import("./MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg">
      Cargando selector...
    </div>
  ),
});

/**
 * Exportación por defecto del componente cargado dinámicamente.
 * Este archivo actúa como un “wrapper” para encapsular la lógica de lazy-loading
 * y mantener el código de presentación limpio en otros componentes.
 */
export default DynamicSelector;
