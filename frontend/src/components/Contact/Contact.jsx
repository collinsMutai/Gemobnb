import "./Contact.css";
import { useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { HiOutlinePaperAirplane } from "react-icons/hi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">

        {/* LEFT: CTA */}
        <div className="contact-left">
          <h2>Ready to Experience Nairobi in Comfort?</h2>

          <p>
            Stay at <strong>GemoBnB</strong> in Thindigua, Kiambu Road —
            modern, secure, and peaceful living close to Nairobi.
          </p>

          <button className="contact-cta-btn">
            Reserve Your Dates
          </button>

          <div className="contact-info">

            <p>
              <FaMapMarkerAlt className="icon" />
              <span>Thindigua, Kiambu Road</span>
            </p>

            <p>
              <FaPhoneAlt className="icon" />
              <span>+254 Fast Response Support</span>
            </p>

            <p>
              <FaEnvelope className="icon" />
              <span>gemoBnB@gmail.com</span>
            </p>

          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="contact-right">
          <h3>Send a Message</h3>

          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              <HiOutlinePaperAirplane />
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}