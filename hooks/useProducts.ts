'use client'

import { useProductStore } from "../stores/useProductStore";

export function useProducts() {
  return useProductStore();
}
