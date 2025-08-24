import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./MyBlog.css";

const MyBlog: React.FC = () => {
  const [myBlogs, setMyBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    if (!token || !user) {
      setError("Please login to view your blogs");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Use _id since that's what MongoDB uses and what the backend expects
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.get(
        `${backendUrl}/api/blogs/author/${user._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Fetched blogs:", response.data);
      setMyBlogs(response.data);
      setError("");
    } catch (err: any) {
      console.error("Error fetching my blogs", err);
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blogId: string) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      console.log("Deleting blog with ID:", blogId);
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const response = await axios.delete(
        `${backendUrl}/api/blogs/${blogId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      console.log("Delete response:", response.data);
      
      // Remove the deleted blog from state
      setMyBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
      
      alert("Blog deleted successfully!");
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      console.error("Error response:", err.response?.data);
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  };

  const handleViewBlog = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, [user, token]);

  if (!isAuthenticated) {
    return (
      <div className="my-blog-container">
        <div className="auth-message">
          <h2>Please Login</h2>
          <p>You need to be logged in to view your blogs.</p>
          <button 
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="my-blog-container">
        <div className="loading">Loading your blogs...</div>
      </div>
    );
  }

  return (
    <div className="my-blog-container">
      <div className="my-blog-header">
        <h1>My Blogs</h1>
        <button 
          className="create-blog-btn"
          onClick={() => navigate("/create-blog")}
        >
          Create New Blog
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {myBlogs.length === 0 ? (
        <div className="no-blogs">
          <h3>No blogs yet!</h3>
          <p>Start writing your first blog post.</p>
          <button 
            className="create-first-blog-btn"
            onClick={() => navigate("/create-blog")}
          >
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="blogs-grid">
          {myBlogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <div className="blog-header">
                <h3 className="blog-title">{blog.title}</h3>
                <div className="blog-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleViewBlog(blog._id)}
                  >
                    👁️ View
                  </button>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(blog._id)}
                  >
                    ✏️ Edit
                  </button>
                                     <button
                     className="action-btn delete-btn"
                     onClick={() => {
                       console.log("Delete button clicked for blog:", blog._id);
                       handleDelete(blog._id);
                     }}
                   >
                     🗑️ Delete
                   </button>
                </div>
              </div>

              <p className="blog-snippet">{blog.snippet}</p>

              <div className="blog-meta">
                <span className="blog-date">
                  📅 {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <span className="blog-likes">
                  👍 {blog.likes?.length || 0} likes
                </span>
              </div>

              <div className="blog-status">
                <span className="status-badge">
                  {blog.updatedAt !== blog.createdAt ? "Updated" : "Published"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlog;
