import React from "react";
import { Routes, Route } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateBlog from "./pages/CreateBlog";


const Main: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <MainNavbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />         {/* /main */}
          <Route path="create" element={<CreateBlog />} /> {/* /main/create */}
          <Route path="about" element={<About />} />    {/* /main/about */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
