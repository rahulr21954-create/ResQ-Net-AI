import axios from "axios";

const API = `http://localhost:${process.env.PORT}/api/ai`;

export const askAI = async (message) => {
  const res = await axios.post(`${API}/chat`, {
    message,
  });

  return res.data.reply;
};
