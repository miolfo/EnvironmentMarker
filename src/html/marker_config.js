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

function addNew() {
    const elementHtml = getTemplate("google.fi", "In Google!", "warning")
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
    var stored = []
    for(let elem of document.getElementsByClassName("domain-marker-row")) {
        const domain = getValueFromElement(elem, "domain-input")
        const message = getValueFromElement(elem, "message-input")
        const type = getValueFromElement(elem, "type-select")
        const obj = {domain: domain, message: message, type: type}
        console.log(obj)
        stored.push(obj)
    }
}

document.getElementById("add").addEventListener('click', () => addNew())
document.getElementById("save").addEventListener('click', () => save())