import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔵 RUTAS PÚBLICAS (no requieren login)
const publicRoutes = createRouteMatcher([
  "/",
  "/login",
  "/register",
  "/api/public/(.*)"
]);

// 🔴 RUTAS PRIVADAS (requieren login sí o sí)
const privateRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/perfil(.*)",
  "/carrito(.*)",
  "/productos(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // Si la ruta es privada → proteger
  if (privateRoutes(req)) {
    auth.protect();
  }

  // Si es pública → permitir acceso sin login
  if (publicRoutes(req)) {
    return;
  }

  // Todo lo que NO sea público ni privado → considerar privado por seguridad
  auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/"
  ]
};
