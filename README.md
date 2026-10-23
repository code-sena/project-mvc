# project-mvc

Web application for reservation management built with **Next.js (App Router) + React** following the **MVC (Model-View-Controller)** architectural pattern and **MySQL 8.4** database, containerized with **Docker Compose**.

Academic project for **ADSO 3239188 — SENA**.

---

## 1. Project Purpose

Serve as a reference base project for applying software engineering best practices:
- Strict separation of concerns using the **MVC** pattern on Next.js.
- Documentation-driven design (architecture, relational model, UML diagrams, and governance rules before coding).
- Standardized naming conventions per layer (`kebab-case`, `snake_case`, `camelCase`, `PascalCase`), Git branching workflow (`main`, `qa`, `develop`), and **Conventional Commits**.

---

## 2. Modules and Entities

The system is organized into **3 modules** and **6 entities**:

| Module | Entities | Description |
|---|---|---|
| `client` | `person`, `user` | Personal data registration and associated user accounts |
| `location` | `state`, `city` | Geographic catalog of states/departments and cities |
| `reservation` | `reservation-type`, `reservation` | Reservation types and reservations made by a user in a city |

---

## 3. Repository Structure

```text
project-mvc/
├── public/
│   ├── docs/                        # Project technical documentation
│   │   ├── README.md                # Documentation index
│   │   ├── governance/
│   │   │   └── best-practice.md     # Naming, branching, and commit rules
│   │   ├── architecture/
│   │   │   ├── 01-architecture.md   # High-level architecture and containers
│   │   │   ├── 02-relational-model.md
│   │   │   ├── 03-class-diagram.md
│   │   │   ├── 04-use-case-diagram.md
│   │   │   ├── 05-sequence-diagram.md
│   │   │   └── diagrams/            # PlantUML sources (.puml) and graphics (.svg)
│   │   └── model-data/
│   │       └── 01-schema.sql        # MySQL 8.4 DDL script (project_mvc database)
│   ├── img/                         # Public static images
│   └── others/                      # Other public assets
└── src/
    ├── app/                         # Next.js App Router (pages and API routes)
    │   ├── api/                     # REST endpoints (/api/person, /api/user, etc.)
    │   ├── client/                  # Pages for person and user
    │   ├── location/                # Pages for state and city
    │   └── reservation/             # Pages for reservation and reservation-type
    ├── view/                        # View layer (V): React components (lists, forms)
    ├── controller/                  # Controller layer (C): validation and business rules
    ├── model/                       # Model layer (M): entities and MySQL queries
    └── assets/                      # CSS, internal images, and utilities (library)
```

---

## 4. Documentation

All detailed documentation is located in [`public/docs/README.md`](public/docs/README.md):

- **Governance:** [`public/docs/governance/best-practice.md`](public/docs/governance/best-practice.md)
- **Architecture and containers:** [`public/docs/architecture/01-architecture.md`](public/docs/architecture/01-architecture.md)
- **Relational model:** [`public/docs/architecture/02-relational-model.md`](public/docs/architecture/02-relational-model.md)
- **Class diagrams:** [`public/docs/architecture/03-class-diagram.md`](public/docs/architecture/03-class-diagram.md)
- **Use cases:** [`public/docs/architecture/04-use-case-diagram.md`](public/docs/architecture/04-use-case-diagram.md)
- **Sequence diagrams:** [`public/docs/architecture/05-sequence-diagram.md`](public/docs/architecture/05-sequence-diagram.md)
- **SQL Schema (MySQL 8.4):** [`public/docs/model-data/01-schema.sql`](public/docs/model-data/01-schema.sql)

---

## 5. Git Workflow

According to [`best-practice.md`](public/docs/governance/best-practice.md#4-ramas):

1. Working branches are created from `develop` using `<type>/<scope>-<short-description>` (e.g., `docs/architecture-api-spec` or `feat/person-crud`).
2. Commits follow **Conventional Commits** in English and imperative mood:
   ```text
   docs(architecture): define technical decisions and root readme
   db(seed): add initial test records for all modules
   feat(person): add person model and controller
   ```
3. Integration flow: `working branch → develop → qa → main`.
