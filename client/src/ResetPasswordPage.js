import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./LoginPage.css";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setMsg("⚠️ Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (err) {
      setMsg("Server error, try again later");
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
              Create your new secure password.
            </p>
          </div>
        </div>

        {/* BOOK SPINE */}
        <div className="book-spine"></div>

        {/* RIGHT PAGE */}
        <div className="book-right">
          <h2 className="book-title">Reset Password</h2>

          <form className="book-form" onSubmit={handleSubmit}>
            <input
              type="password"
              className="book-input"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="book-input"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button className="book-btn" type="submit">
              Save new password
            </button>

            {msg && <div className="book-msg">{msg}</div>}
          </form>
        </div>

      </div>

    </div>
  );
}
