import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        GemoBnB
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/about">
          About
        </Link>

        <Link to="/contact">
          Contact
        </Link>

        <Link to="/become-host">
          Become Host
        </Link>
      </div>
    </nav>
  );
}