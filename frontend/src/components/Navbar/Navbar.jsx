import { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";

import { IoClose } from "react-icons/io5";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">GemoBnB</div>

    {/* Hamburger */}
{!open && (
  <div className="menu-btn" onClick={() => setOpen(true)}>
    <CiMenuFries className="icon" />
  </div>
)}

      {/* Drawer */}
      <div className={`nav-links ${open ? "active" : ""}`}>
        
        {/* Close button INSIDE drawer */}
        <IoClose className="close-btn" onClick={closeMenu} />

        <Link className="nav-link" onClick={closeMenu} to="/">Home</Link>
        <Link className="nav-link" onClick={closeMenu} to="/about">About</Link>
        <Link className="nav-link" onClick={closeMenu} to="/contact">Contact</Link>
        <Link className="nav-link" onClick={closeMenu} to="/become-host">Become Host</Link>
      </div>
    </nav>
  );
}