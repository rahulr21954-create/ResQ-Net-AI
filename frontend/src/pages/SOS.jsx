import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLocationArrow,
  FaHospital,
  FaAmbulance,
  FaShieldAlt,
  FaMicrophone,
  FaPhoneAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

import { createEmergency } from "../services/emergencyService";


function SOS() {
console.log("SOS Button Clicked");
  const navigate=useNavigate("");
  const [selectedType, setSelectedType] = useState("");

  const emergencyTypes = [
    "Medical",
    "Accident",
    "Fire",
    "Crime",
    "Flood",
    "Other",
  ];

  const handleSOS = () => {


  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const data = {
        emergencyType: "Accident",
        description: "Road Accident",
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        address: "Current Location",
      };

      try {
        const token = localStorage.getItem("token");


if (!token) {
  alert("No token found. Please login first.");
  return;
}

const res = await createEmergency(data, token);

console.log("Backend Response:", res);

localStorage.setItem("emergencyId", res.emergency._id);

console.log("Saved Emergency ID:", localStorage.getItem("emergencyId"));

navigate("/tracking");

console.log(res);

// Save emergency id
localStorage.setItem(
  "emergencyId",
  res.emergency._id
);

// Go to Tracking page
navigate("/tracking");
      } catch (err) {
        console.log(err);
      }
    }
  );
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-red-600 text-white py-10 text-center shadow-lg">

        <h1 className="text-5xl font-bold">
          🚨 Emergency SOS
        </h1>

        <p className="mt-3 text-lg">
          Hold the SOS button to request immediate help.
        </p>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* SOS Button */}

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

          <button onClick={handleSOS}
            className="w-56 h-56 rounded-full bg-red-600 text-white
            text-5xl font-bold animate-pulse
            hover:scale-105 transition"
          >
            SOS
          </button>

          <p className="mt-6 text-gray-500">
            Hold for 3 seconds to activate emergency.
          </p>

        </div>

        {/* Location */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Current Location
              </h2>

              <p className="text-gray-600 mt-2">
                📍 Greater Noida, Uttar Pradesh
              </p>

            </div>

            <button className="bg-red-600 text-white px-5 py-3 rounded-lg flex items-center gap-2">

              <FaLocationArrow />

              Detect Location

            </button>

          </div>

        </div>

        {/* Emergency Types */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Select Emergency Type
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

            {emergencyTypes.map((type) => (

              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`p-6 rounded-xl shadow font-semibold transition

                ${
                  selectedType === type
                    ? "bg-red-600 text-white"
                    : "bg-white hover:bg-red-50"
                }`}
              >
                {type}
              </button>

            ))}

          </div>

        </div>

        {/* AI Assistant */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold">
            AI Emergency Assistant
          </h2>

          <textarea
            rows="5"
            placeholder="Describe your emergency..."
            className="w-full mt-5 border rounded-lg p-4 outline-none"
          />

          <div className="flex gap-4 mt-5">

            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2">

              <FaMicrophone />

              Voice Input

            </button>

            <button className="bg-green-600 text-white px-5 py-3 rounded-lg">

              Analyze with AI

            </button>

          </div>

        </div>

        {/* Emergency Contacts */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Emergency Contacts
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border rounded-lg p-4">

              <div>

                <h3 className="font-semibold">
                  Rahul Sharma
                </h3>

                <p>+91 9876543210</p>

              </div>

              <button className="bg-green-600 text-white px-4 rounded-lg flex items-center gap-2">

                <FaPhoneAlt />

                Call

              </button>

            </div>

            <div className="flex justify-between border rounded-lg p-4">

              <div>

                <h3 className="font-semibold">
                  Mother
                </h3>

                <p>+91 9876543200</p>

              </div>

              <button className="bg-green-600 text-white px-4 rounded-lg flex items-center gap-2">

                <FaPhoneAlt />

                Call

              </button>

            </div>

          </div>

        </div>

        {/* Nearby Services */}

        <div>

          <h2 className="text-2xl font-bold mb-6">
            Nearby Emergency Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow p-6">

              <FaHospital className="text-5xl text-blue-600"/>

              <h3 className="font-bold text-xl mt-4">
                Kailash Hospital
              </h3>

              <p className="text-gray-500 mt-2">
                1.8 km Away
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <FaAmbulance className="text-5xl text-green-600"/>

              <h3 className="font-bold text-xl mt-4">
                Ambulance Station
              </h3>

              <p className="text-gray-500 mt-2">
                2.4 km Away
              </p>

            </div>

            <div className="bg-white rounded-xl shadow p-6">

              <FaShieldAlt className="text-5xl text-yellow-500"/>

              <h3 className="font-bold text-xl mt-4">
                Police Station
              </h3>

              <p className="text-gray-500 mt-2">
                3.1 km Away
              </p>

            </div>

          </div>

        </div>

        {/* Send Alert */}

        <div className="text-center">

          <button
            className="bg-red-600 hover:bg-red-700
            text-white px-12 py-5 rounded-xl
            text-2xl font-bold shadow-lg
            flex items-center gap-3 mx-auto"
          >

            <FaExclamationTriangle />

            SEND EMERGENCY ALERT

          </button>

        </div>

      </div>

    </div>
  );
}

export default SOS;
