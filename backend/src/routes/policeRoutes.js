import express from "express";
import { getNearbyPolice } from "../controllers/policeController.js";

const router = express.Router();

router.get("/nearby", getNearbyPolice);

export default router;