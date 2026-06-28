// controllers/modalController.js

import { createTransporter } from "../config/mailer.js";
import Booking from "../models/Booking.js";

// 🔒 TEMP SHARED HOSTING LOCK (prevents duplicate submissions)
const processing = new Map();

export const bookStay = async (req, res) => {
  const transporter = createTransporter();

  const { checkIn, checkOut, name, phone, email, guests, notes } = req.body;

  // =========================
  // VALIDATION
  // =========================
  if (!checkIn || !checkOut || !name || !phone || !email) {
    return res.status(400).json({
      success: false,
      message: "Missing required booking fields",
    });
  }

  // =========================
  // 🔒 DEDUPLICATION KEY
  // =========================
  const key = `${email}-${checkIn}-${checkOut}`;

  if (processing.has(key)) {
    return res.status(429).json({
      success: false,
      message: "Booking already in progress. Please wait...",
    });
  }

  processing.set(key, true);

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // =========================
  // RESERVATION CARD
  // =========================
  const bookingBlock = `
    <div
      style="
        margin-top:24px;
        background:#ffffff;
        border:1px solid #e2e8f0;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 4px 20px rgba(15,23,42,.04);
      "
    >
      <div style="padding:28px;border-bottom:1px solid #e2e8f0;">
        <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(20,184,166,.12);color:#0f766e;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:16px;">
          Booking Request Received
        </div>

        <div style="font-size:28px;font-weight:700;color:#0f172a;">
          ${formatDate(checkIn)}
        </div>

        <div style="margin:8px 0;color:#f59e0b;font-size:18px;font-weight:700;">
          ↓
        </div>

        <div style="font-size:28px;font-weight:700;color:#0f172a;">
          ${formatDate(checkOut)}
        </div>

        <div style="margin-top:14px;color:#475569;font-size:15px;">
          ${guests || 1} Guest${Number(guests || 1) > 1 ? "s" : ""}
        </div>
      </div>

      <div style="padding:28px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#64748b;width:120px;">Guest</td>
            <td style="padding:10px 0;color:#1e293b;font-weight:600;">
              ${name}
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;color:#64748b;">Email</td>
            <td style="padding:10px 0;color:#1e293b;">${email}</td>
          </tr>

          <tr>
            <td style="padding:10px 0;color:#64748b;">Phone</td>
            <td style="padding:10px 0;color:#1e293b;">${phone}</td>
          </tr>

          ${
            notes
              ? `
          <tr>
            <td style="padding:10px 0;color:#64748b;vertical-align:top;">Notes</td>
            <td style="padding:10px 0;color:#1e293b;line-height:1.7;">${notes}</td>
          </tr>
          `
              : ""
          }
        </table>
      </div>
    </div>
  `;

  // =========================
  // EMAIL WRAPPER
  // =========================
  const emailWrapper = (title, subtitle, content) => `
    <div style="background:#f8fafc;padding:40px 16px;font-family:Arial,sans-serif;">
      <div style="max-width:700px;margin:auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,.06);">

        <div style="background:#0f172a;padding:40px 32px;text-align:center;">
          <div style="color:#ffffff;font-size:36px;font-weight:700;">GemoBnB</div>
          <div style="margin-top:10px;color:#cbd5e1;font-size:13px;letter-spacing:.12em;">
            THINDIGUA • KIAMBU ROAD
          </div>
        </div>

        <div style="padding:36px 32px 10px;text-align:center;">
          <h1 style="margin:0;color:#0f172a;font-size:34px;font-weight:700;">${title}</h1>
          <p style="margin:16px auto 0;max-width:520px;color:#64748b;font-size:16px;line-height:1.7;">
            ${subtitle}
          </p>
        </div>

        <div style="padding:0 32px 40px;">
          ${content}
        </div>

        <div style="border-top:1px solid #e2e8f0;padding:24px;text-align:center;color:#94a3b8;font-size:13px;background:#f8fafc;">
          © ${new Date().getFullYear()} GemoBnB. All rights reserved.
        </div>

      </div>
    </div>
  `;

  // =========================
  // MAIN LOGIC
  // =========================
  try {
    // Save booking first
    const booking = await Booking.create({
      checkIn,
      checkOut,
      name,
      phone,
      email,
      guests,
      notes,
    });
    const adminMail = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New Stay Booking - ${name}`,
      html: emailWrapper(
        "New Booking Request",
        "A guest has submitted a reservation request through the website.",
        bookingBlock,
      ),
    };

    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We've Received Your Booking Request",
      html: emailWrapper(
        "Booking Request Received",
        "Thank you for your reservation request. We will confirm availability shortly.",
        bookingBlock,
      ),
    };

    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    // =========================
    // UPDATE STATUS
    // =========================
    booking.status = "confirmed";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking received successfully.",
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Booking submission failed.",
    });
  } finally {
    processing.delete(key);
  }
};
