import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./Main";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with Header + Navbar + Footer */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        {/* Protected layout routes */}
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;



