import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Import komponenata
import Users from "./Users";
import Courses from "./Courses";
import Announcements from "./Announcements";
import Teachers from "./Teachers";

export default function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate(); // << Obavezno ovde

  const menuItems = [
    { name: "Dashboard", icon: "🏫" },
    { name: "Students", icon: "👨‍🎓" },
    { name: "Teachers", icon: "👩‍🏫" },
    { name: "Courses", icon: "📚" },
    { name: "News", icon: "📰" },
    { name: "Settings", icon: "⚙️" },
    { name: "Logout", icon: "🚪" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // koristi navigate ovde
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Nexus University</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeMenu === item.name ? "active" : ""}
              onClick={() => {
                if (item.name === "Logout") {
                  handleLogout(); // << ovde poziva logout
                } else {
                  setActiveMenu(item.name);
                }
              }}
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
          <p>Manage your shcools university system from one place.</p>
        </header>

        {activeMenu === "Dashboard" && (
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
        )}

        {activeMenu === "Students" && <Users />}
        {activeMenu === "Teachers" && <Teachers />}
        {activeMenu === "Courses" && <Courses />}
        {activeMenu === "News" && <Announcements />}
      </main>
    </div>
  );
}
