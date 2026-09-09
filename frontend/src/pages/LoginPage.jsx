import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <p className="eyebrow">MERN Portfolio Project</p>
        <h1>Secure authentication, clean dashboard, real API integration.</h1>
        <p>Built with React, Express, MongoDB, Node.js and JWT.</p>
      </section>
      <form className="auth-card" onSubmit={submit}>
        <h2>Welcome back</h2>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        {error && <p className="error">{error}</p>}
        <button className="button" disabled={submitting}>{submitting ? "Signing in..." : "Sign in"}</button>
        <p className="muted">No account? <Link to="/register">Create one</Link></p>
      </form>
    </div>
  );
}
