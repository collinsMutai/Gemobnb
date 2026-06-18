import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";

export default function AppRoutes() {
  return (
    <>
    <Navbar />
    <Routes>
      
      <Route path="/" element={<Home />} />
    </Routes>
    
    {/* <Footer /> */}
    </>
  );
}
