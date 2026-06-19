import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h2>GemoBnB</h2>
          <p>Luxury stays in the heart of Nairobi. Comfort, style, and convenience in one place.</p>
        </div>

        {/* LINKS */}
        <div className="footer-column">
          <h3>Explore</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#highlights">Highlights</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#neighborhood">Location</a></li>
            <li><a href="#booking">Booking Help</a></li>
          </ul>
        </div>

        {/* CONNECT (ICONS) */}
        <div className="footer-column">
          <h3>Connect</h3>

          <div className="social-icons">
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

            <a href="#" aria-label="X">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} GemoBnB. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;