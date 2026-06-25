import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import emailRoutes from "./routes/emailRoutes.js";
import modalRoutes from "./routes/modalRoutes.js";


const app = express();

/* =========================
SECURITY MIDDLEWARE
========================= */

// 🔐 Security HTTP headers
app.use(helmet());

/* =========================
CORS CONFIG (React frontend only)
========================= */

const allowedOrigins = [
  "http://localhost:3000", // dev React
  "http://localhost:5173", // Vite dev
  "https://gemobnb.com",
  "https://www.gemobnb.com",
  "https://api.gemobnb.com"
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
  }),
);
/* =========================
RATE LIMITING (anti spam)
========================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50, // limit each IP
  message: "Too many requests, please try again later.",
});

app.use(limiter);

/* =========================
BODY LIMIT (prevent abuse)
========================= */

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* =========================
ROUTES
========================= */

// health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

// API routes
app.use("/api", emailRoutes);
app.use("/api", modalRoutes);

export default app;
