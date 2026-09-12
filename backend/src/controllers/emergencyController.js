import Emergency from '../models/Emergency.js'
import { io } from '../server.js';

import Ambulance from "../models/Ambulance.js";
import Hospital from "../models/Hospital.js";
import { calculateDistance } from "../utils/calculateDistance.js";

export const createEmergency = async (req, res) => {
  console.log("Step 1");

  try {
    const emergency = await Emergency.create({
  user: req.user._id,
  emergencyType: req.body.emergencyType,
  description: req.body.description,
  latitude: req.body.latitude,
  longitude: req.body.longitude,
  address: req.body.address,
});

console.log("Emergency created");

//find Ambulance
const ambulances = await Ambulance.find({
  status: "Busy",
});

console.log(ambulances);

let nearestAmbulance = ambulances[0];
let minimumDistance = Infinity;

for (const ambulance of ambulances) {
  const distance = calculateDistance(
    emergency.latitude,
    emergency.longitude,
    ambulance.location.latitude,
    ambulance.location.longitude
  );

  if (distance < minimumDistance) {
    minimumDistance = distance;
    nearestAmbulance = ambulance;
  }
}

console.log(nearestAmbulance);

const hospitals = await Hospital.find();

console.log(hospitals);
const nearestHospital=hospitals[0];

emergency.status = "Ambulance Assigned";
console.log("Nearest Ambulance:", nearestAmbulance);
console.log("Nearest Hospital:", nearestHospital);

emergency.ambulance = nearestAmbulance._id;
emergency.hospital = nearestHospital._id;

await emergency.save();

await emergency.populate("ambulance");
await emergency.populate("hospital");

return res.status(201).json({
  success: true,
  emergency,
});

  } catch (err) {
    console.error(err);
  }
};

export const getMyEmergencies=async (req,res)=>{
    try {
        const emergencies=await Emergency.find({user:req.user._id}).sort({createdAt:-1});
        res.json({
      success: true,
      emergencies,
    });
  } catch (error) {
  console.error("CREATE EMERGENCY ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
}

export const getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
  .populate("ambulance")
  .populate("hospital");

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency Not Found",
      });
    }

    res.json({
      success: true,
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateEmergencyStatus = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency Not Found",
      });
    }

    emergency.status = req.body.status;

    await emergency.save();

    io.emit("statusUpdated", emergency);

    res.json({
      success: true,
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};