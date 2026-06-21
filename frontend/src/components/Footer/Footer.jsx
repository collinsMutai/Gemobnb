import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

import { useState } from "react";
import "./Footer.css";

import CalendarModal from "../CalendarModal/CalendarModal"; 

const Footer = () => {
  const [openCalendar, setOpenCalendar] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const clearDates = () => {
    setRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* BRAND */}
          <div className="footer-brand">
            <h2>GemoBnB</h2>
            <p>
              Luxury stays in the heart of Nairobi. Comfort, style, and convenience in one place.
            </p>
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
              <li><a href="#contact">Location</a></li>

              {/* ✅ CHANGED HERE */}
              <li>
                <button
                  className="footer-book-btn"
                  onClick={() => setOpenCalendar(true)}
                >
                  Book Now
                </button>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className="footer-column">
            <h3>Connect</h3>

            <div className="social-icons">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="#" aria-label="X"><FaXTwitter /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GemoBnB. All rights reserved.</p>
        </div>
      </footer>

      {/* ✅ MODAL */}
      {openCalendar && (
        <CalendarModal
          setOpen={setOpenCalendar}
          range={range}
          setRange={setRange}
          clearDates={clearDates}
        />
      )}
    </>
  );
};

export default Footer;