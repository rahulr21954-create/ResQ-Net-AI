import express from "express";

import {
  createFloodAlert,
  getActiveFloodAlerts,
  getMyFloodAlerts,
} from "../controllers/floodAlertController.js";

import { sendFloodAlertEmail } from "../services/emailService.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();


// 🧪 TEST EMAIL
router.get("/test-email", async (req, res) => {
  try {
    const success = await sendFloodAlertEmail(
      "YOUR_EMAIL@gmail.com",
      "HIGH",
      "This is a test flood alert from ResQNet AI.",
      {
        latitude: 28.4744,
        longitude: 77.504,
      },
      2.5
    );

    if (!success) {
      return res.status(500).json({
        success: false,
        message: "Email sending failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully",
    });

  } catch (error) {
    console.error("Test Email Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// 🚨 CREATE FLOOD ALERT
router.post("/", protect, createFloodAlert);


// 🌊 ACTIVE FLOOD ALERTS
router.get("/active", getActiveFloodAlerts);


// 👤 MY FLOOD ALERTS
router.get("/my-alerts", protect, getMyFloodAlerts);


export default router;