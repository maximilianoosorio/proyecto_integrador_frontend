export async function get<T>(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  return res.json() as Promise<T>;
}

export async function post<T>(url: string, body: unknown, init?: RequestInit) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...init,
  });
  return res.json() as Promise<T>;
}
