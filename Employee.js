
let form = document.querySelector("form");

// Inputs
let fname = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phoneNum");
let salary = document.querySelector("#salary");
let department = document.querySelector("#department");

// Errors
let nameError = document.querySelector(".name-error");
let emailError = document.querySelector(".email-error");
let phoneError = document.querySelector(".phone-error");
let salaryError = document.querySelector(".salary-error");

// Button
let submitButton = document.querySelector("#btn");

// Track the card being edited
let editingCard = null;

// Prevent form submission with Enter key
form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") event.preventDefault();
});

// Form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    let nameValue = fname.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let salaryValue = salary.value.trim();
    let departValue = department.value.trim();

    if (
        nameValidation(nameValue) &&
        emailValidation(emailValue) &&
        phoneValidation(phoneValue) &&
        salaryValidation(salaryValue) &&
        departmentValidation(departValue)
    ) {
        if (editingCard) {
            // If editing, update the existing card
            updateCard(editingCard, nameValue, emailValue, phoneValue, salaryValue, departValue);
        } else {
            // If not editing, create a new card
            createCard(nameValue, emailValue, phoneValue, salaryValue, departValue);
        }
        resetForm();
    }
});

// Validations
const nameValidation = (input) => {
    if (input.length < 2) {
        nameError.innerText = "Name must be at least 2 characters long";
        return false;
    }
    if (!/^[a-zA-Z ]+$/.test(input)) {
        nameError.innerText = "Enter a valid name";
        return false;
    }
    return true;
};

const emailValidation = (input) => {
    let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!isValidEmail.test(input)) {
        emailError.innerText = "Enter a valid email";
        return false;
    }
    return true;
};

const phoneValidation = (input) => {
    let isValidPhone = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if (!isValidPhone.test(input)) {
        phoneError.innerText = "Enter a valid phone number";
        return false;
    }
    return true;
};

const salaryValidation = (input) => {
    let isValidSalary = /^\d{1,6}(?:\.\d{0,2})?$/;
    if (!isValidSalary.test(input)) {
        salaryError.innerText = "Enter a valid salary";
        return false;
    }
    return true;
};

const departmentValidation = (input) => {
    if (input === "") {
        alert("Please select a department.");
        return false;
    }
    return true;
};

// Clear input fields
const resetForm = () => {
    fname.value = "";
    email.value = "";
    phone.value = "";
    salary.value = "";
    department.value = "";

    submitButton.innerText = "Add Employee"; // Reset button text
    editingCard = null; // Reset editing state
};

// Clear error messages
const clearErrors = () => {
    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    salaryError.innerText = "";
};

// Create employee card
const createCard = (name, email, phone, salary, department) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("employee-card");

    newDiv.innerHTML = `
        <h3>${name}</h3>
        <p class="email">Email: ${email}</p>
        <p class="phone">Phone: ${phone}</p>
        <p class="salary">Salary: ${salary}</p>
        <p class="department">Department: ${department}</p>
        <button onclick="editCard(this)">Edit</button>
        <button onclick="removeCard(this)">Delete</button>
    `;

    document.body.appendChild(newDiv);
};

// Remove employee card
const removeCard = (btn) => {
    btn.parentElement.remove();
};

// Edit employee card
const editCard = (btn) => {
    let parentDiv = btn.parentElement;

    // If another card is already being edited, reset its state first
    if (editingCard && editingCard !== parentDiv) {
        resetForm();
    }

    fname.value = parentDiv.querySelector("h3").innerText;
    email.value = parentDiv.querySelector(".email").innerText.replace("Email: ", "");
    phone.value = parentDiv.querySelector(".phone").innerText.replace("Phone: ", "");
    salary.value = parentDiv.querySelector(".salary").innerText.replace("Salary: ", "");
    department.value = parentDiv.querySelector(".department").innerText.replace("Department: ", "");

    submitButton.innerText = "Update Employee";
    editingCard = parentDiv; // Track which card is being edited
};

// Update existing employee card
const updateCard = (card, name, email, phone, salary, department) => {
    card.querySelector("h3").innerText = name;
    card.querySelector(".email").innerText = `Email: ${email}`;
    card.querySelector(".phone").innerText = `Phone: ${phone}`;
    card.querySelector(".salary").innerText = `Salary: ${salary}`;
    card.querySelector(".department").innerText = `Department: ${department}`;

    resetForm();
};

