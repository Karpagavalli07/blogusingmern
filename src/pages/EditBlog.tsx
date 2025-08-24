import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setSnippet(res.data.snippet);
      setDescription(res.data.description);
    });
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Blog</h1>

      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="border p-2 w-full mb-2"
        value={snippet}
        onChange={(e) => setSnippet(e.target.value)}
        placeholder="Snippet"
      />
      <textarea
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={6}
      />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
