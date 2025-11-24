import React from "react";

export default function TeacherSidebar({ active, setActive }) {
  const tabs = [
    { id: "mojiPredmeti", label: "📚 Moji predmeti" },
    { id: "materijali", label: "📂 Materijali" },
    { id: "prijavljeniStudenti", label: "🧑‍🎓 Prijavljeni studenti" },
    { id: "unosOcena", label: "📝 Unos ocena" },
    { id: "obavestenja", label: "📢 Obaveštenja" },
  ];

  return (
    <aside className="teacher-side">
      <div className="teacher-brand">
        <img src="/logo.png" alt="Nexus" className="teacher-logo" />
        <div className="teacher-brand-title">
          <div className="t-brand-main">Nexus</div>
          <div className="t-brand-sub">Profesor Panel</div>
        </div>
      </div>

      <nav className="teacher-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-btn ${active === tab.id ? "active" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}

        <div className="nav-spacer" />

        <button
          className="nav-btn logout"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }}
        >
          🚪 Odjava
        </button>
      </nav>

      <div className="side-footer">
        <small>© {new Date().getFullYear()} Nexus University</small>
      </div>
    </aside>
  );
}
