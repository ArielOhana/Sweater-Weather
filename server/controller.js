const axios = require("axios");

const buildDateText = (time) => time.replace(/\s/g, " at ");

const ConfigAPI = (location, current, forecast) => ({
  city: location.name,
  country: location.country,
  lat: location.lat,
  lon: location.lon,
  currenttime: buildDateText(location.localtime),
  lastupdate: buildDateText(current.last_updated),
  tempnow: Math.round(current.temp_c),
  precipitation: current.precip_mm,
  humidity: current.humidity,
  windspeed: Math.round(current.wind_kph),
  description: current.condition.text,
  forecast: Forecast(location, forecast),
});

function Forecast(location, forecast) {
  let adjustedHour = parseInt(
    location.localtime.split(/\s/g)[1].split(":")[0]
  );

  const hoursForecast = [];
  adjustedHour = adjustedHour < 2 ? 2 : adjustedHour;
  for (let i = adjustedHour - 2; i <= adjustedHour + 2; i++) {
    const forecastInHour = forecast.forecastday[0 + Math.floor(i/24)].hour[i % 24];
    hoursForecast.push({
      hour: forecastInHour.time.split(/\s/g)[1],
      temp: Math.round(forecastInHour.temp_c),
    });
  }
  return hoursForecast;
}

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const response = await axios.get(
      `${process.env.BASE_URL}/forecast.json?key=${
        process.env.API_KEY
      }&q=${encodeURIComponent(city)}&days=2`
    );
    const { location, current, forecast } = response.data;
    const ConfigedData = ConfigAPI(location, current, forecast);
    res.status(200).json(ConfigedData);
  } catch (err) {
    console.error(err.message);
    res.status(400).json("Something went wrong, please try again");
  }
};
