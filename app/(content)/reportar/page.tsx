"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCamera, FaCheckCircle, FaDog, FaCat } from "react-icons/fa";
import dynamic from "next/dynamic";
import { usePets, Mascota } from "@/contexts/PetsContext";

// Cargamos el mapa de forma dinámica para evitar errores de SSR
const DynamicSelector = dynamic(
  () => import("@/features/mapa/DynamicSelector"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
        Cargando mapa...
      </div>
    ),
  }
);

export default function ReportarPage() {
  const router = useRouter();
  const { addPet } = usePets();

  const [tipo, setTipo] = useState<"Perro" | "Gato">("Perro");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ubicacion, setUbicacion] = useState<[number, number] | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  // ... (Tu función handleImageUpload sigue igual) ...
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const MAX_WIDTH = 200;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setFoto(dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // ... (Tu función handleSubmit sigue igual) ...
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ubicacion) return alert("⚠️ Por favor marca la ubicación en el mapa.");
    setGuardando(true);

    try {
      const nuevaMascota: Omit<Mascota, "id"> = {
        nombre: nombre || "Sin nombre",
        tipo: tipo,
        estado: "perdido",
        ubicacionTexto: barrio || "Medellín",
        coordenadas: ubicacion,
        fecha: new Date().toLocaleDateString(),
        descripcion: descripcion || "Sin descripción.",
        imagen: foto || (tipo === "Perro" ? "🐶" : "🐱"),
      };

      await addPet(nuevaMascota);
      alert("¡Alerta publicada correctamente! ✅");
      router.push("/alertas");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar. Intenta de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-10 px-4">
      <h1 className="text-3xl font-bold text-[#4a3426] text-center py-6">
        Reportar Mascota 📢
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6"
      >
        {/* SELECCIÓN TIPO */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setTipo("Perro")}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center transition-all ${
              tipo === "Perro"
                ? "border-orange-500 bg-orange-50 scale-105"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <FaDog className="text-2xl" /> Perro
          </button>
          <button
            type="button"
            onClick={() => setTipo("Gato")}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center transition-all ${
              tipo === "Gato"
                ? "border-orange-500 bg-orange-50 scale-105"
                : "border-gray-200 text-gray-400"
            }`}
          >
            <FaCat className="text-2xl" /> Gato
          </button>
        </div>

        {/* INPUTS DE TEXTO */}
        <div>
          <label className="font-bold text-gray-700">Nombre</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-orange-200 outline-none"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Firulais"
            required
          />
        </div>

        <div>
          <label className="font-bold text-gray-700">Descripción</label>
          <textarea
            className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-orange-200 outline-none"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Color, tamaño, collar..."
            required
          />
        </div>

        <div>
          <label className="font-bold text-gray-700">Barrio</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl mt-1 focus:ring-2 focus:ring-orange-200 outline-none"
            value={barrio}
            onChange={(e) => setBarrio(e.target.value)}
            placeholder="Ej: Laureles"
            required
          />
        </div>

        {/* SUBIDA DE FOTO */}
        <div>
          <label className="font-bold text-gray-700 block mb-2">Foto</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="subir-foto"
          />
          <label
            htmlFor="subir-foto"
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition cursor-pointer flex flex-col items-center justify-center relative overflow-hidden h-40"
          >
            {foto ? (
              <img
                src={foto}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            ) : (
              <>
                <FaCamera className="text-2xl mb-2 text-gray-400" />
                <p className="text-gray-500 text-sm">Clic para subir foto</p>
              </>
            )}
          </label>
        </div>

        {/* --- AQUÍ ESTÁ EL CAMBIO DEL MAPA --- */}
        <div>
          <label className="font-bold text-gray-700 block mb-2">
            Ubicación (Toca en el mapa)
          </label>

          {/* AGREGAMOS: relative z-0
              Esto crea un contexto de apilamiento nuevo. El mapa (aunque tenga z-1000 por dentro)
              no podrá salir de este contenedor z-0, por lo que el Navbar (z-50) ganará.
           */}
          <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 relative z-0">
            <DynamicSelector onLocationSelect={setUbicacion} />
          </div>

          {ubicacion && (
            <p className="text-green-600 text-sm mt-1 font-bold flex items-center gap-1">
              <FaCheckCircle /> Coordenada guardada
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={guardando}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-md transition ${
            guardando
              ? "bg-gray-400"
              : "bg-[#c01111] hover:scale-105 active:scale-95"
          }`}
        >
          {guardando ? "Guardando..." : "Publicar Alerta"}
        </button>
      </form>
    </div>
  );
}
