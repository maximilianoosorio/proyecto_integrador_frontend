import Link from "next/link";
import { FaBell, FaHeart, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
// 1. IMPORTAMOS EL BOTÓN DE REGISTRO DE CLERK
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* 1. SECCIÓN HERO (Bienvenida) */}
      <section className="relative bg-[#C9E9FF] rounded-3xl overflow-hidden p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-sm">
        <div className="max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4a3426] leading-tight">
            Unidos por una <span className="text-orange-600">huella</span> 🐾
          </h1>
          <p className="text-lg text-[#4a3426]/80 font-medium">
            La comunidad digital para proteger y cuidar a nuestras mascotas. 
            Reporta pérdidas, encuentra veterinarias y recibe consejos al instante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/mapa" 
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2"
            >
              <FaMapMarkedAlt /> Ver Mapa
            </Link>
            <Link 
              href="/reportar" 
              className="bg-white text-[#4a3426] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-md border-2 border-[#4a3426]/10 flex items-center justify-center gap-2"
            >
              <FaBell /> Reportar Alerta
            </Link>
          </div>
        </div>
        
        <div className="hidden md:block relative w-80 h-80">
           <div className="w-full h-full bg-white/30 rounded-full flex items-center justify-center text-9xl animate-bounce">
            🐶
           </div>
        </div>
      </section>

      {/* 2. CARACTERÍSTICAS PRINCIPALES */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#4a3426] mb-10">
          ¿Cómo te ayuda VeciPets?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center group">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaSearch className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Búsqueda Inteligente</h3>
            <p className="text-gray-600">
              Ubica mascotas perdidas en tiempo real en nuestro mapa interactivo del Valle de Aburrá.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center group">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaBell className="text-orange-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Alertas Rápidas</h3>
            <p className="text-gray-600">
              Notifica a tus vecinos al instante si encuentras o pierdes una mascota. ¡La unión hace la fuerza!
            </p>
          </div>

          {/* Tarjeta 3*/}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center group">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <FaHeart className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bienestar Animal</h3>
            <p className="text-gray-600">
              Encuentra veterinarias, consejos de vacunación y tips para cuidar mejor a tu peludo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LLAMADO A REGISTRO */}
      <section className="bg-[#4a3426] text-white rounded-3xl p-10 text-center mx-4">
        <h2 className="text-3xl font-bold mb-4">¡Únete a la comunidad VeciPets!</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Somos más que una app, somos vecinos ayudando a vecinos. 
          Regístrate hoy y ayuda a que ninguna mascota se quede sin hogar.
        </p>
        <SignUpButton mode="modal">
          <button className="bg-[#C9E9FF] text-[#4a3426] px-8 py-3 rounded-full font-bold hover:bg-white transition transform hover:scale-105 shadow-lg">
            Crear Cuenta Gratis
          </button>
        </SignUpButton>

      </section>

    </div>
  );
}