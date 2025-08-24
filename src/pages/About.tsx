import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1>About Victory Blog</h1>
          <p className="about-subtitle">Building a community of writers and readers</p>
        </div>
        
        <div className="about-sections">
          <section className="about-section">
            <div className="section-icon">🎉</div>
            <h2>Our Mission</h2>
            <p>
              Welcome to <strong>Victory Blog</strong> — a platform where ideas, stories, and knowledge come together. 
              Our mission is to create a space where users can share their experiences, 
              write meaningful articles, and connect with like-minded people.
            </p>
          </section>
          
          <section className="about-section">
            <div className="section-icon">⚡</div>
            <h2>Built with Modern Tech</h2>
            <p>
              Victory Blog is built using the <em>MERN stack</em> (MongoDB, Express, React, Node.js) 
              to deliver a seamless blogging experience. Whether you are here to read, write, 
              or simply explore — you're part of our growing community.
            </p>
          </section>
          
          <section className="about-section">
            <div className="section-icon">🚀</div>
            <h2>Join Our Journey</h2>
            <p>
              Start your journey today: share your thoughts, explore amazing blogs, 
              and let your voice be heard. Every story matters, and every voice counts.
            </p>
          </section>
        </div>
        
        <div className="about-features">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✍️</div>
              <h3>Easy Blogging</h3>
              <p>Create and publish your content with our intuitive editor</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3>Discover Content</h3>
              <p>Explore a wide variety of topics and perspectives</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h3>Community</h3>
              <p>Connect with writers and readers from around the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
