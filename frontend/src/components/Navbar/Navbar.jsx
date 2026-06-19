import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

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
        <IoClose className="close-btn" onClick={closeMenu} />

        <button className="nav-link" onClick={() => scrollToSection("home")}>
          Home
        </button>

        <button className="nav-link" onClick={() => scrollToSection("highlights")}>
          Highlights
        </button>

        <button className="nav-link" onClick={() => scrollToSection("gallery")}>
          Gallery
        </button>

        <button className="nav-link" onClick={() => scrollToSection("about")}>
          About
        </button>

        <button className="nav-link" onClick={() => scrollToSection("amenities")}>
          Amenities
        </button>

        <button className="nav-link" onClick={() => scrollToSection("experience")}>
          Experience
        </button>

        <button className="nav-link" onClick={() => scrollToSection("neighborhood")}>
          Neighborhood
        </button>

        <button className="nav-link" onClick={() => scrollToSection("contact")}>
          Contact
        </button>
      </div>
    </nav>
  );
}