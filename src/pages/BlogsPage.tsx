import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // assuming you store user in context

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const { user, isAuthenticated } = useAuth(); // 🔹 from AuthContext
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      const res = await axios.get(
        `${backendUrl}/api/blogs`
      );
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const getAuthorImage = (author: any) => {
    if (!author?.profilePic) return null;
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    return `${backendUrl}/${author.profilePic}`;
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // helper to check if current user already liked
  const isLikedByUser = (blog: any) => {
    if (!token) return false;
    const userId = JSON.parse(atob(token.split(".")[1])).id; // decode JWT to get user id
    return blog.likes?.includes(userId);
  };

  const handleLike = async (blogId: string) => {
    if (!token) {
      // if not logged in → redirect
      navigate("/login");
      return;
    }

    try {
      const blog = blogs.find((b) => b._id === blogId);
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
      await axios.post(
        `${backendUrl}/api/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // refresh blogs
      fetchBlogs();
    } catch (err) {
      console.error("Error toggling like/dislike", err);
    }
  };

  return (
    <div className="blogs-grid">
      {blogs.map((blog) => (
        <article key={blog._id} className="blog-card">
          <div className="blog-header">
            <h3 className="blog-title">{blog.title}</h3>
            <button
              className={`like-btn ${isLikedByUser(blog) ? "liked" : ""}`}
              onClick={() => handleLike(blog._id)}
            >
              👍 {blog.likes?.length || 0}
            </button>
          </div>

          <p className="blog-snippet">{blog.snippet}</p>

          <div className="blog-meta">
            <span className="blog-author">✍ {blog.author?.username}</span>
            <span className="blog-date">
              📅 {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="blog-actions">
            <button
              className="read-more-btn"
              onClick={() => setSelectedBlog(blog)}
            >
              Read More
            </button>
          </div>
        </article>
      ))}

      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedBlog(null)}
            >
              ✖
            </button>
            <h2>{selectedBlog.title}</h2>
            <div className="modal-meta">
              {getAuthorImage(selectedBlog.author) ? (
                <img
                  src={getAuthorImage(selectedBlog.author) || "./image.png"}
                  alt={selectedBlog.author?.username}
                  className="author-avatar"
                />
              ) : (
                <div className="author-avatar-placeholder">
                  {selectedBlog.author?.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="author-details">
                <p>
                  By <strong>{selectedBlog.author?.username}</strong>
                </p>
                <p>{new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <h4>{selectedBlog.snippet}</h4>

            <p className="modal-description">{selectedBlog.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
