import { get } from "./apiClient";
import { Product } from "../types/product";

export async function listProducts(): Promise<Product[]> {
  const data = await get<{ products: Product[] }>("/api/products");
  return data.products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await listProducts();
  return products.find((p) => p.id === id);
}
