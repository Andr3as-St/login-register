import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">Overview</p><h2>Welcome, {user?.name}</h2></div>
        <span className="badge">JWT protected</span>
      </div>
      <div className="card-grid">
        <article className="metric-card"><span>Account</span><strong>Active</strong><small>Authenticated session</small></article>
        <article className="metric-card"><span>Role</span><strong>{user?.isAdmin ? "Admin":"User"}</strong><small>Authorization ready</small></article>
        <article className="metric-card"><span>Location</span><strong>{user?.location || "Not set"}</strong><small>Editable profile field</small></article>
      </div>
      <article className="panel">
        <p className="eyebrow">Portfolio highlights</p>
        <h3>Full-stack authentication flow</h3>
        <p>This dashboard demonstrates protected React routes, persistent JWT sessions, authenticated API requests and MongoDB-backed user profiles.</p>
      </article>
    </section>
  );
}
