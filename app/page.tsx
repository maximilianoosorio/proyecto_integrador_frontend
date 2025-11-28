import Link from "next/link";
import { FaBell, FaHeart, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
// Importamos el botón de registro de Clerk
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-10">
      
      {/* 1. SECCIÓN HERO (Bienvenida) 
         - Agregamos 'relative z-0': Esto asegura que esta sección se quede en el "piso 0".
           Así, tu Navbar (que está en el piso 50) siempre pasará por encima sin problemas.
      */}
      <section className="relative z-0 bg-[#C9E9FF] rounded-3xl overflow-hidden p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-sm mx-4 mt-4">
        
        {/* Texto */}
        <div className="max-w-xl space-y-6 relative z-10">
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
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <FaMapMarkedAlt /> Ver Mapa
            </Link>
            <Link 
              href="/reportar" 
              className="bg-white text-[#4a3426] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-md border-2 border-[#4a3426]/10 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              <FaBell /> Reportar Alerta
            </Link>
          </div>
        </div>
        
        {/* Animación del Perro */}
        <div className="hidden md:block relative w-80 h-80 mt-8 md:mt-0">
           <div className="w-full h-full bg-white/30 rounded-full flex items-center justify-center text-9xl animate-bounce shadow-inner backdrop-blur-sm">
            🐶
           </div>
        </div>
      </section>

      {/* 2. CARACTERÍSTICAS PRINCIPALES */}
      <section className="container mx-auto px-4 relative z-0">
        <h2 className="text-3xl font-bold text-center text-[#4a3426] mb-10">
          ¿Cómo te ayuda VeciPets?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 - Usamos un componente reutilizable abajo para limpiar código */}
          <FeatureCard 
            icon={<FaSearch className="text-blue-600 text-2xl" />}
            bgIcon="bg-blue-100"
            title="Búsqueda Inteligente"
            desc="Ubica mascotas perdidas en tiempo real en nuestro mapa interactivo del Valle de Aburrá."
          />

          {/* Tarjeta 2 */}
          <FeatureCard 
            icon={<FaBell className="text-orange-600 text-2xl" />}
            bgIcon="bg-orange-100"
            title="Alertas Rápidas"
            desc="Notifica a tus vecinos al instante si encuentras o pierdes una mascota. ¡La unión hace la fuerza!"
          />

          {/* Tarjeta 3 */}
          <FeatureCard 
            icon={<FaHeart className="text-red-600 text-2xl" />}
            bgIcon="bg-red-100"
            title="Bienestar Animal"
            desc="Encuentra veterinarias, consejos de vacunación y tips para cuidar mejor a tu peludo."
          />
        </div>
      </section>

      {/* 3. LLAMADO A REGISTRO */}
      <section className="bg-[#4a3426] text-white rounded-3xl p-10 text-center mx-4 relative z-0 shadow-xl mb-4">
        <h2 className="text-3xl font-bold mb-4">¡Únete a la comunidad VeciPets!</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Somos más que una app, somos vecinos ayudando a vecinos. 
          Regístrate hoy y ayuda a que ninguna mascota se quede sin hogar.
        </p>
        
        <SignUpButton mode="modal">
          <button className="bg-[#C9E9FF] text-[#4a3426] px-8 py-3 rounded-full font-bold hover:bg-white transition transform hover:scale-110 active:scale-95 shadow-lg border-2 border-transparent hover:border-[#4a3426]">
            Crear Cuenta Gratis
          </button>
        </SignUpButton>
      </section>

    </div>
  );
}

// --- Componente Auxiliar (Para no repetir código en las tarjetas) ---
function FeatureCard({ icon, bgIcon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 text-center group hover:-translate-y-2 duration-300">
      <div className={`${bgIcon} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}