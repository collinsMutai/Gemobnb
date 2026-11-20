import "./Contact.css";
import { useState } from "react";

import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

import { HiOutlinePaperAirplane } from "react-icons/hi";

import CalendarModal from "../CalendarModal/CalendarModal";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // MODAL STATE
  const [openCalendar, setOpenCalendar] = useState(false);

  // DATE RANGE STATE
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT CONTACT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Message submission failed");
      }

      // SUCCESS
      alert(result.message || "Message sent successfully!");

      // RESET FORM
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("CONTACT ERROR:", err.message);

      alert(err.message || "Message failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEAR DATES
  // =========================
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
            Stay at <strong>GemoBnB</strong> in Thindigua, Kiambu Road — modern,
            secure, and peaceful living close to Nairobi.
          </p>

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
              disabled={loading}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" className="submit-btn" disabled={loading}>
              <HiOutlinePaperAirplane />

              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* CALENDAR MODAL */}
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
