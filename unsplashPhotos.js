//gets random photos related to rats
export const photoData = () => {
    fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=rats")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
        if (data.user.location) {
            document.getElementById("imageLocation").textContent = `${data.user.location}`
        }
    })
    .catch(err => {
        document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1602089108168-41dd3471da06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc3OTcxODV8&ixlib=rb-4.0.3&q=80&w=1080)';
        document.getElementById("author").textContent = 'Zachary Kadolph';
    })
}