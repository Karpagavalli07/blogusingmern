import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth"; // utility to clear token

const MainNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    removeToken(); // clear token from storage
    navigate("/login"); // go back to login page
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-logo">
        <h2>Victory Blog</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/main">Main</Link></li>
        <li><Link to="/create">Create Blog</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><button onClick={handleSignout} className="signout-btn">Signout</button></li>
      </ul>
    </nav>
  );
};

export default MainNavbar;
