// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("role");

// Ako nema tokena -> redirektuj na login
if (!token) {
return <Navigate to="/login" replace />;
}

// Ako token postoji ali rola nije dozvoljena -> redirektuj na login
if (allowedRoles && !allowedRoles.includes(userRole)) {
return <Navigate to="/login" replace />;
}

return children;
}
