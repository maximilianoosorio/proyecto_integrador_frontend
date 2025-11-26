'use client'

import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { listProducts } from "../services/productService";

export function useProductStore() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (e) {
      setError("Error cargando productos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { products, loading, error, reload: load };
}
