import {
  FaMapMarkerAlt,
  FaHospital,
  FaAmbulance,
  FaUserMd,
  FaPhoneAlt,
  FaShareAlt,
  FaTimesCircle,
  FaCheckCircle,
  FaClock,
  FaRoute,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import socket from "../socket";
import { useEffect,useState } from "react";
import Map from "../components/Map";
import { getNearbyHospitals } from "../services/hospitalService";
import { getNearbyPolice } from "../services/policeService";
import { getEmergency } from "../services/emergencyService";

function Tracking() {

  const [emergency, setEmergency] = useState({
  emergencyId: "",
  type: "",
  priority: "",
  time: "",

  ambulance: {
    id: "",
    driver: "",
    vehicle: "",
    eta: "",
  },

  hospital: {
    name: "",
    address: "",
  },

  status: "Pending",
});

useEffect(() => {
  const loadEmergency = async () => {
    try {
      const token = localStorage.getItem("token");
      const emergencyId = localStorage.getItem("emergencyId");

      if (!emergencyId) return;

      const res = await getEmergency(
        emergencyId,
        token
      );

      console.log("Emergency Loaded:", res);

      setEmergency(res.emergency);

    } catch (err) {
      console.log(err);
    }
  };

  loadEmergency();
}, []);

  const [status, setStatus] = useState("Pending");
  const [hospitals,setHospitals]=useState([]);

  useEffect(() => {
    socket.on("statusUpdated", (emergency) => {
      setStatus(emergency.status);
    });

    return () => {
      socket.off("statusUpdated");
    };
  }, []);

  const [position, setPosition] = useState([28.4744, 77.503]);

  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const newPosition = [
      pos.coords.latitude,
      pos.coords.longitude,
    ];

    setPosition(newPosition);
    
    try {
      const data = await getNearbyHospitals(
        newPosition[0],
        newPosition[1]
      );

      setHospitals(data);
    } catch (err) {
      console.log(err);
    }
  },
  (err) => console.log(err)
);
}, []);

  useEffect(() => {
  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      setPosition([
        pos.coords.latitude,
        pos.coords.longitude,
      ]);

      socket.emit("locationUpdate", {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    },
    (err) => console.log(err),
    {
      enableHighAccuracy: true,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, []);

const fetchHospitals = async () => {
  try {
    const data = await getNearbyHospitals(
      position[0],
      position[1]
    );

    setHospitals(data);
  } catch (err) {
    console.log(err);
  }
};

const [policeStations, setPoliceStations] = useState([]);
const fetchPolice = async () => {
  try {
    const data = await getNearbyPolice(
      position[0],
      position[1]
    );

    setPoliceStations(data);

  } catch (err) {
    console.log(err);
  }
};

const [ambulances, setAmbulances] = useState([]);

useEffect(() => {
  socket.on("ambulanceUpdated", (ambulance) => {
    console.log("TRACKING RECEIVED:", ambulance);
    setAmbulances((prev) => {
      const index = prev.findIndex((a) => a.id === ambulance.id);

      if (index === -1) {
        return [...prev, ambulance];
      }

      const updated = [...prev];
      updated[index] = ambulance;

      return updated;
    });
  });

  return () => socket.off("ambulanceUpdated");
}, []);

useEffect(() => {
  socket.on("newEmergency", (data) => {
    console.log("Emergency Received", data);

    setEmergency(data);
  });

  return () => socket.off("newEmergency");
}, []);

useEffect(() => {
  if (position) {
    fetchHospitals();
    fetchPolice();
  }
}, [position]);

if (!emergency) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading emergency...
    </div>
  );
}

  return (
    <div className="min-h-screen pt-16 bg-gray-100">
        <Navbar/>
      {/* Header */}

      <div className="bg-blue-700 text-white py-8 shadow-lg">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold">
            🚑 Live Emergency Tracking
          </h1>

          <p className="mt-2 text-blue-100">
            Track your ambulance and emergency response in real time.
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Current Location */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex items-center gap-4">

            <FaMapMarkerAlt className="text-red-600 text-3xl" />

            <div>

              <h2 className="text-xl font-bold">
                Current Location
              </h2>

              <p className="text-gray-600">
                Greater Noida, Uttar Pradesh
              </p>

            </div>

          </div>

        </div>

        {/* Refresh Hospitals Button */}

<div className="flex justify-end">
  <button
    onClick={fetchHospitals}
    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
  >
    🔄 Refresh Nearby Hospitals
  </button>
</div>

        {/* Map */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-5">
            Live Map
          </h2>

          <div className="h-[500px] rounded-xl bg-gray-200 flex items-center justify-center">



              {console.log("Ambulances:", ambulances)}
              <Map position={position} hospitals={hospitals} policeStations={policeStations} ambulances={ambulances}/>

          </div>

        </div>

        {/* Status */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Emergency Status
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-green-600 text-2xl" />

              <p className="font-semibold">
                SOS Alert Sent
              </p>

            </div>

            <div className="flex items-center gap-4">

              <FaCheckCircle className="text-green-600 text-2xl" />

              <p className="font-semibold">
                Hospital Accepted Request
              </p>

            </div>

            <div className="flex items-center gap-4">

              <FaClock className="text-yellow-500 text-2xl" />

              <p className="font-semibold">
                Ambulance On The Way
              </p>

            </div>

            <div className="flex items-center gap-4">

              <FaClock className="text-gray-400 text-2xl" />

              <p className="font-semibold">
                Reaching Destination...
              </p>

            </div>

          </div>

        </div>

        {/* Two Column Layout */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Emergency Details */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Emergency Details
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="font-semibold">
                  Emergency ID
                </span>

                <span>{emergency?._id}</span>

              </div>

              <div className="flex justify-between">

                <span className="font-semibold">
                  Type
                </span>

                <span>{emergency?.emergencyType}</span>

              </div>

              <div className="flex justify-between">

                <span className="font-semibold">
                  Priority
                </span>

                <span className="text-red-600 font-bold">
                  {emergency?.priority}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="font-semibold">
                  Time
                </span>

                <span>{emergency?.createdAt
                          ? new Date(emergency.createdAt).toLocaleTimeString()
                          : "--"}</span>

              </div>

            </div>

          </div>

          {/* Ambulance */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex items-center gap-4">

              <FaAmbulance className="text-5xl text-green-600"/>

              <div>

                <h2 className="text-2xl font-bold">
                  Assigned Ambulance
                </h2>

                <p className="text-gray-500">
                  ETA : {emergency?.ambulance?.eta || "--"}
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-3">

              <p>

                <strong>Driver :</strong> {emergency?.ambulance?.driverName || "--"}

              </p>

              <p>

                <strong>Vehicle :</strong> {emergency?.ambulance?.vehicleNumber}

              </p>

              <p>

                <strong>Hospital :</strong> {emergency?.hospital?.hospitalName || "--"}

              </p>

            </div>

            <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-3">

              <FaPhoneAlt />

              Call Driver

            </button>

          </div>

        </div>

        {/* Contacts */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">
            Emergency Contacts Notified
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Rahul Sharma</span>

              <FaCheckCircle className="text-green-600"/>

            </div>

            <div className="flex justify-between">

              <span>Mother</span>

              <FaCheckCircle className="text-green-600"/>

            </div>

            <div className="flex justify-between">

              <span>Police Control Room</span>

              <FaCheckCircle className="text-green-600"/>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-6 justify-center">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3">

            <FaShareAlt />

            Share Live Location

          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3">

            <FaTimesCircle />

            Cancel Emergency

          </button>

        </div>

      </div>

    </div>
  );
}

export default Tracking;