let students = [];

let form = document.getElementById("admissionForm");
let studentsBody = document.getElementById("studentsBody");
let studentCount = document.getElementById("studentCount");
let emptyMessage = document.getElementById("emptyMessage");
let studentsTable = document.getElementById("studentsTable");

function clearErrors() {
    let errors = document.querySelectorAll(".error");
    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = "";
    }
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}

function isValidPhone(phone) {
    let digits = phone.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let age = document.getElementById("age").value.trim();
    let matric = document.getElementById("matric").value.trim();
    let department = document.getElementById("department").value.trim();
    let password = document.getElementById("password").value;

    let hasError = false;

    if (name === "") {
        showError("nameError", "Name is required.");
        hasError = true;
    }

    if (email === "") {
        showError("emailError", "Email is required.");
        hasError = true;
    } else if (!isValidEmail(email)) {
        showError("emailError", "Please enter a valid email.");
        hasError = true;
    }

    if (phone === "") {
        showError("phoneError", "Phone number is required.");
        hasError = true;
    } else if (!isValidPhone(phone)) {
        showError("phoneError", "Enter a valid phone number (10-15 digits).");
        hasError = true;
    }

    if (age === "") {
        showError("ageError", "Age is required.");
        hasError = true;
    } else {
        let ageNum = Number(age);
        if (isNaN(ageNum) || ageNum < 15 || ageNum > 60) {
            showError("ageError", "Age must be between 15 and 60.");
            hasError = true;
        }
    }

    if (matric === "") {
        showError("matricError", "Matriculation number is required.");
        hasError = true;
    }

    if (department === "") {
        showError("departmentError", "Department is required.");
        hasError = true;
    }

    if (password === "") {
        showError("passwordError", "Password is required.");
        hasError = true;
    } else if (password.length < 6) {
        showError("passwordError", "Password must be at least 6 characters.");
        hasError = true;
    }

    // Check for duplicates
    for (let i = 0; i < students.length; i++) {
        if (students[i].email.toLowerCase() === email.toLowerCase()) {
            showError("emailError", "This email is already registered.");
            hasError = true;
        }
        if (students[i].matric.toLowerCase() === matric.toLowerCase()) {
            showError("matricError", "This matric number is already registered.");
            hasError = true;
        }
    }

    if (hasError) {
        return;
    }

    let student = {
        name: name,
        email: email,
        phone: phone,
        age: age,
        matric: matric,
        department: department
    };

    students.push(student);
    displayStudents();
    form.reset();
});

function displayStudents() {
    studentsBody.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
        studentsTable.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        studentsTable.style.display = "table";

        for (let i = 0; i < students.length; i++) {
            let s = students[i];
            let row = document.createElement("tr");
            row.innerHTML =
                "<td>" + s.name + "</td>" +
                "<td>" + s.email + "</td>" +
                "<td>" + s.phone + "</td>" +
                "<td>" + s.age + "</td>" +
                "<td>" + s.matric + "</td>" +
                "<td>" + s.department + "</td>";
            studentsBody.appendChild(row);
        }
    }

    studentCount.textContent = students.length + " student(s)";
}

displayStudents();