import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBlog.css";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    axios.get(`${backendUrl}/api/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setSnippet(res.data.snippet);
      setDescription(res.data.description);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      await axios.put(
        `${backendUrl}/api/blogs/${id}`,
        { title, snippet, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/blog/${id}`); // redirect back to blog detail
    } catch (err) {
      console.error("Error updating blog", err);
    }
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="edit-blog-container">
      <div className="edit-blog-header">
        <h1>Edit Blog</h1>
      </div>

      <div className="edit-blog-form">
        <div className="form-group">
          <label htmlFor="title">Blog Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="snippet">Blog Snippet</label>
          <input
            id="snippet"
            type="text"
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
            placeholder="Enter a brief snippet..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Blog Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your blog content here..."
            rows={8}
          />
        </div>

        <div className="form-actions">
          <button
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
