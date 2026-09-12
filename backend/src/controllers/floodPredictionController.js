export const predictFloodRisk = async (req, res) => {
  try {
    const {
      rainfall1h,
      rainfall3h,
      forecastRainfall,
      waterLevel,
      humidity,
    } = req.body;

    // Validate input
    if (
      rainfall1h === undefined ||
      rainfall3h === undefined ||
      forecastRainfall === undefined ||
      waterLevel === undefined ||
      humidity === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All prediction parameters are required",
      });
    }

    let score = 0;
    const reasons = [];

    // -------------------------
    // Rainfall - last 1 hour
    // -------------------------

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


    // -------------------------
    // Rainfall - last 3 hours
    // -------------------------

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


    // -------------------------
    // Forecast rainfall
    // -------------------------

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


    // -------------------------
    // Water level
    // -------------------------

    if (waterLevel >= 3) {
      score += 30;

      reasons.push(
        "Water level is critically high"
      );
    } else if (waterLevel >= 2) {
      score += 20;

      reasons.push(
        "Water level is elevated"
      );
    } else if (waterLevel >= 1) {
      score += 10;
    }


    // -------------------------
    // Humidity
    // -------------------------

    if (humidity >= 90) {
      score += 10;

      reasons.push(
        "Very high humidity detected"
      );
    } else if (humidity >= 80) {
      score += 5;
    }


    // -------------------------
    // Convert score → risk
    // -------------------------

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

      prediction: {
        riskLevel,
        probability,

        forecastWindow: "Next 3 hours",

        score,

        reasons,
      },
    });

  } catch (error) {
    console.error(
      "Flood Prediction Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to predict flood risk",
      error: error.message,
    });
  }
};