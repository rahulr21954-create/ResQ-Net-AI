import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaUserPlus,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

import { signupUser } from "../services/authService";



function Signup() {

  const getUserLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLocation({
        latitude,
        longitude,
      });

      console.log("User Location:", latitude, longitude);
    },
    (error) => {
      console.error("Location error:", error);
      alert("Please allow location access.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
    password: "",
    confirmPassword: "",
    latitude: "",
    longitude: "",
  });

  const [location, setLocation] = useState({
  latitude: null,
  longitude: null,
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [creating,setCreating]=useState(false);

  const handleSubmit = async (e) => {
    
  e.preventDefault();
  setCreating(true)

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.bloodGroup ||
    !formData.address ||
    !formData.emergencyContact ||
    !formData.password
  ) {
    alert("Please fill all required fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Check location
  if (location.latitude === null || location.longitude === null) {
    alert("Please detect your location before registering.");
    return;
  }

  try {
    // Add location to registration data
    const signupData = {
      ...formData,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };

    const res = await signupUser(signupData);

    console.log(res);

    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));

    alert("Signup Successful");

    navigate("/dashboard");
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message || "Signup Failed"
    );
  }

  finally{
    setCreating(false)
  }

};

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 pt-24 pb-10">

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

          <div className="text-center">

            <div className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto">

              <FaUserPlus className="text-white text-4xl" />

            </div>

            <h1 className="text-4xl font-bold mt-5">
              Create Account
            </h1>

            <p className="text-gray-500 mt-2">
              Join ResQ Net AI and stay protected.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6 mt-10"
          >

            {/* Full Name */}

            <div>

              <label className="font-semibold">
                Full Name <label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaUser className="text-gray-400" />

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Name"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="font-semibold">
                Email<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Phone */}

            <div>

              <label className="font-semibold">
                Phone Number<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaPhoneAlt className="text-gray-400" />

                <input
                  type="text"
                  name="phone"
                  placeholder="+91"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Blood Group */}

            <div>

              <label className="font-semibold">
                Blood Group<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaHeartbeat className="text-red-500" />

                <select
                  name="bloodGroup"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>

              </div>

            </div>

            {/* Address */}

            <div className="md:col-span-2">

              <label className="font-semibold">
                Address<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaMapMarkerAlt className="text-gray-400" />

                <input
                  type="text"
                  name="address"
                  placeholder="Enter Address"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Emergency Contact */}

            <div>

              <label className="font-semibold">
                Emergency Contact<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaPhoneAlt className="text-red-500" />

                <input
                  type="text"
                  name="emergencyContact"
                  placeholder="+91"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold">
                Password<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Confirm Password */}

            <div className="md:col-span-2">

              <label className="font-semibold">
                Confirm Password<label style={{color:"red"}}>*</label>
              </label>

              <div className="flex items-center border rounded-lg mt-2 px-3">

                <FaLock className="text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Terms */}

            <div className="md:col-span-2">

              <label className="flex items-center gap-2">

                <input type="checkbox" />

                I agree to the Terms & Conditions.

              </label>

            </div>

            {/*Detecting Location*/}

            <button
              type="button"
              onClick={getUserLocation}
              className="w-full py-3 rounded-xl bg-emerald-500 text-black font-semibold"
            >
              📍 Detect My Location
            </button>

            {location.latitude && location.longitude && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
                <p className="text-emerald-400">
                  ✓ Location detected
                </p>

                <p className="text-gray-400 mt-1">
                  Latitude: {location.latitude}
                </p>

                <p className="text-gray-400">
                  Longitude: {location.longitude}
                </p>
              </div>
            )}

            {/* Button */}

            <div className="md:col-span-2">

              <button type="submit"
               onClick={handleSubmit}
              disabled={creating}
                className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition font-semibold text-lg"
              >
                {creating? "Submitting...":"Create Account"}
              </button>

            </div>

            

          </form>

          <p className="text-center mt-8">

            Already have an account?

            <Link
              to="/login"
              className="text-red-600 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </>
  );
}

export default Signup;