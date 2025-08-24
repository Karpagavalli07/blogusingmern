import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { getToken, saveToken, removeToken } from "../utils/auth";

interface User {
  _id: string;
  id?: string; // For compatibility with login response
  username: string;
  email: string;
  profilePic?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();
      if (token) {
        login(token);
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = (token: string) => {
    saveToken(token); // save token in localStorage
    // After saving, immediately fetch user
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    axios
      .get(`${backendUrl}/api/user/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // The getUser endpoint returns user with _id, but we need to ensure we have the right field
        const userData = {
          ...res.data,
          id: res.data._id // Add id field for compatibility
        };
        setUser(userData);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
