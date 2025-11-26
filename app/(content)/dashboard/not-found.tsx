import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6">
      <p>No encontrado</p>
      <Link className="text-blue-600" href="/">Volver</Link>
    </div>
  );
}
