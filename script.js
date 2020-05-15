const form = document.getElementById('form');
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// 2. Show error
function showError(input, message) {
  const formControl = input.parentElement; // <div class="form-control"></div>
  formControl.className = 'form-control wrong';
  const error = formControl.querySelector('.error');
  error.innerHTML = message;
}

// 3. Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control right';
}

// 4. Check email is valid
function checkEmail(input) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// 5. Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    console.log(input.value);
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// 6. Add Capitalize to the first letter
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1).toLowerCase();
}

// 7. Check length of name, lastname and password
function checkLength(input, min, max) {
  if (input.value.length < min || input.value.length > max) {
    showError(input, `${getFieldName(input)} must be between 3 and 15 letters`);
  } else {
    showSuccess(input);
  }
}

// 8. Check password
function checkPassword(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password are different');
  }
}

// 1. Event listeners => submit form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(name.value);

  checkRequired([name, lastname, email, password, password2]);
  checkLength(name, 3, 15);
  checkLength(lastname, 3, 15);
  checkEmail(email);
  checkPassword(password, password2);
});
