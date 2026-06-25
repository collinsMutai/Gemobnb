import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { createPortal } from "react-dom";

import CalendarModal from "../CalendarModal/CalendarModal";
import DateConfirmationModal from "../DateConfirmationModal/DateConfirmationModal";
import ContactInfoModal from "../ContactInfoModal/ContactInfoModal";

import "./Hero.css";

export default function Hero() {
  const slides = [
    {
      title: "Luxury Stays in Nairobi",
      text: "Modern, stylish, and fully serviced apartments in the heart of Westlands.",
      image:
        "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartment/wp-content/uploads/sites/13/2023/07/room-03-1024x683.jpg",
    },
    {
      title: "Comfort Meets Convenience",
      text: "Enjoy fast WiFi, secure parking, and 24/7 guest support.",
      image:
        "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartment/wp-content/uploads/sites/13/2023/07/parallax-04.jpg",
    },
    {
      title: "Your Home in Nairobi",
      text: "Perfect for business trips, long stays, or weekend getaways.",
      image:
        "https://www.nicdarkthemes.com/themes/hotel-booking/wp/demo/apartment/wp-content/uploads/sites/13/2023/07/square-06.jpg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [prevSlide, setPrevSlide] = useState(slides[0]);
  const [currentSlide, setCurrentSlide] = useState(slides[0]);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openContact, setOpenContact] = useState(false); // ✅ NEW

  const [selectedRange, setSelectedRange] = useState(null);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  /* =========================
     SLIDESHOW
  ========================= */
  useEffect(() => {
    if (openCalendar || openConfirmation || openContact) return;

    let timeout;

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });

    const run = async () => {
      const nextIndex = (index + 1) % slides.length;

      await preloadImage(slides[nextIndex].image);

      setPrevSlide(currentSlide);
      setCurrentSlide(slides[nextIndex]);
      setIndex(nextIndex);

      timeout = setTimeout(run, 7000);
    };

    timeout = setTimeout(run, 7000);

    return () => clearTimeout(timeout);
  }, [index, currentSlide, openCalendar, openConfirmation, openContact]);

  const clearDates = (e) => {
    e?.stopPropagation();

    const resetRange = {
      startDate: null,
      endDate: null,
      key: "selection",
    };

    setRange([resetRange]);
    setSelectedRange(null);
  };

  const hasSelection = range[0]?.startDate && range[0]?.endDate;

  const renderDateText = () => {
    const { startDate, endDate } = range[0];

    if (!startDate) return "Select dates";

    if (startDate && !endDate) {
      return `${startDate.toLocaleDateString()} →`;
    }

    return `${startDate.toLocaleDateString()} → ${endDate.toLocaleDateString()}`;
  };

  const slide = currentSlide;

  return (
    <section className="hero-container">
      {/* BACKGROUND */}
      <div className="hero-bg-wrapper">
        <motion.div
          className="hero-bg"
          style={{ backgroundImage: `url(${prevSlide.image})` }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          key={currentSlide.image}
          className="hero-bg"
          style={{ backgroundImage: `url(${currentSlide.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            className="hero-inner"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-text">{slide.text}</p>

            <div className="search-box single-date">
              <div
                className="search-input"
                onClick={() => setOpenCalendar(true)}
              >
                <FaCalendarAlt className="input-icon-left" />

                <div className="date-text">{renderDateText()}</div>

                {hasSelection && (
                  <button
                    type="button"
                    className="clear-dates-btn"
                    onClick={clearDates}
                  >
                    <MdClose />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Calendar Modal */}
      {openCalendar &&
        createPortal(
          <CalendarModal
            open={openCalendar}
            setOpen={setOpenCalendar}
            range={range}
            setRange={setRange}
            clearDates={clearDates}
            onConfirm={(selection) => {
              setSelectedRange(selection);
              setOpenCalendar(false);
              setOpenConfirmation(true);
            }}
          />,
          document.body,
        )}

      {/* Confirmation Modal */}
      {openConfirmation &&
        selectedRange &&
        createPortal(
          <DateConfirmationModal
            open={openConfirmation}
            setOpen={setOpenConfirmation}
            range={selectedRange}
            onContinue={() => {
              setOpenConfirmation(false); // ✅ close current
              setOpenContact(true); // ✅ open next
            }}
          />,
          document.body,
        )}

      {/* Contact Modal ✅ NEW */}
      {openContact &&
        createPortal(
          <ContactInfoModal
            open={openContact}
            setOpen={setOpenContact}
            loading={false}
            onSubmit={async (data) => {
              try {
                const payload = {
                  ...data,
                  checkIn: selectedRange?.startDate?.toISOString(),
                  checkOut: selectedRange?.endDate?.toISOString(),
                };

                console.log("SENDING:", payload);

                const res = await fetch("http://localhost:5000/api/book-stay", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(payload),
                });

                const result = await res.json();

                if (!res.ok) {
                  throw new Error(result.message || "Booking failed");
                }

                console.log("SUCCESS:", result);

                setOpenContact(false); // close modal
              } catch (err) {
                console.error("ERROR:", err.message);
              }
            }}
          />,
          document.body,
        )}
    </section>
  );
}
