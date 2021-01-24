function addBanner(message, type) {
    const className = "envmarker-banner envmarker-" + type
    const existingBanner = document.getElementsByClassName(className)
    //Don't add a new banner if one already exists
    if(existingBanner.length === 0) {
        const element = document.createElement("div")
        element.setAttribute("class", className)
        element.innerText = message
        document.body.prepend(element)
    }
}

browser.storage.local.get().then((res) => {
    let bannerAdded = false
    res.markers.forEach(element => {
        const host = window.location.hostname.replace("www.", "").toLowerCase()
        if(!bannerAdded && host === element.domain.toLowerCase()) {
            bannerAdded = true
            addBanner(element.message, element.type)
        }
    });
})

