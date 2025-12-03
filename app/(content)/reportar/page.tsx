"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCamera, FaCheckCircle, FaDog, FaCat } from "react-icons/fa";
import dynamic from "next/dynamic";


// Contexto de mascotas
import { usePets } from "@/contexts/PetsContext";

/* =====================================================
    TIPO DE DATOS DE UNA MASCOTA
===================================================== */
type Mascota = {
  id?: string;
  nombre: string;
  tipo: "Perro" | "Gato";
  raza: string;
  edad: string;
  estado: string;
  ubicacionTexto: string;
  coordenadas: [number, number];
  fecha: string;
  descripcion: string;
  foto: string;
};

/* =====================================================
    IMPORTAR MAPA SIN SSR (Next.js no puede renderizarlo
    del lado del servidor porque usa objetos del navegador)
===================================================== */
const DynamicSelector = dynamic(
  () => import("@/features/mapa/DynamicSelector"),
  { ssr: false }
);

export default function ReportarPage() {
  const router = useRouter();
  const { addPet } = usePets();

  /* =====================================================
      ESTADOS DEL FORMULARIO
  ====================================================== */
  const [tipo, setTipo] = useState<"Perro" | "Gato">("Perro");
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [barrio, setBarrio] = useState("");
  const [ubicacion, setUbicacion] = useState<[number, number] | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  /* =====================================================
      MANEJAR SUBIDA Y REDUCCIÓN AUTOMÁTICA DE IMAGEN
      Se reduce la foto a máximo 220px de ancho para evitar
      archivos muy pesados.
  ====================================================== */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        // Crear canvas para redimensionar imagen
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 220;
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convertir a base64 con compresión
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        setFoto(dataUrl);
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  /* =====================================================
      MANEJAR ENVÍO DE FORMULARIO
  ====================================================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!ubicacion) return alert("⚠️ Selecciona ubicación en el mapa.");
    if (!nombre.trim()) return alert("⚠️ El nombre es obligatorio.");
    if (!raza.trim()) return alert("⚠️ La raza es obligatoria.");
    if (!edad.trim()) return alert("⚠️ La edad es obligatoria.");
    if (!barrio.trim()) return alert("⚠️ El barrio es obligatorio.");

    setGuardando(true);

    try {
      // Crear objeto mascota
      const nuevaMascota: Mascota = {
        nombre: nombre.trim(),
        tipo,
        raza: raza.trim(),
        edad: edad.trim(),
        estado: "perdido",
        ubicacionTexto: barrio.trim(),
        coordenadas: ubicacion,
        fecha: new Date().toLocaleDateString(),
        descripcion: descripcion.trim() || "Sin descripción.",
        foto: foto || "",
      };

      // Guardar en contexto + base de datos
          // Aquí llamas a la función addPet() que viene del contexto (usePets)
          // Esta función debe guardar la mascota en el estado global y también en la base de datos
          await addPet(nuevaMascota);

          // Muestra un mensaje indicando que todo salió bien
          alert("✅ ¡Alerta publicada correctamente!");

          // Redirige al usuario a la página de alertas
          router.push("/alertas");

          } catch (err) {
            // Si algo falla, muestra el error en la consola
            console.error(err);

            // Y advierte al usuario con una alerta visible
            alert("❌ Error al guardar. Más detalles en consola.");
          } finally {
            // Este bloque se ejecuta siempre: éxito o error
            // Aquí desactivas el estado de "guardando" para habilitar botones, etc.
            setGuardando(false);
          }
        };


  /* =====================================================
      RENDERIZADO DEL COMPONENTE
  ====================================================== */
  return (
    <div className="max-w-2xl mx-auto pb-10">
      <h1 className="text-3xl font-bold text-[#4a3426] text-center py-6">
        Reportar Mascota 📢
      </h1>

      {/* FORMULARIO */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6"
      >
        {/* ====================== TIPO DE MASCOTA ====================== */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setTipo("Perro")}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center transition ${
              tipo === "Perro" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <FaDog className="text-2xl" /> Perro
          </button>

          <button
            type="button"
            onClick={() => setTipo("Gato")}
            className={`flex-1 py-4 rounded-xl border-2 flex flex-col items-center transition ${
              tipo === "Gato" ? "border-orange-500 bg-orange-50" : "border-gray-200"
            }`}
          >
            <FaCat className="text-2xl" /> Gato
          </button>
        </div>

        {/* ====================== CAMPOS DE TEXTO ====================== */}
        <CampoTexto label="Nombre" value={nombre} setValue={setNombre} />
        <CampoTexto label="Raza" value={raza} setValue={setRaza} />
        <CampoTexto label="Edad" value={edad} setValue={setEdad} />

        {/* Descripción */}
        <div>
          <label className="font-bold text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border rounded-xl mt-1"
            required
          />
        </div>

        {/* Barrio */}
        <CampoTexto label="Barrio" value={barrio} setValue={setBarrio} />

        {/* ====================== FOTO ====================== */}
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
            className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer h-40 relative overflow-hidden"
          >
            {foto ? (
              <img
                src={foto}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <FaCamera className="text-2xl mb-2 text-gray-400" />
                <p className="text-gray-500 text-sm">Clic para subir foto</p>
              </>
            )}
          </label>
        </div>

        {/* ====================== MAPA ====================== */}
        <div>
          <label className="font-bold text-gray-700">Ubicación</label>
          <div className="h-64 rounded-xl overflow-hidden border">
            <DynamicSelector onLocationSelect={setUbicacion} />
          </div>

          {ubicacion && (
            <p className="text-green-600 mt-1 flex items-center gap-1 font-bold">
              <FaCheckCircle /> Coordenadas guardadas
            </p>
          )}
        </div>

        {/* ====================== BOTÓN ====================== */}
        <button
          type="submit"
          disabled={guardando}
          className={`w-full text-white font-bold py-4 rounded-xl shadow-md transition ${
            guardando ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {guardando ? "Guardando..." : "Publicar alerta"}
        </button>
      </form>
    </div>
  );
}

/* =====================================================
    COMPONENTE REUTILIZABLE PARA CAMPOS DE TEXTO
===================================================== */
function CampoTexto({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div>
      <label className="font-bold text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 border rounded-xl mt-1"
        required
      />
    </div>
  );
}
