import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import "../assets/style/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          🛍️ ShopEase
        </Link>
      </div>

      {/* Hamburger button */}
      {user && (
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      )}

      {user && (
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <span className="user-name">
            {user.displayName || user.email.split("@")[0]}
          </span>
          <Link to="/wishlist" className="nav-link">
            ❤️ Wishlist
          </Link>
          <Link to="/cart" className="nav-link">
            🛒 Cart
          </Link>
          <Link to="/orders" className="nav-link">
            📦 Orders
          </Link>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
