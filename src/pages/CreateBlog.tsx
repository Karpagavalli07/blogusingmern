import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import "../App.css";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = getToken();
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/blogs",
        { title, snippet, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);
      navigate("/main"); // go back to main/home page
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="create-blog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Snippet"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
