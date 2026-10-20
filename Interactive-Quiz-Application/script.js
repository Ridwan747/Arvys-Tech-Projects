let questions = [
    {
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Abuja", "Kano", "Ibadan"],
        answer: 1
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1
    },
    {
        question: "How many days are in a week?",
        options: ["5", "6", "7", "8"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

let quizContainer = document.getElementById("quizContainer");
let resultContainer = document.getElementById("resultContainer");
let questionNumber = document.getElementById("questionNumber");
let questionText = document.getElementById("questionText");
let optionsDiv = document.getElementById("options");
let nextButton = document.getElementById("nextButton");
let scoreText = document.getElementById("scoreText");
let resultMessage = document.getElementById("resultMessage");
let restartButton = document.getElementById("restartButton");

function showQuestion() {
    selectedAnswer = null;
    let current = questions[currentQuestion];

    questionNumber.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
    questionText.textContent = current.question;

    optionsDiv.innerHTML = "";

    for (let i = 0; i < current.options.length; i++) {
        let button = document.createElement("button");
        button.className = "option";
        button.textContent = current.options[i];
        button.addEventListener("click", function () {
            selectOption(i, button);
        });
        optionsDiv.appendChild(button);
    }

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Finish Quiz";
    } else {
        nextButton.textContent = "Next Question";
    }
}

function selectOption(index, button) {
    selectedAnswer = index;
    let allOptions = optionsDiv.querySelectorAll(".option");
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove("selected");
    }
    button.classList.add("selected");
}

nextButton.addEventListener("click", function () {
    if (selectedAnswer === null) {
        alert("Please select an answer first.");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score = score + 1;
    }

    currentQuestion = currentQuestion + 1;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    scoreText.textContent = "You scored " + score + " out of " + questions.length;

    if (score === questions.length) {
        resultMessage.textContent = "Excellent! You got a perfect score.";
    } else if (score >= 3) {
        resultMessage.textContent = "Good job! Keep it up.";
    } else {
        resultMessage.textContent = "Keep practising, you can do better.";
    }
}

restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
});

showQuestion();