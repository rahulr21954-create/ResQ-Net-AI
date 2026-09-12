import mongoose from "mongoose";

const floodAlertSchema = new mongoose.Schema(
  {
    // Flood location
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },

    // How far from the flood location users should be alerted
    affectedRadius: {
      type: Number,
      required: true,
      default: 5, // kilometers
    },

    // Flood severity
    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },

    // Message shown to users
    message: {
      type: String,
      required: true,
    },

    // Source of the flood information
    source: {
      type: String,
      default: "ResQNet AI",
    },

    // Whether notifications have been sent
    notificationSent: {
      type: Boolean,
      default: false,
    },

    // Time when alert becomes active
    detectedAt: {
      type: Date,
      default: Date.now,
    },

    // Optional expiry
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const FloodAlert = mongoose.model("FloodAlert", floodAlertSchema);

export default FloodAlert;