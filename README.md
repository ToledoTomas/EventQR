# EventQR

Boilerplate del Sprint 0 para organizar eventos gratuitos. Incluye navegación pública y privada, pantallas iniciales, formularios de acceso y registro con Supabase Auth. La gestión de eventos, inscripciones y códigos QR todavía no está implementada.

## Requisitos

- Node.js 24.15 o superior (compatible con Angular 22)
- npm 11 o superior
- Un proyecto Supabase para probar la autenticación; no hace falta para abrir las páginas públicas
- Docker si querés levantar Supabase localmente

## Instalación y desarrollo

```bash
npm install
npm start
```

Abrí `http://localhost:4200`. Sin credenciales de Supabase, las páginas públicas se muestran y el formulario indica que falta configuración.

## Configurar Supabase Auth

1. En Supabase, obtené **Project URL** y **publishable key** desde la configuración de API del proyecto. Nunca uses una secret key o `service_role` en el frontend.
2. Completá `supabaseUrl` y `supabasePublishableKey` en `src/environments/environment.ts`. Este archivo tiene valores vacíos para que el proyecto arranque sin credenciales. No subas datos privados.
3. En la configuración de Auth de Supabase, agregá `http://localhost:4200` como Site URL y URL de redirección. Si la confirmación de correo está activa, la pantalla de registro pedirá revisar el correo; luego se puede ingresar.

El SDK de Supabase gestiona la sesión. Las rutas `/dashboard` se protegen con un guard, pero la seguridad de los datos futuros deberá implementarse con RLS en la base.

Para Supabase local:

```bash
npx supabase start
npx supabase stop
```

La configuración local está en `supabase/config.toml`. Las futuras migraciones SQL irán en `supabase/migrations/` y se podrán generar con `npx supabase migration new nombre`. Sprint 0 no crea tablas ni políticas.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | Angular ESLint |
| `npm run test:ci` | Pruebas Vitest, ejecución única |

En el entorno restringido usado para preparar este Sprint 0, `ng test` y `ng serve` pueden fallar antes de ejecutar código con `Cannot read directory "../../..": Access is denied` al resolver rutas del workspace. `ng build`, `ng lint` y el chequeo TypeScript de los tests sí se pudieron ejecutar. Probá `npm run test:ci` y `npm start` en una terminal local con acceso normal al sistema de archivos.

## Rutas

Públicas: `/`, `/login`, `/register`, `/events/:slug` y página 404. Privadas: `/dashboard`, `/dashboard/events`, `/dashboard/events/new` y `/dashboard/check-in`.

## Alcance pendiente

El CRUD de eventos, las inscripciones, las entradas QR y el check-in se implementarán en sprints posteriores. Las pantallas actuales muestran explícitamente que esas funciones aún no están disponibles.
