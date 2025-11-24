import React, { useState } from "react";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");        
    setLoading(true);  

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        
        setMsg(data.error || "Login failed");
        return;
      }

      
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setMsg("Login successful!");

      
      setTimeout(() => {
       if (data.role === "admin") {
    window.location.href = "/admin";
      } else if (data.role === "student") {
    window.location.href = "/student";
      } else if (data.role === "teacher") {
    window.location.href = "/teacher";
      } else {
    window.location.href = "/";
  }
}, 1000);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setMsg("Server error");
    }
  };

  return (
    <div className="book-wrapper">
      <div className="book-card">

        {/* LEFT PAGE */}
        <div className="book-left">
          <div className="nx-left-inner">
            <img src="/logo.png" alt="Nexus University" className="book-logo" />
            <p className="nx-left-subtitle">
              Where knowledge becomes legacy
            </p>
          </div>
        </div>

        {/* BOOK SPINE */}
        <div className="book-spine"></div>

        {/* RIGHT PAGE */}
        <div className="book-right">
          <h2 className="book-title">Login</h2>

          <form className="book-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="book-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="book-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <a href="/forgot-password" className="book-forgot">
              Forgot password?
            </a>

            <button className="book-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {msg && (
            <p
              className={`login-msg ${
                msg.toLowerCase().includes("successful") ? "success" : "error"
              }`}
            >
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
