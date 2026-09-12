import React from "react";

const FloodAlertCard = ({
  alert = null,
  onViewMap,
  onViewDetails,
}) => {
  // No active flood alert
  if (!alert) {
    return (
      <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center text-xl">
              🌊
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Flood Monitoring
              </h3>

              <p className="text-sm text-gray-500">
                Your area is currently being monitored.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            No Active Alert
          </div>
        </div>
      </div>
    );
  }

  // Active flood alert
  const isCritical = alert.riskLevel === "CRITICAL";

  return (
    <div
      className={`rounded-2xl p-5 border ${
        isCritical
          ? "bg-red-50 border-red-300"
          : "bg-orange-50 border-orange-300"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        {/* Alert information */}
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
              isCritical ? "bg-red-500" : "bg-orange-500"
            }`}
          >
            🚨
          </div>

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900">
                Flood Alert
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isCritical
                    ? "bg-red-500 text-white"
                    : "bg-orange-500 text-white"
                }`}
              >
                {alert.riskLevel}
              </span>
            </div>

            <p className="text-gray-700 mt-2">
              {alert.message}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <span>
                📍 Affected radius:{" "}
                <strong>{alert.affectedRadius} km</strong>
              </span>

              <span>
                🕐{" "}
                {alert.detectedAt
                  ? new Date(alert.detectedAt).toLocaleString()
                  : "Recently detected"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewMap?.(alert)}
            className="px-4 py-2 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
          >
            View Map
          </button>

          <button
            onClick={() => onViewDetails?.(alert)}
            className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition"
          >
            Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default FloodAlertCard;