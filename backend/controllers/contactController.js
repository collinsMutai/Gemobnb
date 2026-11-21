import { createTransporter } from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  const { name, phone, email, message } = req.body;

  // =========================
  // VALIDATION
  // =========================
  if (!name || !phone || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required contact fields",
    });
  }

  // =========================
  // CLEAN INPUTS
  // =========================
  const cleanName = String(name).trim();
  const cleanPhone = String(phone).trim();
  const cleanEmail = String(email).trim();
  const cleanMessage = String(message)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");

  // =========================
  // EMAIL VALIDATION
  // =========================
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  // =========================
  // HTML ESCAPING
  // =========================
  const escapeHTML = (value) =>
    value.replace(
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
  const safeMessage = escapeHTML(cleanMessage).replace(/\n/g, "<br>");

  // =========================
  // ADMIN CONTACT MESSAGE CARD
  // =========================
  const contactBlock = `
    <div style="
      margin-top:20px;
      width:100%;
      background:#ffffff;
      border:1px solid #e2e8f0;
      border-radius:16px;
      overflow:hidden;
    ">
      <div style="padding:20px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="width:100%;border-collapse:collapse;table-layout:fixed;">

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              vertical-align:top;
              font-size:14px;
            ">Name</td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              font-weight:600;
              vertical-align:top;
              font-size:14px;
              overflow-wrap:anywhere;
              word-break:break-word;
            ">${safeName}</td>
          </tr>

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              vertical-align:top;
              font-size:14px;
            ">Email</td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              vertical-align:top;
              font-size:14px;
              overflow-wrap:anywhere;
              word-break:break-all;
            ">${safeEmail}</td>
          </tr>

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              vertical-align:top;
              font-size:14px;
            ">Phone</td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              vertical-align:top;
              font-size:14px;
              overflow-wrap:anywhere;
            ">${safePhone}</td>
          </tr>

          <tr>
            <td width="28%" style="
              padding:10px 6px 10px 0;
              color:#64748b;
              vertical-align:top;
              font-size:14px;
            ">Message</td>

            <td width="72%" style="
              padding:10px 0;
              color:#1e293b;
              line-height:1.7;
              vertical-align:top;
              font-size:14px;
              overflow-wrap:anywhere;
              word-break:break-word;
            ">${safeMessage}</td>
          </tr>

        </table>
      </div>
    </div>
  `;

  // =========================
  // CUSTOMER ACKNOWLEDGEMENT
  // =========================
  const userBlock = `
    <div style="
      background:#ffffff;
      padding:12px 8px 24px;
      text-align:center;
    ">
      <p style="
        margin:0 auto;
        max-width:480px;
        color:#64748b;
        font-size:15px;
        line-height:1.8;
        overflow-wrap:anywhere;
      ">
        Thank you for contacting GemoBnB. Your message has been received
        successfully. Our team will get back to you as soon as possible.
      </p>
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

        <!-- TITLE -->
        ${
          title || subtitle
            ? `
          <div style="padding:28px 16px 10px;text-align:center;">
            ${
              title
                ? `<h1 style="margin:0;color:#0f172a;font-size:25px;line-height:1.3;">${title}</h1>`
                : ""
            }

            ${
              subtitle
                ? `<p style="margin:14px auto 0;max-width:520px;color:#64748b;font-size:14px;line-height:1.7;">${subtitle}</p>`
                : ""
            }
          </div>
          `
            : ""
        }

        <!-- CONTENT -->
        <div style="padding:0 12px 28px;">
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
          <a href="mailto:info@gemobnb.com"
            style="color:#64748b;text-decoration:none;">
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

    // =========================
    // COMPANY EMAIL
    // =========================
    const companyEmail = process.env.ADMIN_EMAIL || "info@gemobnb.com";

    // =========================
    // 1. ADMIN NOTIFICATION
    // =========================
    const adminMail = {
      from: `"GemoBnB" <${process.env.EMAIL_USER}>`,
      to: companyEmail,
      replyTo: cleanEmail,
      subject: `New Contact Message - ${cleanName}`,
      html: emailWrapper(
        "New Contact Message",
        "Someone has submitted a new enquiry through the GemoBnB website.",
        contactBlock,
      ),
    };

    // =========================
    // 2. CUSTOMER ACKNOWLEDGEMENT
    // =========================
    const userMail = {
      from: `"GemoBnB" <${process.env.EMAIL_USER}>`,
      to: cleanEmail,
      replyTo: companyEmail,
      subject: "We've Received Your Message",
      html: emailWrapper("", "", userBlock),
    };

    // =========================
    // 3. SEND BOTH EMAILS
    // =========================
    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    // =========================
    // RESPONSE
    // =========================
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact Message Error:", error);

    return res.status(500).json({
      success: false,
      message: "Message submission failed",
    });
  }
};
