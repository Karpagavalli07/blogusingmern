import React, { ReactNode, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import NewHeader from "./components/NewHeader";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./Main";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/UserProfilePage";
import "./App.css";

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => (
  <>
    <NewHeader />
    {children}
    <Footer />
  </>
);

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <Register />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <div style={{ padding: "2rem", textAlign: "center" }}>
                  <h2>About Victory Blog</h2>
                  <p>A modern blogging platform built with MERN stack.</p>
                </div>
              </PublicLayout>
            }
          />

          {/* Protected routes */}
          <Route
            path="/profile"
            element={
              <PublicLayout>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </PublicLayout>
            }
          />
          <Route
            path="/create-blog"
            element={
              <PublicLayout>
                <ProtectedRoute>
                  <CreateBlog />
                </ProtectedRoute>
              </PublicLayout>
            }
          />

          {/* Example: whole Main section protected */}
          <Route
            path="/main/*"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
