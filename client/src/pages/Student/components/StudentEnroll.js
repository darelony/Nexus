import React, { useEffect, useState } from "react";

export default function StudentEnroll() {
  const [available, setAvailable] = useState([]);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    // load available and enrolled (placeholders)
    setAvailable([
      { id: 1, name: "Networks" },
      { id: 2, name: "Databases" },
      { id: 3, name: "Operating Systems" },
    ]);
    setEnrolled([{ id: 99, name: "Introduction to Programming" }]);
  }, []);

  async function enrollCourse(course) {
    // call backend to insert in enrollments (placeholder)
    const already = enrolled.find((e) => e.id === course.id);
    if (already) {
      alert("Već si upisan na ovaj predmet.");
      return;
    }
    // TODO: post to /api/student/enroll
    setEnrolled((s) => [...s, course]);
    alert("Predmet je dodat u tvoj plan (placeholder).");
  }

  return (
    <div style={{ display: "contents" }}>
      <div className="card col-8">
        <h3>Upisani predmeti</h3>
        <ul className="list-compact">
          {enrolled.map((e) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
      </div>

      <div className="card col-4">
        <h3>Dostupni predmeti</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {available.map((a) => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>{a.name}</div>
              <button className="btn-primary" onClick={() => enrollCourse(a)}>Upiši</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
