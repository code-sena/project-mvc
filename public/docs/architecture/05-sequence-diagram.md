# Diagramas de secuencia

Todos los flujos recorren las mismas capas: **view → route (API) → controller → model → MySQL**.

## Registrar persona

Valida los datos y que el email no esté repetido.

![Secuencia: registrar persona](diagrams/08-sequence-create-person.svg)

## Crear usuario

Valida que la Person exista y guarda la contraseña con hash.

![Secuencia: crear usuario](diagrams/09-sequence-create-user.svg)

## Crear reserva

Valida que existan el User, el ReservationType y la City.

![Secuencia: crear reserva](diagrams/10-sequence-create-reservation.svg)

## Crear ciudad

Valida que exista el State.

![Secuencia: crear ciudad](diagrams/11-sequence-create-city.svg)

## Create State

Validates required fields (`postalCode` and `name`) and inserts the record.

![Sequence: create state](diagrams/12-sequence-create-state.svg)

## Create Reservation Type

Validates required fields and checks that the reservation type `name` is not duplicated.

![Sequence: create reservation type](diagrams/13-sequence-create-reservation-type.svg)

## Delete Record (Foreign Key Constraint)

Verifies that the record exists and handles the `ON DELETE RESTRICT` constraint when child records are associated.

![Sequence: delete record](diagrams/14-sequence-delete-entity.svg)

## Códigos de respuesta usados

| Código | Cuándo |
|---|---|
| 200 OK | Successful query, update, or deletion completed |
| 201 Created | Registro creado |
| 400 Bad Request | Datos inválidos o incompletos |
| 404 Not Found | La llave foránea apunta a un registro que no existe |
| 409 Conflict | Duplicate unique value (`email`, `username`, `name`) or parent record with associated child records (`ON DELETE RESTRICT`) |
