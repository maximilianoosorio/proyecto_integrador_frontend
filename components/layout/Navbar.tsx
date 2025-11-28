"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBell, FaMapMarkedAlt, FaHeart, FaHome, FaBars, FaTimes } from "react-icons/fa";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bloqueo de scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const getLinkClass = (path: string, isMobile = false) => {
    const isActive = pathname === path;
    const base = "flex items-center gap-2 transition-all duration-300 font-medium cursor-pointer";

    if (isMobile) {
      return `${base} w-full p-3 rounded-xl text-lg ${
        isActive ? "bg-white text-[#4a3426] font-bold shadow-sm" : "text-[#4a3426] hover:bg-white/30"
      }`;
    }
    return `${base} ${
      isActive
        ? "text-white font-extrabold scale-110 border-b-2 border-white pb-1"
        : "text-[#4a3426] hover:text-[#4a3426]/70 hover:scale-105"
    }`;
  };

  return (
    <>
      {/* NAVBAR STICKY */}
      <nav className="sticky top-0 z-50 w-full h-[70px] bg-[#C9E9FF] text-[#4a3426] shadow-md px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="relative z-50 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Logo" width={45} height={45} className="object-contain" />
            <span className="text-xl font-black tracking-tight">VeciPets</span>
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <div className="relative z-50 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl p-2 text-[#4a3426] hover:bg-black/5 rounded-full transition focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MENÚ ESCRITORIO */}
        <ul className="hidden md:flex items-center gap-8">
          <NavLinks getLinkClass={getLinkClass} />
          {/* CORRECCIÓN APLICADA: w-px en lugar de w-[1px] */}
          <div className="h-6 w-px bg-[#4a3426]/20 mx-2"></div>
          <AuthButtons />
        </ul>
      </nav>

      {/* MENÚ MÓVIL (OVERLAY) */}
      <div 
        /* CORRECCIÓN APLICADA: pt-20 en lugar de pt-[80px] */
        className={`fixed inset-0 bg-[#C9E9FF] z-40 flex flex-col pt-20 px-6 gap-6 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-2 w-full h-full overflow-y-auto pb-10">
          <NavLinks getLinkClass={(path: string) => getLinkClass(path, true)} onClick={closeMenu} />
            <hr className="border-[#4a3426]/20 my-2" />
            <div className="flex flex-col gap-4 w-full">
               <AuthButtons isMobile={true} onClick={closeMenu} />
            </div>
        </ul>
      </div>
    </>
  );
};

// --- COMPONENTES AUXILIARES ---

const NavLinks = ({ getLinkClass, onClick }: { getLinkClass: any, onClick?: () => void }) => (
  <>
    <li><Link href="/" className={getLinkClass("/")} onClick={onClick}><FaHome /> <span>Inicio</span></Link></li>
    <li><Link href="/alertas" className={getLinkClass("/alertas")} onClick={onClick}><FaBell /> <span>Alertas</span></Link></li>
    <li><Link href="/mapa" className={getLinkClass("/mapa")} onClick={onClick}><FaMapMarkedAlt /> <span>Mapa</span></Link></li>
    <li><Link href="/cuidado" className={getLinkClass("/cuidado")} onClick={onClick}><FaHeart /> <span>Cuidado</span></Link></li>
  </>
);

const AuthButtons = ({ isMobile = false, onClick }: { isMobile?: boolean, onClick?: () => void }) => (
  <>
    <SignedOut>
      <div className={`flex ${isMobile ? "flex-col gap-3 w-full" : "gap-4 items-center"}`}>
        <SignInButton mode="modal">
          <button onClick={onClick} className={`font-bold rounded-xl border-2 border-[#4a3426] transition-all ${isMobile ? "w-full py-3 bg-transparent" : "px-4 py-1.5 hover:bg-white text-sm"}`}>Ingresar</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button onClick={onClick} className={`font-bold rounded-xl border-2 border-[#4a3426] transition-all ${isMobile ? "w-full py-3 bg-[#4a3426] text-white" : "px-4 py-1.5 bg-[#4a3426] text-white hover:bg-[#3a281e] text-sm"}`}>Registrarse</button>
        </SignUpButton>
      </div>
    </SignedOut>

    <SignedIn>
      <div className={`flex items-center ${isMobile ? "flex-col-reverse gap-6 w-full mt-4" : "gap-4"}`}>
        <Link href="/reportar" onClick={onClick} className={`font-bold flex items-center gap-2 rounded-full transition hover:scale-105 ${isMobile ? "bg-red-500 text-white w-full justify-center py-3 shadow-md" : "bg-red-500 text-white px-4 py-1.5 text-sm shadow-sm"}`}>
          <span>📢</span> Reportar
        </Link>
        <div className="flex items-center gap-3">
            {isMobile && <span className="font-semibold text-[#4a3426]">Mi Perfil:</span>}
            <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </SignedIn>
  </>
);

export default Navbar;