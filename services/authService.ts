import { User } from "../types/user";

export async function login(email: string, password: string): Promise<User> {
  return { id: "1", name: "Usuario", email };
}

export async function register(name: string, email: string, password: string): Promise<User> {
  return { id: "1", name, email };
}
