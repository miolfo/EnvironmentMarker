function addBanner(message, type) {
    const className = "envmarker-banner envmarker-" + type
    const existingBanner = document.getElementsByClassName(className)
    //Don't add a new banner if one already exists
    if(existingBanner.length === 0) {
        const element = document.createElement("div")
        element.setAttribute("class", className)
        if(message && message.trim().length > 0) {
            element.innerText = message
        } else if(type === "info") {
            element.innerText = "EnviMarker Info"
        } else if(type === "warning") {
            element.innerText = "EnviMarker Warning"
        } else if(type === "error") {
            element.innerText = "EnviMarker Error"
        }
        document.body.prepend(element)
    }
}

browser.storage.local.get().then((res) => {
    let bannerAdded = false
    if(res.markers && (res.toggled == undefined || res.toggled === true)) {
        res.markers.forEach(element => {
            const host = window.location.hostname.replace("www.", "").toLowerCase()
            if(!bannerAdded && host === element.domain.toLowerCase()) {
                bannerAdded = true
                addBanner(element.message, element.type)
            }
        });
    }
})

