import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import "./DateConfirmationModal.css";

export default function DateConfirmationModal({
  open,
  setOpen,
  range,
  onContinue,
}) {
  if (!range) return null;

  const { startDate, endDate } = range;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="confirmation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="confirmation-modal"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="confirmation-close"
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>

            <h2>Confirm Your Stay</h2>

            <div className="confirmation-dates">
              <div className="date-card">
                <span>Check-in</span>
                <strong>
                  {startDate?.toLocaleDateString()}
                </strong>
              </div>

              <div className="date-arrow">→</div>

              <div className="date-card">
                <span>Check-out</span>
                <strong>
                  {endDate?.toLocaleDateString()}
                </strong>
              </div>
            </div>

            <div className="confirmation-actions">
              <button
                className="btn-secondary"
                onClick={() => setOpen(false)}
              >
                Change Dates
              </button>

              <button
                className="btn-primary"
                onClick={onContinue}
              >
                Continue
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}