import React, { useState } from "react";
import "./LoginPage.css";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (err) {
      setMsg("Server error, please try again later.");
    }
  }

  return (
    <div className="book-wrapper">

      <div className="book-card">

        {/* LEFT PAGE */}
        <div className="book-left">
          <div className="nx-left-inner">
            <img src="/logo.png" className="book-logo" alt="Nexus" />

            <p className="nx-left-subtitle">
              Password recovery made simple
            </p>
          </div>
        </div>

        {/* BOOK SPINE */}
        <div className="book-spine"></div>

        {/* RIGHT PAGE */}
        <div className="book-right">
          <h2 className="book-title">Forgot Password</h2>

          <form className="book-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="book-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="book-btn" type="submit">
              Send reset link
            </button>

            {msg && <div className="book-msg">{msg}</div>}
          </form>

          <p className="book-signup">
            Remembered your password? <a href="/login">Log in</a>
          </p>
        </div>

      </div>

    </div>
  );
}
