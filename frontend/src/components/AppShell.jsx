import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Andreas St</p>
          <h1>MERN Dashboard</h1>
        </div>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
        <button className="button secondary" onClick={handleLogout}>Logout</button>
      </aside>
      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Authenticated workspace</p>
            <strong>{user?.name}</strong>
          </div>
          <span className="status-dot">Online</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
