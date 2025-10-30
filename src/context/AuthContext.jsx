// This is the brain that manages login/logout and shares user data across your app.

import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    // console.log(result)
    setUser(result.user);
    // console.log(result.user)

    localStorage.setItem("user", JSON.stringify(result.user));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // This means if a user already logged in earlier, it restores their session automatically from localStorage (so they don’t need to log in again).
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🧠 How this works

// When you click Sign in, it opens Google’s popup → Firebase returns your details.

// setUser(result.user) saves that user data in React state.

// It also saves the user in localStorage, so if you refresh, you don’t lose login.

// When you click Logout, it clears Firebase and localStorage.

// ✅ This ensures your login persists even after refresh — until you log out.