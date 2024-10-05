//gets random photos related to rats
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=rat")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1602089108168-41dd3471da06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc3OTcxODV8&ixlib=rb-4.0.3&q=80&w=1080)';
        document.getElementById("author").textContent = 'Zachary Kadolph';
    });

//gets dogecoin stats
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong");
        }

        return res.json();
    })
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;
        document.getElementById('crypto').innerHTML += `
            <div class="crypto-stats">
                <p>🎯: ${data.market_data.current_price.usd}</p>
                <p>👆: ${data.market_data.high_24h.usd}</p>
                <p>👇: ${data.market_data.low_24h.usd}</p>
            </div>
        `;

    })
    .catch(err => console.error(err));

//gets users current weather using their position
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=104bdb29c7eb291568aef67ab2067fe3`)
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
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => console.error(err));
});