import { createTransporter } from "../config/mailer.js";

export const sendContactMessage = async (req, res) => {
  const transporter = createTransporter();

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

  // Remove unwanted indentation and empty lines
  const cleanMessage = String(message)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  // Escape HTML to prevent HTML injection
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
      <div style="padding:28px;">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            width:100%;
            border-collapse:collapse;
            table-layout:fixed;
          "
        >
          <tr>
            <td style="
              padding:10px 0;
              color:#64748b;
              width:120px;
              vertical-align:top;
            ">
              Name
            </td>

            <td style="
              padding:10px 0;
              color:#1e293b;
              font-weight:600;
              vertical-align:top;
              text-align:left;
            ">
              ${safeName}
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;color:#64748b;vertical-align:top;">
              Email
            </td>

            <td style="
              padding:10px 0;
              color:#1e293b;
              vertical-align:top;
              text-align:left;
              word-break:break-word;
            ">
              ${safeEmail}
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;color:#64748b;vertical-align:top;">
              Phone
            </td>

            <td style="
              padding:10px 0;
              color:#1e293b;
              vertical-align:top;
              text-align:left;
            ">
              ${safePhone}
            </td>
          </tr>

          <tr>
            <td style="
              padding:10px 0;
              color:#64748b;
              width:120px;
              vertical-align:top;
            ">
              Message
            </td>

            <td style="
              padding:10px 0;
              color:#1e293b;
              line-height:1.7;
              vertical-align:top;
              text-align:left;
              word-break:break-word;
            ">
              ${safeMessage}
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;

  // =========================
  // USER ACKNOWLEDGEMENT
  // =========================
  const userBlock = `
    <div
      style="
        background:#ffffff;
        padding:12px 36px 28px 36px;
        text-align:center;
      "
    >
      <p
        style="
          margin:0 auto;
          max-width:480px;
          color:#64748b;
          font-size:16px;
          line-height:1.8;
        "
      >
        Thank you for contacting GemoBnB. Your message has been received
        successfully. Our team will get back to you as soon as possible.
      </p>
    </div>
  `;

  // =========================
  // EMAIL WRAPPER
  // SAME DESIGN
  // =========================
  const emailWrapper = (title, subtitle, content) => `
    <div style="background:#f8fafc;padding:40px 16px;font-family:Arial,sans-serif;">
      <div
        style="
          max-width:700px;
          margin:auto;
          background:#ffffff;
          border-radius:24px;
          overflow:hidden;
          border:1px solid #e2e8f0;
          box-shadow:0 10px 30px rgba(15,23,42,.06);
        "
      >

        <div style="background:#0f172a;padding:40px 32px;text-align:center;">
          <div style="color:#ffffff;font-size:36px;font-weight:700;">
            GemoBnB
          </div>

          <div style="margin-top:10px;color:#cbd5e1;font-size:13px;letter-spacing:.12em;">
            THINDIGUA • KIAMBU ROAD
          </div>
        </div>

        ${
          title || subtitle
            ? `
          <div style="padding:36px 32px 10px;text-align:center;">
            ${
              title
                ? `
              <h1 style="margin:0;color:#0f172a;font-size:34px;font-weight:700;">
                ${title}
              </h1>
              `
                : ""
            }

            ${
              subtitle
                ? `
              <p style="margin:16px auto 0;max-width:520px;color:#64748b;font-size:16px;line-height:1.7;">
                ${subtitle}
              </p>
              `
                : ""
            }
          </div>
          `
            : ""
        }

        <div style="padding:0 32px 40px;">
          ${content}
        </div>

        <div
          style="
            border-top:1px solid #e2e8f0;
            padding:24px;
            text-align:center;
            color:#94a3b8;
            font-size:13px;
            background:#f8fafc;
          "
        >
          © ${new Date().getFullYear()} GemoBnB. All rights reserved.
        </div>

      </div>
    </div>
  `;

  try {
    // =========================
    // 1. ADMIN EMAIL
    // =========================
    const adminMail = {
      from: process.env.EMAIL_USER,
      replyTo: cleanEmail,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message - ${cleanName}`,
      html: emailWrapper(
        "New Contact Message",
        "Someone has submitted a new enquiry through the GemoBnB website.",
        contactBlock,
      ),
    };

    // =========================
    // 2. CUSTOMER EMAIL
    // =========================
    const userMail = {
      from: process.env.EMAIL_USER,
      to: cleanEmail,
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
