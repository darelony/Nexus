import React, { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "🏫" },
    { name: "Students", icon: "👨‍🎓" },
    { name: "Teachers", icon: "👩‍🏫" },
    { name: "Courses", icon: "📚" },
    { name: "News", icon: "📰" },
    { name: "Settings", icon: "⚙️" },
    { name: "Logout", icon: "🚪" },
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Nexus Uni</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeMenu === item.name ? "active" : ""}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="icon">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-content">
        <header>
          <h1>Welcome, Admin 👋</h1>
          <p>Manage your university system from one place.</p>
        </header>

        <section className="admin-cards">
          <div className="admin-card">
            <h3>👨‍🎓 Students</h3>
            <p>View, add, and manage students.</p>
          </div>
          <div className="admin-card">
            <h3>👩‍🏫 Teachers</h3>
            <p>Manage teachers and their courses.</p>
          </div>
          <div className="admin-card">
            <h3>📚 Courses</h3>
            <p>Assign courses and define schedules.</p>
          </div>
          <div className="admin-card">
            <h3>📰 News</h3>
            <p>Post news and announcements.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
