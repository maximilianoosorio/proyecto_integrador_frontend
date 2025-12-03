import Link from "next/link";
import { FaBell, FaHeart, FaMapMarkedAlt, FaSearch, FaUserFriends, FaBullhorn, FaHome } from "react-icons/fa";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {

  return (
    <div className="flex flex-col gap-16 pb-10">
      
      {/* --- 2. SECCIÓN HERO (LA PORTADA) --- 
      */}
      <section className="relative z-0 bg-[#C9E9FF] rounded-3xl overflow-hidden p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-sm mx-4 mt-4">
        
        <div className="max-w-xl space-y-6 relative z-10">
          {/* Título con énfasis en la palabra clave "huella" usando color */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#4a3426] leading-tight">
            Unidos por una <span className="text-orange-600">huella</span> 🐾
          </h1>
          <p className="text-lg text-[#4a3426]/80 font-medium">
            La comunidad digital para proteger y cuidar a nuestras mascotas en el Valle de Aburrá.
          </p>
          
          {/* Botones de Acción Principal (CTA) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/mapa" className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
              <FaMapMarkedAlt /> Ver Mapa
            </Link>
            <Link href="/reportar" className="bg-white text-[#4a3426] px-6 py-3 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-md border-2 border-[#4a3426]/10 flex items-center justify-center gap-2 hover:scale-105 active:scale-95">
              <FaBell /> Reportar
            </Link>
          </div>

          {/* --- 3. PRUEBA SOCIAL (SOCIAL PROOF) ---*/}
          <div className="flex items-center gap-4 justify-center md:justify-start pt-2">
            <div className="flex -space-x-3">
              {/* Círculos con iniciales para simular usuarios reales */}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-400 flex items-center justify-center text-xs text-white font-bold">JD</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-red-400 flex items-center justify-center text-xs text-white font-bold">MA</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-green-400 flex items-center justify-center text-xs text-white font-bold">Lu</div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-bold">+500</div>
            </div>
            <p className="text-sm font-semibold text-[#4a3426]/80">
              Vecinos conectados <br/> <span className="text-green-600">● 12 en línea ahora</span>
            </p>
          </div>
        </div>
        

        {/* --- 4. ANIMACIÓN DE RADAR Y SALTO --- */}
         <div className="hidden md:block relative w-80 h-80 mt-8 md:mt-0">
            <div className="absolute inset-0 bg-white/40 rounded-full animate-ping opacity-75"></div>
            <div className="relative w-full h-full bg-white/30 rounded-full flex items-center justify-center text-9xl shadow-inner backdrop-blur-sm z-10">
            <span className="animate-bounce">🐶</span> 
          </div>
        </div>        
      </section>

  
      <section className="bg-white py-12 border-y border-gray-100 relative z-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#4a3426] mb-10">¿Cómo funciona VeciPets?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Línea decorativa que conecta los pasos (solo visible en pantallas grandes) */}
            <div className="hidden md:block absolute top-12 left-20 right-20 h-1 bg-gray-100 -z-10"></div>

            {/* Paso 1 */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-3xl mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition">
                <FaMapMarkedAlt />
              </div>
              <h3 className="font-bold text-xl mb-2">1. Reporta</h3>
              <p className="text-gray-500 max-w-xs">Marca la ubicación exacta en el mapa donde viste o perdiste a la mascota.</p>
            </div>

            {/* Paso 2 */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition">
                <FaBullhorn />
              </div>
              <h3 className="font-bold text-xl mb-2">2. Notifica</h3>
              <p className="text-gray-500 max-w-xs">Tus vecinos reciben una alerta instantánea en sus celulares.</p>
            </div>

            {/* Paso 3 */}
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mb-4 border-4 border-white shadow-sm group-hover:scale-110 transition">
                <FaHome />
              </div>
              <h3 className="font-bold text-xl mb-2">3. Encuentra</h3>
              <p className="text-gray-500 max-w-xs">La comunidad ayuda a reunirte con tu peludo lo antes posible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. CARACTERÍSTICAS SECUNDARIAS --- */}
      <section className="container mx-auto px-4 relative z-0">
        <h2 className="text-2xl font-bold text-center text-[#4a3426] mb-8">
          Más herramientas para ti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-2xl flex items-center gap-4 hover:bg-blue-100 transition cursor-pointer">
            <div className="bg-white p-3 rounded-full text-blue-600 shadow-sm"><FaSearch size={24}/></div>
            <div>
              <h3 className="font-bold text-gray-800">Búsqueda Inteligente</h3>
              <p className="text-sm text-gray-600">Filtra por raza, color o barrio.</p>
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-2xl flex items-center gap-4 hover:bg-purple-100 transition cursor-pointer">
            <div className="bg-white p-3 rounded-full text-purple-600 shadow-sm"><FaUserFriends size={24}/></div>
            <div>
              <h3 className="font-bold text-gray-800">Comunidad Activa</h3>
              <p className="text-sm text-gray-600">Comparte consejos y veterinarias.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#4a3426] text-white rounded-3xl p-10 text-center mx-4 relative z-0 shadow-xl mb-4">
        <h2 className="text-3xl font-bold mb-4">¿Listo para ayudar?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Únete hoy a la red de cuidado animal más grande de Medellín. Es gratis.
        </p>
        <SignUpButton mode="modal">
          <button className="bg-[#C9E9FF] text-[#4a3426] px-10 py-4 rounded-full font-bold hover:bg-white transition transform hover:scale-105 shadow-lg">
            Crear Cuenta Gratis
          </button>
        </SignUpButton>
      </section>

    </div>
  );
}