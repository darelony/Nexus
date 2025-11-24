import React, { useState, useEffect } from "react";

export default function StudentGrades() {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // placeholder
    setGrades([
      { id: 1, subject: "Introduction to Programming", grade: 9, date: "2025-06-20" },
      { id: 2, subject: "Business Management", grade: 8, date: "2025-01-15" },
    ]);
  }, []);

  return (
    <div className="card col-12">
      <h3>Ocene i materijali</h3>

      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {grades.map((g) => (
          <div key={g.id} style={{ padding: 12, borderRadius: 10, background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{g.subject}</div>
              <div style={{ color: "#666", fontSize: 13 }}>Datum: {g.date}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{g.grade}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
