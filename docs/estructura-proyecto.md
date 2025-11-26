# Guía de estructura del proyecto

Este documento explica, de forma clara y detallada, cómo está organizada la aplicación, el propósito de cada carpeta y cómo se relacionan entre sí dentro del App Router de Next.js.

## Objetivos
- Entender el rol de cada carpeta y archivo.
- Visualizar el flujo de datos desde la UI hasta los servicios/API.
- Facilitar la extensión del proyecto manteniendo coherencia y separación de responsabilidades.

## Visión general
```
my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── error.tsx
│   │   ├── (content)/
│   │   │   ├── products/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx
│   │   │   │   └── not-found.tsx
│   │   └── api/
│   │       └── products/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── features/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductList.tsx
│   │   └── dashboard/
│   │       └── DashboardChart.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── db.ts
│   │   └── actions.ts
│   ├── services/
│   │   ├── apiClient.ts
│   │   ├── productService.ts
│   │   └── authService.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── product.ts
│   │   └── user.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── stores/
│   │   └── useProductStore.ts
│   └── hooks/
│       ├── useAuth.ts
│       └── useProducts.ts
├── public/
│   ├── images/
│   └── opengraph-image.jpg
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Carpeta `app/` (App Router)
- `app/layout.tsx`: Layout raíz que envuelve toda la aplicación, ideal para incluir temas, tipografías y layouts globales. Referencia: `app/layout.tsx:20`.
- `app/page.tsx`: Página raíz (`/`) inicial. Referencia: `app/page.tsx:3`.
- `app/globals.css`: Estilos globales; integra Tailwind. Referencia: `app/globals.css:1`.
- `app/favicon.ico`: Ícono de la aplicación mostrado por el navegador.

### Grupo `(auth)`
- `app/(auth)/layout.tsx`: Layout específico para pantallas de autenticación, centrado y minimalista. Referencia: `app/(auth)/layout.tsx:1`.
- `app/(auth)/login/page.tsx`: Página de login (`/login`). Estructura base para formulario de acceso.
- `app/(auth)/register/page.tsx`: Página de registro (`/register`). Estructura base para alta de usuarios.
- `app/(auth)/error.tsx`: Manejo de errores en el grupo de auth. Cliente, con botón de reintento.

### Grupo `(content)`
- `app/(content)/products/`: Rutas de productos.
  - `layout.tsx`: Layout para sección de productos (espaciado y contenedor). 
  - `page.tsx`: Listado de productos (`/products`).
  - `loading.tsx`: Interfaz de carga para fetching en la ruta de productos.
  - `[id]/page.tsx`: Detalle de producto (`/products/[id]`).
- `app/(content)/dashboard/`: Rutas del dashboard.
  - `page.tsx`: Página principal del dashboard (`/dashboard`).
  - `not-found.tsx`: 404 específico del dashboard.

### API (`app/api`)
- `app/api/products/route.ts`: Ruta API (`/api/products`) que expone `GET` y devuelve productos de ejemplo. Referencia: `app/api/products/route.ts:3`.

## Carpeta `components/`
Componentes reutilizables, globales y atómicos.
- `components/ui/Button.tsx`: Botón básico con estilos por defecto y `forwardRef` para compatibilidad.
- `components/ui/Card.tsx`: Contenedor tipo tarjeta reutilizable.
- `components/layout/Navbar.tsx`: Navegación principal (links a rutas clave).
- `components/layout/Footer.tsx`: Pie de página simple.

## Carpeta `features/`
Componentes por dominio/pantalla, cercanos al caso de uso.
- `features/auth/*`: Formularios de autenticación (`LoginForm`, `RegisterForm`).
- `features/products/*`: Presentación de productos (`ProductCard`, `ProductList`).
- `features/dashboard/*`: UI de panel (`DashboardChart`).

## Carpeta `lib/`
Utilidades compartidas y acciones del servidor.
- `lib/utils.ts`: Utilidades de estilo/concatenación (`cn`).
- `lib/db.ts`: Punto de entrada para conexión/cliente de DB (placeholder).
- `lib/actions.ts`: Server Actions mínimas, pensadas para mutaciones seguras.

## Carpeta `services/`
Capa de acceso a datos/HTTP (fetch/axios), separando UI de IO.
- `services/apiClient.ts`: Cliente HTTP básico (`get`, `post`). Referencia: `services/apiClient.ts:1`.
- `services/productService.ts`: Servicios de productos (listar, obtener por id). Referencias: `services/productService.ts:4`, `services/productService.ts:9`.
- `services/authService.ts`: Servicios de autenticación (login/registro) con datos simulados.

## Carpeta `types/`
Tipos TypeScript compartidos.
- `types/product.ts`: Tipo `Product` para productos.
- `types/user.ts`: Tipo `User` para usuarios.
- `types/index.ts`: Re-exporta tipos para importaciones centralizadas.

## Carpeta `contexts/`
Contextos de React para estado global/control de sesión.
- `contexts/AuthContext.tsx`: Proveedor y hook de autenticación con `login`/`logout`. Referencias: `contexts/AuthContext.tsx:11`, `contexts/AuthContext.tsx:26`.

## Carpeta `stores/`
Stores/Hooks de estado (Zustand, custom hooks). Aquí se usa un hook store.
- `stores/useProductStore.ts`: Hook que gestiona productos, carga inicial y manejo de errores/estado. Referencias: `stores/useProductStore.ts:7`, `stores/useProductStore.ts:12`, `stores/useProductStore.ts:25`.

## Carpeta `hooks/`
Hooks personalizados que envuelven contextos/stores.
- `hooks/useAuth.ts`: Expone el contexto de auth de forma segura.
- `hooks/useProducts.ts`: Expone el store de productos.

## Flujo de datos típico
- UI (`components` y `features`) consume datos vía `hooks` y `contexts`.
- `hooks` consultan `stores` y `services`.
- `services` llaman a rutas API (`app/api/*`) o a DB (`lib/db.ts`).
- Tipos (`types/*`) garantizan consistencia entre capas.

## Convenciones y buenas prácticas
- Separación por capas: UI (components/features), Estado (contexts/stores), Datos (services/api), Utilidades (lib), Tipos (types).
- Rutas: usar grupos `()` para aislar layouts/temas por sección.
- Importaciones absolutas por carpeta cuando se configure `tsconfig` (actualmente relativas).
- Server Actions solo en `lib/actions.ts` o archivos server específicos; evitar usarlas en componentes client.

## Cómo extender
- Nueva ruta de contenido: crear carpeta en `app/(content)/<ruta>/` con `page.tsx` y `layout.tsx` si aplica.
- Nuevo feature: crear subcarpeta en `features/<dominio>/` con componentes UI y conectar con `hooks`/`stores`.
- Nueva API: añadir `app/api/<recurso>/route.ts` con métodos HTTP necesarios.
- Nuevos servicios: crear en `services/` y tipar con `types/*`.

## Referencias rápidas
- Root Layout: `app/layout.tsx:20`
- Home Page: `app/page.tsx:3`
- Tailwind base: `app/globals.css:1`
- Auth Layout: `app/(auth)/layout.tsx:1`
- API Productos (GET): `app/api/products/route.ts:3`
- Auth Context (Provider): `contexts/AuthContext.tsx:11`
- Auth Context (Hook): `contexts/AuthContext.tsx:26`
- Store Productos (hook): `stores/useProductStore.ts:7`
- Carga de productos: `services/productService.ts:4`
- Cliente HTTP: `services/apiClient.ts:1`


