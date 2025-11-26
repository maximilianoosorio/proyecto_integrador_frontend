"use client";
import { useState } from "react";
// Nota: Ya NO importamos FaWhatsapp aquí porque lo moveremos al page.tsx

export default function Cuidados() {
  const [showCuidados, setShowCuidados] = useState<boolean>(false);
  const [showBienestar, setShowBienestar] = useState<boolean>(false);
  const [info, setInfo] = useState<string>("");

  const toggleCuidados = () => {
    setShowCuidados(!showCuidados);
    setShowBienestar(false);
    setInfo("");
  };

  const toggleBienestar = () => {
    setShowBienestar(!showBienestar);
    setShowCuidados(false);
    setInfo("");
  };

  const showInfo = (type: string) => {
    let text = "";
    switch (type) {
      case "alimentacion":
        text = `Alimentación adecuada:\n• Dar comida según la especie, edad y tamaño.\n• Evitar alimentos como chocolate, uvas y cebolla.\n• Mantener agua limpia siempre disponible.`;
        break;
      case "higiene":
        text = `Higiene:\n• Bañar con productos especiales.\n• Limpiar ojos, orejas y patas.\n• Cepillar para evitar parásitos.`;
        break;
      case "salud":
        text = `Salud:\n• Revisiones veterinarias.\n• Vacunas y desparasitación al día.\n• Vigilar heridas o debilidad.`;
        break;
      case "emocionales":
        text = `Cuidados emocionales:\n• Hablar con voz suave.\n• Dar tiempo para adaptarse.\n• Evitar regaños si está estresado.`;
        break;
      case "especiales":
        text = `Cuidados después del rescate:\n• Dar comida en porciones pequeñas.\n• Revisar pulgas o garrapatas.\n• Mantenerlo caliente.\n• Evitar baños si está débil.`;
        break;
    }
    setInfo(text);
  };

  return (
    <div className="p-6 w-full flex flex-col items-center relative">

      <h2 className="text-2xl font-bold bg-blue-300 mb-6 text-center px-4 py-3 rounded-xl w-full max-w-2xl shadow-sm text-[#4a3426]">
        Información de bienestar y cuidados
      </h2>

      {/* Botones Principales */}
      <button onClick={toggleCuidados} className="w-full max-w-2xl bg-gray-100 py-3 rounded-lg hover:bg-gray-200 transition mb-3 font-semibold border border-gray-300 shadow-sm flex justify-between px-4 items-center">
        <span>Mostrar cuidados</span>
      </button>

      <button onClick={toggleBienestar} className="w-full max-w-2xl bg-[#8bcbf9] py-3 rounded-lg hover:bg-[#5db3f0] transition font-semibold border border-blue-300 shadow-sm flex justify-between px-4 items-center text-[#4a3426]">
        <span>Bienestar animal</span>
      </button>

      {/* --- SECCIÓN DE CUIDADOS --- */}
      {showCuidados && (
        <div className="mt-4 flex flex-col gap-3 w-full max-w-2xl animate-in slide-in-from-top-2 fade-in duration-300">
          {[
            { id: "alimentacion", label: "Alimentación adecuada" },
            { id: "higiene", label: "Higiene" },
            { id: "salud", label: "Salud" },
            { id: "emocionales", label: "Cuidados emocionales" },
            { id: "especiales", label: "Cuidados especiales" },
          ].map((btn) => (
            <button key={btn.id} className="bg-blue-100 py-2 px-4 rounded hover:bg-blue-200 text-left border border-blue-200 text-blue-900 font-medium" onClick={() => showInfo(btn.id)}>
              • {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* --- SECCIÓN DE BIENESTAR ANIMAL --- */}
      {showBienestar && (
        <div className="mt-5 bg-white p-6 border border-blue-200 rounded-xl shadow-md w-full max-w-2xl text-left animate-in zoom-in-95 duration-200">
          <h3 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">Bienestar animal </h3>

          <div className="space-y-4 text-gray-700 mb-6">
            <p><strong>Teléfono:</strong> +57 320 594 5135</p>
            <p><strong>Correo:</strong> gabrielamorenorodriguez44@gmail.com</p>
            <p><strong>Horario:</strong> Lunes a sábado — 8:00 am a 6:00 pm</p>
            
            <div className="p-3 rounded-lg  text-sm">
                <strong>Consejos rápidos:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>En caso de emergencia, mantén al animal tranquilo.</li>
                    <li>No des medicamentos humanos.</li>
                    <li>Busca ayuda profesional si tiene heridas.</li>
                </ul>
            </div>
          </div>

          <button onClick={() => setShowBienestar(false)} className="w-full bg-blue-300 py-2 rounded hover:bg-gray-300 font-bold text-gray-600">
            Cerrar
          </button>
        </div>
      )}

      {/* --- MODAL INFO --- */}
      {info && (
        <div className="mt-5 relative w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white p-6 border-2 border-blue-100 rounded-xl shadow-lg relative">
            <button onClick={() => setInfo("")} className="absolute top-2 right-3 text-gray-400 hover:text-red-500 font-bold text-xl">✕</button>
            <pre className="whitespace-pre-line font-sans text-gray-700 text-lg">{info}</pre>
          </div>
        </div>
      )}

    </div>
  );
}