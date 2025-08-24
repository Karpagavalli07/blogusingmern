import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./BlogDetail.css";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    axios.get(`${backendUrl}/api/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  const handleDelete = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      await axios.delete(`${backendUrl}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/"); // back to home after delete
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  if (!blog) return (
    <div className="blog-detail-container">
      <div className="loading">Loading blog...</div>
    </div>
  );

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <h1>{blog.title}</h1>
      </div>

      <div className="blog-detail-content">
        <div className="blog-meta">
          <div className="author-info">
            {blog.author?.profilePic ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}${blog.author.profilePic}`}
                alt={blog.author.username}
                className="author-avatar"
              />
            ) : (
              <div className="author-avatar-placeholder">
                {blog.author?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="author-details">
              <span className="author-name">By {blog.author?.username}</span>
              <span className="publish-date">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="blog-snippet">{blog.snippet}</div>

        <div className="blog-description">{blog.description}</div>

        <div className="blog-stats">
          <div className="likes-section">
            <span className="like-count">
              👍 {blog.likes?.length || 0} likes
            </span>
          </div>
        </div>

        {user && user._id === blog.author?._id && (
          <div className="blog-actions">
            <Link
              to={`/edit-blog/${blog._id}`}
              className="action-btn btn-edit"
            >
              ✏️ Edit Blog
            </Link>
            <button
              onClick={handleDelete}
              className="action-btn btn-delete"
            >
              🗑️ Delete Blog
            </button>
          </div>
        )}

        <div className="blog-actions">
          <Link
            to="/my-blog"
            className="action-btn btn-back"
          >
            ← Back to My Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

