import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";

import "leaflet/dist/leaflet.css";


// User marker
const userIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


// Flood marker
const floodIcon = new L.DivIcon({
  className: "flood-marker",
  html: `
    <div style="
      background:#dc2626;
      width:35px;
      height:35px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:18px;
      border:3px solid white;
      box-shadow:0 0 15px rgba(220,38,38,0.8);
    ">
      🌊
    </div>
  `,
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});


function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


function getSafetyStatus(distance, radius, riskLevel) {
  if (riskLevel === "CRITICAL") {
    if (distance <= radius) {
      return {
        status: "EVACUATE",
        color: "red",
        icon: "🚨",
        message:
          "You are inside a critical flood zone. Evacuate immediately.",
      };
    }

    if (distance <= radius + 3) {
      return {
        status: "DANGER",
        color: "orange",
        icon: "⚠️",
        message:
          "You are close to a critical flood zone. Move to a safer location.",
      };
    }
  }

  if (distance <= radius) {
    return {
      status: "UNSAFE",
      color: "red",
      icon: "🔴",
      message:
        "You are currently inside the affected flood area. Avoid travelling through flooded roads.",
    };
  }

  if (distance <= radius + 3) {
    return {
      status: "CAUTION",
      color: "yellow",
      icon: "🟡",
      message:
        "You are near the affected area. Stay alert and monitor emergency updates.",
    };
  }

  return {
    status: "SAFE",
    color: "green",
    icon: "🟢",
    message:
      "You are currently outside the affected flood zone. Continue monitoring alerts.",
  };
}


export default function FloodMap() {
  const location = useLocation();
  const navigate = useNavigate();

  const alert = location.state?.alert;

  const [userLocation, setUserLocation] = useState(null);
  const [safety, setSafety] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);


  useEffect(() => {
    if (!alert || !userLocation) return;

    const distance = calculateDistance(
      alert.location.latitude,
      alert.location.longitude,
      userLocation.latitude,
      userLocation.longitude
    );

    const radius = alert.affectedRadius || 5;

    const result = getSafetyStatus(
      distance,
      radius,
      alert.riskLevel
    );

    setSafety({
      ...result,
      distance,
    });
  }, [alert, userLocation]);


  if (!alert) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">
            No Flood Alert Selected
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 bg-blue-600 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }


  const floodPosition = [
    alert.location.latitude,
    alert.location.longitude,
  ];


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            🌊 Flood Safety Map
          </h1>

          <p className="text-slate-400 text-sm">
            ResQNet AI Emergency Monitoring
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg"
        >
          ← Dashboard
        </button>

      </div>


      {/* Safety Status */}
      {safety && (
        <div className="p-5">

          <div
            className={`rounded-2xl p-5 border ${
              safety.status === "SAFE"
                ? "bg-green-950/40 border-green-700"
                : safety.status === "CAUTION"
                ? "bg-yellow-950/40 border-yellow-700"
                : "bg-red-950/40 border-red-700"
            }`}
          >

            <div className="flex items-center gap-4">

              <div className="text-4xl">
                {safety.icon}
              </div>

              <div>

                <p className="text-sm text-slate-400">
                  Your Current Safety Status
                </p>

                <h2 className="text-2xl font-bold">
                  {safety.status}
                </h2>

                <p className="text-slate-300 mt-1">
                  {safety.message}
                </p>

              </div>

            </div>


            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-xs text-slate-400">
                  Distance from Flood Zone
                </p>

                <p className="font-bold">
                  {safety.distance.toFixed(2)} km
                </p>
              </div>


              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-xs text-slate-400">
                  Risk Level
                </p>

                <p className="font-bold">
                  {alert.riskLevel}
                </p>
              </div>


              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-xs text-slate-400">
                  Affected Radius
                </p>

                <p className="font-bold">
                  {alert.affectedRadius || 5} km
                </p>
              </div>

            </div>

          </div>

        </div>
      )}


      {/* Evacuation Guidance */}
      {safety &&
        (safety.status === "EVACUATE" ||
          safety.status === "UNSAFE" ||
          safety.status === "DANGER") && (

          <div className="mx-5 mb-5 bg-slate-900 border border-red-800 rounded-2xl p-5">

            <h2 className="text-xl font-bold text-red-400 mb-4">
              🚨 Emergency Evacuation Guidance
            </h2>

            <div className="space-y-3 text-slate-300">

              <p>• Move to higher ground immediately.</p>

              <p>• Avoid walking or driving through flood water.</p>

              <p>• Stay away from electrical poles and damaged wires.</p>

              <p>• Carry essential medicines, documents and drinking water.</p>

              <p>• Follow instructions from local emergency authorities.</p>

              <p>• Help children, elderly people and people with disabilities.</p>

            </div>


            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/hospitals")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
              >
                🏥 Find Hospital
              </button>

              <button
                onClick={() => navigate("/relief-camps")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                🏕️ Find Relief Camp
              </button>

              <button
                onClick={() => navigate("/sos")}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg"
              >
                🚨 SOS
              </button>

            </div>

          </div>
        )}


      {/* Map */}
      <div className="px-5 pb-6">

        <div className="rounded-2xl overflow-hidden border border-slate-800">

          <MapContainer
            center={floodPosition}
            zoom={13}
            style={{
              height: "600px",
              width: "100%",
            }}
          >

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {/* Flood Location */}
            <Marker
              position={floodPosition}
              icon={floodIcon}
            >

              <Popup>

                <div className="text-black">

                  <h3 className="font-bold">
                    🚨 {alert.riskLevel} Flood Alert
                  </h3>

                  <p className="mt-2">
                    {alert.message}
                  </p>

                  <p className="mt-2">
                    Affected Radius:
                    <strong>
                      {" "}
                      {alert.affectedRadius || 5} km
                    </strong>
                  </p>

                </div>

              </Popup>

            </Marker>


            {/* Flood Zone */}
            <Circle
              center={floodPosition}
              radius={(alert.affectedRadius || 5) * 1000}
              pathOptions={{
                color:
                  alert.riskLevel === "CRITICAL"
                    ? "#dc2626"
                    : "#f97316",

                fillOpacity: 0.2,
              }}
            />


            {/* User Location */}
            {userLocation && (

              <Marker
                position={[
                  userLocation.latitude,
                  userLocation.longitude,
                ]}
                icon={userIcon}
              >

                <Popup>

                  <strong>
                    📍 Your Current Location
                  </strong>

                </Popup>

              </Marker>

            )}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}