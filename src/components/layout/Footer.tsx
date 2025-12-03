import Link from "next/link";
import Image from "next/image"; // Ahora sí importamos el componente de imagen
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTwitter,
  FaUserFriends,
  FaWhatsapp
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#C9E9FF] text-[#4a3426] pt-10 pb-6 mt-auto border-t border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* GRID PRINCIPAL DE 5 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* 1. MARCA (LOGO + DESCRIPCIÓN) */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 mb-1 group">
              {/* Logo Oficial */}
              <Image 
                src="/logo.png" 
                alt="Logo VeciPets" 
                width={45} 
                height={45} 
                className="group-hover:scale-105 transition-transform duration-200"
              />
              <span className="text-2xl font-bold text-[#4a3426] drop-shadow-sm">VeciPets</span>
            </Link>
            
            <p className="text-sm font-medium opacity-85 leading-relaxed">
              Unidos por una huella. Conectando a la comunidad para el bienestar de nuestras mascotas.
            </p>
            
            <div className="flex gap-3 mt-2 text-xl">
              <a href="https://www.instagram.com/" className="p-2 bg-white rounded-full hover:text-[#E1306C] shadow-sm transition-all hover:scale-110"><FaInstagram /></a>
              <a href="https://web.facebook.com/?_rdc=1&_rdr#" className="p-2 bg-white rounded-full hover:text-[#1877F2] shadow-sm transition-all hover:scale-110"><FaFacebook /></a>
              <a href="https://x.com/" className="p-2 bg-white rounded-full hover:text-[#1DA1F2] shadow-sm transition-all hover:scale-110"><FaTwitter /></a>
            </div>
          </div>

          {/* 2. EXPLORAR */}
          <div>
            <h3 className="text-lg font-bold text-[#4a3426] mb-4 inline-block">Explorar</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="/" className="hover:text-orange-600 transition-all hover:translate-x-1 inline-block">🏠 Inicio</Link></li>
              <li><Link href="/mapa" className="hover:text-blue-600 transition-all hover:translate-x-1 inline-block">🗺️ Mapa Interactivo</Link></li>
              <li><Link href="/reportar" className="hover:text-red-600 transition-all hover:translate-x-1 inline-block">🔔 Alertas</Link></li>
              <li><Link href="/cuidados" className="hover:text-green-600 transition-all hover:translate-x-1 inline-block">❤️ Cuidado</Link></li>
            </ul>
          </div>

           {/* 3. NUESTRO EQUIPO */}
           <div>
            <h3 className="text-lg font-bold text-[#4a3426] mb-4 inline-block">Nuestro Equipo</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li className="flex items-center gap-2"><FaUserFriends className="text-xs opacity-70" /> Maximiliano Osorio</li>
              <li className="flex items-center gap-2"><FaUserFriends className="text-xs opacity-70" /> Lorena Roldan</li>
              <li className="flex items-center gap-2"><FaUserFriends className="text-xs opacity-70" /> Gabriela Moreno</li>
              <li className="flex items-center gap-2"><FaUserFriends className="text-xs opacity-70" /> Jenedith Perez</li>
            </ul>
          </div>

          {/* 4. LEGAL */}
          <div>
            <h3 className="text-lg font-bold text-[#4a3426] mb-4 inline-block">Legal</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link href="#" className="hover:text-orange-600 transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="hover:text-orange-600 transition-colors">Términos</Link></li>
            </ul>
          </div>

          {/* 5. CONTACTO */}
          <div>
            <h3 className="text-lg font-bold text-[#4a3426] mb-4 inline-block">Contacto</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3"><FaEnvelope className="text-lg" /> contacto@vecipets.com</li>
              <li className="flex items-center gap-3"><FaWhatsapp className="text-lg text-green-700" /> +57 300 123 4567</li>
              <li className="flex items-start gap-3"><FaMapMarkerAlt className="text-lg mt-1 text-red-600" /> Medellín, Col.</li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#4a3426]/20 pt-6 text-center text-xs font-bold opacity-70">
          <p>&copy; {new Date().getFullYear()} VeciPets. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;