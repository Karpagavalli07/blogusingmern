import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={{ background: "#333", padding: "1rem" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "1rem" }}>Home</Link>
      <Link to="/login" style={{ color: "#fff", marginRight: "1rem" }}>Login</Link>
      <Link to="/register" style={{ color: "#fff" }}>Register</Link>
    </nav>
  );
};

export default Navbar;
