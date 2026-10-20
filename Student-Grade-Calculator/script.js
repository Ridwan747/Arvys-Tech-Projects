let students = [];

let form = document.getElementById("gradeForm");
let resultsBody = document.getElementById("resultsBody");
let emptyMessage = document.getElementById("emptyMessage");
let resultsTable = document.getElementById("resultsTable");
let highestStudent = document.getElementById("highestStudent");
let lowestSubject = document.getElementById("lowestSubject");
let summary = document.getElementById("summary");

const subjectNames = ["Mathematics", "English", "Science", "History", "Art"];
const subjectIds = ["math", "english", "science", "history", "art"];

function getGrade(average) {
    if (average >= 70) return "A";
    if (average >= 60) return "B";
    if (average >= 50) return "C";
    if (average >= 40) return "D";
    return "F";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("studentName").value.trim();
    if (name === "") {
        alert("Please enter the student name.");
        return;
    }

    let scores = [];
    for (let i = 0; i < subjectIds.length; i++) {
        let value = document.getElementById(subjectIds[i]).value;
        if (value === "") {
            alert("Please enter a score for " + subjectNames[i] + ".");
            return;
        }
        let score = Number(value);
        if (isNaN(score) || score < 0 || score > 100) {
            alert(subjectNames[i] + " score must be between 0 and 100.");
            return;
        }
        scores.push(score);
    }

    let total = 0;
    for (let i = 0; i < scores.length; i++) {
        total = total + scores[i];
    }
    let average = total / scores.length;
    let grade = getGrade(average);

    let student = {
        name: name,
        scores: scores,
        total: total,
        average: average,
        grade: grade
    };

    students.push(student);
    displayResults();
    form.reset();
});

function displayResults() {
    resultsBody.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
        resultsTable.style.display = "none";
        summary.style.display = "none";
        return;
    }

    emptyMessage.style.display = "none";
    resultsTable.style.display = "table";
    summary.style.display = "block";

    for (let i = 0; i < students.length; i++) {
        let s = students[i];
        let row = document.createElement("tr");
        row.innerHTML =
            "<td>" + s.name + "</td>" +
            "<td>" + s.scores[0] + "</td>" +
            "<td>" + s.scores[1] + "</td>" +
            "<td>" + s.scores[2] + "</td>" +
            "<td>" + s.scores[3] + "</td>" +
            "<td>" + s.scores[4] + "</td>" +
            "<td>" + s.total + "</td>" +
            "<td>" + s.average.toFixed(1) + "</td>" +
            "<td>" + s.grade + "</td>";
        resultsBody.appendChild(row);
    }

    // Find highest-scoring student (by average)
    let highest = students[0];
    for (let i = 1; i < students.length; i++) {
        if (students[i].average > highest.average) {
            highest = students[i];
        }
    }
    highestStudent.innerHTML = "Highest scoring student: <strong>" + highest.name +
        "</strong> (Average: " + highest.average.toFixed(1) + ")";

    // Find subject with lowest class average
    let subjectTotals = [0, 0, 0, 0, 0];
    for (let i = 0; i < students.length; i++) {
        for (let j = 0; j < 5; j++) {
            subjectTotals[j] = subjectTotals[j] + students[i].scores[j];
        }
    }

    let lowestIndex = 0;
    let lowestAvg = subjectTotals[0] / students.length;
    for (let j = 1; j < 5; j++) {
        let avg = subjectTotals[j] / students.length;
        if (avg < lowestAvg) {
            lowestAvg = avg;
            lowestIndex = j;
        }
    }

    lowestSubject.innerHTML = "Subject with lowest class average: <strong>" +
        subjectNames[lowestIndex] + "</strong> (" + lowestAvg.toFixed(1) + ")";
}

displayResults();