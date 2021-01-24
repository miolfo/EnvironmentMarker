function getTemplate(domainName, message, type) {
    return `<input type="text" class="domain-input" name="domain" value="${domainName}"></input>
            <input type="text" class="message-input" name="message" value="${message}"></input>
            <select class="type-select">
                <option value="error" ${type === 'error'? 'selected="selected"' : ''}>Error</option>
                <option value="warning" ${type === 'warning'? 'selected="selected"' : ''}>Warning</option>
                <option value="info" ${type === 'info'? 'selected="selected"' : ''}>Info</option>
            </select>
            <button type="button" class="delete-row">X</button>`
}

function deleteRow(e) {
    const row = e.target.parentNode
    row.parentNode.removeChild(row)
}

function addNew(domainName, message, type) {
    const elementHtml = getTemplate(domainName, message, type)
    const element = document.createElement("div")
    element.setAttribute("class", "domain-marker-row")
    element.innerHTML = elementHtml
    //Bind on delete click -listener
    for(var child of element.childNodes) {
        if(child.className === "delete-row") {
            child.addEventListener("click", deleteRow)
        }
    }
    document.getElementById("domainMarkers").appendChild(element)
}

function getValueFromElement(element, className) {
    for(var child of element.childNodes) {
        if(child.className === className) {
            return child.value
        }
    }
    return ""
}

function save() {
    var stored = {markers: []}
    for(let elem of document.getElementsByClassName("domain-marker-row")) {
        const domain = getValueFromElement(elem, "domain-input")
        const message = getValueFromElement(elem, "message-input")
        const type = getValueFromElement(elem, "type-select")
        const obj = {domain: domain, message: message, type: type}
        stored.markers.push(obj)
    }
    browser.storage.local.set(stored)
}

document.getElementById("add").addEventListener('click', () => addNew("google.fi", "In Google!", "warning"))
document.getElementById("save").addEventListener('click', () => save())

browser.storage.local.get().then((res) => {
    if(res.markers) {
        res.markers.forEach(element => {
            addNew(element.domain, element.message, element.type)
        });
    }
    document.getElementById("add").disabled = false
    document.getElementById("save").disabled = false
})