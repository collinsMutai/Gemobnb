import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import "./ContactInfoModal.css";

export default function ContactInfoModal({
  open,
  setOpen,
  onSubmit,
  loading,
}) {
  // 🔒 HARD SUBMIT LOCK
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚫 Prevent double submit
    if (loading || isSubmittingRef.current) return;

    isSubmittingRef.current = true;

    const formData = new FormData(e.target);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      guests: formData.get("guests"),
      notes: formData.get("notes"),
    };

    try {
      await onSubmit(payload);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* MODAL */}
          <motion.div
            className="contact-modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              className="contact-close"
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>

            <h2>Complete Your Booking</h2>
            <p className="contact-subtitle">
              Enter your details to confirm your stay
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              {/* NAME */}
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  required
                  placeholder="John Doe"
                />
              </div>

              {/* EMAIL + PHONE */}
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    required
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              {/* GUESTS */}
              <div className="form-row">
                <div className="form-group">
                  <label>Guests</label>
                  <input
                    name="guests"
                    type="number"
                    min="1"
                    defaultValue="1"
                  />
                </div>
              </div>

              {/* NOTES */}
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea
                  name="notes"
                  rows="3"
                  placeholder="Any special requests..."
                />
              </div>

              {/* ACTIONS */}
              <div className="contact-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}