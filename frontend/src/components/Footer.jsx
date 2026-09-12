import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>

          <div className="flex items-center gap-3">

            <div className="bg-red-600 p-2 rounded-full">
              <FaHeartbeat className="text-white text-xl" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              ResQ <span className="text-red-500">Net AI</span>
            </h2>

          </div>

          <p className="mt-5 text-gray-400 leading-7">
            AI-powered emergency response platform helping people
            connect instantly with hospitals, ambulances, police,
            and emergency services.
          </p>

        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl text-white font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li><Link to="/">Home</Link></li>

            <li><Link to="/dashboard">Dashboard</Link></li>

            <li><Link to="/tracking">Tracking</Link></li>

            <li><Link to="/hospitals">Hospitals</Link></li>

            <li><Link to="/profile">Profile</Link></li>

          </ul>

        </div>

        {/* Emergency Contacts */}
        <div>

          <h3 className="text-xl text-white font-semibold mb-5">
            Emergency
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-500" />
              <span>112 (Emergency)</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500" />
              <span>support@resqnet.ai</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <span>Greater Noida, India</span>
            </div>

          </div>

        </div>

        {/* Social */}
        <div>

          <h3 className="text-xl text-white font-semibold mb-5">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <a href="#">
              <FaFacebook className="hover:text-blue-500 transition" />
            </a>

            <a href="#">
              <FaInstagram className="hover:text-pink-500 transition" />
            </a>

            <a href="#">
              <FaLinkedin className="hover:text-blue-400 transition" />
            </a>

            <a href="#">
              <FaGithub className="hover:text-white transition" />
            </a>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gray-700 py-6 text-center">

        <p className="text-gray-400">
          © {new Date().getFullYear()} ResQ Net AI. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;