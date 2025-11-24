import React, { useState } from "react";

export default function TeacherStudents() {
  const [students, setStudents] = useState([
    { id: 1, name: "Marko Marković", index: "2024/001" },
    { id: 2, name: "Ana Petrović", index: "2024/002" },
    { id: 3, name: "Ivan Ivić", index: "2024/003" },
  ]);

  const [filter, setFilter] = useState("");

  const filtered = students.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="card col-12">
      <h3>Prijavljeni studenti</h3>
      <input 
        type="text" 
        placeholder="Pretraga po imenu" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "6px", marginBottom: "12px", width: "100%", borderRadius: "6px" }}
      />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Indeks</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
