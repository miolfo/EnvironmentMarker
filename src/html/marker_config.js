function getTemplate(domainName, message, type) {
    return `<input type="text" name="domain" value="${domainName}"></input>
            <input type="text" name="message" value="${message}"></input>
            <select>
                <option value="error" ${type === 'error'? 'selected="selected"' : ''}>Error</option>
                <option value="warning" ${type === 'warning'? 'selected="selected"' : ''}>Warning</option>
                <option value="info" ${type === 'info'? 'selected="selected"' : ''}>Info</option>
            </select>`
}

function addNew() {
    const elementHtml = getTemplate("google.fi", "In Google!", "warning");
    const element = document.createElement("div")
    element.innerHTML = elementHtml
    document.getElementById("domainMarkers").appendChild(element)
}

document.getElementById("add").addEventListener('click', () => addNew())