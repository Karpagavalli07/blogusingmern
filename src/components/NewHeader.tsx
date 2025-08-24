import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './NewHeader.css';

const NewHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user?.profilePic) {
      setPreview(`${process.env.REACT_APP_BACKEND_URL}${user.profilePic}`);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="new-header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Victory Blog</h1>
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isAuthenticated && (
              <Link to="/create-blog" className="nav-link">Create Blog</Link>
            )}
          </nav>
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-profile">
              <div className="user-info">
                <div className="user-avatar" onClick={() => navigate('/profile')} style={{ cursor: "pointer" }}
                >
                  {preview ?
                    (<img
                      src={preview || "./image.png"}
                      alt="Profile"
                      className="user-avatar"
                    />) :
                    <>
                      {user?.username.charAt(0).toUpperCase()}
                    </>}
                </div>
                <span className="username">{user?.username}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
