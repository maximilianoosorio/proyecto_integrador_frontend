import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 🔵 DEFINIMOS LAS RUTAS PÚBLICAS
// (Aquí agregamos tus páginas para que la gente pueda verlas sin loguearse)
const isPublicRoute = createRouteMatcher([
  '/',                // Inicio
  '/login(.*)',       // Login de Clerk
  '/register(.*)',    // Registro de Clerk
  '/mapa(.*)',        // Mapa (Queremos que sea público)
  '/alertas(.*)',     // Alertas (Público para difundir)
  '/cuidado(.*)',     // Consejos (Público)
  '/api/public(.*)'   // Tus APIs públicas
]);

export default clerkMiddleware(async (auth, req) => { // 1. Agregamos 'async' aquí
  // Si la ruta NO es pública, obligamos a iniciar sesión
  if (!isPublicRoute(req)) {
    await auth.protect(); // 2. Agregamos 'await' aquí
  }
});

export const config = {
  matcher: [
    // Esta expresión regular es la recomendada por Clerk para no bloquear archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecutar para rutas API
    '/(api|trpc)(.*)',
  ],
};