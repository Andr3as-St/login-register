import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to create account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-layout">
      <section className="auth-hero">
        <p className="eyebrow">Create account</p>
        <h1>Start with a secure MERN authentication flow.</h1>
        <p>Your password must include upper/lowercase letters, a number and a special character.</p>
      </section>
      <form className="auth-card" onSubmit={submit}>
        <h2>Register</h2>
        <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" minLength="8" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        {error && <p className="error">{error}</p>}
        <button className="button" disabled={submitting}>{submitting ? "Creating..." : "Create account"}</button>
        <p className="muted">Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  );
}
