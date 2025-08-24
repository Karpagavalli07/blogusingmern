import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./UserProfilePage.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.profilePic) {
              const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        setPreview(`${backendUrl}${user.profilePic}`);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG and JPEG files are allowed");
        return;
      }
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
      setIsEditing(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <form id="profileForm" onSubmit={handleSubmit} className="profile-form">
        {/* Profile Avatar */}
        <div className="avatar-container">
          <img
            src={preview || "./image.png"}
            alt="Profile"
            className="profile-avatar"
          />
          {isEditing && (
            <>
              <label htmlFor="fileInput" className="edit-avatar-btn">
                Change Photo
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            disabled={!isEditing}
            onChange={(e) => setUsername(e.target.value)}
            className={!isEditing ? "disabled-input" : ""}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled={!isEditing}
            onChange={(e) => setEmail(e.target.value)}
            className={!isEditing ? "disabled-input" : ""}
          />
        </div>

        {/* Only show Save button inside form */}
        {isEditing && (
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        )}
      </form>

      {/* Buttons outside the form */}
      <div className="button-group">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
