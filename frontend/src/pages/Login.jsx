import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHeartbeat,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login Response:", res);

      // IMPORTANT
      // Updates AuthContext immediately
      login(res.user, res.token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {
      console.log("Login Error:", err);

      alert(
        err.response?.data?.message || "Login Failed"
      );
    }
  };


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 pt-20">

        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

          {/* Logo */}

          <div className="flex justify-center">

            <div className="bg-red-600 p-5 rounded-full">

              <FaHeartbeat className="text-4xl text-white" />

            </div>

          </div>

          <h1 className="text-3xl font-bold text-center mt-6">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Login to your ResQ Net AI account
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-8"
          >

            {/* Email */}

            <div>

              <label className="font-semibold">
                Email
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2">

                <FaEnvelope className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full p-4 outline-none"
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="flex items-center border rounded-xl px-4 mt-2">

                <FaLock className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  className="w-full p-4 outline-none"
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  name="remember"
                  onChange={handleChange}
                />

                Remember Me

              </label>

              <Link
                to="/forgot-password"
                className="text-red-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Login */}

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4">

              <hr className="flex-1" />

              <span className="text-gray-500">
                OR
              </span>

              <hr className="flex-1" />

            </div>

            {/* Google */}

            <button
              type="button"
              className="w-full border py-4 rounded-xl hover:bg-gray-100 transition"
            >
              Continue with Google
            </button>

          </form>

          <p className="text-center mt-8">

            Don't have an account?

            <Link
              to="/signup"
              className="text-red-600 font-semibold ml-2"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>
    </>
  );
}

export default Login;