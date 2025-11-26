import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage            from "./HomePage";
import LoginPage           from "./LoginPage";
import ForgotPasswordPage  from "./ForgotPasswordPage";
import ResetPasswordPage   from "./ResetPasswordPage";
import AdminDashboard      from "./pages/Admin/AdminDashboard";
import StudentDashboard    from "./pages/Student/StudentDashboard";
import TeacherDashboard    from "./pages/Teacher/TeacherDashboard";
import ProtectedRoute      from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* protected – NEMA više duplih ruta! */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* fallback (po želji) */}
        <Route path="*" element={<h2>404 – Page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;