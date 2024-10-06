import { getBackground, downloadBgImg } from "./unsplashPhotos.js";
import { getWeather } from "./weather.js";
import { getThreeRecentRepos, createNewRepo } from "./githubInfo.js"

//gets the rat themed background from unsplashPhotos.js
getBackground();

//allows the user to download the bg image
downloadBgImg();

//gets the current weather based off the users location
getWeather();

//gets users current time
function getCurrentTime() {
    const currentTimeHM = new Date().toLocaleTimeString(("en-us"), {timeStyle: "short"});
    document.getElementById("time").textContent = currentTimeHM;
}

setInterval(getCurrentTime, 1000);

//gets the three most current repos
getThreeRecentRepos();

//allows the user to create a new github repo
createNewRepo();
