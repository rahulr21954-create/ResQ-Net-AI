import axios from "axios";

const API = `http://localhost:${process.env.PORT}/api/hospitals`;

export const getNearbyHospitals = async (lat, lon) => {
  const res = await axios.get(`${API}/nearby`, {
    params: {
      lat,
      lon,
    },
  });

  return res.data;
};
