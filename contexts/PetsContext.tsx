"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Mascota {
  id: string;
  nombre: string;
  tipo: "Perro" | "Gato";
  estado: "perdido" | "encontrado" | "veterinaria";
  ubicacionTexto: string;
  coordenadas: [number, number];
  fecha: string;
  descripcion: string;
  imagen: string;
}

interface PetsContextType {
  pets: Mascota[];
  addPet: (pet: Mascota) => Promise<void>;
  isLoading: boolean;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAlertas = async () => {
    try {
      const res = await fetch("/api/alertas", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setPets(data);
      }
    } catch (error) {
      console.error("Error cargando:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAlertas(); }, []);

  // --- AQUÍ ESTÁ EL CAMBIO IMPORTANTE (DEBUG) ---
  const addPet = async (pet: Mascota) => {
    try {
      console.log("Intentando enviar:", pet); // Mira la consola del navegador (F12)

      const res = await fetch("/api/alertas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet),
      });

      // Si falla, leemos QUÉ pasó
      if (!res.ok) {
        const errorTexto = await res.text(); // Leemos el mensaje del servidor
        console.error("Error del servidor:", errorTexto);
        throw new Error(`Error ${res.status}: ${errorTexto}`);
      }

      await fetchAlertas(); 

    } catch (error: any) {
      console.error("Error guardando alerta:", error);
      // Esta alerta ahora te dirá EXACTAMENTE qué falló
      alert(`FALLO: ${error.message}`); 
    }
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, isLoading }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) throw new Error("usePets debe usarse dentro de PetsProvider");
  return context;
}