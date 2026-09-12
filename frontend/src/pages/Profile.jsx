import { useState } from "react";
import {
  FaUserCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";


function Profile() {
  const [editing, setEditing] = useState(false);

  const {user}=useAuth();

  

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
  <div className="min-h-screen pt-16 bg-gray-100">
      <Navbar/>
      {/* Header */}

      <div className="bg-slate-800 text-white  py-10">

        <div className="max-w-6xl mx-auto px-6 flex items-center gap-5">

          <FaUserCircle className="text-7xl text-red-500" />

          <div>

            <h1 className="text-4xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-300 mt-2">
              Manage your personal and emergency information.
            </p>

          </div>

        </div>

      </div>

      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Edit Button */}

          <div className="flex justify-end">

            <button
              onClick={() => setEditing(!editing)}
              className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              {editing ? (
                <>
                  <FaSave />
                  Save
                </>
              ) : (
                <>
                  <FaEdit />
                  Edit
                </>
              )}
            </button>

          </div>

          {/* Form */}

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            {/* Name */}

            <div>

              <label className="font-semibold">
                Full Name
              </label>

              <input
                name="name"
                value={user?.fullName || "User"}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold flex items-center gap-2">

                <FaEnvelope />

                Email

              </label>

              <input
                name="email"
                value={user?.email}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Phone */}

            <div>

              <label className="font-semibold flex items-center gap-2">

                <FaPhoneAlt />

                Phone

              </label>

              <input
                name="phone"
                value={user?.phone}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Address */}

            <div>

              <label className="font-semibold flex items-center gap-2">

                <FaMapMarkerAlt />

                Address

              </label>

              <input
                name="address"
                value={user?.address}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Blood Group */}

            <div>

              <label className="font-semibold flex items-center gap-2">

                <FaHeartbeat />

                Blood Group

              </label>

              <input
                name="blood"
                value={user?.bloodGroup}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            {/* Emergency Contact */}

            <div>

              <label className="font-semibold">
                Emergency Contact
              </label>

              <input
                name="emergency"
                value={user?.emergencyContact}
                disabled={!editing}
                onChange={handleChange}
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
