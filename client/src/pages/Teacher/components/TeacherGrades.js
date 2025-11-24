import React, { useState } from "react";

export default function TeacherGrades() {
  const [grades, setGrades] = useState([
    { id: 1, student: "Marko Marković", index: "2024/001", grade: "" },
    { id: 2, student: "Ana Petrović", index: "2024/002", grade: "" },
  ]);

  const handleChange = (id, value) => {
    setGrades(grades.map(g => g.id === id ? { ...g, grade: value } : g));
  };

  return (
    <div className="card col-12">
      <h3>Unos ocena</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Indeks</th>
            <th>Ocena</th>
          </tr>
        </thead>
        <tbody>
          {grades.map(g => (
            <tr key={g.id}>
              <td>{g.student}</td>
              <td>{g.index}</td>
              <td>
                <input 
                  type="text" 
                  value={g.grade} 
                  onChange={(e) => handleChange(g.id, e.target.value)}
                  style={{ padding: "4px", width: "60px", textAlign: "center", borderRadius: "4px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-primary" style={{ marginTop: "12px" }}>Sačuvaj ocene</button>
    </div>
  );
}
