import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaBell,
  FaAmbulance,
  FaHospital,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserShield,
  FaTrash,
  FaFilter,
} from "react-icons/fa";

function Alerts() {
  const [filter, setFilter] = useState("All");

  const alerts = [
    {
      id: 1,
      title: "SOS Alert Sent",
      message: "Your emergency request has been sent successfully.",
      time: "2 mins ago",
      type: "SOS",
      icon: <FaExclamationTriangle />,
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Ambulance Assigned",
      message: "Ambulance UP16 AB 4587 is on the way.",
      time: "5 mins ago",
      type: "Ambulance",
      icon: <FaAmbulance />,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Hospital Accepted",
      message: "Kailash Hospital accepted your emergency.",
      time: "8 mins ago",
      type: "Hospital",
      icon: <FaHospital />,
      color: "bg-blue-500",
    },
    {
      id: 4,
      title: "Emergency Completed",
      message: "Emergency successfully resolved.",
      time: "Yesterday",
      type: "Completed",
      icon: <FaCheckCircle />,
      color: "bg-emerald-500",
    },
    {
      id: 5,
      title: "Police Notified",
      message: "Nearby police station has been informed.",
      time: "Yesterday",
      type: "Police",
      icon: <FaUserShield />,
      color: "bg-yellow-500",
    },
  ];

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto pt-24 px-6 pb-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-red-600">
              Notifications
            </h1>

            <p className="text-gray-600 mt-2">
              Stay updated with your emergency alerts.
            </p>
          </div>

          <FaBell className="text-5xl text-red-500" />

        </div>

        {/* Filter */}

        <div className="flex gap-3 flex-wrap mb-8">

          {[
            "All",
            "SOS",
            "Ambulance",
            "Hospital",
            "Completed",
            "Police",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full transition
                ${
                  filter === item
                    ? "bg-red-600 text-white"
                    : "bg-white border"
                }`}
            >
              <span className="flex items-center gap-2">
                <FaFilter />
                {item}
              </span>
            </button>
          ))}

        </div>

        {/* Alert List */}

        <div className="space-y-5">

          {filteredAlerts.map((alert) => (

            <div
              key={alert.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >

              <div className="flex justify-between items-start">

                <div className="flex gap-5">

                  <div
                    className={`${alert.color} w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl`}
                  >
                    {alert.icon}
                  </div>

                  <div>

                    <h2 className="text-xl font-bold">
                      {alert.title}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      {alert.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-3">
                      {alert.time}
                    </p>

                  </div>

                </div>

                <button className="text-red-600 hover:text-red-800">
                  <FaTrash size={20} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Alerts;