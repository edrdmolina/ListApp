let passwordValue;
let confirmPasswordValue;
const password = document.querySelector('#newPassword');
const confirmPassword = document.querySelector('#confirmPassword')
const validationMessage = document.querySelector('#validation-message');

function validatePassword(message, add, remove) {
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}

confirmPassword.addEventListener('input', e => {
    e.preventDefault();
    passwordValue = password.value;
    confirmPasswordValue = confirmPassword.value;
    if (confirmPasswordValue !== passwordValue) {
        validatePassword('Passwords must match!', 'color-red', 'color-green')
        
    } else {
        validatePassword('Passwords match!', 'color-green', 'color-red')
        
    }
})