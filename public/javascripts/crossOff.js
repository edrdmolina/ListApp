// add class checked-off to label when checkbox is checked
const checkboxes = document.querySelectorAll('[data-checkbox]')

for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', function(e) {
        if(this.checked) {
            let label = checkbox.nextElementSibling
            label.classList.add('checked-off')
        } else {
            let label = checkbox.nextElementSibling
            label.classList.remove('checked-off')
        }
    });
}