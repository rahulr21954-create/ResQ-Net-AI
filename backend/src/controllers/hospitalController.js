import axios from "axios";

export const getNearbyHospitals = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const apiKey = process.env.GEOAPIFY_API_KEY;

    const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&limit=20&apiKey=${apiKey}`;

    console.log("URL:", url);

    const response = await axios.get(url);

    console.log("SUCCESS");
    console.log(response.data);

    return res.status(200).json(response.data.features);

  } catch (error) {
    console.log("========== ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);
    console.log("===========================");

    return res.status(500).json({
      success: false,
      message: "Unable to fetch nearby hospitals",
    });
  }
};