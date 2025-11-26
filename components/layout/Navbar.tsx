"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaHeart, FaHome, FaMapMarkedAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#C9E9FF] text-[#4a3426] p-4 flex items-center justify-between shadow-md font-semibold sticky top-0 z-50">
      
      {/* Logo IZQUIERDA - También lleva al inicio */}
      <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
        <Image src="/logo.png" alt="Logo" width={50} height={50} />
        <span className="text-xl font-bold">VeciPets</span>
      </Link>

      {/* MENÚ DERECHA */}
      <ul className="flex items-center gap-8 text-[17px] font-medium">
        
        {/* --- BOTÓN INICIO (CORREGIDO) --- */}
        {/* Ahora el Link envuelve TODO: Icono y Texto */}
        <li className="hover:text-white transition-colors cursor-pointer">
          <Link href="/" className="flex items-center gap-2">
            <FaHome />
            <span>Inicio</span>
          </Link>
        </li>

        {/* ALERTAS */}
        <li className="hover:text-white transition-colors cursor-pointer">
          <Link href="/alertas" className="flex items-center gap-2">
            <FaBell />
            <span>Alertas</span>
          </Link>
        </li>

        {/* MAPA */}
        <li className="hover:text-white transition-colors cursor-pointer">
          <Link href="/mapa" className="flex items-center gap-2">
            <FaMapMarkedAlt />
            <span>Mapa</span>
          </Link>
        </li>

        {/* CUIDADO */}
        <li className="hover:text-white transition-colors cursor-pointer">
          <Link href="/cuidado" className="flex items-center gap-2">
            <FaHeart />
            <span>Cuidado</span>
          </Link>
        </li>

        {/* ZONA DE AUTENTICACIÓN */}
        <SignedOut>
          <li>
            <SignInButton
              mode="modal" 
              appearance={{
                elements: { 
                  button: "px-6 py-2 rounded-xl bg-white text-[#4a3426] font-bold hover:bg-[#4a3426] hover:text-white transition border-2 border-[#4a3426]/10",
                },
              }}
            >
              Iniciar sesión
            </SignInButton>
          </li>

          <li>
             <SignUpButton
              mode="modal" 
              appearance={{
                elements: { 
                  button: "px-6 py-2 rounded-xl bg-[#4a3426] text-white font-bold hover:bg-white hover:text-[#4a3426] transition border-2 border-[#4a3426]",
                },
              }}
            >
               Registrarse
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