"use client";

import { FaTrash } from "react-icons/fa";
import { usePets } from "@/contexts/PetsContext";

// Definimos que el ID puede venir o no (opcional)
interface DeleteButtonProps {
  id?: string;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deletePet } = usePets();

  // Si no hay ID, no mostramos nada para evitar errores
  if (!id) return null;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    
    // Doble chequeo de seguridad
    if (id) {
        deletePet(id);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="absolute top-3 right-3 bg-transparent p-2 rounded-full text-transparent shadow-md hover:bg-transparent hover:text-transparent transition z-10 opacity-80 hover:opacity-100"
      title="Borrar alerta"
    >
      <FaTrash />
    </button>
  );
}