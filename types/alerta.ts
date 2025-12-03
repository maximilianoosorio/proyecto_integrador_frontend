export interface Mascota {
  id: string;
  nombre: string;
  raza?: string;
  edad?: string;
  foto?: string;

  // para las alertas:
  estado?: string;                   // "perdido" | "encontrado"
  tipo?: string;                     // perro, gato...
  descripcion?: string;
  imagen?: string;
  ubicacionTexto?: string;
  fecha?: string;

  // Coordenadas desde el formulario
  coordenadas?: [number, number];
}
