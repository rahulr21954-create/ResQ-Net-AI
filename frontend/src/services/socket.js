import { io } from "socket.io-client";

const socket = io(`http://localhost:${import.meta.env.VITE_API_URL}`, {
  autoConnect: true,
});

export default socket;
