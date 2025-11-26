'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <p className="mb-4">Algo salió mal</p>
      <button className="px-3 py-2 rounded bg-black text-white" onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
