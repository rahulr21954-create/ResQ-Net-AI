import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaRoute,
  FaEye,
  FaLocationArrow,
} from "react-icons/fa";

function Police() {
  const [search, setSearch] = useState("");
  const [policeStations, setPoliceStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Temporary data
  // Later this can come from your backend / Geoapify API
  useEffect(() => {
    const stations = [
      {
        id: 1,
        name: "Surajpur Police Station",
        address: "Surajpur, Greater Noida, Uttar Pradesh",
        distance: "2.4 km",
        phone: "112",
        stationPhone: "+91 120 256 0112",
        status: "Open",
        rating: "4.3",
        latitude: 28.4988,
        longitude: 77.5360,
      },
      {
        id: 2,
        name: "Knowledge Park Police Station",
        address: "Knowledge Park, Greater Noida, Uttar Pradesh",
        distance: "4.1 km",
        phone: "112",
        stationPhone: "+91 120 232 0112",
        status: "Open",
        rating: "4.2",
        latitude: 28.4744,
        longitude: 77.4850,
      },
      {
        id: 3,
        name: "Beta 2 Police Station",
        address: "Beta 2, Greater Noida, Uttar Pradesh",
        distance: "5.3 km",
        phone: "112",
        stationPhone: "+91 120 235 0112",
        status: "Open",
        rating: "4.4",
        latitude: 28.4647,
        longitude: 77.5133,
      },
      {
        id: 4,
        name: "Kasna Police Station",
        address: "Kasna, Greater Noida, Uttar Pradesh",
        distance: "7.2 km",
        phone: "112",
        stationPhone: "+91 120 232 2112",
        status: "Open",
        rating: "4.1",
        latitude: 28.4397,
        longitude: 77.5080,
      },
    ];

    setPoliceStations(stations);
  }, []);

  const filteredStations = policeStations.filter((station) =>
    `${station.name} ${station.address}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Emergency call
  const handleCall = (phone = "112") => {
    window.location.href = `tel:${phone}`;
  };

  // Open Google Maps navigation
  const handleNavigate = (station) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

    window.open(url, "_blank");
  };

  // View details
  const handleDetails = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <main className="pt-24 pb-12 max-w-7xl mx-auto px-5">

        {/* ================= HEADER ================= */}

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 shadow-xl">

          <div className="flex flex-col md:flex-row justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="bg-blue-600 p-5 rounded-2xl">
                <FaShieldAlt className="text-4xl" />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  Nearby Police Stations
                </h1>

                <p className="text-gray-300 mt-2">
                  Find nearby police stations and get emergency assistance.
                </p>
              </div>

            </div>

            {/* Emergency Call */}

            <button
              onClick={() => handleCall("112")}
              className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition"
            >
              <FaPhoneAlt />
              Emergency Call 112
            </button>

          </div>

        </div>

        {/* ================= SEARCH ================= */}

        <div className="relative mt-8">

          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search police station or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-14 pr-5 py-4 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

          <button
            onClick={() => handleCall("112")}
            className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 shadow-lg transition"
          >
            <FaPhoneAlt className="text-3xl mx-auto" />

            <h3 className="font-bold text-lg mt-3">
              Emergency Call
            </h3>

            <p className="text-red-100 text-sm mt-1">
              Call Police Emergency 112
            </p>
          </button>

          <button
            onClick={() => {
              if (policeStations.length > 0) {
                handleNavigate(policeStations[0]);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 shadow-lg transition"
          >
            <FaRoute className="text-3xl mx-auto" />

            <h3 className="font-bold text-lg mt-3">
              Nearest Station
            </h3>

            <p className="text-blue-100 text-sm mt-1">
              Start navigation
            </p>
          </button>

          <div className="bg-white rounded-2xl p-6 shadow-lg">

            <FaShieldAlt className="text-3xl text-blue-600 mx-auto" />

            <h3 className="font-bold text-lg text-center mt-3">
              Stations Found
            </h3>

            <p className="text-3xl font-bold text-center text-blue-600 mt-1">
              {filteredStations.length}
            </p>

          </div>

        </div>

        {/* ================= STATIONS ================= */}

        <div className="mt-10">

          <div className="flex justify-between items-center mb-5">

            <h2 className="text-2xl font-bold">
              Police Stations
            </h2>

            <span className="text-gray-500">
              {filteredStations.length} results
            </span>

          </div>

          {loading ? (
            <div className="text-center py-10">
              Loading police stations...
            </div>
          ) : filteredStations.length === 0 ? (

            <div className="bg-white rounded-2xl p-10 text-center shadow">
              <FaShieldAlt className="text-5xl text-gray-300 mx-auto" />

              <h2 className="text-xl font-bold mt-4">
                No Police Station Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching another location.
              </p>
            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6">

              {filteredStations.map((station) => (

                <div
                  key={station.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
                >

                  {/* Top */}

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-4">

                      <div className="bg-blue-100 text-blue-600 p-4 rounded-xl h-fit">
                        <FaShieldAlt className="text-2xl" />
                      </div>

                      <div>

                        <h3 className="text-xl font-bold">
                          {station.name}
                        </h3>

                        <div className="flex items-start gap-2 text-gray-500 mt-2">

                          <FaMapMarkerAlt className="text-red-500 mt-1" />

                          <span>
                            {station.address}
                          </span>

                        </div>

                      </div>

                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full h-fit text-sm font-semibold">
                      {station.status}
                    </span>

                  </div>

                  {/* Info */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-sm text-gray-500">
                        Distance
                      </p>

                      <p className="font-bold mt-1">
                        {station.distance}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <p className="text-sm text-gray-500">
                        Rating
                      </p>

                      <p className="font-bold mt-1">
                        ⭐ {station.rating}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <button
                      onClick={() => handleCall(station.stationPhone)}
                      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <FaPhoneAlt />
                      <span className="hidden sm:inline">
                        Call
                      </span>
                    </button>

                    <button
                      onClick={() => handleNavigate(station)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <FaRoute />
                      <span className="hidden sm:inline">
                        Navigate
                      </span>
                    </button>

                    <button
                      onClick={() => handleDetails(station)}
                      className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <FaEye />
                      <span className="hidden sm:inline">
                        Details
                      </span>
                    </button>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

      </main>

      {/* ================= DETAILS MODAL ================= */}

      {selectedStation && (

        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-5">

          <div className="bg-white rounded-3xl w-full max-w-lg p-7 shadow-2xl">

            <div className="flex justify-between items-start">

              <div className="flex items-center gap-4">

                <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                  <FaShieldAlt className="text-3xl" />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {selectedStation.name}
                  </h2>

                  <p className="text-green-600 font-semibold">
                    ● {selectedStation.status}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setSelectedStation(null)}
                className="text-gray-500 hover:text-red-600 text-2xl"
              >
                ×
              </button>

            </div>

            <div className="mt-6 space-y-4">

              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <span>{selectedStation.address}</span>
              </div>

              <div className="flex gap-3">
                <FaPhoneAlt className="text-green-500 mt-1" />
                <span>{selectedStation.stationPhone}</span>
              </div>

              <div className="flex gap-3">
                <FaLocationArrow className="text-blue-500 mt-1" />
                <span>{selectedStation.distance} away</span>
              </div>

              <div className="flex gap-3">
                <FaShieldAlt className="text-purple-500 mt-1" />
                <span>
                  Police Emergency Number: <b>112</b>
                </span>
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-7">

              <button
                onClick={() => handleCall(selectedStation.stationPhone)}
                className="bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <FaPhoneAlt />
                Call Station
              </button>

              <button
                onClick={() => handleNavigate(selectedStation)}
                className="bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <FaRoute />
                Navigate
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Police;