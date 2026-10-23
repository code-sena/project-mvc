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

## Crear departamento

Valida los datos obligatorios (`postalCode` y `name`) e inserta el registro.

![Secuencia: crear departamento](diagrams/12-sequence-create-state.svg)

## Crear tipo de reserva

Valida los datos y que el nombre del tipo de reserva (`name`) no esté repetido.

![Secuencia: crear tipo de reserva](diagrams/13-sequence-create-reservation-type.svg)

## Eliminar registro (restricción foránea)

Verifica que el registro exista y maneja la restricción `ON DELETE RESTRICT` cuando tiene registros hijos asociados.

![Secuencia: eliminar registro](diagrams/14-sequence-delete-entity.svg)

## Códigos de respuesta usados

| Código | Cuándo |
|---|---|
| 200 OK | Consulta exitosa, actualización o eliminación completada |
| 201 Created | Registro creado |
| 400 Bad Request | Datos inválidos o incompletos |
| 404 Not Found | El registro buscado o la llave foránea apunta a un registro que no existe |
| 409 Conflict | Valor único repetido (email, username, name) o registro padre con hijos asociados (`ON DELETE RESTRICT`) |
