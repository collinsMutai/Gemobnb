import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    guests: {
      type: Number,
      default: 1,
      min: 1,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    // Booking lifecycle
    status: {
      type: String,
      enum: [
        "pending", // Booking created
        "emailed", // Emails successfully sent
        "confirmed", // Admin accepted booking
        "cancelled",
      ],
      default: "pending",
    },

    // Email tracking
    emailSentToAdmin: {
      type: Boolean,
      default: false,
    },

    emailSentToGuest: {
      type: Boolean,
      default: false,
    },

    adminEmailSentAt: {
      type: Date,
      default: null,
    },

    guestEmailSentAt: {
      type: Date,
      default: null,
    },

    // Optional admin information
    confirmedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    cancellationReason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Helpful indexes
bookingSchema.index({ email: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: -1 });

export default mongoose.model("Booking", bookingSchema);
