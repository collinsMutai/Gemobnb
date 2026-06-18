import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
// import Footer from "../components/Footer/Footer";

export default function AppRoutes() {
  return (
    <>
    <Routes>
      
      <Route path="/" element={<Home />} />
    </Routes>
    
    {/* <Footer /> */}
    </>
  );
}
