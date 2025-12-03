const API_URL = "https://692070e131e684d7bfcd11ec.mockapi.io/mascotas";

export async function obtenerAlertas() {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Error al consultar las alertas.");

  return await res.json();
}

export async function crearAlerta(mascota: any) {
  const body = {
    nombre: mascota.nombre,
    raza: mascota.raza || "string",
    edad: mascota.edad || "0",
    foto: mascota.imagen || mascota.foto || "",
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("Error al guardar en MockAPI");

  return await res.json();
}

export async function eliminarAlerta(id: string) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
