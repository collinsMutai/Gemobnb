// routes/modalRoutes.js

import express from "express";
import { bookStay } from "../controllers/modalController.js";

const router = express.Router();

router.post("/book-stay", bookStay);

export default router;