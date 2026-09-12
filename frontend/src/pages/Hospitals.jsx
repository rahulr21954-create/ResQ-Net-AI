import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  FaHospital,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaDirections,
  FaSearch,
  FaStar,
  FaAmbulance,
  FaAddressCard,
} from "react-icons/fa";

import { getNearbyHospitals } from "../services/hospitalService";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

function Hospitals() {

  const [selectedHospital, setSelectedHospital] = useState(null);

  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const filtered = (hospitals || []).filter((hospital) =>
  (hospital.properties?.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

const [position,setPosition]=useState(null)
useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setPosition([lat, lon]);

      try {
        const data = await getNearbyHospitals(lat, lon);

console.log(data[0]);
console.log(data[0].properties);

if (Array.isArray(data)) {
  const validHospitals = data
  .filter(
    (hospital) =>
      hospital.properties?.name &&
      hospital.properties.name.trim() !== ""
  )
  .map((hospital) => {
    const hospitalLat = hospital.properties.lat;
    const hospitalLon = hospital.properties.lon;

    return {
      ...hospital,
      distance: calculateDistance(
        lat,
        lon,
        hospitalLat,
        hospitalLon
      ),
    };
  })
  .sort((a, b) => a.distance - b.distance);

setHospitals(validHospitals);
} else {
  setHospitals([]);
}
      } catch (err) {
        console.log(err);
      }
    },
    (err) => console.log(err)
  );
}, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-red-600">
            🏥 Nearby Hospitals
          </h1>

          <p className="text-gray-600 mt-3">
            Find nearby hospitals and emergency services instantly.
          </p>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <FaSearch className="absolute left-4 top-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search Hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 p-4 rounded-xl border bg-white shadow"
          />

        </div>

        {/* Current Location */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 flex justify-between items-center">

          <div>

            <h2 className="text-xl font-bold">
              📍 Current Location
            </h2>

            <p className="text-gray-600">
              Greater Noida, Uttar Pradesh
            </p>

          </div>

          <button className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700">

            Detect Location

          </button>

        </div>

        {/* Hospital Cards */}

        <div className="grid lg:grid-cols-2 gap-8">

          {filtered.map((hospital) => (

            <div
              key={hospital.properties.place_id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >

              <div className="flex justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <FaHospital className="text-red-600 text-3xl" />

                    <h2 className="text-2xl font-bold">
                      {hospital.properties.name || "Unknown Hospital"}
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-2">
                    Hospital
                  </p>

                </div>

                <div>

                  <span
                    className={`px-3 py-2 rounded-full text-sm text-white`}
                  >
                    Available
                  </span>

                </div>

              </div>

              {/* Rating */}

              <div className="flex mt-5">

                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}

              </div>

              {/* Details */}

              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between mt-4">
  

  {hospital.distance && (
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
      {hospital.distance.toFixed(2)} km away
    </span>
  )}
</div>

                <div className="flex items-center gap-3">

                  <FaAmbulance className="text-green-600" />

                  Ambulance Available

                </div>

                <div className="flex items-center gap-3">

                  <FaAddressCard className="text-blue-600" />

                  {hospital.properties?.formatted || "No contact available"}

                </div>

              </div>

              {/* Buttons */}

              <div className="grid grid-cols-3 gap-3 mt-8">

                <button
  onClick={() => {
    if (hospital.properties.phone) {
      window.location.href = `tel:${hospital.properties.phone}`;
    } else {
      alert("Phone number not available");
    }
  }}
  className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
>
  Call
</button>

                <button
  onClick={() => {
    const lat = hospital.properties.lat;
    const lon = hospital.properties.lon;

    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
      "_blank"
    );
  }}
  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2"
>

                  <FaDirections />

                  Navigate

                </button>

                <button
                      onClick={() => setSelectedHospital(hospital)}
                      className="bg-gray-800 text-white py-3 rounded-lg hover:bg-black"
                    >
                      Details
                </button>

                {selectedHospital && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[500px]">

      <h2 className="text-2xl font-bold text-red-600 mb-4">
        {selectedHospital.properties.name}
      </h2>

      <p>
        <strong>Address:</strong><br />
        {selectedHospital.properties.formatted}
      </p>

      <p className="mt-3">
        <strong>Latitude:</strong> {selectedHospital.properties.lat}
      </p>

      <p>
        <strong>Longitude:</strong> {selectedHospital.properties.lon}
      </p>

      <p className="mt-3">
        <strong>Categories:</strong><br />
        {selectedHospital.properties.categories.join(", ")}
      </p>

      <button
        onClick={() => setSelectedHospital(null)}
        className="mt-6 bg-red-600 text-white px-5 py-2 rounded-lg"
      >
        Close
      </button>

    </div>
  </div>
)}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Hospitals;