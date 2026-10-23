# Modelo relacional (MR)

Nombres según [best-practice.md](../governance/best-practice.md#34-base-de-datos-mysql): tablas y columnas en `snake_case`, minúsculas y singular. El script está en [`../model-data/01-schema.sql`](../model-data/01-schema.sql).

## Diagrama

![Modelo relacional](diagrams/02-relational-model.svg)

> El `.puml` ya incluye `created_at`/`updated_at`/`deleted_at` y las marcas `UK*`; el `.svg` está pendiente de regenerar con `java -jar plantuml.jar -tsvg diagrams/02-relational-model.puml` (ver [README.md](../README.md)).

## Columnas comunes a todas las tablas

Además de sus columnas propias, **las 6 tablas** incluyen:

| Columna | Tipo | Restricción |
|---|---|---|
| created_at | DATETIME | NOT NULL, `DEFAULT CURRENT_TIMESTAMP` |
| updated_at | DATETIME | NOT NULL, se actualiza sola en cada `UPDATE` |
| deleted_at | DATETIME | NULL mientras el registro está activo |

No se omiten en las tablas de abajo para no repetirlas en cada fila.

## Tablas

### Módulo client

| Tabla | Columna | Tipo | Restricción |
|---|---|---|---|
| person | id | INT | PK, autoincremental |
| person | name | VARCHAR(100) | NOT NULL |
| person | email | VARCHAR(150) | NOT NULL, UNIQUE entre los activos |
| person | phone | VARCHAR(20) | |
| user | id | INT | PK, autoincremental |
| user | username | VARCHAR(50) | NOT NULL, UNIQUE entre los activos |
| user | password | VARCHAR(255) | NOT NULL (se guarda el hash) |
| user | person_id | INT | NOT NULL, FK → person.id, UNIQUE entre los activos |

### Módulo reservation

| Tabla | Columna | Tipo | Restricción |
|---|---|---|---|
| reservation_type | id | INT | PK, autoincremental |
| reservation_type | name | VARCHAR(50) | NOT NULL, UNIQUE entre los activos |
| reservation_type | description | VARCHAR(255) | |
| reservation | id | INT | PK, autoincremental |
| reservation | name | VARCHAR(100) | NOT NULL |
| reservation | user_id | INT | NOT NULL, FK → user.id |
| reservation | reservation_type_id | INT | NOT NULL, FK → reservation_type.id |
| reservation | city_id | INT | NOT NULL, FK → city.id |
| reservation | reservation_date | DATETIME | NOT NULL, debe ser una fecha futura (validado en el controlador) |

### Módulo location

| Tabla | Columna | Tipo | Restricción |
|---|---|---|---|
| state | id | INT | PK, autoincremental |
| state | postal_code | VARCHAR(10) | NOT NULL |
| state | name | VARCHAR(100) | NOT NULL |
| state | description | VARCHAR(255) | |
| city | id | INT | PK, autoincremental |
| city | postal_code | VARCHAR(10) | NOT NULL |
| city | name | VARCHAR(100) | NOT NULL |
| city | description | VARCHAR(255) | |
| city | state_id | INT | NOT NULL, FK → state.id |

## Borrado lógico

Ninguna capa de la aplicación ejecuta `DELETE` físico: "eliminar" un registro significa poner `deleted_at = NOW()`. Las lecturas (`GET`) filtran siempre `WHERE deleted_at IS NULL`, salvo que el caso de uso pida explícitamente ver inactivos (por ejemplo, una vista de auditoría para el administrador).

Para que un email, un username, un nombre de tipo de reserva o una persona con usuario se puedan reutilizar después de un borrado lógico, los `UNIQUE` de `person.email`, `user.username`, `user.person_id` y `reservation_type.name` no se aplican sobre la columna directa sino sobre una **columna generada** (`<columna>_active`) que vale `NULL` cuando `deleted_at` no es `NULL`. MySQL no restringe los `NULL` en un `UNIQUE`, así que dos registros borrados pueden compartir el mismo email sin violar la restricción. El detalle está en [`../model-data/01-schema.sql`](../model-data/01-schema.sql).

La relación `ON DELETE RESTRICT` de las llaves foráneas sigue existiendo como defensa adicional, pero en la práctica no debería activarse nunca: el controlador debe impedir el borrado lógico de un padre con hijos activos *antes* de llegar a la base de datos, para poder devolver un mensaje de error claro en vez de un error de MySQL.

## Relaciones

| Relación | Cardinalidad | Regla al borrar |
|---|---|---|
| person → user | 1 : N | No se borra una person que tenga user |
| user → reservation | 1 : N | No se borra un user que tenga reservation |
| reservation_type → reservation | 1 : N | No se borra un tipo en uso |
| state → city | 1 : N | No se borra un state que tenga city |
| city → reservation | 1 : N | No se borra una city que tenga reservation |

## Observaciones

- **`user.username`:** en el modelo original la columna se llamaba `User`, igual que la tabla. Se renombró a `username` para no repetir el nombre de la tabla en la columna (`user.user`).
- **Person → User es 1 : 1.** `user.person_id` tiene `UNIQUE` además de la FK, ya que cada persona solo puede tener un usuario.
- **`reservation.city_id` conecta el módulo reservation con location:** cada reserva se hace en una ciudad.
- **Motor: MySQL 8.4.** Las tablas usan InnoDB y utf8mb4 para que las llaves foráneas funcionen y se acepten tildes y ñ.
- **Minúsculas obligatorias:** MySQL en Linux (Docker) distingue mayúsculas en los nombres de tabla.
- **`reservation.reservation_date` vs `created_at`:** `created_at` registra cuándo se creó el registro de la reserva; `reservation_date` es la fecha para la que se reserva. Son conceptos distintos y ambas columnas conviven en la tabla.
