import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importamos los componentes visuales
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// 1. Importamos Clerk y el idioma ESPAÑOL
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

// 2. Importamos el Provider de tu API/Contexto
import { PetsProvider } from "@/contexts/PetsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeciPets - Comunidad de Mascotas",
  description: "Ayuda a encontrar mascotas perdidas y adopta.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Agregamos localization={esES} para que el Login salga en español
    <ClerkProvider localization={esES}>
      <html lang="es">
        {/* 4. suppressHydrationWarning={true} 
           Esto evita el error rojo de las extensiones (como Grammarly) 
        */}
        <body className={inter.className} suppressHydrationWarning={true}>
          
          <PetsProvider>
            <div className="flex flex-col min-h-screen relative">
              {/* Navbar fijo arriba */}
              <Navbar />
              
              {/* Contenido principal que empuja el footer hacia abajo */}
              <main className="grow container mx-auto p-4 w-full">
                {children}
              </main>
              
              {/* Footer siempre abajo */}
              <Footer />
            </div>
          </PetsProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}