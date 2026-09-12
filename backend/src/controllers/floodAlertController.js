import FloodAlert from "../models/FloodAlert.js";

import User from "../models/User.js";

import { calculateDistance } from "../utils/calculateDistance.js";


import {
  sendFloodAlertEmail,
} from "../services/emailService.js";


// ======================================================
// CREATE FLOOD ALERT
// ======================================================

export const createFloodAlert = async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      riskLevel,
      affectedRadius,
      message,
      source,
      expiresAt,
    } = req.body;

    // Validate required fields
    if (
      latitude === undefined ||
      longitude === undefined ||
      !riskLevel ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message:
          "latitude, longitude, riskLevel and message are required",
      });
    }

    // Validate risk level
    const validRiskLevels = [
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ];

    if (!validRiskLevels.includes(riskLevel)) {
      return res.status(400).json({
        success: false,
        message: "Invalid risk level",
      });
    }

    // Default radius
    const radius = affectedRadius || 5;

    // Create flood alert
    const floodAlert = await FloodAlert.create({
      location: {
        latitude,
        longitude,
      },
      affectedRadius: radius,
      riskLevel,
      message,
      source: source || "ResQNet AI",
      expiresAt: expiresAt || null,
    });

    // ==================================================
    // FIND USERS WITH REGISTERED LOCATION
    // ==================================================

    const users = await User.find({
      "location.latitude": { $ne: null },
      "location.longitude": { $ne: null },
    });

    let notifiedUsers = 0;

    // ==================================================
    // SEND EMAIL TO AFFECTED USERS
    // ==================================================

    for (const user of users) {

      const distance = calculateDistance(
        latitude,
        longitude,
        user.location.latitude,
        user.location.longitude
      );

      // User is inside affected radius
      if (distance <= radius) {

        const emailSent = await sendFloodAlertEmail({
          to: user.email,
          userName: user.fullName,
          riskLevel,
          message,
          distance: Number(distance.toFixed(2)),
          affectedRadius: radius,
        });

        if (emailSent) {
          notifiedUsers++;
        }
      }
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,
      message: "Flood alert created successfully",
      alert: floodAlert,
      notifiedUsers,
    });

  } catch (error) {

    console.error("Create Flood Alert Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create flood alert",
      error: error.message,
    });
  }
};


// ======================================================
// GET ACTIVE FLOOD ALERTS
// ======================================================

export const getActiveFloodAlerts = async (req, res) => {
  try {

    const alerts = await FloodAlert.find({
      riskLevel: {
        $in: ["HIGH", "CRITICAL"],
      },

      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } },
      ],

    })
      .sort({ detectedAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      alerts,
    });

  } catch (error) {

    console.error(
      "Get Active Flood Alerts Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch active flood alerts",
      error: error.message,
    });
  }
};


// ======================================================
// GET FLOOD ALERTS FOR LOGGED-IN USER
// ======================================================

export const getMyFloodAlerts = async (req, res) => {
  try {

    // Get logged-in user's ID
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==================================================
    // CHECK USER LOCATION
    // ==================================================

    if (
      user.location?.latitude === null ||
      user.location?.longitude === null ||
      user.location?.latitude === undefined ||
      user.location?.longitude === undefined
    ) {

      return res.status(200).json({
        success: true,
        alerts: [],
        message: "User location not available",
      });
    }

    // ==================================================
    // GET ACTIVE HIGH / CRITICAL ALERTS
    // ==================================================

    const alerts = await FloodAlert.find({

      riskLevel: {
        $in: ["HIGH", "CRITICAL"],
      },

      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } },
      ],

    }).sort({ detectedAt: -1 });


    // ==================================================
    // CHECK WHICH ALERTS AFFECT USER
    // ==================================================

    const affectedAlerts = [];

    for (const alert of alerts) {

      const distance = calculateDistance(

        alert.location.latitude,
        alert.location.longitude,

        user.location.latitude,
        user.location.longitude

      );

      if (distance <= alert.affectedRadius) {

        affectedAlerts.push({

          ...alert.toObject(),

          distanceFromUser:
            Number(distance.toFixed(2)),

        });

      }
    }


    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(200).json({

      success: true,

      alerts: affectedAlerts,

      totalAlerts: affectedAlerts.length,

    });

  } catch (error) {

    console.error(
      "Get My Flood Alerts Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: "Failed to fetch flood alerts",

      error: error.message,

    });
  }
};