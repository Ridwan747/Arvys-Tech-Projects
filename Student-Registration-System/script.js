let students = [];

let studentForm = document.getElementById("studentForm");
let studentList = document.getElementById("studentList");
let studentCount = document.getElementById("studentCount");
let removeButton = document.getElementById("removeButton");


studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let matric = document.getElementById("matric").value;
    let level = document.getElementById("level").value;
    let department = document.getElementById("department").value;


    if (name === "" || matric === "" || level === "" || department === "") {

        alert("Please fill in all the fields.");

    } else {

        let student = {
            name: name,
            matric: matric,
            level: level,
            department: department
        };

        students.push(student);

        displayStudents();

        studentForm.reset();
    }

});


function displayStudents() {

    studentList.innerHTML = "";

    if (students.length === 0) {

        studentList.innerHTML = `
            <p class="empty-message">
                No students have been added yet.
            </p>
        `;

    } else {

        for (let i = 0; i < students.length; i++) {

            let student = students[i];

            studentList.innerHTML += `
                <div class="student">

                    <h3>${student.name}</h3>

                    <p><strong>Matric Number:</strong> ${student.matric}</p>

                    <p><strong>Level:</strong> ${student.level}</p>

                    <p><strong>Department:</strong> ${student.department}</p>

                </div>
            `;
        }
    }

    studentCount.textContent = students.length + " student(s)";
}


removeButton.addEventListener("click", function() {

    if (students.length === 0) {

        alert("There are no students to remove.");

    } else {

        students.pop();

        displayStudents();
    }

});