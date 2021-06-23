// TODO On load retrieve list as JSON format;
window.addEventListener('load', (e) => {
    $.getJSON(`/lists/${listId}/api`)
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
        
    })
})

// TODO send put req to api and change boolean value of checked
