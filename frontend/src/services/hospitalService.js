import axios from "axios";

const API = "http://localhost:8000/api/hospitals";

export const getNearbyHospitals = async (lat, lon) => {
  const res = await axios.get(`${API}/nearby`, {
    params: {
      lat,
      lon,
    },
  });

  return res.data;
};