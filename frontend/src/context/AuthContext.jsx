import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSession = (payload) => {
    localStorage.setItem("authToken", payload.token);
    setUser(payload.user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem("authToken")) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    setSession(data);
    return data.user;
  };

  const register = async (values) => {
    const { data } = await api.post("/auth/register", values);
    setSession(data);
    return data.user;
  };

  const updateProfile = async (values) => {
    const { data } = await api.patch("/auth/me", values);
    setSession(data);
    return data.user;
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateProfile }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
