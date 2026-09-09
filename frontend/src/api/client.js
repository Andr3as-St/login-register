import axios from "axios";
// trigger vercel deploy
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD
      ? "https://mern-auth-dashboard-api.onrender.com/api/v1"
      : "http://localhost:5000/api/v1"),
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
