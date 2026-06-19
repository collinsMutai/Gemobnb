import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import { MdClose } from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";
import "./CalendarModal.css";

export default function CalendarModal({
  setOpen,
  range,
  setRange,
  clearDates,
}) {
  const startDate = range[0].startDate;
  const endDate = range[0].endDate;

  return (
    <AnimatePresence>
      <motion.div
        className="calendar-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={() => setOpen(false)}
      >
        {/* MODAL */}
        <motion.div
          className="calendar-modal"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="calendar-header">
            <h3>Select Your Stay Dates</h3>

            <div className="calendar-actions">
              <button className="clear-btn" onClick={clearDates}>
                Clear
              </button>

              <button
                className="close-btn"
                onClick={() => setOpen(false)}
              >
                <MdClose size={22} />
              </button>
            </div>
          </div>

          {/* DATE PICKER */}
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates ?? [null, null];

              setRange([
                {
                  startDate: start,
                  endDate: end,
                  key: "selection",
                },
              ]);

              if (start && end) setOpen(false);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            monthsShown={window.innerWidth <= 768 ? 1 : 2}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}