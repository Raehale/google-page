//gets users current weather using their location (position)
export function getWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=104bdb29c7eb291568aef67ab2067fe3`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available.");
                }
    
                return res.json();
            })
            .then(data => {
                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                document.getElementById("weather").innerHTML = `
                    <img src=${iconUrl} alt="Weather Icon" />
                    <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                    <p class="weather-text">
                        Feels Like: ${Math.round(data.main.feels_like)}º<br />
                        Min: ${Math.round(data.main.temp_max)}º<br />
                        Max: ${Math.round(data.main.temp_min)}º<br />
                    </div>
                    <p class="weather-city">${data.name}</p>
                `;
            })
            .catch(err => console.error(err));
    });
}