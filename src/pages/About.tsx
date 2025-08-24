import React from "react";
import "../App.css";

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Victory Blog</h1>
      <p>
        Welcome to <strong>Victory Blog</strong> 🎉 — a platform where ideas, stories, and knowledge come together. 
        Our mission is to create a space where users can share their experiences, 
        write meaningful articles, and connect with like-minded people. 
      </p>
      <p>
        Victory Blog is built using the <em>MERN stack</em> (MongoDB, Express, React, Node.js) 
        to deliver a seamless blogging experience. Whether you are here to read, write, 
        or simply explore — you’re part of our growing community. ✨
      </p>
      <p>
        🚀 Start your journey today: share your thoughts, explore amazing blogs, 
        and let your voice be heard.
      </p>
    </div>
  );
};

export default About;
