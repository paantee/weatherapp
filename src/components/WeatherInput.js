import React, { useState, useEffect } from 'react';
import './WeatherInput.css'

export default function WeatherInput() {

    const [location, setLocation] = useState('Helsinki');
    const [weather, setWeather] = useState(null);
    const [img, setImg] = useState('');

    const imgSrc = 'https://openweathermap.org/img/wn/' + img + '@2x.png';



    const handleChange = event => {
        setLocation(event.target.value);
    };

    const handleSubmit = event => {
        if (weather == undefined) {
            window.alert("Name a country or a city")
        } else
            fetchData();
        event.preventDefault();
    }

    const fetchData = () => {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=d50f8600d9a6da62efc844b13b8c6110&units=metric')
            .then(response => response.json())
            .then(data => {
                setWeather(data)
                setImg(data.weather[0].icon)
            })
        console.log("Data Fetched")
        console.log(img)
        console.log(weather)
    }

    useEffect(() => fetchData(), []);

    return (

        <div className="div1">
            <span>
                <h1>Enter Location</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' id='location' value={location} onChange={handleChange} />
                    <button type='submit'>Submit</button>
                </form>

                {weather && (
                    <div>
                        <h2>Current weather in {weather?.name}:</h2>
                        {weather.main ? <p>Temperature: {weather?.main?.temp}°C</p> : null}
                        {weather.weather ? <p>Conditions: {weather.weather[0].description}</p> : null}
                        {weather.weather ? <img src={imgSrc} alt={weather?.weather[0].description} /> : null}
                    </div>
                )}
            </span>
        </div>

    );
}