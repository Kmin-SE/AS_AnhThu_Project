const question = [
    {
        question: "According to the article, why do many people continue to use bottled water even where tap water is safe?",
        answers: [
            { Text: "Bottled water tastes significantly better than tap water.", correct: false },
            { Text: "Bottled water is cheaper than maintaining a tap system.", correct: false },
            { Text: "Most are unaware or do not believe the tap water is high quality.", correct: true },
            { Text: "It is a mandatory regulation on university campuses.", correct: false },
        ]
    },
    {
        question: "Based on the text, why do plastic bottles have a 'very high carbon footprint'?",
        answers: [
            { Text: "They are produced from petroleum and most cannot be recycled effectively.", correct: true },
            { Text: "They release methane gas when exposed to sunlight.", correct: false },
            { Text: "The transportation process is the only reason for the footprint.", correct: false },
            { Text: "They absorb toxins from the public water system.", correct: false },
        ]
    },
    {
        question: "What was a primary focus of the 'Take Back the Tap' campaign to reduce plastic waste?",
        answers: [
            { Text: "Increasing fines for students using single-use plastics.", correct: false },
            { Text: "Raising awareness and publicly sharing water quality reports.", correct: true },
            { Text: "Installing vending machines that only sell paper-packaged water.", correct: false },
            { Text: "Banning all metal bottles on campus for safety reasons.", correct: false },
        ]
    },
    {
        question: "According to the blog, what is a potential long-term danger of relying on bottled water in low-income areas?",
        answers: [
            { Text: "It might lead to a shortage of plastic production.", correct: false },
            { Text: "Society may neglect the improvement of public water supply systems.", correct: true },
            { Text: "Bottled water becomes too cheap for the economy to sustain.", correct: false },
            { Text: "Tap water becomes safe too quickly without proper testing.", correct: false },
        ]
    },
    {
        question: "The article mentions that bottled water often originates from where?",
        answers: [
            { Text: "Deep untapped groundwater and natural mountain springs.", correct: false },
            { Text: "Public water systems (tap water) that is then filtered.", correct: true },
            { Text: "Tertiary treated wastewater systems.", correct: false },
            { Text: "Collected rainwater from university campus rooftops.", correct: false },
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