import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function useAuth() {
  const [user, setUser]       = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {                    // nema smisla pozivati backend
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include"
    })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => setUser(data))   // {id, email, role}
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return { user, isLoading };
}