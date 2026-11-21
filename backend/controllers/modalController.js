import { createTransporter } from "../config/mailer.js";
import Booking from "../models/Booking.js";

export const bookStay = async (req, res) => {
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
  // CLEAN INPUTS
  // =========================
  const cleanName = String(name).trim();
  const cleanPhone = String(phone).trim();
  const cleanEmail = String(email).trim();
  const cleanNotes = String(notes || "").trim();
  const cleanGuests = Number(guests || 1);

  // =========================
  // VALIDATION
  // =========================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (!Number.isInteger(cleanGuests) || cleanGuests < 1) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid number of guests.",
    });
  }

  const validCheckIn = new Date(checkIn);
  const validCheckOut = new Date(checkOut);

  if (
    Number.isNaN(validCheckIn.getTime()) ||
    Number.isNaN(validCheckOut.getTime()) ||
    validCheckOut <= validCheckIn
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid check-in and check-out dates.",
    });
  }

  // =========================
  // HTML ESCAPING
  // =========================
  const escapeHTML = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );

  const safeName = escapeHTML(cleanName);
  const safePhone = escapeHTML(cleanPhone);
  const safeEmail = escapeHTML(cleanEmail);

  const safeNotes = escapeHTML(cleanNotes).replace(/\r?\n/g, "<br>");

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });

  const formattedCheckIn = formatDate(checkIn);
  const formattedCheckOut = formatDate(checkOut);

  // =========================
  // RESERVATION CARD
  // =========================
  const bookingBlock = `
    <div style="
      margin-top:20px;
      width:100%;
      background:#ffffff;
      border:1px solid #e2e8f0;
      border-radius:16px;
      overflow:hidden;
    ">

      <!-- BOOKING DATES -->
      <div style="
        padding:24px 16px;
        border-bottom:1px solid #e2e8f0;
      ">

        <div style="
          display:inline-block;
          padding:8px 14px;
          border-radius:999px;
          background:#ccfbf1;
          color:#0f766e;
          font-size:11px;
          font-weight:700;
          text-transform:uppercase;
          letter-spacing:.05em;
          margin-bottom:16px;
        ">
          Booking Request Received
        </div>

        <div style="
          font-size:24px;
          font-weight:700;
          color:#0f172a;
          line-height:1.4;
          overflow-wrap:anywhere;
        ">
          ${formattedCheckIn}
        </div>

        <div style="
          margin:8px 0;
          color:#f59e0b;
          font-size:18px;
          font-weight:700;
        ">
          ↓
        </div>

        <div style="
          font-size:24px;
          font-weight:700;
          color:#0f172a;
          line-height:1.4;
          overflow-wrap:anywhere;
        ">
          ${formattedCheckOut}
        </div>

        <div style="
          margin-top:14px;
          color:#475569;
          font-size:14px;
        ">
          ${cleanGuests} Guest${cleanGuests > 1 ? "s" : ""}
        </div>

      </div>

      <!-- GUEST DETAILS -->
      <div style="padding:20px 12px;">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width:100%;
            border-collapse:collapse;
            table-layout:fixed;
          "
        >

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              font-size:14px;
              vertical-align:top;
            ">
              Guest
            </td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              font-size:14px;
              font-weight:600;
              vertical-align:top;
              overflow-wrap:anywhere;
              word-break:break-word;
            ">
              ${safeName}
            </td>
          </tr>

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              font-size:14px;
              vertical-align:top;
            ">
              Email
            </td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              font-size:14px;
              vertical-align:top;
              overflow-wrap:anywhere;
              word-break:break-all;
            ">
              ${safeEmail}
            </td>
          </tr>

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              font-size:14px;
              vertical-align:top;
            ">
              Phone
            </td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              font-size:14px;
              vertical-align:top;
              overflow-wrap:anywhere;
            ">
              ${safePhone}
            </td>
          </tr>

          ${
            cleanNotes
              ? `
            <tr>
              <td width="28%" style="
                padding:10px 6px 10px 0;
                color:#64748b;
                font-size:14px;
                vertical-align:top;
              ">
                Notes
              </td>

              <td width="72%" style="
                padding:10px 0;
                color:#1e293b;
                font-size:14px;
                line-height:1.7;
                vertical-align:top;
                overflow-wrap:anywhere;
                word-break:break-word;
              ">
                ${safeNotes}
              </td>
            </tr>
            `
              : ""
          }

        </table>
      </div>
    </div>
  `;

  // =========================
  // RESPONSIVE EMAIL WRAPPER
  // =========================
  const emailWrapper = (title, subtitle, content) => `
    <div style="
      background:#f8fafc;
      padding:16px 6px;
      font-family:Arial,Helvetica,sans-serif;
      width:100%;
      margin:0;
    ">

      <div style="
        width:100%;
        max-width:700px;
        margin:0 auto;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        border:1px solid #e2e8f0;
      ">

        <!-- HEADER -->
        <div style="
          background:#0f172a;
          padding:32px 12px;
          text-align:center;
        ">

          <div style="
            color:#ffffff;
            font-size:30px;
            font-weight:700;
          ">
            GemoBnB
          </div>

          <div style="
            margin-top:10px;
            color:#cbd5e1;
            font-size:11px;
            letter-spacing:.08em;
          ">
            THINDIGUA • KIAMBU ROAD
          </div>

        </div>

        <!-- TITLE AND SUBTITLE -->
        <div style="
          padding:28px 16px 10px;
          text-align:center;
        ">

          <h1 style="
            margin:0;
            color:#0f172a;
            font-size:25px;
            line-height:1.3;
            overflow-wrap:anywhere;
          ">
            ${title}
          </h1>

          <p style="
            margin:14px auto 0;
            max-width:520px;
            color:#64748b;
            font-size:14px;
            line-height:1.7;
            overflow-wrap:anywhere;
          ">
            ${subtitle}
          </p>

        </div>

        <!-- CONTENT -->
        <div style="
          padding:0 12px 28px;
          width:100%;
        ">
          ${content}
        </div>

        <!-- FOOTER -->
        <div style="
          border-top:1px solid #e2e8f0;
          padding:20px 10px;
          text-align:center;
          color:#94a3b8;
          font-size:12px;
          line-height:1.6;
          background:#f8fafc;
        ">
          © ${new Date().getFullYear()} GemoBnB. All rights reserved.

          <br>

          <a
            href="mailto:info@gemobnb.com"
            style="color:#64748b;text-decoration:none;"
          >
            info@gemobnb.com
          </a>
        </div>

      </div>
    </div>
  `;

  try {
    // =========================
    // SMTP TRANSPORTER
    // =========================
    const transporter = createTransporter();

    const companyEmail = process.env.ADMIN_EMAIL || "info@gemobnb.com";

    // =========================
    // 1. SAVE BOOKING
    // =========================
    const booking = await Booking.create({
      checkIn,
      checkOut,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      guests: cleanGuests,
      notes: cleanNotes,
      status: "pending",
      emailSentToAdmin: false,
      emailSentToGuest: false,
    });

    // =========================
    // 2. ADMIN NOTIFICATION
    // =========================
    const adminMail = {
      from: `"GemoBnB" <${process.env.EMAIL_USER}>`,
      to: companyEmail,
      replyTo: cleanEmail,
      subject: `New Stay Booking - ${cleanName}`,
      html: emailWrapper(
        "New Booking Request",
        "A guest has submitted a reservation request through the website.",
        bookingBlock,
      ),
    };

    // =========================
    // 3. CUSTOMER ACKNOWLEDGEMENT
    // =========================
    const userMail = {
      from: `"GemoBnB" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      replyTo: companyEmail,
      subject: "We've Received Your Booking Request",
      html: emailWrapper(
        "Booking Request Received",
        "Thank you for your reservation request. We will confirm availability shortly.",
        bookingBlock,
      ),
    };

    // =========================
    // 4. SEND EMAILS
    // =========================
    const results = await Promise.allSettled([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    const adminSent = results[0].status === "fulfilled";
    const guestSent = results[1].status === "fulfilled";

    // Log individual delivery failures
    if (!adminSent) {
      console.error("Admin booking email failed:", results[0].reason);
    }

    if (!guestSent) {
      console.error("Guest booking email failed:", results[1].reason);
    }

    // =========================
    // 5. UPDATE BOOKING STATUS
    // =========================
    booking.emailSentToAdmin = adminSent;
    booking.emailSentToGuest = guestSent;

    if (adminSent) {
      booking.adminEmailSentAt = new Date();
    }

    if (guestSent) {
      booking.guestEmailSentAt = new Date();
    }

    booking.status = "pending";

    await booking.save();

    // =========================
    // RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      message: "Booking received successfully.",
      bookingId: booking._id,
      status: booking.status,
      emails: {
        admin: adminSent,
        guest: guestSent,
      },
    });
  } catch (error) {
    console.error("Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Booking submission failed",
    });
  }
};
