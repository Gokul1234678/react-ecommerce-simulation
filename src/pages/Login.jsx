import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useAuth();

  if (user) return <Navigate to="/" />; // Already logged in → Go home

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Google</h2>
      <button
        onClick={login}
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          background: "#4285F4",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
