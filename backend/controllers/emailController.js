import { createTransporter } from "../config/mailer.js";

export const sendEmail = async (req, res) => {
  const transporter = createTransporter();

  const { name, email, phone, message } = req.body;

  const logoUrl = "https://nowride.care/assets/logo-v61gNvch.png";

  // =========================
  // VALIDATION
  // =========================
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const preline = (value) => `
    <div style="
      margin:6px 0;
      line-height:1.7;
      white-space:pre-line;
      color:#0a0a0a;
      font-size:14px;
    ">
      ${value ?? ""}
    </div>
  `;

  const groupBlock = `
    <div style="
      margin-top:18px;
      padding:18px;
      background:#f5f5f5;
      border-left:5px solid #e11d48;
      border-radius:12px;
    ">
      <div style="margin-bottom:10px;">
        <strong style="color:#0a0a0a;">Ride Request Details</strong>
      </div>

      ${preline(`<strong>Name:</strong> ${name}`)}
      ${preline(`<strong>Email:</strong> ${email}`)}
      ${preline(`<strong>Phone:</strong> ${phone}`)}
      ${preline(`<strong>Message:</strong> ${message}`)}
    </div>
  `;

  const ctaBlock = `
    <div style="margin-top:30px; text-align:center;">
      <table role="presentation" style="margin:0 auto;">
        <tr>

          <!-- WEBSITE BUTTON -->
          <td style="padding-right:12px;">
            <a href="https://nowride.care"
              style="
                background:#e11d48;
                color:#ffffff;
                padding:12px 22px;
                border-radius:999px;
                text-decoration:none;
                display:inline-block;
                font-weight:600;
              ">
              Visit Website
            </a>
          </td>

          <!-- CALL CTA -->
          <td style="padding-left:12px; font-size:13px; color:#2a2a2a; line-height:1.4;">
            <div style="font-weight:600; color:#0a0a0a;">
              Need immediate assistance?
            </div>
            <a href="tel:+17193067313"
              style="color:#e11d48; font-weight:600; text-decoration:none;">
              Call +1 (719) 306-7313
            </a>
          </td>

        </tr>
      </table>
    </div>
  `;

  try {
    // =========================
    // ADMIN EMAIL
    // =========================
    const adminMail = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New Ride Request - ${name}`,
      html: `
      <div style="font-family:Arial,sans-serif;background:#ffffff;padding:30px;color:#0a0a0a;">
        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <div style="background:linear-gradient(135deg,#e11d48,#991b1b);color:#ffffff;padding:30px;text-align:center;">
            <img src="${logoUrl}" alt="NowRide Logo" style="max-width:150px;margin-bottom:12px;" />
            <h1 style="margin:0;font-size:22px;">NowRide Medical Transportation</h1>
            <p style="margin-top:8px;opacity:0.9;">New Ride Request Received</p>
          </div>

          <div style="padding:28px;">
            ${groupBlock}
          </div>

          <div style="background:#f5f5f5;padding:14px;text-align:center;font-size:12px;color:#2a2a2a;border-top:1px solid #e5e5e5;">
            © ${new Date().getFullYear()} NowRide Medical Transportation
          </div>

        </div>
      </div>
      `,
    };

    // =========================
    // USER EMAIL
    // =========================
    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your ride request ✔️",
      html: `
      <div style="font-family:Arial,sans-serif;background:#ffffff;padding:30px;color:#0a0a0a;">
        <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <div style="background:linear-gradient(135deg,#e11d48,#991b1b);color:#ffffff;padding:30px;text-align:center;">
            <img src="${logoUrl}" alt="NowRide Logo" style="max-width:150px;margin-bottom:12px;" />
            <h1 style="margin:0;">NowRide Medical Transportation</h1>
            <p style="margin-top:8px;opacity:0.9;">Thank you for contacting us</p>
          </div>

          <div style="padding:30px;">
            <h2 style="color:#e11d48;">Hi ${name},</h2>

            <p style="line-height:1.7;color:#2a2a2a;">
              Thank you for choosing NowRide Medical Transportation.
              Our dispatch team will contact you shortly.
            </p>

            ${groupBlock}

            ${ctaBlock}
          </div>

          <div style="background:#f5f5f5;padding:14px;text-align:center;font-size:12px;color:#2a2a2a;border-top:1px solid #e5e5e5;">
            © ${new Date().getFullYear()} NowRide Medical Transportation
          </div>

        </div>
      </div>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
};