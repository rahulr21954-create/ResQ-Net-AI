import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import socket from "../services/socket";

import {
  FaHeartbeat,
  FaAmbulance,
  FaHospital,
  FaShieldAlt,
  FaRobot,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaLocationArrow,
  FaHistory,
  FaUserShield,
  FaTimes,
  FaBars,
  FaCog,
  FaMap,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import FloodAlertCard from "../components/FloodAlertCard";

function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  // =========================
  // FLOOD ALERT
  // =========================

  const [floodAlert, setFloodAlert] = useState(null);
  const [floodLoading, setFloodLoading] = useState(true);

  // =========================
  // DASHBOARD STATE
  // =========================

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const [sosLoading, setSosLoading] = useState(false);

  const [emergencyStatus, setEmergencyStatus] = useState("Safe");

  const [stats, setStats] = useState({
    emergencies: 0,
    resolved: 0,
    responseTime: "—",
  });

  const [recentActivity, setRecentActivity] = useState([]);

  // =========================
  // FETCH FLOOD ALERTS
  // =========================

  useEffect(() => {
    const fetchFloodAlert = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/flood-alerts/active"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch flood alerts");
        }

        const data = await response.json();

        console.log("ACTIVE FLOOD ALERTS:", data);

        if (
          data.success &&
          data.alerts &&
          data.alerts.length > 0
        ) {
          // Latest alert
          setFloodAlert(data.alerts[0]);
        } else {
          setFloodAlert(null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch flood alerts:",
          error
        );

        setFloodAlert(null);
      } finally {
        setFloodLoading(false);
      }
    };

    fetchFloodAlert();
  }, []);

  // =========================
  // SOCKET.IO FLOOD ALERT
  // =========================

  useEffect(() => {
    if (!user) {
      console.log("No logged-in user for Socket.IO");
      return;
    }

    const userId = user._id || user.id;

    if (!userId) {
      console.log("User ID not available");
      return;
    }

    console.log("Joining Socket.IO room:", userId);

    // Join user's private room
    socket.emit("joinUserRoom", userId);

    // Handle real-time flood alert
    const handleFloodAlert = (floodData) => {
      console.log(
        "🚨 REAL-TIME FLOOD ALERT:",
        floodData
      );

      // Update dashboard immediately
      setFloodAlert(floodData);

      // Change emergency status
      setEmergencyStatus("Flood Alert Active");

      // Add activity
      setRecentActivity((previous) => [
        {
          id: `flood-${Date.now()}`,
          title: `${floodData.riskLevel} Flood Alert`,
          type: "Emergency",
          time: "Just now",
          status: "Active",
        },
        ...previous,
      ]);

      // Browser alert for testing
      window.alert(
        `🚨 FLOOD ALERT!\n\n${floodData.message}`
      );
    };

    socket.on("floodAlert", handleFloodAlert);

    // Cleanup listener
    return () => {
      socket.off("floodAlert", handleFloodAlert);
    };
  }, [user]);

  // =========================
  // GET USER LOCATION
  // =========================

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationLoading(false);
      },
      (error) => {
        console.error(
          "Location Error:",
          error.message
        );

        setLocationLoading(false);
      }
    );
  }, []);

  // =========================
  // DASHBOARD DATA
  // =========================

  useEffect(() => {
    /*
      Later connect these with your backend:

      GET /api/emergency/history
      GET /api/emergency/stats
    */

    setStats({
      emergencies: 12,
      resolved: 11,
      responseTime: "4.2 min",
    });

    setRecentActivity([
      {
        id: 1,
        title: "Emergency Request Resolved",
        type: "Emergency",
        time: "Today, 10:42 AM",
        status: "Resolved",
      },
      {
        id: 2,
        title: "Hospital Location Checked",
        type: "Hospital",
        time: "Yesterday, 8:20 PM",
        status: "Completed",
      },
      {
        id: 3,
        title: "AI Emergency Assistant Used",
        type: "AI",
        time: "Yesterday, 6:15 PM",
        status: "Completed",
      },
    ]);
  }, []);

  // =========================
  // SOS
  // =========================

  const handleSOS = async () => {
    if (sosLoading) return;

    const confirmed = window.confirm(
      "Are you sure you want to activate Emergency SOS?"
    );

    if (!confirmed) return;

    try {
      setSosLoading(true);

      setEmergencyStatus("Emergency Active");

      /*
      // Connect your backend here:

      const response = await fetch(
        "http://localhost:8000/api/emergency/sos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
          body: JSON.stringify({
            latitude: location?.latitude,
            longitude: location?.longitude,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      */

      setTimeout(() => {
        setSosLoading(false);
      }, 1500);
    } catch (error) {
      console.error("SOS Error:", error);

      setEmergencyStatus("Safe");
      setSosLoading(false);
    }
  };

  // =========================
  // SIDEBAR ITEMS
  // =========================

  const sidebarItems = [
    {
      label: "Emergency Center",
      icon: <FaHeartbeat />,
      action: () => navigate("/dashboard"),
    },
    {
      label: "Flood Map",
      icon: <FaMap />,
      action: () => navigate("/flood-map"),
    },
    {
      label: "Live Tracking",
      icon: <FaLocationArrow />,
      action: () => navigate("/tracking"),
    },
    {
      label: "Hospitals",
      icon: <FaHospital />,
      action: () => navigate("/hospitals"),
    },
    {
      label: "Ambulance",
      icon: <FaAmbulance />,
      action: () => navigate("/ambulance-dashboard"),
    },
    {
      label: "Police Assistance",
      icon: <FaShieldAlt />,
      action: () => navigate("/police"),
    },
    {
      label: "Emergency History",
      icon: <FaHistory />,
      action: () => navigate("/history"),
    },
    {
      label: "Settings",
      icon: <FaCog />,
      action: () => navigate("/settings"),
    },
    
  ];

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* ================= MOBILE SIDEBAR BUTTON ================= */}

      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="fixed top-20 left-4 z-40 lg:hidden bg-slate-900 text-white p-3 rounded-xl shadow-lg"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-16
          left-0
          bottom-0
          w-64
          bg-slate-900
          text-white
          z-30
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        <div className="p-5">

          <div className="mb-8">
            <p className="text-xs text-slate-400 uppercase tracking-wider">
              Emergency System
            </p>

            <h2 className="text-xl font-bold mt-1">
              Command Center
            </h2>
          </div>

          <div className="space-y-2">

            {sidebarItems.map(
              (item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    transition
                    ${
                      index === 0
                        ? "bg-red-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <span className="text-lg">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>
                </button>
              )
            )}

          </div>

          {/* SIDEBAR STATUS */}

          <div className="mt-8 bg-slate-800 rounded-2xl p-4">

            <div className="flex items-center gap-2">

              <span
                className={`
                  w-3
                  h-3
                  rounded-full
                  ${
                    emergencyStatus === "Safe"
                      ? "bg-green-500"
                      : "bg-red-500 animate-pulse"
                  }
                `}
              />

              <span className="font-semibold">
                {emergencyStatus}
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-2">
              Your emergency monitoring system is active.
            </p>

          </div>

        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <main
        className={`
          pt-20
          transition-all
          duration-300
          ${
            sidebarOpen
              ? "lg:ml-64"
              : "lg:ml-0"
          }
        `}
      >

        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">

          {/* ================= HEADER ================= */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

            <div>

              <p className="text-sm text-slate-500">
                Emergency Command Center
              </p>

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-1">
                Good Morning,{" "}
                {user?.fullName || "Buddy"} 👋
              </h1>

              <p className="text-slate-500 mt-2">
                Your emergency response system is ready.
              </p>

            </div>

            {/* LOCATION */}

            <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border flex items-center gap-3">

              <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                <FaMapMarkerAlt />
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  Current Location
                </p>

                <p className="font-semibold text-sm">

                  {locationLoading
                    ? "Detecting location..."
                    : location
                    ? "Location detected"
                    : "Location unavailable"}

                </p>

              </div>

            </div>

          </div>

          {/* ================= SOS SECTION ================= */}

          <div className="grid lg:grid-cols-3 gap-6 mb-8">

            {/* SOS CARD */}

            <div className="lg:col-span-2 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-7 text-white shadow-xl">

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="bg-white/20 p-3 rounded-xl">
                      <FaExclamationTriangle className="text-2xl" />
                    </div>

                    <span className="font-semibold">
                      Emergency Response
                    </span>

                  </div>

                  <h2 className="text-3xl font-bold mt-5">
                    Need Immediate Help?
                  </h2>

                  <p className="text-red-100 mt-2 max-w-lg">
                    Activate SOS to notify emergency responders
                    and share your current location.
                  </p>

                </div>

                <button
                  onClick={handleSOS}
                  disabled={sosLoading}
                  className="
                    w-36
                    h-36
                    rounded-full
                    bg-white
                    text-red-600
                    font-bold
                    text-xl
                    shadow-2xl
                    hover:scale-105
                    transition
                    flex
                    flex-col
                    items-center
                    justify-center
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                  "
                >

                  <FaHeartbeat className="text-4xl mb-2" />

                  {sosLoading
                    ? "Sending..."
                    : "SOS"}

                </button>

              </div>

            </div>

            {/* STATUS CARD */}

            <div className="bg-white rounded-3xl p-6 shadow-sm border">

              <div className="flex items-center justify-between">

                <h3 className="font-bold text-lg">
                  Emergency Status
                </h3>

                <FaHeartbeat className="text-red-500 text-xl" />

              </div>

              <div className="mt-8 text-center">

                <div
                  className={`
                    w-20
                    h-20
                    mx-auto
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${
                      emergencyStatus === "Safe"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }
                  `}
                >

                  {emergencyStatus === "Safe" ? (
                    <FaCheckCircle className="text-4xl" />
                  ) : (
                    <FaExclamationTriangle className="text-4xl" />
                  )}

                </div>

                <h2 className="text-2xl font-bold mt-4">
                  {emergencyStatus}
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  {emergencyStatus === "Safe"
                    ? "No active emergency detected."
                    : "Please follow emergency instructions."}
                </p>

              </div>

            </div>

          </div>

          {/* ================= FLOOD ALERT ================= */}

          {!floodLoading && (
            <div className="mb-8">

              <FloodAlertCard
                alert={floodAlert}
                onViewMap={(alertData) => {
                  console.log(
                    "Flood location:",
                    alertData.location
                  );

                  // Later:
                  // navigate("/flood-map", {
                  //   state: { alert: alertData }
                  // });
                }}
                onViewDetails={(alertData) => {
                  console.log(
                    "Flood details:",
                    alertData
                  );
                }}
              />

            </div>
          )}

          {/* ================= STATS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-2xl p-5 border shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-slate-500">
                  Total Emergencies
                </p>

                <FaHeartbeat className="text-red-500" />

              </div>

              <h2 className="text-3xl font-bold mt-3">
                {stats.emergencies}
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-5 border shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-slate-500">
                  Successfully Resolved
                </p>

                <FaCheckCircle className="text-green-500" />

              </div>

              <h2 className="text-3xl font-bold mt-3">
                {stats.resolved}
              </h2>

            </div>

            <div className="bg-white rounded-2xl p-5 border shadow-sm">

              <div className="flex items-center justify-between">

                <p className="text-slate-500">
                  Avg Response Time
                </p>

                <FaClock className="text-blue-500" />

              </div>

              <h2 className="text-3xl font-bold mt-3">
                {stats.responseTime}
              </h2>

            </div>

          </div>

          {/* ================= EMERGENCY SERVICES ================= */}

          <div className="mb-8">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold">
                  Emergency Services
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Get immediate access to nearby assistance.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* HOSPITAL */}

              <button
                onClick={() =>
                  navigate("/hospitals")
                }
                className="bg-white border rounded-2xl p-6 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >

                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <FaHospital className="text-2xl" />
                </div>

                <h3 className="font-bold text-lg mt-5">
                  Nearby Hospitals
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Find hospitals and emergency departments.
                </p>

                <span className="text-blue-600 text-sm font-semibold mt-4 inline-block">
                  Find Hospital →
                </span>

              </button>

              {/* AMBULANCE */}

              <button
                onClick={() =>
                  navigate("/ambulance-dashboard")
                }
                className="bg-white border rounded-2xl p-6 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >

                <div className="bg-green-100 text-green-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <FaAmbulance className="text-2xl" />
                </div>

                <h3 className="font-bold text-lg mt-5">
                  Ambulance
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Request emergency ambulance assistance.
                </p>

                <span className="text-green-600 text-sm font-semibold mt-4 inline-block">
                  Request Ambulance →
                </span>

              </button>

              {/* POLICE */}

              <button
                onClick={() =>
                  navigate("/police")
                }
                className="bg-white border rounded-2xl p-6 text-left hover:shadow-lg hover:-translate-y-1 transition"
              >

                <div className="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <FaShieldAlt className="text-2xl" />
                </div>

                <h3 className="font-bold text-lg mt-5">
                  Police Assistance
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Contact nearby police assistance.
                </p>

                <span className="text-indigo-600 text-sm font-semibold mt-4 inline-block">
                  Get Police Help →
                </span>

              </button>

              {/* AI */}

              <button
                onClick={() =>
                  navigate("/ai")
                }
                className="bg-slate-900 text-white border rounded-2xl p-6 text-left hover:shadow-xl hover:-translate-y-1 transition"
              >

                <div className="bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center">
                  <FaRobot className="text-2xl" />
                </div>

                <h3 className="font-bold text-lg mt-5">
                  ResQ AI Assistant
                </h3>

                <p className="text-sm text-slate-300 mt-2">
                  Get AI-powered emergency guidance.
                </p>

                <span className="text-red-400 text-sm font-semibold mt-4 inline-block">
                  Ask ResQ AI →
                </span>

              </button>

            </div>

          </div>

          {/* ================= LOWER SECTION ================= */}

          <div className="grid lg:grid-cols-3 gap-6">

            {/* ACTIVE EMERGENCY */}

            <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">

              <div className="p-6 border-b flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Active Emergency
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Current emergency response information.
                  </p>

                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      emergencyStatus === "Safe"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {emergencyStatus}
                </span>

              </div>

              <div className="p-6">

                {emergencyStatus === "Safe" ? (

                  <div className="text-center py-8">

                    <FaCheckCircle className="text-green-500 text-5xl mx-auto" />

                    <h3 className="font-bold text-xl mt-4">
                      You're Safe
                    </h3>

                    <p className="text-slate-500 mt-2">
                      No emergency response is currently active.
                    </p>

                  </div>

                ) : (

                  <div className="bg-red-50 border border-red-200 rounded-xl p-5">

                    <div className="flex items-center gap-3 text-red-600">

                      <FaExclamationTriangle />

                      <h3 className="font-bold">
                        Emergency Response Active
                      </h3>

                    </div>

                    <p className="text-sm text-slate-600 mt-3">
                      An emergency alert is currently active.
                      Please follow the instructions provided.
                    </p>

                    <button
                      onClick={() =>
                        navigate("/tracking")
                      }
                      className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
                    >
                      Track Response
                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="bg-white rounded-2xl border shadow-sm p-6">

              <h2 className="text-xl font-bold">
                Quick Actions
              </h2>

              <div className="space-y-3 mt-5">

                <button
                  onClick={() =>
                    navigate("/tracking")
                  }
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-left"
                >
                  <FaLocationArrow className="text-blue-600" />

                  <span className="font-semibold">
                    Track Emergency
                  </span>
                </button>

                <button
                  onClick={() =>
                    navigate("/history")
                  }
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-left"
                >
                  <FaHistory className="text-slate-600" />

                  <span className="font-semibold">
                    View History
                  </span>
                </button>

                <button
                  onClick={() =>
                    navigate("/profile")
                  }
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-left"
                >
                  <FaUserShield className="text-green-600" />

                  <span className="font-semibold">
                    Emergency Contacts
                  </span>
                </button>

                <button
                  onClick={() =>
                    navigate("/ai")
                  }
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 hover:bg-red-100 transition text-left"
                >
                  <FaRobot className="text-red-600" />

                  <span className="font-semibold text-red-700">
                    Ask ResQ AI
                  </span>
                </button>

              </div>

            </div>

          </div>

          {/* ================= RECENT ACTIVITY ================= */}

          <div className="mt-8 bg-white rounded-2xl border shadow-sm">

            <div className="p-6 border-b">

              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Your latest activity on ResQ Net AI.
              </p>

            </div>

            <div className="divide-y">

              {recentActivity.map(
                (activity) => (

                  <div
                    key={activity.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >

                    <div className="flex items-center gap-4">

                      <div className="bg-slate-100 p-3 rounded-xl">

                        {activity.type ===
                          "Emergency" && (
                          <FaHeartbeat className="text-red-500" />
                        )}

                        {activity.type ===
                          "Hospital" && (
                          <FaHospital className="text-blue-500" />
                        )}

                        {activity.type ===
                          "AI" && (
                          <FaRobot className="text-purple-500" />
                        )}

                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {activity.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {activity.time}
                        </p>

                      </div>

                    </div>

                    <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                      {activity.status}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          {/* ================= EMERGENCY CALL ================= */}

          <div className="mt-8 bg-slate-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="bg-red-600 p-4 rounded-xl">
                <FaPhoneAlt className="text-2xl" />
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  Need immediate assistance?
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Contact emergency services directly.
                </p>

              </div>

            </div>

            <a
              href="tel:112"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition"
            >
              Call 112
            </a>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;