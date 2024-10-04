"use client";

import { ITenant } from "@/types/auth";
import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  user: ITenant | null;
  login: (
    email: string,
    password: string,
    userType: "tenant" | "supplier" | "superAdmin"
  ) => Promise<{ message: string; status: number }>;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children, value }: any) => {
  const [user, setUser] = useState<ITenant | null>(value);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = sessionStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    userType: "tenant" | "supplier" | "superAdmin"
  ) => {
    try {
      const res = await axiosInstance.post(`/${userType}/login`, {
        email,
        password,
      });
      const loggedInUser = {
        ...res.data.data?.[userType],
        accessToken: res.data.data?.token,
      };
      setUser(loggedInUser);
      sessionStorage.setItem("user", JSON.stringify(loggedInUser));
      return { message: "login success", status: 200 };
    } catch (error) {
      console.error(error, "login error");
      //TODO: based on error response, show error message
      return { message: "login failed", status: 400 };
    }
  };

  const logout = () => {
    // logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
