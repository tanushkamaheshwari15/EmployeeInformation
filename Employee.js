let form = document.querySelector("form");

// inputs
let fname = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phoneNum");
let salary = document.querySelector("#salary");
let department = document.querySelector("#department");

// errors
let nameError = document.querySelector(".name-error");
let emailError = document.querySelector(".email-error");
let phoneError = document.querySelector(".phone-error");
let salaryError = document.querySelector(".salary-error");


console.log(department);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();
    let nameValue = fname.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let salaryValue = salary.value.trim();
    
    

    if (nameValidation(nameValue) && emailValidation(emailValue) && phoneValidation(phoneValue) && salaryValidation(salaryValue)) {
        alert("Form submitted successfully");
        displayInfo();
        clearInput();
    }
});

const nameValidation = (input) => {
    if (input.length < 2) {
        nameError.innerText = "Name Must be atleast 2 charactor long";
        return false;
    }
    const isValidName = /^[a-zA-Z ]*$/;
    if (!isValidName.test(input)) {
        nameError.innerText = "Enter valid name";
        return false;
    }
    return true;
}

const emailValidation = (input) => {
    let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!isValidEmail.test(input)) {
        emailError.innerText = "Enter a valid email";
        return false;
    }
    return true;
}

const phoneValidation = (input) => {
    let isValidPhone = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    if (!isValidPhone.test(input)) {
        phoneError.innerText = "Enter valid phone number";
        return false;
    }
    return true;
};

const salaryValidation = (input) => {
    let isValidSalary = /^\d{1,6}(?:\.\d{0,2})?$/;
    if (!isValidSalary.test(input)) {
        salaryError.innerText = "Enter valid salary";
        return false;
    }
    return true;
}

const clearInput = () => {
    fname.value = "";
    email.value = "";
    phone.value = "";
    salary.value = "";
}

const clearErrors = () => {
    nameError.innerText = "";
    emailError.innerText = "";
    phoneError.innerText = "";
    salaryError.innerText = "";
}

// display information
const displayInfo = () => {
    // values of the employee
    let nameValue = fname.value.trim();
    let emailValue = email.value.trim();
    let phoneValue = phone.value.trim();
    let salaryValue = salary.value.trim();
    let departValue = department.value.trim();

    if (nameValue != "" && emailValue != "" && phoneValue != "" && salaryValue != "" && departValue != "") {
        // new div create
        let newDiv = document.createElement("div");
        //new div content that print in the card
        newDiv.innerHTML = `
        <h3>${nameValue}</h3>
        <p class="email">Email: ${emailValue}</p>
        <p class="phone">Phone: ${phoneValue}</p>
        <p class="salary">Salary: ${salaryValue}</p>
        <p class="department">Department: ${departValue}</p>
        <button onclick="updateDiv(this)">Update</button>
        <button onclick="removeDiv(this)">Delete</button>
        `;

        // print card bottom of the form
        document.body.appendChild(newDiv);
    } else {
        alert("Enter all information..");
    }
};
// remove the card
const removeDiv = (btn) => {
    //select parentElement (new div) and remove it
    btn.parentElement.remove();
};

const updateDiv = (btn) => {
    //parent div (the one containing the information)
    let parentDiv = btn.parentElement;

    // Fill the form fields with the extracted values for editing
    document.querySelector("#name").value = parentDiv.querySelector("h3").innerText;
    document.querySelector("#email").value = parentDiv.querySelector(".email").innerText.replace("Email: ", "");
    document.querySelector("#phoneNum").value = parentDiv.querySelector(".phone").innerText.replace("Phone: ", "");
    document.querySelector("#salary").value =  parentDiv.querySelector(".salary").innerText.replace("Salary: ", "");
    document.querySelector("#department").value = parentDiv.querySelector(".department").innerText.replace("Department: ", "");

    document.querySelector("#btn").innerText= "Edit Employee.."
};