import { useEffect } from "react";
import socket from "../socket";

function AmbulanceDashboard() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const ambulance = {
          id: "AMB001",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: "Available",
        };

        console.log("🚑 Sending:", ambulance);

        socket.emit("ambulanceLocation", ambulance);
      },
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        🚑 Ambulance Dashboard
      </h1>
    </div>
  );
}

export default AmbulanceDashboard;