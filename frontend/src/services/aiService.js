import axios from "axios";

const API = "http://localhost:8000/api/ai";

export const askAI = async (message) => {
  const res = await axios.post(`${API}/chat`, {
    message,
  });

  return res.data.reply;
};