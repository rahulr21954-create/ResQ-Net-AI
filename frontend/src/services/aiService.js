import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/ai`;

export const askAI = async (message) => {
  const res = await axios.post(`${API}/chat`, {
    message,
  });

  return res.data.reply;
};
