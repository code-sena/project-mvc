"use client";
import { useEffect, useState } from "react";

export default function StateList() {
  const [stateList, setStateList] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  async function loadStates() {
    const response = await fetch("/api/state");
    const data = await response.json();
    if (response.ok) {
      setStateList(data);
    } else {
      setError("Could not load the states");
    }
  }

  useEffect(() => {
    loadStates();
  }, []);

  function clearForm() {
    setPostalCode("");
    setName("");
    setDescription("");
    setEditingId(null);
    setError("");
  }

  // Puts the data of the state in the form to edit it
  function handleEdit(state) {
    setEditingId(state.id);
    setPostalCode(state.postalCode);
    setName(state.name);
    setDescription(state.description || "");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // If there is an id we are editing (PUT), if not we are creating (POST)
    let url = "/api/state";
    let method = "POST";
    if (editingId) {
      url = "/api/state/" + editingId;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postalCode, name, description }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }
    clearForm();
    loadStates();
  }

  async function handleDelete(id) {
    const response = await fetch("/api/state/" + id, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }
    setError("");
    loadStates();
  }

  return (
    <main>
      <h1>States</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Postal code"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">{editingId ? "Save" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {stateList.map((state) => (
          <li key={state.id}>
            {state.postalCode} - {state.name} ({state.description}){" "}
            <button onClick={() => handleEdit(state)}>Edit</button>
            <button onClick={() => handleDelete(state.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
