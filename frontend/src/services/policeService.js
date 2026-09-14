import axios from "axios";

const API = `http://localhost:${process.env.PORT}/api/police`;

export const getNearbyPolice = async (lat, lon) => {
  const res = await axios.get(
    `${API}/nearby?lat=${lat}&lon=${lon}`
  );

  return res.data;
};
