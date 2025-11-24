import React, { useState } from "react";

export default function StudentProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    index: user?.index || "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    // TODO: call backend to update profile
    // await fetch("/api/student/profile", { method: "PUT", body: JSON.stringify(form) })
    setEditing(false);
    alert("Profil sačuvan (placeholder)");
  }

  return (
    <div className="card col-8">
      <h3>Osnovne informacije</h3>

      <div style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 12 }}>
        <div style={{ width: 110 }}>
          <img src="/avatar.png" alt="avatar" style={{ width: 110, borderRadius: 12 }} />
        </div>

        <div style={{ flex: 1 }}>
          {!editing ? (
            <>
              <div style={{ fontWeight: 700 }}>{form.name}</div>
              <div style={{ color: "#666", marginTop: 6 }}>{form.email}</div>
              <div style={{ color: "#666", marginTop: 6 }}>Index: {form.index}</div>
              <div style={{ marginTop: 12 }}>
                <button className="btn-primary" onClick={() => setEditing(true)}>Izmeni profil</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSave}>
              <div style={{ display: "grid", gap: 8 }}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Ime" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon" />
                <div style={{ marginTop: 8 }}>
                  <button className="btn-primary" type="submit">Sačuvaj</button>
                  <button style={{ marginLeft: 8 }} onClick={() => setEditing(false)}>Otkaži</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
