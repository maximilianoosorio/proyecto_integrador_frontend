"use client"; // Necesario para el click

import Cuidados from "@/features/cuidado/Cuidados";
import { FaWhatsapp } from "react-icons/fa";

export default function Page() {
  
  // Función de WhatsApp
  const abrirWhatsapp = () => {
    const numero = "573003720466"; 
    const mensaje = "Hola, necesito información sobre bienestar animal.";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4 md:p-10 flex flex-col items-center relative"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/huellas-de-perro-mascota-coraz%C3%B3n-y-hueso-pisadas-contorno-negro-sobre-fondo-blanco-patr%C3%B3n-transparente-dise%C3%B1o-para-el-embalaje-208795589.jpg')",
      }}
    >
      {/* TARJETA DEL CENTRO */}
      <div className="w-full max-w-4xl bg-white/90 p-2 md:p-6 rounded-3xl backdrop-blur-sm shadow-2xl border border-white">
        <Cuidados />
      </div>

      {/* BURBUJA FLOTANTE DE WHATSAPP (FUERA DE LA TARJETA) */}
      <button
        onClick={abrirWhatsapp}
        // bottom-5: Un poquito separado del borde inferior
        // left-20: Separado de la izquierda para dejar espacio a la "N" de Clerk
        // z-[9999]: Para que flote SOBRE TODO
        className="fixed bottom-5 left-20 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 animate-bounce border-2 border-white"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-4xl" />
      </button>

    </div>
  );
}