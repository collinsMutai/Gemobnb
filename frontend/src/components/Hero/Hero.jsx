
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { createPortal } from "react-dom";

import CalendarModal from "../CalendarModal/CalendarModal";
import DateConfirmationModal from "../DateConfirmationModal/DateConfirmationModal";
import ContactInfoModal from "../ContactInfoModal/ContactInfoModal";

import img11 from "../../assets/img11.jpeg";
import img14 from "../../assets/img14.jpeg";
import img15 from "../../assets/img15.jpeg";
import img21 from "../../assets/img21.jpeg";
import img22 from "../../assets/img22.jpeg";
import img25 from "../../assets/img25.jpeg";
import img26 from "../../assets/img26.jpeg";
import img27 from "../../assets/img27.jpeg";
import img29 from "../../assets/img29.jpeg";

import "./Hero.css";

export default function Hero() {
  const slides = [
    {
      title: "Luxury Stays in Nairobi",
      text: "Modern, stylish, and fully serviced apartments in the heart of Westlands.",
      image: img11,
    },
    {
      title: "Comfort Meets Convenience",
      text: "Enjoy fast WiFi, secure parking, and 24/7 guest support.",
      image: img14,
    },
    {
      title: "Your Home in Nairobi",
      text: "Perfect for business trips, long stays, or weekend getaways.",
      image: img15,
    },
    {
      title: "Experience Modern Living",
      text: "Beautifully designed spaces that make every stay memorable.",
      image: img21,
    },
    {
      title: "Relax in Style",
      text: "Discover comfort, privacy, and elegance in every corner.",
      image: img22,
    },
    {
      title: "Stay. Relax. Enjoy.",
      text: "Everything you need for a comfortable and relaxing getaway.",
      image: img25,
    },
    {
      title: "Designed for Your Comfort",
      text: "Enjoy thoughtfully furnished spaces with a touch of luxury.",
      image: img26,
    },
    {
      title: "Feel at Home",
      text: "Your perfect space for relaxation, work, and unforgettable moments.",
      image: img27,
    },
    {
      title: "Your Perfect Nairobi Escape",
      text: "Book your stay and experience comfort like never before.",
      image: img29,
    },
  ];

  const [index, setIndex] = useState(0);
  const [prevSlide, setPrevSlide] = useState(slides[0]);
  const [currentSlide, setCurrentSlide] = useState(slides[0]);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const [selectedRange, setSelectedRange] = useState(null);
  const [loading, setLoading] = useState(false);

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
  }, [
    index,
    currentSlide,
    openCalendar,
    openConfirmation,
    openContact,
  ]);

  /* =========================
     CLEAR SELECTED DATES
  ========================= */
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

  const slide = currentSlide;

  return (
    <section className="hero-container">

      {/* BACKGROUND */}
      <div className="hero-bg-wrapper">

        <motion.div
          className="hero-bg"
          style={{
            backgroundImage: `url(${prevSlide.image})`,
          }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          key={currentSlide.image}
          className="hero-bg"
          style={{
            backgroundImage: `url(${currentSlide.image})`,
          }}
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
            <h1 className="hero-title">
              {slide.title}
            </h1>

            <p className="hero-text">
              {slide.text}
            </p>

            <div className="search-box single-date">
              <div
                className="search-input"
                onClick={() => setOpenCalendar(true)}
              >
                <FaCalendarAlt className="input-icon-left" />

                <div className="date-text">
                  Select dates
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* CALENDAR MODAL */}
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
          document.body
        )}

      {/* CONFIRMATION MODAL */}
      {openConfirmation &&
        selectedRange &&
        createPortal(
          <DateConfirmationModal
            open={openConfirmation}
            setOpen={setOpenConfirmation}
            range={selectedRange}
            onContinue={() => {
              setOpenConfirmation(false);
              setOpenContact(true);
            }}
          />,
          document.body
        )}

      {/* CONTACT MODAL */}
      {openContact &&
        createPortal(
          <ContactInfoModal
            open={openContact}
            setOpen={setOpenContact}
            loading={loading}
            onSubmit={async (data) => {
              if (loading) return;

              setLoading(true);

              try {
                const payload = {
                  ...data,
                  checkIn: selectedRange?.startDate?.toISOString(),
                  checkOut: selectedRange?.endDate?.toISOString(),
                };

                const res = await fetch(
                  `${import.meta.env.VITE_API_URL}/api/book-stay`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                  }
                );

                const result = await res.json();

                if (!res.ok) {
                  throw new Error(
                    result.message || "Booking failed"
                  );
                }

                setOpenContact(false);
                setSelectedRange(null);

                setRange([
                  {
                    startDate: null,
                    endDate: null,
                    key: "selection",
                  },
                ]);

              } catch (err) {
                console.error("ERROR:", err.message);

                alert(
                  err.message || "Booking failed. Try again."
                );

              } finally {
                setLoading(false);
              }
            }}
          />,
          document.body
        )}

    </section>
  );
}
