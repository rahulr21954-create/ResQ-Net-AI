import axios from "axios";

const API = "http://localhost:8000/api/emergency";

export const createEmergency = async (data, token) => {
  console.log("Sending request to backend...");
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getHistory = async (token) => {
  const res = await axios.get(`${API}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getEmergency = async (id, token) => {
  const res = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateStatus = async (
  id,
  status,
  token
) => {
  const res = await axios.put(
    `${API}/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};