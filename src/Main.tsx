import React from "react";
import { Routes, Route } from "react-router-dom";
import NewHeader from "./components/NewHeader";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateBlog from "./pages/CreateBlog";

const Main: React.FC = () => {
  return (
    <div className="main-layout">
      <NewHeader />
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