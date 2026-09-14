import axios from "axios";

const API = `http://localhost:${process.env.PORT}/api/emergency`;

export const getEmergencyHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
