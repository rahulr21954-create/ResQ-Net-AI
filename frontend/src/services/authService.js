import axios from "axios";

const API = `http://localhost:${process.env.PORT}/api/auth`;

export const signupUser = async (data) => {
  const res = await axios.post(`${API}/signup`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};
