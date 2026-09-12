import axios from "axios";

export const getNearbyPolice = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const apiKey = process.env.GEOAPIFY_API_KEY;

    const url =
      `https://api.geoapify.com/v2/places?categories=service.police` +
      `&filter=circle:${lon},${lat},15000` +
      `&limit=20` +
      `&apiKey=${apiKey}`;

    const response = await axios.get(url);

    res.json(response.data.features);

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch police stations",
    });
  }
};