const toggle = document.querySelector("#toggle");
const closebtn = document.querySelector("#close");
const openbtn = document.querySelector("#open");
const modal = document.querySelector("#modal");

// Toggle nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// Show Modal
openbtn.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide Modal
closebtn.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide Modal on Outside click
window.addEventListener("click", e =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);

// ------------------------------------------------------------
// --------------------------Tp below------------------------
// ------------------------------------------------------------

// Sign Up form Code
const form = document.querySelector(".modal-action");
const email = document.querySelector("#email");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//functions
// ---------------Error Checker------------------

function showError(input, msg) {
  const formSections = input.parentElement;
  formSections.classList.add("error");
  const small = formSections.querySelector("small");
  small.textContent = msg;
}
function showSuccess(input) {
  const formSections = input.parentElement;
  formSections.classList.add("success");
}

// -------------Email Checker--------------------

function checkEmail(input) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is invalid");
  }
}

// --------------Required Checker----------------

function checkRequired(arr) {
  arr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, getId(input) + " is required.");
    } else {
      showSuccess(input);
    }
  });
}
function getId(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// ----------------Length Checker----------------

function checkLength(input, min, max) {
  if (input.value !== "") {
    if (!(input.value.length >= min && input.value.length <= max)) {
      showError(input, getId(input) + " must be between " + min + "-" + max);
    } else {
      showSuccess(input);
    }
  }
}

// --------------Password Match Checker-----------

function checkPassword(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, "Passwords do not match");
  }
}

// -------------------------------------------------------------
// Event Listeners
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // Easier Way Here
  arr = [username, email, password, password2];
  checkRequired(arr);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPassword(password, password2);
  // Hard-Core Way Below

  //   if (username.value === "") {
  //     showError(username, "Username is requireddd");
  //   } else {
  //     showSuccess(username);
  //   }
  //   if (email.value === "") {
  //     showError(email, "Email is requireddd");
  //   } else if (!validateEmail(email.value)) {
  //     showError(email, "Incorrect Email");
  //   } else {
  //     showSuccess(email);
  //   }
  //   if (password.value === "") {
  //     showError(password, "Password is requireddd");
  //   } else {
  //     showSuccess(password);
  //   }

  //   if (password2.value === "") {
  //     showError(password2, "Re-enter password");
  //   } else if (password.value !== password2.value) {
  //     showError(password2, "Passwords do not match");
  //   } else {
  //     showSuccess(password2);
  //   }
});
