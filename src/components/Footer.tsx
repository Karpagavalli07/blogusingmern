
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Victory Blog</h3>
          <p>A platform for sharing stories, ideas, and knowledge with the world.</p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📷</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul className="footer-links">
            <li>Create Blogs</li>
            <li>Read Stories</li>
            <li>Connect with Writers</li>
            <li>Share Knowledge</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Have questions? Reach out to us!</p>
          <p className="contact-email">hello@victoryblog.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Victory Blog. All rights reserved.</p>
        <p>Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
}

export default Footer;