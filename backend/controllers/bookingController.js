import Booking from "../models/Booking.js";

/**
 * GET ALL BOOKINGS
 * (Admin dashboard)
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Get All Bookings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/**
 * GET SINGLE BOOKING
 */
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
    });
  }
};

/**
 * UPDATE BOOKING
 * (status, notes, dates, guests, etc.)
 */
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const allowedFields = {
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      guests: req.body.guests,
      notes: req.body.notes,
      status: req.body.status,
      cancellationReason: req.body.cancellationReason,
    };

    // remove undefined fields
    Object.keys(allowedFields).forEach(
      (key) => allowedFields[key] === undefined && delete allowedFields[key]
    );

    const booking = await Booking.findByIdAndUpdate(id, allowedFields, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // auto timestamps for status changes
    if (allowedFields.status === "confirmed") {
      booking.confirmedAt = new Date();
    }

    if (allowedFields.status === "cancelled") {
      booking.cancelledAt = new Date();
    }

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Update Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

/**
 * DELETE BOOKING
 */
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};

/**
 * UPDATE STATUS ONLY (clean admin action endpoint)
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, cancellationReason } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = status;

    if (status === "confirmed") {
      booking.confirmedAt = new Date();
    }

    if (status === "cancelled") {
      booking.cancelledAt = new Date();
      booking.cancellationReason = cancellationReason || "";
    }

    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking status updated",
      data: booking,
    });
  } catch (error) {
    console.error("Status Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};