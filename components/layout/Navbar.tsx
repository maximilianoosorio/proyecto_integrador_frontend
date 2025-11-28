"use client";

import Image from "next/image";
import Link from "next/link";
// 1. Importamos el hook para saber en qué página estamos
import { usePathname } from "next/navigation"; 
import { FaBell, FaMapMarkedAlt, FaHeart, FaHome } from "react-icons/fa";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Navbar = () => {
  // 2. Obtenemos la ruta actual (ej: "/mapa")
  const pathname = usePathname();

  // Función auxiliar para decidir el color
  const getLinkClass = (path: string) => {
    // Si la ruta actual es igual al link, está activo
    const isActive = pathname === path;

    return `flex items-center gap-2 transition-all duration-200 cursor-pointer ${
      isActive 
        ? "text-white font-extrabold scale-110 drop-shadow-sm border-b-2 border-white pb-1" // ESTILO ACTIVO (Blanco y grande)
        : "text-[#4a3426] hover:text-white hover:scale-105 opacity-90 hover:opacity-100" // ESTILO NORMAL (Café)
    }`;
  };

  return (
    <nav className="w-full bg-[#C9E9FF] text-[#4a3426] p-4 flex items-center justify-between shadow-md font-semibold sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <span className="text-xl font-bold">VeciPets</span>
      </Link>

      {/* MENÚ DERECHA */}
      <ul className="flex items-center gap-8 text-[17px] font-medium">
        
        {/* Usamos la función getLinkClass para cada botón */}
        
        {/* INICIO */}
        <li className={getLinkClass("/")}>
          <Link href="/" className="flex items-center gap-2 w-full h-full">
            <FaHome />
            <span>Inicio</span>
          </Link>
        </li>

        {/* ALERTAS */}
        <li className={getLinkClass("/alertas")}>
          <Link href="/alertas" className="flex items-center gap-2 w-full h-full">
            <FaBell />
            <span>Alertas</span>
          </Link>
        </li>

        {/* MAPA */}
        <li className={getLinkClass("/mapa")}>
          <Link href="/mapa" className="flex items-center gap-2 w-full h-full">
            <FaMapMarkedAlt />
            <span>Mapa</span>
          </Link>
        </li>

        {/* CUIDADO */}
        <li className={getLinkClass("/cuidado")}>
          <Link href="/cuidado" className="flex items-center gap-2 w-full h-full">
            <FaHeart />
            <span>Cuidado</span>
          </Link>
        </li>

        {/* ZONA DE AUTENTICACIÓN */}
        <SignedOut>
          <li>
            <SignInButton mode="modal">
               <button className="px-6 py-2 rounded-xl bg-white text-[#4a3426] font-bold hover:bg-[#4a3426] hover:text-white transition border-2 border-[#4a3426]/10">
                 Iniciar sesión
               </button>
            </SignInButton>
          </li>

          <li>
             <SignUpButton mode="modal">
                <button className="px-6 py-2 rounded-xl bg-[#4a3426] text-white font-bold hover:bg-white hover:text-[#4a3426] transition border-2 border-[#4a3426]">
                  Registrarse
                </button>
             </SignUpButton>
          </li>
        </SignedOut>

        <SignedIn>
          <li className="flex items-center gap-4">
             <Link href="/reportar" className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-600 transition shadow-sm">
                📢 Reportar
             </Link>
            <UserButton afterSignOutUrl="/" />
          </li>
        </SignedIn>
      </ul>
    </nav>
  );
};

export default Navbar;