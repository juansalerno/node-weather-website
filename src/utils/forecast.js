const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=0f84a0355d6df4a96ba93c8a628d5130&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try again', undefined)
        } else {
            callback(undefined, `
            ${body.current.weather_descriptions[0]}.<br>
            It is currently ${body.current.temperature} celsius degrees out.<br>
            It feels like ${body.current.feelslike} celsius degrees out.<br>
            The humidity is ${body.current.humidity}%.<br>
            Cloud cover ${body.current.cloudcover}%. <br>
            `)
        }
    })

}


module.exports = forecast;