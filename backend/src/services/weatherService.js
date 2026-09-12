export const getWeatherData = async (latitude, longitude) => {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,precipitation,rain` +
      `&hourly=precipitation,rain` +
      `&forecast_days=2` +
      `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    const currentHour = new Date();

    // Find the closest hourly record
    let currentIndex = 0;

    if (data.hourly?.time) {
      let smallestDifference = Infinity;

      data.hourly.time.forEach((time, index) => {
        const difference = Math.abs(
          new Date(time).getTime() -
            currentHour.getTime()
        );

        if (difference < smallestDifference) {
          smallestDifference = difference;
          currentIndex = index;
        }
      });
    }

    /*
     * -----------------------------
     * Current rainfall
     * -----------------------------
     */

    const rainfall1h =
      Number(
        data.hourly?.rain?.[currentIndex] || 0
      );


    /*
     * -----------------------------
     * Previous 3 hours rainfall
     * -----------------------------
     */

    let rainfall3h = 0;

    for (
      let i = Math.max(0, currentIndex - 2);
      i <= currentIndex;
      i++
    ) {
      rainfall3h += Number(
        data.hourly?.rain?.[i] || 0
      );
    }


    /*
     * -----------------------------
     * Next 3 hours rainfall
     * -----------------------------
     */

    let forecastRainfall = 0;

    for (
      let i = currentIndex + 1;
      i <= currentIndex + 3;
      i++
    ) {
      forecastRainfall += Number(
        data.hourly?.rain?.[i] || 0
      );
    }


    /*
     * -----------------------------
     * Humidity
     * -----------------------------
     */

    const humidity = Number(
      data.current?.relative_humidity_2m || 0
    );


    /*
     * -----------------------------
     * Temperature
     * -----------------------------
     */

    const temperature = Number(
      data.current?.temperature_2m || 0
    );


    return {
      latitude: data.latitude,
      longitude: data.longitude,

      rainfall1h: Number(
        rainfall1h.toFixed(2)
      ),

      rainfall3h: Number(
        rainfall3h.toFixed(2)
      ),

      forecastRainfall: Number(
        forecastRainfall.toFixed(2)
      ),

      humidity,

      temperature,

      raw: data,
    };

  } catch (error) {

    console.error(
      "Weather Service Error:",
      error.message
    );

    throw error;
  }
};