import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Home.css";
import BlogsPage from "./BlogsPage";

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // sample blog posts
  const blogs = [
    { id: 1, title: "Getting Started with MERN", snippet: "Learn how to build full-stack apps with MongoDB, Express, React, and Node.js.", author: "John Doe", date: "2024-01-15" },
    { id: 2, title: "React Router Made Easy", snippet: "A quick guide to navigating between pages in React using React Router.", author: "Jane Smith", date: "2024-01-14" },
    { id: 3, title: "Mastering MongoDB", snippet: "Tips and tricks for managing data effectively with MongoDB Atlas.", author: "Mike Johnson", date: "2024-01-13" }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      {!isAuthenticated && <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Victory Blog</h1>
          <p>Discover amazing stories, share your thoughts, and connect with winners from around the world.</p>
          {!isAuthenticated && (
            <div className="hero-buttons">
              <a href="/register" className="cta-button primary">Get Started</a>
              <a href="/login" className="cta-button secondary">Sign In</a>
            </div>
          )}
        </div>
      </section>}

      {/* Welcome Message */}
      {isAuthenticated && (
        <section className="welcome-section">
          <h2>Welcome back, {user?.username}! 👋</h2>
          <p>Ready to create your next blog post?</p>
        </section>
      )}

      {/* Featured Blogs */}
      <section className="blogs-section">
        <div className="section-header">
          <h2>Featured Posts</h2>
          <p>Explore our latest and most popular articles</p>
        </div>
        
        <BlogsPage />
      </section>

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Start writing, sharing, and connecting with other bloggers today.</p>
            <a href="/register" className="cta-button primary">Create Account</a>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
