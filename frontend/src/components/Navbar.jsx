import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUserCircle,
  FaHeartbeat,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

 function Navbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isLoggedIn, logout } = useAuth();

  // Logout
  const handleLogout = () => {
  logout();
  setMenuOpen(false);
  navigate("/login");
};

  // Navigation link styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-500 font-semibold"
      : "hover:text-red-400 transition";

  // Close mobile menu after navigation
  const handleNavigation = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900 z-50 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link
            to="/"
            onClick={handleNavigation}
            className="flex items-center gap-3"
          >
            <div className="bg-red-600 p-2 rounded-full">
              <FaHeartbeat className="text-xl" />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                ResQ <span className="text-red-500">Net AI</span>
              </h1>

              <p className="text-xs text-gray-400 hidden sm:block">
                Saving Lives with AI
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}

          <ul className="hidden lg:flex items-center gap-7 font-medium">

  

  {isLoggedIn && (
    <>
    <NavLink to="/" className={navLinkClass}>
    Home
  </NavLink>
      <NavLink to="/dashboard"  className={navLinkClass}>
        Dashboard
      </NavLink>

      <NavLink to="/tracking" className={navLinkClass}>
        Tracking
      </NavLink>

      <NavLink to="/hospitals" className={navLinkClass}>
        Hospitals
      </NavLink>

      <NavLink to="/history" className={navLinkClass}>
        History
      </NavLink>

      <NavLink to="/alerts" className={navLinkClass}>
        Alerts
      </NavLink>

      <NavLink to="/ai" className={navLinkClass}>
        AI Assistant
      </NavLink>
    </>
  )}

</ul>
          {/* ================= DESKTOP RIGHT SIDE ================= */}

          <div className="hidden lg:flex items-center gap-4">

            {isLoggedIn ? (
              <>
                {/* Notifications */}

                <button
                  onClick={() => navigate("/alerts")}
                  className="relative p-2 hover:text-red-400 transition"
                >
                  <FaBell className="text-xl" />

                  <span className="absolute -top-1 -right-1 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                </button>

                {/* Profile */}

                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-red-400 transition"
                >
                  <FaUserCircle className="text-3xl" />

                  <span>{user?.fullName || "User"}</span>
                </Link>

                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>

                {/* SOS */}

                <button
                  onClick={() => navigate("/sos")}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition shadow-lg"
                >
                  SOS
                </button>
              </>
            ) : (
              <>
                {/* Login */}

                <Link
                  to="/login"
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Login
                </Link>

                {/* Signup */}

                <Link
                  to="/signup"
                  className="px-4 py-2 border border-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  Signup
                </Link>
              </>
            )}

          </div>

          {/* ================= TABLET ================= */}

          <div className="hidden md:flex lg:hidden items-center gap-4">

            {isLoggedIn && (
              <>
                {/* Notification */}

                <button
                  onClick={() => navigate("/alerts")}
                  className="relative"
                >
                  <FaBell className="text-xl" />

                  <span className="absolute -top-2 -right-2 bg-red-600 w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                </button>

                {/* SOS */}

                <button
                  onClick={() => navigate("/sos")}
                  className="bg-red-600 px-4 py-2 rounded-lg font-semibold"
                >
                  SOS
                </button>
              </>
            )}

            {/* Menu */}

            <button
              onClick={() => setMenuOpen(true)}
              className="hover:text-red-400 transition"
            >
              <FaBars className="text-2xl" />
            </button>

          </div>

          {/* ================= MOBILE ================= */}

          <div className="flex md:hidden items-center gap-3">

            {isLoggedIn && (
              <button
                onClick={() => navigate("/sos")}
                className="bg-red-600 px-3 py-2 rounded-lg text-sm font-semibold"
              >
                SOS
              </button>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="hover:text-red-400 transition"
            >
              <FaBars className="text-2xl" />
            </button>

          </div>

        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85%] bg-white text-black shadow-2xl transform transition-transform duration-300 z-[60]
        ${
          menuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Drawer Header */}

        <div className="flex justify-between items-center p-5 border-b">

          <Link
            to="/"
            onClick={handleNavigation}
            className="font-bold text-xl text-red-600"
          >
            ResQ Net AI
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-600 transition"
          >
            <FaTimes className="text-2xl" />
          </button>

        </div>

        {/* Drawer Navigation */}

        <div className="p-6">

          <ul className="flex flex-col gap-5 font-medium">

            <NavLink
              to="/"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/dashboard"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tracking"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              Tracking
            </NavLink>

            <NavLink
              to="/hospitals"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              Hospitals
            </NavLink>

            <NavLink
              to="/history"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              History
            </NavLink>

            <NavLink
              to="/alerts"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              Alerts
            </NavLink>

            <NavLink
              to="/ai"
              onClick={handleNavigation}
              className={navLinkClass}
            >
              AI Assistant
            </NavLink>

            {isLoggedIn && (
              <NavLink
                to="/profile"
                onClick={handleNavigation}
                className={navLinkClass}
              >
                Profile
              </NavLink>
            )}

          </ul>

          {/* ================= MOBILE AUTH ================= */}

          <div className="border-t mt-8 pt-6">

            {isLoggedIn ? (
              <div className="flex flex-col gap-4">

                {/* User */}

                <Link
                  to="/profile"
                  onClick={handleNavigation}
                  className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl"
                >
                  <FaUserCircle className="text-3xl text-gray-600" />

                  <div>
                    <p className="font-semibold">
                      Rahul
                    </p>

                    <p className="text-sm text-gray-500">
                      View Profile
                    </p>
                  </div>
                </Link>

                {/* Emergency SOS */}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/sos");
                  }}
                  className="bg-red-600 text-white py-3 rounded-lg font-semibold"
                >
                  🚨 Emergency SOS
                </button>

                {/* Logout */}

                <button
                  onClick={handleLogout}
                  className="border border-red-500 text-red-600 py-3 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="flex flex-col gap-3">

                {/* Login */}

                <Link
                  to="/login"
                  onClick={handleNavigation}
                  className="text-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Login
                </Link>

                {/* Signup */}

                <Link
                  to="/signup"
                  onClick={handleNavigation}
                  className="text-center px-4 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Signup
                </Link>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ================= OVERLAY ================= */}

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55]"
          onClick={() => setMenuOpen(false)}
        />
      )}

    </>
  );
}

export default Navbar;