import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Versión simplificada de almacenamiento
// (Nota: Si reinicias la terminal, esto se borra, pero para probar sirve perfecto)
let alertasSimple: any[] = [
  {
    id: "1",
    nombre: "Tommy (Prueba)",
    tipo: "Perro",
    estado: "perdido",
    ubicacionTexto: "El Poblado",
    coordenadas: [6.2086, -75.5677],
    fecha: "Hoy",
    descripcion: "Prueba de conexión.",
    imagen: "🐶",
  }
];

export async function GET() {
  return NextResponse.json(alertasSimple);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validación básica para asegurar que llegan datos
    if (!body) {
      return NextResponse.json({ error: "No llegaron datos" }, { status: 400 });
    }

    console.log("Guardando en servidor:", body);
    alertasSimple.push(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Si falla, devolvemos el error real para verlo en la alerta
    return NextResponse.json({ error: "Error procesando JSON en servidor" }, { status: 500 });
  }
}