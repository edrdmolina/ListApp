// TODO send get req to api for json data of all lists
const apiUrl = `http://localhost:3000/lists/api`;
window.addEventListener('load', (e) => {
    $.getJSON(apiUrl)
    .then(crossCrossed)
})

const crossCrossed = (lists) => {
    lists.forEach(list => {
        list.items.forEach(item => {
            if(item.checked === true) {
                $(`#${item._id}`).addClass('checked-off-index')
            } else if (item.checked === false) {
                $(`#${item._id}`).removeClass('checked-off-index')
            }
        })
    })
}