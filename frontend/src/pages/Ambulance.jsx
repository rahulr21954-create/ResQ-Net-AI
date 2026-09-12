import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaAmbulance,
  FaRoute,
  FaEye,
  FaLocationArrow,
  FaClock,
  FaHospital,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function Ambulance() {
  const [search, setSearch] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [requesting, setRequesting] = useState(false);

  // Temporary ambulance data
  // Later replace this with backend/API data
  useEffect(() => {
    const ambulanceData = [
      {
        id: 1,
        vehicleNumber: "UP16 AB 4587",
        driver: "Amit Kumar",
        organization: "ResQ Emergency Services",
        type: "Advanced Life Support",
        status: "Available",
        distance: "1.8 km",
        eta: "5 min",
        phone: "+919876543210",
        latitude: 28.4744,
        longitude: 77.5030,
        hospital: "Kailash Hospital",
      },

      {
        id: 2,
        vehicleNumber: "UP16 AB 7654",
        driver: "Rohit Sharma",
        organization: "City Ambulance Services",
        type: "Basic Life Support",
        status: "Available",
        distance: "3.2 km",
        eta: "8 min",
        phone: "+919876543211",
        latitude: 28.4801,
        longitude: 77.5105,
        hospital: "Yatharth Hospital",
      },

      {
        id: 3,
        vehicleNumber: "UP16 AB 9988",
        driver: "Vikas Singh",
        organization: "LifeCare Ambulance",
        type: "Advanced Life Support",
        status: "Busy",
        distance: "4.7 km",
        eta: "12 min",
        phone: "+919876543212",
        latitude: 28.4625,
        longitude: 77.5210,
        hospital: "Fortis Hospital",
      },

      {
        id: 4,
        vehicleNumber: "UP16 AB 2234",
        driver: "Sandeep Yadav",
        organization: "Emergency Response Unit",
        type: "Basic Life Support",
        status: "Available",
        distance: "5.4 km",
        eta: "14 min",
        phone: "+919876543213",
        latitude: 28.4680,
        longitude: 77.5320,
        hospital: "Apollo Hospital",
      },
    ];

    setAmbulances(ambulanceData);
  }, []);

  // Search
  const filteredAmbulances = ambulances.filter((ambulance) =>
    `${ambulance.vehicleNumber} ${ambulance.driver} ${ambulance.organization} ${ambulance.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Call ambulance
  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  // Emergency call
  const handleEmergencyCall = () => {
    window.location.href = "tel:112";
  };

  // Google Maps navigation
  const handleNavigate = (ambulance) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${ambulance.latitude},${ambulance.longitude}`;

    window.open(url, "_blank");
  };

  // Details
  const handleDetails = (ambulance) => {
    setSelectedAmbulance(ambulance);
  };

  // Request ambulance
  const handleRequestAmbulance = async (ambulance) => {
    setRequesting(true);

    try {
      // Later replace this with your backend API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        `Ambulance ${ambulance.vehicleNumber} has been requested successfully.`
      );
    } catch (error) {
      console.error(error);
      alert("Unable to request ambulance.");
    } finally {
      setRequesting(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Available") {
      return "bg-green-100 text-green-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-5">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-3xl p-8 shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="bg-white/20 p-5 rounded-2xl">
                <FaAmbulance className="text-5xl" />
              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-bold">
                  Nearby Ambulances
                </h1>

                <p className="text-red-100 mt-2">
                  Find and request the nearest available ambulance.
                </p>

              </div>

            </div>

            {/* Emergency Call */}

            <button
              onClick={handleEmergencyCall}
              className="bg-white text-red-600 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition shadow-lg"
            >
              <FaPhoneAlt />
              Emergency 112
            </button>

          </div>

        </div>

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <div className="relative mt-8">

          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search ambulance, driver or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 shadow-sm outline-none focus:ring-2 focus:ring-red-500"
          />

        </div>

        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

          {/* Emergency */}

          <button
            onClick={handleEmergencyCall}
            className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 shadow-lg transition"
          >

            <FaPhoneAlt className="text-3xl mx-auto" />

            <h3 className="font-bold text-lg mt-3">
              Emergency Call
            </h3>

            <p className="text-red-100 text-sm mt-1">
              Call emergency services
            </p>

          </button>

          {/* Request nearest */}

          <button
            onClick={() => {
              const available = ambulances.find(
                (item) => item.status === "Available"
              );

              if (available) {
                handleRequestAmbulance(available);
              } else {
                alert("No ambulance is currently available.");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 shadow-lg transition"
          >

            <FaAmbulance className="text-3xl mx-auto" />

            <h3 className="font-bold text-lg mt-3">
              Request Ambulance
            </h3>

            <p className="text-blue-100 text-sm mt-1">
              Get the nearest available ambulance
            </p>

          </button>

          {/* Available */}

          <div className="bg-white rounded-2xl p-6 shadow-lg">

            <FaCheckCircle className="text-3xl text-green-600 mx-auto" />

            <h3 className="font-bold text-lg text-center mt-3">
              Available Now
            </h3>

            <p className="text-3xl font-bold text-center text-green-600 mt-1">
              {
                ambulances.filter(
                  (item) => item.status === "Available"
                ).length
              }
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* AMBULANCE LIST */}
        {/* ================================================= */}

        <div className="mt-10">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-2xl font-bold">
                Nearby Ambulances
              </h2>

              <p className="text-gray-500 mt-1">
                Available emergency vehicles near your location
              </p>

            </div>

            <span className="text-gray-500">
              {filteredAmbulances.length} found
            </span>

          </div>

          {filteredAmbulances.length === 0 ? (

            <div className="bg-white rounded-2xl p-10 text-center shadow">

              <FaAmbulance className="text-5xl text-gray-300 mx-auto" />

              <h2 className="text-xl font-bold mt-4">
                No Ambulance Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching with another keyword.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {filteredAmbulances.map((ambulance) => (

                <div
                  key={ambulance.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  {/* Top */}

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-4">

                      <div className="bg-red-100 text-red-600 p-4 rounded-xl h-fit">

                        <FaAmbulance className="text-3xl" />

                      </div>

                      <div>

                        <h3 className="text-xl font-bold">
                          {ambulance.vehicleNumber}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          {ambulance.organization}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Driver: {ambulance.driver}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`${getStatusStyle(
                        ambulance.status
                      )} px-3 py-1 rounded-full h-fit text-sm font-semibold`}
                    >
                      {ambulance.status}
                    </span>

                  </div>

                  {/* Information */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 text-gray-500 text-sm">

                        <FaMapMarkerAlt />

                        Distance

                      </div>

                      <p className="font-bold mt-1">
                        {ambulance.distance}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 text-gray-500 text-sm">

                        <FaClock />

                        ETA

                      </div>

                      <p className="font-bold mt-1">
                        {ambulance.eta}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 text-gray-500 text-sm">

                        <FaHospital />

                        Hospital

                      </div>

                      <p className="font-semibold mt-1">
                        {ambulance.hospital}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 text-gray-500 text-sm">

                        <FaAmbulance />

                        Type

                      </div>

                      <p className="font-semibold mt-1">
                        {ambulance.type}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">

                    <button
                      onClick={() =>
                        handleCall(ambulance.phone)
                      }
                      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >

                      <FaPhoneAlt />

                      <span className="hidden sm:inline">
                        Call
                      </span>

                    </button>

                    <button
                      onClick={() =>
                        handleNavigate(ambulance)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >

                      <FaRoute />

                      <span className="hidden sm:inline">
                        Navigate
                      </span>

                    </button>

                    <button
                      onClick={() =>
                        handleDetails(ambulance)
                      }
                      className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >

                      <FaEye />

                      <span className="hidden sm:inline">
                        Details
                      </span>

                    </button>

                    <button
                      disabled={
                        ambulance.status !== "Available" ||
                        requesting
                      }
                      onClick={() =>
                        handleRequestAmbulance(ambulance)
                      }
                      className={`py-3 rounded-xl flex items-center justify-center gap-2 text-white ${
                        ambulance.status === "Available"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >

                      <FaAmbulance />

                      <span className="hidden sm:inline">
                        Request
                      </span>

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

      {/* ================================================= */}
      {/* DETAILS MODAL */}
      {/* ================================================= */}

      {selectedAmbulance && (

        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-5">

          <div className="bg-white rounded-3xl w-full max-w-lg p-7 shadow-2xl">

            {/* Header */}

            <div className="flex justify-between items-start">

              <div className="flex items-center gap-4">

                <div className="bg-red-100 text-red-600 p-4 rounded-xl">

                  <FaAmbulance className="text-3xl" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {selectedAmbulance.vehicleNumber}
                  </h2>

                  <p
                    className={
                      selectedAmbulance.status === "Available"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    ● {selectedAmbulance.status}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedAmbulance(null)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Details */}

            <div className="mt-6 space-y-4">

              <div className="flex gap-3">

                <FaAmbulance className="text-red-500 mt-1" />

                <span>
                  <b>Type:</b> {selectedAmbulance.type}
                </span>

              </div>

              <div className="flex gap-3">

                <FaLocationArrow className="text-blue-500 mt-1" />

                <span>
                  <b>Distance:</b> {selectedAmbulance.distance}
                </span>

              </div>

              <div className="flex gap-3">

                <FaClock className="text-orange-500 mt-1" />

                <span>
                  <b>Estimated Arrival:</b>{" "}
                  {selectedAmbulance.eta}
                </span>

              </div>

              <div className="flex gap-3">

                <FaPhoneAlt className="text-green-500 mt-1" />

                <span>
                  <b>Driver:</b> {selectedAmbulance.driver}
                </span>

              </div>

              <div className="flex gap-3">

                <FaHospital className="text-purple-500 mt-1" />

                <span>
                  <b>Assigned Hospital:</b>{" "}
                  {selectedAmbulance.hospital}
                </span>

              </div>

            </div>

            {/* Actions */}

            <div className="grid grid-cols-2 gap-4 mt-7">

              <button
                onClick={() =>
                  handleCall(selectedAmbulance.phone)
                }
                className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >

                <FaPhoneAlt />

                Call Driver

              </button>

              <button
                onClick={() =>
                  handleNavigate(selectedAmbulance)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >

                <FaRoute />

                Navigate

              </button>

            </div>

            {selectedAmbulance.status === "Available" && (

              <button
                disabled={requesting}
                onClick={() =>
                  handleRequestAmbulance(
                    selectedAmbulance
                  )
                }
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >

                <FaAmbulance />

                {requesting
                  ? "Requesting..."
                  : "Request This Ambulance"}

              </button>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Ambulance;