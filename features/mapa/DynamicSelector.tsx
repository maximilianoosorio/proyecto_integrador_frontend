"use client";
import dynamic from "next/dynamic";

const DynamicSelector = dynamic(() => import("./MapSelector"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg">Cargando selector...</div>,
});

export default DynamicSelector;