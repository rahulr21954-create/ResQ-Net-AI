import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaHeartbeat,
  FaMapMarkedAlt,
  FaHistory,
  FaHospital,
  FaShieldAlt,
  FaAmbulance,
  FaRobot,
  FaBell,
  FaCog,
  FaUser,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "One-Tap SOS",
      path: "/sos",
      icon: FaHeartbeat,
      emergency: true,
    },
    {
      name: "Live Tracking",
      path: "/tracking",
      icon: FaMapMarkedAlt,
    },
    {
      name: "Emergency History",
      path: "/history",
      icon: FaHistory,
    },
    {
      name: "Nearby Hospitals",
      path: "/hospitals",
      icon: FaHospital,
    },
    {
      name: "Police",
      path: "/police",
      icon: FaShieldAlt,
    },
    {
      name: "Ambulance",
      path: "/ambulance",
      icon: FaAmbulance,
    },
    {
      name: "AI Assistant",
      path: "/ai",
      icon: FaRobot,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: FaBell,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUser,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: FaCog,
    },
  ];

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside
        className="
          hidden lg:flex
          fixed
          top-16
          left-0
          bottom-0
          w-64
          bg-slate-900
          text-white
          z-40
          flex-col
          border-r
          border-slate-800
        "
      >

        {/* Sidebar Header */}

        <div className="p-6 border-b border-slate-800">

          <p className="text-xs uppercase tracking-wider text-gray-500">
            Emergency Center
          </p>

          <h2 className="text-xl font-bold mt-1">
            ResQ <span className="text-red-500">Net AI</span>
          </h2>

        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto p-4">

          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>

          <div className="space-y-2">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      item.emergency
                        ? "text-red-400 hover:bg-red-600/20"
                        : isActive
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon className="text-lg" />

                  <span className="font-medium">
                    {item.name}
                  </span>

                  {item.emergency && (
                    <span className="ml-auto text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                      SOS
                    </span>
                  )}
                </NavLink>
              );

            })}

          </div>

        </nav>

        {/* Emergency Button */}

        <div className="p-4 border-t border-slate-800">

          <button
            onClick={() => navigate("/sos")}
            className="
              w-full
              bg-red-600
              hover:bg-red-700
              text-white
              py-3
              rounded-xl
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition
              shadow-lg
            "
          >
            <FaHeartbeat />

            Emergency SOS
          </button>

        </div>

      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          bottom-0
          w-80
          max-w-[85%]
          bg-slate-900
          text-white
          z-[70]
          transform
          transition-transform
          duration-300
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Mobile Header */}

        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800">

          <h2 className="text-xl font-bold">
            ResQ <span className="text-red-500">Net AI</span>
          </h2>

          <button
            onClick={closeSidebar}
            className="text-gray-300 hover:text-white"
          >
            <FaTimes className="text-xl" />
          </button>

        </div>

        {/* Mobile Navigation */}

        <nav className="p-4 overflow-y-auto h-[calc(100%-64px)]">

          <p className="text-xs text-gray-500 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>

          <div className="space-y-2">

            {navItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition
                    ${
                      item.emergency
                        ? "text-red-400 hover:bg-red-600/20"
                        : isActive
                        ? "bg-red-600 text-white"
                        : "text-gray-300 hover:bg-slate-800"
                    }
                    `
                  }
                >
                  <Icon />

                  <span>
                    {item.name}
                  </span>

                </NavLink>
              );

            })}

          </div>

        </nav>

      </aside>

      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            bg-black/60
            z-[65]
            lg:hidden
          "
        />
      )}
    </>
  );
}

export default Sidebar;