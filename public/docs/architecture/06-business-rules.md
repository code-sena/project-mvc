# Reglas de negocio

Reglas que no se pueden expresar solo con restricciones de la base de datos y que, por lo tanto, debe validar el **controlador** antes de llamar al modelo. Esto complementa el modelo relacional ([02-relational-model.md](02-relational-model.md)), que cubre las restricciones a nivel de esquema (PK, FK, UNIQUE).

## Convención general

- Un controlador nunca deja pasar una petición inválida al modelo: valida primero, y si falla responde `400` (datos inválidos) o `409` (conflicto, como un borrado bloqueado) con un mensaje claro, sin exponer el error crudo de MySQL.
- "Eliminar" siempre es borrado lógico (`deleted_at`), nunca `DELETE` físico. Ver [02-relational-model.md#borrado-lógico](02-relational-model.md).
- Toda lectura (`GET`) filtra `deleted_at IS NULL` salvo que el caso de uso pida ver inactivos explícitamente.

## Módulo client

| Regla | Entidad | Detalle |
|---|---|---|
| Email único entre activos | person | Ya cubierto por restricción de BD (`uk_person_email` sobre la columna generada) |
| Una persona, un usuario | user | `person_id` es único entre usuarios activos; si la persona ya tiene usuario activo, crear uno nuevo devuelve `409` |
| No borrar persona con usuario activo | person | Antes de poner `deleted_at` en `person`, el controlador verifica que no exista un `user` activo con ese `person_id` |
| Password nunca en texto plano | user | Se hashea (`assets/library/hash-password.js`) antes de guardar; nunca se devuelve en las respuestas de la API, ni siquiera el hash |

## Módulo location

| Regla | Entidad | Detalle |
|---|---|---|
| No borrar state con city activa | state | Antes de poner `deleted_at` en `state`, verificar que no haya `city` activa con ese `state_id` |
| No borrar city con reservation activa | city | Antes de poner `deleted_at` en `city`, verificar que no haya `reservation` activa con ese `city_id` |
| postal_code solo dígitos | state, city | Formato validado en el controlador antes de insertar |

## Módulo reservation

| Regla | Entidad | Detalle |
|---|---|---|
| No borrar reservation_type en uso | reservation_type | Antes de poner `deleted_at`, verificar que no haya `reservation` activa con ese `reservation_type_id` |
| Fecha de reserva futura | reservation | `reservation_date` debe ser mayor a la fecha/hora actual al momento de crear la reserva |
| Entidades referenciadas activas | reservation | `user_id`, `reservation_type_id` y `city_id` deben existir y estar activos (`deleted_at IS NULL`); si alguno está borrado, `400` |

## Por qué en el controlador y no solo en la base de datos

`ON DELETE RESTRICT` ya evita borrar un padre con hijos **físicamente**, pero con borrado lógico ese `RESTRICT` nunca se dispara (no hay `DELETE` real). Por eso cada regla de "no borrar si tiene hijos activos" se vuelve responsabilidad explícita del controlador: es la única capa que sabe distinguir un hijo activo de uno ya borrado.
