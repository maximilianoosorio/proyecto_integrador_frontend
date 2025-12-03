"use client";
import { useState } from "react";
// Iconos usados para mejorar la UI
import {
  FaBrain,
  FaChevronDown,
  FaClock,
  FaEnvelope,
  FaHandHoldingHeart,
  FaPaw,
  FaPhone,
  FaShower,
  FaStar,
  FaTimes,
  FaUserMd,
  FaUtensils
} from "react-icons/fa";

export default function Cuidados() {
  // Estado para controlar qué sección está activa: "cuidados", "bienestar" o ninguna
  const [activeTab, setActiveTab] = useState<"cuidados" | "bienestar" | null>(null);

  // Estado para mostrar la información detallada de cada categoría de cuidados
  const [info, setInfo] = useState<{ title: string; text: string } | null>(null);

  /**
   * Cambia la sección activa.
   * Si el usuario vuelve a hacer clic en la misma, la cierra.
   * También limpia la tarjeta de información.
   */
  const toggleSection = (section: "cuidados" | "bienestar") => {
    if (activeTab === section) {
      setActiveTab(null); // Cierra si ya está activa
    } else {
      setActiveTab(section); // Abre la sección seleccionada
    }
    setInfo(null); // Limpia información al cambiar de sección
  };

  /**
   * Muestra contenido dinámico según el tipo de cuidado seleccionado.
   * Se actualiza el estado "info" con un título y texto descriptivo.
   */
  const showInfo = (type: string, title: string) => {
    let text = "";
    switch (type) {
      case "alimentacion":
        text = `• Dar comida según la especie, edad y tamaño.\n• Evitar alimentos como chocolate, uvas y cebolla.\n• Mantener agua limpia siempre disponible.`;
        break;
      case "higiene":
        text = `• Bañar con productos especiales para mascotas.\n• Limpiar ojos, orejas y patas regularmente.\n• Cepillar el pelaje para evitar nudos y parásitos.`;
        break;
      case "salud":
        text = `• Revisiones veterinarias periódicas.\n• Vacunas y desparasitación siempre al día.\n• Vigilar cambios de ánimo o heridas.`;
        break;
      case "emocionales":
        text = `• Hablar con voz suave y calmada.\n• Dar tiempo para adaptarse a nuevos entornos.\n• Evitar regaños fuertes si está estresado.`;
        break;
      case "especiales":
        text = `• Dar comida en porciones pequeñas.\n• Revisar minuciosamente pulgas o garrapatas.\n• Mantenerlo caliente y seco.\n• Evitar baños inmediatos si está muy débil.`;
        break;
    }
    setInfo({ title, text });
  };

  // Lista de categorías mostradas en la sección de "Cuidados"
  // Cada categoría está desacoplada en un objeto para mantener el código más limpio
  const categories = [
    { id: "alimentacion", label: "Alimentación", icon: <FaUtensils />, color: "bg-orange-100 text-orange-700 border-orange-200" },
    { id: "higiene", label: "Higiene", icon: <FaShower />, color: "bg-blue-100 text-blue-700 border-blue-200" },
    { id: "salud", label: "Salud", icon: <FaUserMd />, color: "bg-red-100 text-red-700 border-red-200" },
    { id: "emocionales", label: "Emocional", icon: <FaBrain />, color: "bg-purple-100 text-purple-700 border-purple-200" },
    { id: "especiales", label: "Rescate", icon: <FaStar />, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  ];

  return (
    <div className="w-full flex flex-col items-center relative">

      {/* ------------------ TÍTULO PRINCIPAL ------------------ */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#4a3426] flex items-center justify-center gap-2">
           Guía de Cuidados <FaPaw className="text-blue-400" />
        </h2>
        <p className="text-gray-500 mt-2">Todo lo que necesitas para una mascota feliz.</p>
      </div>

      {/* ------------------ BOTONES DE SECCIONES ------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-6">
        
        {/* Botón para abrir/cerrar sección "Cuidados" */}
        <button 
          onClick={() => toggleSection("cuidados")}
          className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between shadow-sm group ${
            activeTab === "cuidados" 
            ? "bg-[#4a3426] border-[#4a3426] text-white scale-105"
            : "bg-blue-200 border-gray-200 text-gray-600 hover:border-[#4a3426] hover:text-[#4a3426]"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Ícono del botón */}
            <div className={`p-2 rounded-full ${activeTab === "cuidados" ? "bg-white/20" : "bg-gray-100 group-hover:bg-orange-100"}`}>
               <FaPaw />
            </div>
            <span className="font-bold text-lg">Guía de Cuidados</span>
          </div>
          {/* Flecha que rota cuando está abierto */}
          <FaChevronDown className={`transition-transform duration-300 ${activeTab === "cuidados" ? "rotate-180" : ""}`} />
        </button>

        {/* Botón para abrir/cerrar sección "Bienestar" */}
        <button 
          onClick={() => toggleSection("bienestar")}
          className={`p-4 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between shadow-sm group ${
            activeTab === "bienestar" 
            ? "bg-[#C9E9FF] border-[#C9E9FF] text-[#4a3426] scale-105"
            : "bg-blue-200 border-gray-200 text-gray-600 hover:border-[#C9E9FF] hover:text-[#4a3426]"
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Ícono del botón */}
            <div className={`p-2 rounded-full ${activeTab === "bienestar" ? "bg-white/40" : "bg-gray-100 group-hover:bg-blue-100"}`}>
               <FaHandHoldingHeart />
            </div>
            <span className="font-bold text-lg">Centro de Bienestar</span>
          </div>
          <FaChevronDown className={`transition-transform duration-300 ${activeTab === "bienestar" ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* ------------------ CONTENIDO SECCIÓN: CUIDADOS ------------------ */}
      {activeTab === "cuidados" && (
        <div className="w-full max-w-3xl animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-center text-gray-500 mb-4 font-medium">Selecciona una categoría para ver tips:</p>

            {/* Grid de categorías de cuidados */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => showInfo(cat.id, cat.label)}
                  className={`${cat.color} flex flex-col items-center justify-center gap-2 p-4 rounded-xl border hover:scale-105 active:scale-95 transition-all shadow-sm`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="font-bold text-sm">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------ CONTENIDO SECCIÓN: BIENESTAR ------------------ */}
      {activeTab === "bienestar" && (
        <div className="w-full max-w-3xl animate-in zoom-in-95 duration-300">
          <div className="bg-blue-200 p-8 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden">

            {/* Decoración visual */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full"></div>

            <h3 className="text-2xl font-bold text-[#4a3426] mb-6 flex items-center gap-2 relative z-10">
              Bienestar Animal <FaHandHoldingHeart className="text-blue-500" />
            </h3>

            {/* Tarjetas de contacto */}
            <div className="space-y-4 relative z-10">

              {/* Teléfono */}
              <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                 <div className="bg-green-100 text-green-600 p-2 rounded-full"><FaPhone /></div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Emergencias</p>
                    <p className="font-bold text-lg">+57 320 594 5135</p>
                 </div>
              </div>

              {/* Correo */}
              <div className="flex items-center gap-3 text-gray-700 bg--50 p-3 rounded-xl">
                 <div className="bg-blue-100 text-blue-600 p-2 rounded-full"><FaEnvelope /></div>
                 <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-bold uppercase">Correo Electrónico</p>
                    <p className="text-sm font-medium truncate">gabrielamorenorodriguez44@gmail.com</p>
                 </div>
              </div>

              {/* Horario */}
              <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                 <div className="bg-purple-100 text-purple-600 p-2 rounded-full"><FaClock /></div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Horario de Atención</p>
                    <p className="font-medium">Lun - Sab: 8:00 am - 6:00 pm</p>
                 </div>
              </div>
            </div>

            {/* Nota importante */}
            <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-yellow-800 text-sm">
                <strong>💡 Recuerda:</strong> Nunca automediques a tu mascota. Si notas algo extraño, contáctanos de inmediato.
            </div>
          </div>
        </div>
      )}

      {/* ------------------ TARJETA DE INFORMACIÓN ------------------ */}
      {info && activeTab === "cuidados" && (
        <div className="w-full max-w-3xl mt-6 animate-in slide-in-from-bottom-6 fade-in duration-500">
          <div className="bg-[#4a3426] text-white p-6 rounded-3xl shadow-xl relative">

            {/* Botón para cerrar la tarjeta */}
            <button 
              onClick={() => setInfo(null)} 
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
            >
              <FaTimes />
            </button>

            <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-orange-300">★</span> Tips de {info.title}
            </h4>

            <div className="w-full h-px bg-white/20 mb-4"></div>

            {/* Texto dinámico según la categoría elegida */}
            <p className="whitespace-pre-line text-lg leading-relaxed text-white/90">
              {info.text}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
