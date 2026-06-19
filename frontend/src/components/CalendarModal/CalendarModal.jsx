import { motion, AnimatePresence } from "framer-motion";
import { DateRange } from "react-date-range";
import { MdClose } from "react-icons/md";

export default function CalendarModal({
  open,
  setOpen,
  range,
  setRange,
  months,
  clearDates,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="calendar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* MODAL */}
          <motion.div
            className="calendar-modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="calendar-mobile-header">
              <button onClick={() => setOpen(false)}>
                <MdClose size={22} />
              </button>

              <button onClick={clearDates}>Clear</button>
            </div>

            {/* CALENDAR */}
            <DateRange
              ranges={range}
              onChange={(item) => setRange([item.selection])}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
              rangeColors={["#14b8a6"]}
              months={months}
              direction="horizontal"
              showMonthAndYearPickers={false}
              minDate={new Date()}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}