const request = require('request');

const weatherKey = '3e56b9d7bbd2fa29036a5198da88f205';
const weatherApiEndpoint = "http://api.weatherstack.com";

const getWeather = (latitude, longitude, callback) => {
    const weatherApi = `${weatherApiEndpoint}/current?access_key=${weatherKey}&query=${latitude},${longitude}&units=m`;
    request({url: weatherApi, json: true}, (error, {body} = {})=>{
        console.log(body);
        if(error){
            callback("Unable to access the weather API");
        }else if(body.error){
            callback("Can't get the weather for the location");
        }else{
            let current = body.current;
            callback(undefined, `The weather is ${current.weather_descriptions[0]}. It's ${current.temperature} degrees out. The humidity is ${current.humidity}. It feels like ${current.feelslike}`);
        }

    });
};

module.exports = getWeather