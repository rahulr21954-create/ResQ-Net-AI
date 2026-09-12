import { FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function SOSButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
      bg-red-600
      hover:bg-red-700
      text-white
      px-10
      py-5
      rounded-full
      font-bold
      text-xl
      shadow-xl
      hover:scale-105
      transition-all
      "
    >
      <NavLink to={'/sos'} className="flex items-center gap-3">
        <FaExclamationTriangle />
        ONE-TAP SOS
      </NavLink>
    </button>
  );
}

export default SOSButton;