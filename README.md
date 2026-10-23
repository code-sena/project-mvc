# project-mvc

Aplicación web de reservas hecha con **Next.js (App Router) + React** en JavaScript, patrón **MVC**, base de datos **MySQL 8.4** y **Docker Compose**.

## Estado del proyecto

Ya existe el esqueleto ejecutable: la app arranca, se conecta a MySQL y responde en `/api/health`. Los CRUD de cada entidad se construyen por fases, empezando por `person`; mientras tanto las carpetas de `src/` que aún no tienen código conservan su `.gitkeep`.

## Módulos

| Módulo | Entidades |
|---|---|
| client | person, user |
| reservation | reservation, reservation-type |
| location | state, city |
| system | health |

## Estructura

```
project-mvc/
├── public/
│   ├── docs/          documentación (arquitectura, modelo de datos, buenas prácticas)
│   ├── img/
│   └── others/
├── src/
│   ├── app/           rutas: cada page.jsx monta una vista y cada route.js delega en un controlador
│   ├── view/          componentes React (listas y formularios)
│   ├── controller/    validaciones y reglas de negocio
│   ├── model/         estructura de cada entidad y acceso a MySQL
│   └── assets/        css, img, library (pool de MySQL) y others
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── package.json
├── next.config.mjs
└── jsconfig.json
```

## Cómo ejecutar la aplicación

Con Docker (levanta la app y MySQL, y crea las tablas la primera vez):

```bash
cp .env.example .env
docker compose up -d --build
```

Antes del primer arranque cambia las contraseñas de `.env`. Después abre:

- <http://localhost:3000>: página de inicio.
- <http://localhost:3000/api/health>: responde `{"status":"ok","database":"up"}` si la app llega a la base de datos, o `503` si no.

| Comando | Qué hace |
|---|---|
| `docker compose down` | Detiene los servicios. Los datos se conservan en el volumen `mysql-data` |
| `docker compose down -v` | Detiene los servicios y **borra los datos**. Es necesario después de cambiar `01-schema.sql`, porque MySQL solo ejecuta ese script cuando crea el volumen |

Sin Docker: instala MySQL, ejecuta el script de la base de datos, deja `DB_HOST=localhost` en `.env` y usa `npm install` y `npm run dev`.

## Documentación

Todo está en [`public/docs/`](public/docs/README.md):

| Documento | Contenido |
|---|---|
| [Arquitectura](public/docs/architecture/01-architecture.md) | Capas, rutas, contenedores y decisiones tomadas |
| [Modelo relacional](public/docs/architecture/02-relational-model.md) | Tablas, llaves y reglas de borrado |
| [Diagrama de clases](public/docs/architecture/03-class-diagram.md) | Clases del dominio y capas MVC |
| [Casos de uso](public/docs/architecture/04-use-case-diagram.md) | Cliente y Administrador |
| [Diagramas de secuencia](public/docs/architecture/05-sequence-diagram.md) | Flujos principales y códigos de respuesta |
| [Buenas prácticas](public/docs/governance/best-practice.md) | Notaciones, ramas y Conventional Commits |

## Base de datos

El script [`01-schema.sql`](public/docs/model-data/01-schema.sql) crea la base `project_mvc` y sus 6 tablas. Con Docker se ejecuta solo; a mano:

```bash
mysql -u root -p < public/docs/model-data/01-schema.sql
```

El script borra y vuelve a crear las tablas: no se debe ejecutar sobre una base que ya tenga datos.

## Cómo contribuir

- Las ramas de trabajo salen de `develop`, se llaman `<tipo>/<scope>-<descripcion-corta>` y vuelven a `develop` por pull request.
- Flujo: `rama de trabajo → develop → qa → main`. Nunca se hace commit directo en `qa` ni en `main`.
- Los commits siguen Conventional Commits, por ejemplo `feat(person): add person crud`.
- No se sube `.env` ni credenciales.

Las reglas completas y el checklist antes del push están en [best-practice.md](public/docs/governance/best-practice.md).
