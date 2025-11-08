import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // <-- axios instance with withCredentials:true

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // { id, fullName, role }
  const [loading, setLoading] = useState(true);

  // Check login status on page refresh / app load
  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data.user); // user comes from backend
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Login handler
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    // Backend returns: { userId, role, fullName }
    setUser({
      userId: res.data.userId,
      role: res.data.role,
      fullName: res.data.fullName,
    });

    return res.data.role; // used to redirect based on role
  };

  // Logout handler
  const logout = async () => {
    await api.post("/auth/logout"); // this clears cookie
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
