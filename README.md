# project-mvc

Aplicación web de gestión de reservas desarrollada con **Next.js (App Router) + React** bajo el patrón arquitectónico **MVC (Modelo-Vista-Controlador)** y base de datos **MySQL 8.4**, contenerizada con **Docker Compose**.

Proyecto académico de la ficha **ADSO 3239188 — SENA**.

---

## 1. Propósito del proyecto

Servir como proyecto base de referencia para aplicar buenas prácticas de ingeniería de software:
- Separación estricta de responsabilidades con el patrón **MVC** sobre Next.js.
- Diseño guiado por documentación (arquitectura, modelo relacional, diagramas UML y reglas de gobernanza antes de codificar).
- Estandarización de nomenclatura por capa (`kebab-case`, `snake_case`, `camelCase`, `PascalCase`), flujo de ramas (`main`, `qa`, `develop`) y **Conventional Commits**.

---

## 2. Módulos y entidades

El sistema se divide en **3 módulos** y **6 entidades**:

| Módulo | Entidades | Descripción |
|---|---|---|
| `client` | `person`, `user` | Registro de datos personales y cuentas de usuario asociadas |
| `location` | `state`, `city` | Catálogo geográfico de departamentos/estados y ciudades |
| `reservation` | `reservation-type`, `reservation` | Tipos de reserva y reservas realizadas por un usuario en una ciudad |

---

## 3. Estructura del repositorio

```text
project-mvc/
├── public/
│   ├── docs/                        # Documentación técnica del proyecto
│   │   ├── README.md                # Índice de la documentación
│   │   ├── governance/
│   │   │   └── best-practice.md     # Reglas de nombres, ramas y commits
│   │   ├── architecture/
│   │   │   ├── 01-architecture.md   # Arquitectura de alto nivel y contenedores
│   │   │   ├── 02-relational-model.md
│   │   │   ├── 03-class-diagram.md
│   │   │   ├── 04-use-case-diagram.md
│   │   │   ├── 05-sequence-diagram.md
│   │   │   └── diagrams/            # Fuentes PlantUML (.puml) y gráficos (.svg)
│   │   └── model-data/
│   │       └── 01-schema.sql        # Script DDL de MySQL 8.4 (base project_mvc)
│   ├── img/                         # Imágenes públicas estáticas
│   └── others/                      # Otros recursos públicos
└── src/
    ├── app/                         # Enrutador de Next.js (páginas y API routes)
    │   ├── api/                     # Endpoints REST (/api/person, /api/user, etc.)
    │   ├── client/                  # Páginas de person y user
    │   ├── location/                # Páginas de state y city
    │   └── reservation/             # Páginas de reservation y reservation-type
    ├── view/                        # Capa Vista (V): componentes React (listas, formularios)
    ├── controller/                  # Capa Controlador (C): validaciones y reglas de negocio
    ├── model/                       # Capa Modelo (M): entidades y consultas SQL a MySQL
    └── assets/                      # CSS, imágenes internas y utilidades (library)
```

---

## 4. Documentación

Toda la documentación detallada se encuentra en [`public/docs/README.md`](public/docs/README.md):

- **Gobernanza:** [`public/docs/governance/best-practice.md`](public/docs/governance/best-practice.md)
- **Arquitectura y contenedores:** [`public/docs/architecture/01-architecture.md`](public/docs/architecture/01-architecture.md)
- **Modelo relacional:** [`public/docs/architecture/02-relational-model.md`](public/docs/architecture/02-relational-model.md)
- **Diagramas de clases:** [`public/docs/architecture/03-class-diagram.md`](public/docs/architecture/03-class-diagram.md)
- **Casos de uso:** [`public/docs/architecture/04-use-case-diagram.md`](public/docs/architecture/04-use-case-diagram.md)
- **Diagramas de secuencia:** [`public/docs/architecture/05-sequence-diagram.md`](public/docs/architecture/05-sequence-diagram.md)
- **Esquema SQL (MySQL 8.4):** [`public/docs/model-data/01-schema.sql`](public/docs/model-data/01-schema.sql)

---

## 5. Flujo de trabajo con Git

Según [`best-practice.md`](public/docs/governance/best-practice.md#4-ramas):

1. Las ramas de trabajo se crean a partir de `develop` usando `<tipo>/<scope>-<descripcion-corta>` (por ejemplo, `docs/architecture-api-spec` o `feat/person-crud`).
2. Los commits siguen **Conventional Commits** en inglés y en modo imperativo:
   ```text
   docs(architecture): define technical decisions and root readme
   db(seed): add initial test records for all modules
   feat(person): add person model and controller
   ```
3. El flujo de integración es: `rama de trabajo → develop → qa → main`.
