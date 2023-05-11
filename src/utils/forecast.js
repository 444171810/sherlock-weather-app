const request = require("request");

const weatherStackKey = "3e56b9d7bbd2fa29036a5198da88f205";
const weatherStackApiEndpoint = "http://api.weatherstack.com";

const qweatherKey = "3ce870ac29744348a3b124d53ada6fe6";
const qweatherApiEndpoint = "https://devapi.qweather.com/v7/weather";
//https://devapi.qweather.com/v7/weather/now?key=4671eb3a80934054b98297934ba31bdc&location=120.15507,30.2741

function getWeather(latitude, longitude, callback) {
  getWeatherFromQWeather(latitude, longitude, callback)
  //getWeatherFromStack(latitude, longitude, callback);

}


function getWeatherFromStack(latitude, longitude, callback) {
  const weatherApi = `${weatherStackApiEndpoint}/current?access_key=${weatherStackKey}&query=${latitude},${longitude}&units=m`;
  request({ url: weatherApi, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to access the weather API");
    } else if (body.error) {
      callback("Can't get the weather for the location");
    } else {
      let current = body.current;
      callback(
        undefined,
        `The weather is ${current.weather_descriptions[0]}. It's ${current.temperature} degrees out. The humidity is ${current.humidity}. It feels like ${current.feelslike}`
      );
    }
  });
};


function getWeatherFromQWeather(latitude, longitude, callback) {
  const weatherApi = `${qweatherApiEndpoint}/now?key=${qweatherKey}&location=${longitude},${latitude}&lang=en&gzip=n`;
  request({ url: weatherApi, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to access the qweather API");
    } else if (body.error) {
      callback("Can't get the weather for the location");
    } else {
      let now = body.now;
      callback(
        undefined,
        `The weather is ${now.text}. It's ${now.temp} degrees out. The humidity is ${now.humidity}. It feels like ${now.feelsLike}`
      );
    }
  });
};

module.exports = getWeather;
