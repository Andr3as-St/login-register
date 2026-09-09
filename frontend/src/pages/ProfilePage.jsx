import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", location: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) setForm({ name: user.name || "", email: user.email || "", location: user.location || "" });
  }, [user]);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      await updateProfile(form);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to update profile");
    }
  };

  return (
    <section>
      <div className="page-heading"><div><p className="eyebrow">Account</p><h2>Profile settings</h2></div></div>
      <form className="panel form-panel" onSubmit={submit}>
        <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Location<input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <button className="button">Save changes</button>
      </form>
    </section>
  );
}
