"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// TU ENLACE DE MOCKAPI
const API_URL = "https://6927193526e7e41498fcf98e.mockapi.io/alerta"; 

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

// ⬇️ AQUÍ ESTABA EL ERROR: Faltaba definir deletePet en la interfaz
interface PetsContextType {
  pets: Mascota[];
  addPet: (pet: Omit<Mascota, "id">) => Promise<void>;
  deletePet: (id: string) => Promise<void>; // <--- AHORA SÍ EXISTE
  isLoading: boolean;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- CARGAR ---
  const fetchAlertas = async () => {
    try {
      const res = await fetch(API_URL); 
      if (!res.ok) throw new Error("Error de conexión");
      const data = await res.json();
      
      const dataArreglada = data.map((item: any) => {
        let coordsReales = item.coordenadas;
        if (typeof item.coordenadas === 'string') {
            try { coordsReales = JSON.parse(item.coordenadas); } 
            catch (e) { coordsReales = [6.2476, -75.5658]; }
        }
        return { ...item, coordenadas: coordsReales };
      });

      setPets(dataArreglada.reverse()); 
    } catch (error) {
      console.error("Error cargando:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAlertas(); }, []);

  // --- AGREGAR ---
  const addPet = async (pet: Omit<Mascota, "id">) => {
    try {
      let imagenSegura = pet.imagen;
      if (imagenSegura.length > 50000) {
         imagenSegura = pet.tipo === 'Perro' 
            ? "https://cdn-icons-png.flaticon.com/512/616/616408.png" 
            : "https://cdn-icons-png.flaticon.com/512/616/616430.png";
         alert("⚠️ Foto muy pesada. Se guardó con imagen genérica.");
      }

      const datosParaEnviar = {
        ...pet,
        imagen: imagenSegura,
        coordenadas: JSON.stringify(pet.coordenadas)
      };

      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosParaEnviar),
      });

      await fetchAlertas();
    } catch (error: any) {
      alert(`FALLO AL GUARDAR: ${error.message}`);
    }
  };

  // --- BORRAR ---
  const deletePet = async (id: string) => {
    if (!confirm("¿Borrar esta alerta?")) return;

    try {
      setPets(prev => prev.filter(pet => pet.id !== id)); 
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (error) {
      alert("No se pudo borrar de la nube.");
      fetchAlertas();
    }
  };

  return (
    // Agregamos deletePet al valor del proveedor
    <PetsContext.Provider value={{ pets, addPet, deletePet, isLoading }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) throw new Error("usePets error");
  return context;
}