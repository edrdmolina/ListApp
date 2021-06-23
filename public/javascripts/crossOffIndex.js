// TODO send get req to api for json data of all lists
window.addEventListener('load', (e) => {
    crossCrossed(lists)
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