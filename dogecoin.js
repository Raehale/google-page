
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