const question = [
    {
        question: "According to the article, which of the following is NOT mentioned as a direct benefit of DIY recycling at home?",
        answers: [
            { Text: "Saving money on buying new items.", correct: false },
            { Text: "Developing creativity and color-mixing skills.", correct: false },
            { Text: "Receiving recognition from international environmental organizations.", correct: true },
            { Text: "Reducing the amount of waste sent to landfills.", correct: false },
        ]
    },
    {
        question: "According to the text, what is one of the feelings you gain from decorating your space with handmade items?",
        answers: [
            { Text: "A sense of achievement.", correct: true },
            { Text: "A feeling of surprise at seeing new objects.", correct: false },
            { Text: "A feeling of exhaustion and disappointment.", correct: false },
            { Text: "A sense of completing a forced assignment.", correct: false },
        ]
    },
    {
        question: "Which green quote does the article suggest using to spread the message of creative recycling?",
        answers: [
            { Text: "'Create from waste – Add value to the Earth.'", correct: true },
            { Text: "'Reduce Waste – Save the Planet.'", correct: false },
            { Text: "'Small Actions – One Green World.'", correct: false },
            { Text: "'Recycling is the Green Future.'", correct: false },
        ]
    },
    {
        question: "According to section 3, besides helping the environment, what community benefit does DIY recycling provide?",
        answers: [
            { Text: "It helps increase the operations of recycling factories.", correct: false },
            { Text: "It earns you material rewards from your school.", correct: false },
            { Text: "It inspires others and sparks a movement.", correct: true },
            { Text: "It helps you find customers to buy your recycled products.", correct: false },
        ]
    },
    {
        question: "To make your study corner cozier and more personal, what does the article suggest using alongside recycled pots?",
        answers: [
            { Text: "A desk mat.", correct: false },
            { Text: "A mini speaker.", correct: false },
            { Text: "A large alarm clock.", correct: false },
            { Text: "Soft warm lights.", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("questionNumber");

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