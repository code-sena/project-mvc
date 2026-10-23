import * as stateModel from "../../model/location/state-model.js";

function isEmpty(text) {
  return !text || text.trim() === "";
}

export async function getAll() {
  const stateList = await stateModel.getAll();
  return { status: 200, body: stateList };
}

export async function getById(id) {
  const state = await stateModel.getById(id);
  if (!state) {
    return { status: 404, body: { error: "State not found" } };
  }
  return { status: 200, body: state };
}

export async function create(data) {
  if (isEmpty(data.postalCode) || isEmpty(data.name)) {
    return { status: 400, body: { error: "postalCode and name are required" } };
  }
  const state = await stateModel.create(
    data.postalCode.trim(),
    data.name.trim(),
    data.description || null
  );
  return { status: 201, body: state };
}

export async function update(id, data) {
  if (isEmpty(data.postalCode) || isEmpty(data.name)) {
    return { status: 400, body: { error: "postalCode and name are required" } };
  }
  const oldState = await stateModel.getById(id);
  if (!oldState) {
    return { status: 404, body: { error: "State not found" } };
  }
  const state = await stateModel.update(
    id,
    data.postalCode.trim(),
    data.name.trim(),
    data.description || null
  );
  return { status: 200, body: state };
}

export async function remove(id) {
  try {
    const deleted = await stateModel.remove(id);
    if (!deleted) {
      return { status: 404, body: { error: "State not found" } };
    }
    return { status: 200, body: { message: "State deleted" } };
  } catch (error) {
    // The database does not allow deleting a state that has cities
    return { status: 409, body: { error: "This state has cities and cannot be deleted" } };
  }
}
