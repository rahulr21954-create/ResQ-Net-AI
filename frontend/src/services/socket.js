import { io } from "socket.io-client";

const socket = io(`http://localhost:${process.env.PORT}`, {
  autoConnect: true,
});

export default socket;
