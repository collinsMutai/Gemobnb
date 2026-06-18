import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
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

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [months, setMonths] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setMonths(window.innerWidth <= 768 ? 1 : 2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =========================
     SLIDESHOW (NO FLICKER FIX)
  ========================= */
  useEffect(() => {
    if (openCalendar) return;

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
  }, [index, openCalendar, slides.length, currentSlide]);

  const slide = currentSlide;

  /* RESET DATES */
  const clearDates = (e) => {
    e.stopPropagation();

    setRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
  };

  const hasSelection = range[0].startDate && range[0].endDate;

  const renderDateText = () => {
    const { startDate, endDate } = range[0];

    if (!startDate) return "Select dates";

    if (startDate && !endDate) {
      return `${startDate.toLocaleDateString()} →`;
    }

    if (startDate && endDate && startDate.getTime() === endDate.getTime()) {
      return `${startDate.toLocaleDateString()} →`;
    }

    return `${startDate.toLocaleDateString()} → ${endDate.toLocaleDateString()}`;
  };

  return (
    <section className="hero-container">
      {/* BACKGROUND (CROSSFADE LAYERED) */}
      <div className="hero-bg-wrapper">
        {/* previous slide */}
        <motion.div
          className="hero-bg"
          style={{ backgroundImage: `url(${prevSlide.image})` }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />

        {/* current slide */}
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

            {/* DATE PICKER */}
            <div className="search-box single-date">
              <div
                className="search-input"
                onClick={() => setOpenCalendar((prev) => !prev)}
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

              <AnimatePresence>
                {openCalendar && (
                  <motion.div
                    className="calendar-popup"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.96 }}
                  >
                    <div className="calendar-mobile-header">
                      <button onClick={() => setOpenCalendar(false)}>
                        <MdClose size={22} />
                      </button>

                      <button onClick={clearDates}>Clear</button>
                    </div>

                    <DateRange
                      ranges={range}
                      onChange={(item) => setRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      editableDateInputs={true}
                      rangeColors={["#ff5a5f"]}
                      months={months}
                      direction="horizontal"
                      showMonthAndYearPickers={false}
                      minDate={new Date()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}