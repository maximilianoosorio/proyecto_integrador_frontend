import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importamos los componentes visuales
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Importamos Clerk (Autenticación)
import { ClerkProvider } from "@clerk/nextjs";

// 🚨 IMPORTANTE: Importamos el Provider de tu API/Contexto
import { PetsProvider } from "@/contexts/PetsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VeciPets",
  description: "Comunidad de mascotas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className} suppressHydrationWarning={true}>
          
          {/* 🚨 AQUÍ ESTÁ LA SOLUCIÓN: */}
          {/* Debemos envolver todo el contenido visual con <PetsProvider> */}
          {/* Si no pones esto, usePets() fallará porque no encuentra los datos. */}
          <PetsProvider>
            
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="grow container mx-auto p-4">
                {children}
              </main>
              <Footer />
            </div>

          </PetsProvider>
          
        </body>
      </html>
    </ClerkProvider>
  );
}