import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { isTokenValid, decodeToken, logout } from "../utils/auth";

const Home: React.FC = () => {
  const navigate = useNavigate();

  if (!isTokenValid()) {
    navigate("/login");
  }

  const token = localStorage.getItem("token");
  const user = token ? decodeToken(token) : null;

  // sample blog posts
  const blogs = [
    { id: 1, title: "Getting Started with MERN", snippet: "Learn how to build full-stack apps with MongoDB, Express, React, and Node.js." },
    { id: 2, title: "React Router Made Easy", snippet: "A quick guide to navigating between pages in React using React Router." },
    { id: 3, title: "Mastering MongoDB", snippet: "Tips and tricks for managing data effectively with MongoDB Atlas." }
  ];

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#f4f4f4" }}>
        <h3>My Blog</h3>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "15px" }}>Hi, {user.username}</span>
              <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      {/* Welcome Message */}
      <h2 style={{ margin: "20px" }}>Welcome {user?.username || "Guest"} 👋</h2>

      {/* Blog List */}
      <div style={{ margin: "20px" }}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
