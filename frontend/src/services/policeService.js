import axios from "axios";

const API = `http://localhost:${import.meta.env.VITE_API_URL}/api/police`;

export const getNearbyPolice = async (lat, lon) => {
  const res = await axios.get(
    `${API}/nearby?lat=${lat}&lon=${lon}`
  );

  return res.data;
};
