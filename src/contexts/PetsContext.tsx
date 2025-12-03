"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Mascota {
   raza: string;
  edad: string;
  id: string;
  nombre: string;
  tipo: "Perro" | "Gato";
  estado: string;
  ubicacionTexto: string;
  coordenadas: [number, number];
  fecha: string;
  descripcion: string;
  foto: string;
}

interface PetsContextType {
  pets: Mascota[];
  isLoading: boolean;
  addPet: (data: Omit<Mascota, "id">) => Promise<void>; // ⬅️ corregido
  deletePet: (id: string) => Promise<void>;
}

const PetsContext = createContext<PetsContextType | null>(null);

export function PetsProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Mascota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar mascotas desde MockAPI
  useEffect(() => {
    fetch("https://692070e131e684d7bfcd11ec.mockapi.io/mascotas")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setIsLoading(false);
      });
  }, []);

  // Agregar mascota SIN ID (MockAPI crea el id)
  async function addPet(data: Omit<Mascota, "id">) {
    const res = await fetch(
      "https://692070e131e684d7bfcd11ec.mockapi.io/mascotas",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }
    );

    const nueva = await res.json();
    setPets((prev) => [...prev, nueva]);
  }

  // Eliminar mascota
  async function deletePet(id: string) {
    await fetch(
      `https://692070e131e684d7bfcd11ec.mockapi.io/mascotas/${id}`,
      { method: "DELETE" }
    );

    setPets((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <PetsContext.Provider value={{ pets, isLoading, addPet, deletePet }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) throw new Error("usePets must be inside PetsProvider");
  return context;
}
