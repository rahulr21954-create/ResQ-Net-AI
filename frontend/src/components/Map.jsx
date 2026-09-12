import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { userIcon,policeIcon,hospitalIcon,ambulanceIcon } from "./CustomIcons";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function Map({ position, hospitals =[],policeStations=[],ambulances=[]}) {
  return (
    
    <MapContainer
      center={position}
      zoom={15}
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* User Marker */}
      <Marker position={position} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Hospital Markers */}
  {hospitals.map((hospital) => (
  <Marker
    key={hospital.properties.place_id}
    position={[
      hospital.geometry.coordinates[1],
      hospital.geometry.coordinates[0],
    ]}
    icon={hospitalIcon}
  >
    <Popup>
      <h3 className="font-bold">
        {hospital.properties.name || "Hospital"}
      </h3>

      <p>{hospital.properties.formatted}</p>
    </Popup>
    <Tooltip permanent direction="top">
        {hospital.properties.name || hospital.properties.address_line1}
    </Tooltip>
  </Marker>
  
))}
  {policeStations.map((station) => (
  <Marker
    key={station.properties.place_id}
    position={[
      station.geometry.coordinates[1],
      station.geometry.coordinates[0],
    ]}
    icon={policeIcon}
  >
    <Popup>
      <h3 className="font-bold">
        {station.properties.name || "Police Station"}
      </h3>

      <p>{station.properties.formatted}</p>
    </Popup>

    <Tooltip permanent direction="top">
      {station.properties.name || station.properties.address_line1}
    </Tooltip>
  </Marker>
))}

{ambulances.map((ambulance) => (
  <Marker
    key={ambulance.id}
    position={[
      ambulance.latitude,
      ambulance.longitude,
    ]}
    icon={ambulanceIcon}
  >
    <Popup>
      <h3>🚑 {ambulance.id}</h3>

      <p>Status: {ambulance.status}</p>
    </Popup>

    <Tooltip permanent direction="top">
      🚑 {ambulance.id}
    </Tooltip>
  </Marker>
))}
    </MapContainer>
    
    
  );
  
  
}

export default Map;