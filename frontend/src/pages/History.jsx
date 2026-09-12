import { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { getEmergencyHistory } from "../services/historyService";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaAmbulance,
  FaHospital,
  FaEye,
} from "react-icons/fa";

function History() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [history, setHistory] = useState([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchHistory = async () => {
    try {
      const data = await getEmergencyHistory();
      setHistory(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchHistory();
}, []);

  const filteredHistory = history.filter((item) => {
    const matchFilter =
      filter === "All" ? true : item.status === filter;

    const matchSearch =
      (item.emergencyType || "")
  .toLowerCase()
  .includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-green-500";
    if (status === "Active") return "bg-yellow-500";
    return "bg-red-500";
  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto pt-24 px-6">

        <h1 className="text-4xl font-bold text-red-600">
          Emergency History
        </h1>

        <p className="text-gray-600 mt-2">
          View all your previous emergency requests.
        </p>

        {/* Search */}

        <div className="relative mt-8">

          <FaSearch className="absolute left-4 top-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search by emergency or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 p-4 rounded-xl border shadow"
          />

        </div>

        {/* Filter */}

        <div className="flex gap-3 mt-6 flex-wrap">

          {["All", "Completed", "Active", "Cancelled"].map((item) => (

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
              {item}
            </button>

          ))}

        </div>

        {/* Cards */}

        <div className="space-y-6 mt-8">
  {filteredHistory.length === 0 ? (
    <div className="bg-white rounded-xl shadow p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-700">
        No Emergency History
      </h2>

      <p className="text-gray-500 mt-2">
        You haven't created any emergency requests yet.
      </p>
    </div>
  ) : (
    filteredHistory.map((item) => (
      <div
        key={item._id}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {item.emergencyType}
            </h2>

            <span
              className={`${getStatusColor(item.status)} text-white text-sm px-3 py-1 rounded-full`}
            >
              {item.status}
            </span>
          </div>

          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
            <FaEye />
            View
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-red-500" />
            {new Date(item.createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-blue-500" />
            {new Date(item.createdAt).toLocaleTimeString()}
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-green-500" />
            {item.location}
          </div>

          <div className="flex items-center gap-3">
            <FaHospital className="text-purple-500" />
            {item.hospital}
          </div>

          <div className="flex items-center gap-3">
            <FaAmbulance className="text-orange-500" />
            {item.ambulance}
          </div>

          <div>
            <span className="font-semibold">
              Response Time:
            </span>

            <p>{item.responseTime}</p>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      </div>

    </div>
    
  );
}

export default History;
