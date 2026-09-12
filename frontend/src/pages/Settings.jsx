import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FaCog,
  FaBell,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaRobot,
  FaUserShield,
  FaLock,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaTrash,
  FaHeartbeat,
  FaTimes,
  FaBars,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

function Settings() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [settings, setSettings] = useState({
    notifications: true,
    emergencyAlerts: true,
    locationSharing: true,
    sosConfirmation: true,
    aiAssistant: true,
    soundAlerts: true,
    darkMode: false,
  });

  const [saved, setSaved] = useState(false);

  // =========================
  // UPDATE SETTING
  // =========================

  const handleToggle = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setSaved(false);
  };

  // =========================
  // SAVE SETTINGS
  // =========================

  const handleSave = () => {
    localStorage.setItem(
      "resq_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =========================
  // DELETE ACCOUNT
  // =========================

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("resq_settings");

    navigate("/signup");
  };

  // =========================
  // SIDEBAR
  // =========================

  const sidebarItems = [
    {
      label: "Emergency Center",
      icon: <FaHeartbeat />,
      action: () => navigate("/dashboard"),
    },
    {
      label: "Live Tracking",
      icon: <FaMapMarkerAlt />,
      action: () => navigate("/tracking"),
    },
    {
      label: "Hospitals",
      icon: "🏥",
      action: () => navigate("/hospitals"),
    },
    {
      label: "Ambulance",
      icon: "🚑",
      action: () => navigate("/ambulance-dashboard"),
    },
    {
      label: "Police Assistance",
      icon: <FaShieldAlt />,
      action: () => navigate("/police"),
    },
    {
      label: "Emergency History",
      icon: "📜",
      action: () => navigate("/history"),
    },
    {
      label: "Settings",
      icon: <FaCog />,
      action: () => navigate("/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <Navbar setSidebarOpen={setSidebarOpen} />

      {/* ================= MOBILE SIDEBAR BUTTON ================= */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
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

            {sidebarItems.map((item, index) => (

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
                    item.label === "Settings"
                      ? "bg-red-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >

                <span className="text-lg">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>

              </button>

            ))}

          </div>

          {/* System Status */}

          <div className="mt-8 bg-slate-800 rounded-2xl p-4">

            <div className="flex items-center gap-2">

              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

              <span className="font-semibold">
                System Active
              </span>

            </div>

            <p className="text-xs text-slate-400 mt-2">
              ResQ Net AI emergency services are operational.
            </p>

          </div>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <main
        className={`
          pt-20
          min-h-screen
          transition-all
          duration-300
          ${
            sidebarOpen
              ? "lg:ml-64"
              : "lg:ml-0"
          }
        `}
      >

        <div className="max-w-6xl mx-auto p-6 lg:p-8">

          {/* ================= HEADER ================= */}

          <div className="mb-8">

            <div className="flex items-center gap-4">

              <div className="bg-slate-900 text-white p-4 rounded-2xl">

                <FaCog className="text-2xl" />

              </div>

              <div>

                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                  Settings
                </h1>

                <p className="text-slate-500 mt-1">
                  Manage your ResQ Net AI emergency preferences.
                </p>

              </div>

            </div>

          </div>

          {/* ================= SUCCESS MESSAGE ================= */}

          {saved && (

            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 flex items-center gap-3">

              <FaCheckCircle />

              <span className="font-medium">
                Settings saved successfully.
              </span>

            </div>

          )}

          {/* ================= EMERGENCY SETTINGS ================= */}

          <section className="bg-white rounded-2xl border shadow-sm mb-6">

            <div className="p-6 border-b">

              <div className="flex items-center gap-3">

                <div className="bg-red-100 text-red-600 p-3 rounded-xl">

                  <FaShieldAlt />

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Emergency Settings
                  </h2>

                  <p className="text-sm text-slate-500">
                    Control how ResQ Net AI handles emergencies.
                  </p>

                </div>

              </div>

            </div>

            <div className="divide-y">

              {/* Emergency Alerts */}

              <SettingRow
                icon={<FaBell />}
                iconClass="bg-red-100 text-red-600"
                title="Emergency Alerts"
                description="Receive alerts about active emergencies and response updates."
                enabled={settings.emergencyAlerts}
                onToggle={() =>
                  handleToggle("emergencyAlerts")
                }
              />

              {/* SOS Confirmation */}

              <SettingRow
                icon={<FaHeartbeat />}
                iconClass="bg-red-100 text-red-600"
                title="SOS Confirmation"
                description="Ask for confirmation before activating emergency SOS."
                enabled={settings.sosConfirmation}
                onToggle={() =>
                  handleToggle("sosConfirmation")
                }
              />

              {/* Location */}

              <SettingRow
                icon={<FaMapMarkerAlt />}
                iconClass="bg-blue-100 text-blue-600"
                title="Location Sharing"
                description="Allow emergency responders to receive your current location."
                enabled={settings.locationSharing}
                onToggle={() =>
                  handleToggle("locationSharing")
                }
              />

            </div>

          </section>

          {/* ================= NOTIFICATION SETTINGS ================= */}

          <section className="bg-white rounded-2xl border shadow-sm mb-6">

            <div className="p-6 border-b">

              <div className="flex items-center gap-3">

                <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">

                  <FaBell />

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Notifications
                  </h2>

                  <p className="text-sm text-slate-500">
                    Customize your notification preferences.
                  </p>

                </div>

              </div>

            </div>

            <div className="divide-y">

              <SettingRow
                icon={<FaBell />}
                iconClass="bg-yellow-100 text-yellow-600"
                title="Push Notifications"
                description="Receive important ResQ Net AI notifications."
                enabled={settings.notifications}
                onToggle={() =>
                  handleToggle("notifications")
                }
              />

              <SettingRow
                icon={<FaHeartbeat />}
                iconClass="bg-red-100 text-red-600"
                title="Sound Alerts"
                description="Play sound when an emergency notification arrives."
                enabled={settings.soundAlerts}
                onToggle={() =>
                  handleToggle("soundAlerts")
                }
              />

            </div>

          </section>

          {/* ================= AI SETTINGS ================= */}

          <section className="bg-white rounded-2xl border shadow-sm mb-6">

            <div className="p-6 border-b">

              <div className="flex items-center gap-3">

                <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">

                  <FaRobot />

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    AI Assistant
                  </h2>

                  <p className="text-sm text-slate-500">
                    Configure your ResQ AI emergency assistant.
                  </p>

                </div>

              </div>

            </div>

            <div className="divide-y">

              <SettingRow
                icon={<FaRobot />}
                iconClass="bg-purple-100 text-purple-600"
                title="ResQ AI Assistant"
                description="Enable AI-powered emergency guidance and first-aid assistance."
                enabled={settings.aiAssistant}
                onToggle={() =>
                  handleToggle("aiAssistant")
                }
              />

            </div>

            <div className="p-6">

              <button
                onClick={() => navigate("/ai")}
                className="bg-slate-900 text-white px-5 py-3 rounded-xl hover:bg-slate-800 transition font-semibold"
              >
                Open ResQ AI Assistant
              </button>

            </div>

          </section>

          {/* ================= APPEARANCE ================= */}

          <section className="bg-white rounded-2xl border shadow-sm mb-6">

            <div className="p-6 border-b">

              <div className="flex items-center gap-3">

                <div className="bg-slate-100 text-slate-700 p-3 rounded-xl">

                  {settings.darkMode ? (
                    <FaMoon />
                  ) : (
                    <FaSun />
                  )}

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Appearance
                  </h2>

                  <p className="text-sm text-slate-500">
                    Customize the appearance of your dashboard.
                  </p>

                </div>

              </div>

            </div>

            <SettingRow
              icon={
                settings.darkMode ? (
                  <FaMoon />
                ) : (
                  <FaSun />
                )
              }
              iconClass="bg-slate-100 text-slate-700"
              title="Dark Mode"
              description="Use a dark interface for the ResQ Net AI dashboard."
              enabled={settings.darkMode}
              onToggle={() =>
                handleToggle("darkMode")
              }
            />

          </section>

          {/* ================= ACCOUNT SECURITY ================= */}

          <section className="bg-white rounded-2xl border shadow-sm mb-6">

            <div className="p-6 border-b">

              <div className="flex items-center gap-3">

                <div className="bg-green-100 text-green-600 p-3 rounded-xl">

                  <FaLock />

                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Account & Security
                  </h2>

                  <p className="text-sm text-slate-500">
                    Manage your account security.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-6 space-y-4">

              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
              >

                <div className="flex items-center gap-3">

                  <FaUserShield className="text-green-600" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Manage Profile
                    </p>

                    <p className="text-sm text-slate-500">
                      Update your personal and emergency information.
                    </p>

                  </div>

                </div>

                <span>→</span>

              </button>

              <button
                onClick={() => navigate("/profile")}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
              >

                <div className="flex items-center gap-3">

                  <FaLock className="text-blue-600" />

                  <div className="text-left">

                    <p className="font-semibold">
                      Security
                    </p>

                    <p className="text-sm text-slate-500">
                      Manage password and account security.
                    </p>

                  </div>

                </div>

                <span>→</span>

              </button>

            </div>

          </section>

          {/* ================= SAVE ================= */}

          <div className="flex justify-end mb-8">

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition"
            >

              <FaSave />

              Save Changes

            </button>

          </div>


        </div>

      </main>

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}


// ======================================================
// SETTING ROW COMPONENT
// ======================================================

function SettingRow({
  icon,
  iconClass,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="p-6 flex items-center justify-between gap-5">

      <div className="flex items-center gap-4">

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconClass}`}
        >
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-slate-900">
            {title}
          </h3>

          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            {description}
          </p>

        </div>

      </div>

      {/* Toggle */}

      <button
        onClick={onToggle}
        className={`
          relative
          w-12
          h-6
          rounded-full
          transition
          flex-shrink-0
          ${
            enabled
              ? "bg-red-600"
              : "bg-slate-300"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-4
            h-4
            bg-white
            rounded-full
            transition-all
            ${
              enabled
                ? "left-7"
                : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}

export default Settings;