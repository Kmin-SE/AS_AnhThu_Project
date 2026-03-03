const question = [
    {
        question: "According to the article, why is Polystyrene (PS) considered a severe environmental threat?",
        answers: [
            { Text: "It is the primary source of global oil pollution.", correct: false },
            { Text: "It biodegrades easily but produces massive greenhouse gases.", correct: false },
            { Text: "It is toxic to humans only when touched directly.", correct: false },
            { Text: "It virtually never decomposes, fills 1/3 of landfills, and releases toxins like styrene.", correct: true },
        ]
    },
    {
        question: "What complex condition is NOT required by Stache Lab's new breakdown method?",
        answers: [
            { Text: "The presence of white light.", correct: false },
            { Text: "Extremely high temperatures or sophisticated machinery.", correct: true },
            { Text: "Oxygen from the surrounding air.", correct: false },
            { Text: "An iron-based catalyst.", correct: false },
        ]
    },
    {
        question: "What is the valuable end product created after breaking down Polystyrene using this new method?",
        answers: [
            { Text: "Organic fertilizer.", correct: false },
            { Text: "Methane gas (CH4).", correct: false },
            { Text: "A new type of synthetic petroleum.", correct: false },
            { Text: "Benzoic acid.", correct: true },
        ]
    },
    {
        question: "Which component serves as the catalyst in this innovative recycling process?",
        answers: [
            { Text: "Mercury.", correct: false },
            { Text: "A small amount of iron.", correct: true },
            { Text: "Pre-treated Polystyrene.", correct: false },
            { Text: "Crude oil.", correct: false },
        ]
    },
    {
        question: "This method works effectively on most Polystyrene products except for which type, and why?",
        answers: [
            { Text: "Transparent products, because they are too thin to absorb the catalyst.", correct: false },
            { Text: "Used products, because they are too contaminated.", correct: false },
            { Text: "Red products, because the color red reflects white light.", correct: false },
            { Text: "Black products, because the dark dye blocks the light from penetrating.", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("questionNumber"); // Ensure this ID exists in your HTML

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    questionNumber.innerHTML = "Question " + (currentQuestionIndex + 1);
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionNumber.innerHTML = "Quiz Completed!";
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();