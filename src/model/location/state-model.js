import db from "../../assets/library/db.js";

// Changes the column names (snake_case) to JavaScript names (camelCase)
function toState(row) {
  return {
    id: row.id,
    postalCode: row.postal_code,
    name: row.name,
    description: row.description,
  };
}

export async function getAll() {
  const [rows] = await db.query("SELECT * FROM state");
  return rows.map(toState);
}

export async function getById(id) {
  const [rows] = await db.query("SELECT * FROM state WHERE id = ?", [id]);
  if (rows.length === 0) return null;
  return toState(rows[0]);
}

export async function create(postalCode, name, description) {
  const [result] = await db.query(
    "INSERT INTO state (postal_code, name, description) VALUES (?, ?, ?)",
    [postalCode, name, description]
  );
  return getById(result.insertId);
}

export async function update(id, postalCode, name, description) {
  await db.query(
    "UPDATE state SET postal_code = ?, name = ?, description = ? WHERE id = ?",
    [postalCode, name, description, id]
  );
  return getById(id);
}

export async function remove(id) {
  const [result] = await db.query("DELETE FROM state WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
