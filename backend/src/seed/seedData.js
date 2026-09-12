import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "../config/db.js";

import Hospital from "../models/Hospital.js";
import Ambulance from "../models/Ambulance.js";

dotenv.config();

connectDB();

const seed = async () => {
  try {
    await Hospital.deleteMany();
    await Ambulance.deleteMany();

    // ---------------- Hospitals ----------------

    await Hospital.insertMany([
  {
    hospitalName: "Kailash Hospital",
    phone: "9876543210",
    email: "kailash@gmail.com",
    address: "Greater Noida",
    status: "Open",
    totalBeds: 250,
    availableBeds: 45,
    specialties: [
      "Emergency",
      "Cardiology",
      "Orthopedics",
    ],
    location: {
      latitude: 28.4744,
      longitude: 77.5030,
    },
  },

  {
    hospitalName: "Yatharth Hospital",
    phone: "9876543211",
    email: "yatharth@gmail.com",
    address: "Greater Noida",
    status: "Open",
    totalBeds: 180,
    availableBeds: 32,
    specialties: [
      "Emergency",
      "Neurology",
    ],
    location: {
      latitude: 28.4823,
      longitude: 77.5062,
    },
  },

  {
    hospitalName: "Sharda Hospital",
    phone: "9876543212",
    email: "sharda@gmail.com",
    address: "Knowledge Park",
    status: "Open",
    totalBeds: 300,
    availableBeds: 90,
    specialties: [
      "Emergency",
      "Trauma",
    ],
    location: {
      latitude: 28.4722,
      longitude: 77.4828,
    },
  },
]);

    // ---------------- Ambulances ----------------

    await Ambulance.insertMany([
  {
    ambulanceId: "AMB001",
    driverName: "Amit Kumar",
    driverPhone: "9876500001",
    vehicleNumber: "UP16AB1234",
    status: "Available",
    location: {
      latitude: 28.4744,
      longitude: 77.5030,
    },
  },
  {
    ambulanceId: "AMB002",
    driverName: "Rahul Singh",
    driverPhone: "9876500002",
    vehicleNumber: "UP16AB2234",
    status: "Available",
    location: {
      latitude: 28.4762,
      longitude: 77.5055,
    },
  },
  {
    ambulanceId: "AMB003",
    driverName: "Ankit Sharma",
    driverPhone: "9876500003",
    vehicleNumber: "UP16AB3234",
    status: "Busy",
    location: {
      latitude: 28.4710,
      longitude: 77.4998,
    },
  },
  {
    ambulanceId: "AMB004",
    driverName: "Deepak Verma",
    driverPhone: "9876500004",
    vehicleNumber: "UP16AB4234",
    status: "Available",
    location: {
      latitude: 28.4805,
      longitude: 77.5088,
    },
  },
  {
    ambulanceId: "AMB005",
    driverName: "Rohit Kumar",
    driverPhone: "9876500005",
    vehicleNumber: "UP16AB5234",
    status: "Offline",
    location: {
      latitude: 28.4695,
      longitude: 77.4950,
    },
  }
]);

    console.log("Database Seeded Successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();