import React, { useEffect, useState } from "react";

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        if (!res.ok) {
          setSubjects([
            { id: 1, name: "Introduction to Programming", teacher: "Dr. Ilić", desc: "Basics of programming." },
            { id: 2, name: "Business Management", teacher: "Prof. Petrović", desc: "Business fundamentals." }
          ]);
        } else {
          const data = await res.json();
          setSubjects(data);
        }
      } catch (err) {
        setSubjects([
          { id: 1, name: "Introduction to Programming", teacher: "Dr. Ilić", desc: "Basics of programming." },
          { id: 2, name: "Business Management", teacher: "Prof. Petrović", desc: "Business fundamentals." }
        ]);
      }
    }
    load();
  }, []);

  return (
    <div className="card col-12">
      <h3>Lista predmeta</h3>
      <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
        {subjects.map((s) => (
          <div key={s.id} style={{ padding: 12, borderRadius: 10, background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 6px 16px rgba(20,20,20,0.04)" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{s.name}</div>
              <div style={{ color: "#666", fontSize: 13 }}>{s.teacher}</div>
              <div style={{ marginTop: 6 }}>{s.desc}</div>
            </div>
            <div>
              <button className="btn-primary" onClick={() => alert("Open materials (placeholder)")}>Pogledaj</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
