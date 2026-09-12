import express from "express";

import {
  predictFloodRisk,
} from "../controllers/floodPredictionController.js";

import {
  getWeatherData,
} from "../services/weatherService.js";


const router = express.Router();


// Flood prediction
router.post(
  "/predict",
  predictFloodRisk
);


// Get weather data
router.get(
  "/weather",
  async (req, res) => {
    try {

      const {
        latitude,
        longitude,
      } = req.query;


      if (!latitude || !longitude) {
        return res.status(400).json({
          success: false,
          message:
            "Latitude and longitude are required",
        });
      }


      const weather = await getWeatherData(
        latitude,
        longitude
      );


      return res.status(200).json({
        success: true,
        weather,
      });

    } catch (error) {

      console.error(
        "Weather Route Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch weather data",
      });
    }
  }
);

router.get(
  "/predict-current",
  async (req, res) => {
    try {

      const {
        latitude,
        longitude,
      } = req.query;


      if (!latitude || !longitude) {
        return res.status(400).json({
          success: false,
          message:
            "Latitude and longitude are required",
        });
      }


      // Get real weather data
      const weather =
        await getWeatherData(
          Number(latitude),
          Number(longitude)
        );


      /*
       * Temporary prediction logic
       *
       * We are using the same
       * prediction rules from Step 1.
       */

      const {
        rainfall1h,
        rainfall3h,
        forecastRainfall,
        humidity,
      } = weather;


      let score = 0;

      const reasons = [];


      // Rainfall 1h

      if (rainfall1h >= 50) {

        score += 30;

        reasons.push(
          "Heavy rainfall detected in the last hour"
        );

      } else if (rainfall1h >= 25) {

        score += 15;

        reasons.push(
          "Moderate rainfall detected"
        );
      }


      // Rainfall 3h

      if (rainfall3h >= 100) {

        score += 25;

        reasons.push(
          "High accumulated rainfall detected"
        );

      } else if (rainfall3h >= 50) {

        score += 15;

        reasons.push(
          "Significant rainfall accumulated"
        );
      }


      // Forecast

      if (forecastRainfall >= 60) {

        score += 25;

        reasons.push(
          "Heavy rainfall is expected"
        );

      } else if (forecastRainfall >= 30) {

        score += 15;

        reasons.push(
          "Additional rainfall is expected"
        );
      }


      // Humidity

      if (humidity >= 90) {

        score += 10;

        reasons.push(
          "Very high humidity detected"
        );

      } else if (humidity >= 80) {

        score += 5;
      }


      // Determine risk

      let riskLevel;
      let probability;


      if (score >= 80) {

        riskLevel = "CRITICAL";
        probability = Math.min(score, 95);

      } else if (score >= 60) {

        riskLevel = "HIGH";
        probability = Math.min(score, 85);

      } else if (score >= 35) {

        riskLevel = "MEDIUM";
        probability = Math.min(score, 60);

      } else {

        riskLevel = "LOW";
        probability = Math.max(score, 10);
      }


      return res.status(200).json({

        success: true,

        location: {
          latitude: Number(latitude),
          longitude: Number(longitude),
        },

        weather: {
          rainfall1h,
          rainfall3h,
          forecastRainfall,
          humidity,
          temperature:
            weather.temperature,
        },

        prediction: {

          riskLevel,

          probability,

          forecastWindow:
            "Next 3 hours",

          score,

          reasons,
        },

      });

    } catch (error) {

      console.error(
        "Current Flood Prediction Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to generate flood prediction",

        error: error.message,
      });
    }
  }
);


export default router;