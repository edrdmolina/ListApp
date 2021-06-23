// TODO send get req to api for json data ono whole list
const apiUrl = `http://localhost:3000/lists/${listId}/api`;
window.addEventListener('load', (e) => {
    $.getJSON(apiUrl)
    .then(crossCrossed)
})

const crossCrossed = (list) => {
    list.items.forEach((item, i) => {
        if(item.checked === true) {
            $(`#${item._id}`).addClass('checked-off')
            $(`#item${i}`).attr('checked', 'checked')
        } else if (item.checked === false) {
            $(`#${item._id}`).removeClass('checked-off')
        }
    })
}


// TODO send put req to api and change boolean value of checked
const itemsTitle = document.querySelectorAll('[data-item-title]');

itemsTitle.forEach(itemTitle => {
    itemTitle.addEventListener('click', (e) => {
        const itemId = itemTitle.id;
        updateItem(itemId);
    })
})

const updateItem = (itemId) => {
    const updateUrl = `/lists/${listId}/api/${itemId}`;
    $.ajax({
        method: 'PUT',
        url: updateUrl,
    })
    .then(crossOff)
}

const crossOff = (item) => {
    if(item.checked === true) {
        $(`#${item._id}`).addClass('checked-off')
    } else if (item.checked === false) {
        $(`#${item._id}`).removeClass('checked-off')
    }
}