import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // logged-in user token
  const userId = localStorage.getItem("userId"); // save userId during login

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/"); // back to home after delete
    } catch (err) {
      console.error("Error deleting blog", err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">{blog.snippet}</p>
      <p className="mt-4">{blog.description}</p>

      {userId === blog.user && (
        <div className="mt-6 flex gap-3">
          <Link
            to={`/edit/${blog._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

