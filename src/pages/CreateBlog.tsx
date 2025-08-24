import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./CreateBlog.css";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !snippet.trim() || !description.trim()) {
      setError("All fields are mandatory!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/blogs`, // ✅ fixed API URL
        { title, snippet, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(res.data.message || "Blog created successfully!");
      navigate("/main");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null; // Don't render while redirecting

  return (
    <div className="create-blog-container">
      <div className="create-blog-card">
        <div className="create-blog-header">
          <h2>Create Blog</h2>
          <p>Share your thoughts with the world</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter a compelling title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="snippet">Snippet</label>
            <input
              id="snippet"
              type="text"
              placeholder="A brief summary of your blog"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Content</label>
            <textarea
              id="description"
              placeholder="Write your blog content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={10}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/main")}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
