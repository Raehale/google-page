//gets random photos related to rats
export async function getBackground() {
    try {
        const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=rats");
        const data = await res.json();
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("author").textContent = `By: ${data.user.name}`
        if (data.user.location) {
            document.getElementById("imageLocation").textContent = `${data.user.location}`
        }
    } catch(err) {
        document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1602089108168-41dd3471da06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc3OTcxODV8&ixlib=rb-4.0.3&q=80&w=1080)';
        document.getElementById("author").textContent = 'Zachary Kadolph';
    }
}

//download background image
export function downloadBgImg() {
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
}