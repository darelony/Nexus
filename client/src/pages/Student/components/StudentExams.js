import React, { useEffect, useState } from "react";

export default function StudentExams() {
  const [periods, setPeriods] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // placeholders: load exam periods
    setPeriods([
      { id: "jan", name: "Januarski rok", date: "2026-01-15" },
      { id: "apr", name: "Aprilsky rok", date: "2026-04-10" },
    ]);
    setApplications([]);
  }, []);

  function apply(period, subject) {
    // validate date logic on server ideally; placeholder local
    const today = new Date();
    const examDate = new Date(period.date);
    const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 7) {
      alert("Rok je preblizu, prijava nije moguća (manje od 7 dana).");
      return;
    }
    setApplications((s) => [...s, { period: period.name, subject }]);
    alert("Prijava uspešna (placeholder).");
  }

  return (
    <div style={{ display: "contents" }}>
      <div className="card col-8">
        <h3>Aktivni rokovi</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {periods.map((p) => (
            <div key={p.id} style={{ padding: 12, borderRadius: 10, background: "#fff" }}>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ color: "#666", marginTop: 6 }}>Datum: {p.date}</div>
              <div style={{ marginTop: 8 }}>
                <button className="btn-primary" onClick={() => apply(p, "Introduction to Programming")}>Prijavi ispit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card col-4">
        <h3>Moje prijave</h3>
        <ul className="list-compact">
          {applications.length === 0 && <li>Nemate prijava.</li>}
          {applications.map((a, i) => (
            <li key={i}>{a.subject} — {a.period}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
