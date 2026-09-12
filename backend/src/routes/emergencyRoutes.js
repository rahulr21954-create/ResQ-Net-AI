import express from "express";

import {
  createEmergency,
  getMyEmergencies,
  getEmergencyById,
  updateEmergencyStatus,
} from "../controllers/emergencyController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

console.log("Emergency Routes Loaded");

router.post(
  "/",
  (req, res, next) => {
    console.log("Route reached");
    next();
  },
  protect,
  createEmergency
);

router.get("/", protect, getMyEmergencies);

router.get("/:id", protect, getEmergencyById);

router.put("/:id/status", protect, updateEmergencyStatus);

export default router;