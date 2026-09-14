import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/hospitals`;

export const getNearbyHospitals = async (lat, lon) => {
  const res = await axios.get(`${API}/nearby`, {
    params: {
      lat,
      lon,
    },
  });

  return res.data;
};
