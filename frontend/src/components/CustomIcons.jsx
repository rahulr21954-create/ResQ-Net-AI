import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";

import {
  FaHospital,
  FaShieldAlt,
  FaAmbulance,
  FaMapMarkerAlt,
} from "react-icons/fa";

const createIcon = (icon, color) =>
  new L.DivIcon({
    html: renderToStaticMarkup(
      <div
        style={{
          color,
          fontSize: "28px",
          filter: "drop-shadow(0 2px 5px rgba(0,0,0,.4))",
          marginTop:"2rem"
        }}
      >
        {icon}
      </div>
    ),
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

export const userIcon = createIcon(
  <FaMapMarkerAlt />,
  "#ef4444"
);

export const hospitalIcon = createIcon(
  <FaHospital />,
  "#22c55e"
);

export const policeIcon = createIcon(
  <FaShieldAlt />,
  "#2563eb"
);

export const ambulanceIcon = createIcon(
  <FaAmbulance />,
  "#f97316"
);