import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "./config/dotenv.js";
import app from "./app.js";
import connectDB from "./config/db.js";
import { createServer } from "http";
import { Server } from "socket.io";

connectDB();

const server = createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://res-q-net-ai-eta.vercel.app"
];

export const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("Client Connected:", socket.id);

  socket.on("locationUpdate", (location) => {
    io.emit("userLocation", location);
  });

  socket.on("ambulanceLocation", (ambulance) => {
    console.log("Received ambulance update:", ambulance);
    socket.broadcast.emit("ambulanceUpdated", ambulance);
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
