import { photoData } from "./unsplashPhotos.js";
console.log(photoData)
// import { Octokit } from "https://esm.sh/@octokit/core";
// window.Octokit = new Octokit({userAgent: 'Rae'});

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

//gets users current 
function getCurrentTime() {
    const currentTimeHM = new Date().toLocaleTimeString(("en-us"), {timeStyle: "short"});
    document.getElementById("time").textContent = currentTimeHM;
}

setInterval(getCurrentTime, 1000);

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

//download background image
const downloadImageBtn = document.getElementById("imageDownload");

downloadImageBtn.addEventListener("click", () => {
    const currentImg = document.getElementsByTagName("body")[0].style.backgroundImage;
    const imgUrl = currentImg.slice(5, -2);

    const imageName = document.getElementById("author").textContent.slice(4).replaceAll(' ', '-');

    chrome.downloads.download({
        url: imgUrl,
        filename: `rat-pic-by-${imageName}.jpg`,
        conflictAction: "uniquify",
    })
    .then((downloadId) => {
        console.log(`Download initiated with Id: ${downloadId}`);
    })
    .catch((error) => {
        console.error("download failed:", error);
    });
});

//get github repos
let topRepoTimes = {
    one: new Date('2020-09-05T01:55:56Z'),
    two: new Date('2020-09-05T01:55:56Z'),
    three: new Date('2020-09-05T01:55:56Z'),
}

fetch("https://api.github.com/users/raehale/repos")
    .then(res => res.json())
    .then(data => {
        displayGithubRepos(data);
    });

function displayGithubRepos(reposArr) {
    getOrderedArr(reposArr)
}

function getOrderedArr(reposArr) {
        let reposSortedByUpdate = reposArr.sort(sortDates);
    
        function sortDates(a, b) {
            return (a.updated_at > b.updated_at) ? -1 : 1;
        }

        topThreeRepos(reposSortedByUpdate);
}

let topRepos = {}
function topThreeRepos(reposArr) {
    topRepos.one = reposArr[0];
    topRepos.two = reposArr[1];
    topRepos.three = reposArr[2];

    displayRecentRepos(topRepos);
}

function displayRecentRepos(topRepos) {
    for (const repo in topRepos) {
        document.getElementById("githubRepos").innerHTML += `
                <a href="https://github.com/Raehale/${topRepos[repo].name}">
                    <div class="repo">
                        <h3>${topRepos[repo].name}</h3>
                        <div class="repo-details">
                            <p class="language">
                                <i class="fa-solid fa-circle-dot ${topRepos[repo].language}-icon"></i> ${topRepos[repo].language}
                            </p>
                            <p class="last-contribute">
                                ${new Date(topRepos[repo].updated_at).toString().substring(0, 21)}
                            </p>
                        </div>
                    </div>
                </a>
            `;
    };
}

//makes a link to create a new repository on github
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newRepoBtnIcon").addEventListener("click", (event) => {
        console.log(document.getElementById("newRepoBtn"))
        const newRepoName = document.getElementById("newRepoInput").value;
        console.log('newRepoName')
    });
});

// function displayCreateNewGithubRepo(data) {
//     const newRepoEl = document.getElementById("newRepo");
//     const newRepoName = document.getElementById("newRepoInput").value
//     console.log(newRepoName)
// }

// const octokit = new Octokit({
// });

// try {
//     const result = await octokit.request("POST /orgs/Raehale/repos", {
//                         org: "Raehale",
//                         name: "octocat",
//                     })
//     displayCreateNewGithubRepo(result);
// } catch (error) {
//     console.log(error)
// }