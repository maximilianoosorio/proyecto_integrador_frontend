'use client'

import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="flex flex-col gap-3">
      <input className="border p-2 rounded" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
      <input className="border p-2 rounded" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="px-3 py-2 rounded bg-black text-white" type="submit">Crear cuenta</button>
    </form>
  );
}
