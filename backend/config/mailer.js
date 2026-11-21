import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "gemobnb.com",
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,

    auth: {
      user: process.env.EMAIL_USER || "info@gemobnb.com",
      pass: process.env.EMAIL_PASS,
    },
  });
};
