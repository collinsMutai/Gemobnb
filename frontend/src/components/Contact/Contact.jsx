import "./Contact.css";
import { useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { HiOutlinePaperAirplane } from "react-icons/hi";

import CalendarModal from "../CalendarModal/CalendarModal"; 

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // ✅ MODAL STATE
  const [openCalendar, setOpenCalendar] = useState(false);

  // ✅ DATE RANGE STATE
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  // ✅ CLEAR DATES
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
    <section className="contact-section" id="contact">
      <div className="contact-card">

        {/* LEFT */}
        <div className="contact-left">
          <h2>Ready to Experience Nairobi in Comfort?</h2>

          <p>
            Stay at <strong>GemoBnB</strong> in Thindigua, Kiambu Road —
            modern, secure, and peaceful living close to Nairobi.
          </p>

          {/* ✅ OPEN MODAL BUTTON */}
          <button
            className="contact-cta-btn"
            onClick={() => setOpenCalendar(true)}
          >
            Reserve Your Dates
          </button>

          <div className="contact-info">

            <p>
              <FaMapMarkerAlt className="icon" />
              <span>Thindigua, Kiambu Road</span>
            </p>

            <p>
              <FaPhoneAlt className="icon" />
              <span>+1 (502) 600-3401</span>
            </p>

            <p>
              <FaEnvelope className="icon" />
              <span>info@gemobnb.com</span>
            </p>

          </div>
        </div>

        {/* RIGHT */}
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

      {/* ✅ CALENDAR MODAL */}
      {openCalendar && (
        <CalendarModal
          setOpen={setOpenCalendar}
          range={range}
          setRange={setRange}
          clearDates={clearDates}
        />
      )}
    </section>
  );
}