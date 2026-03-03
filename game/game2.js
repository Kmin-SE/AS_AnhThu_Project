const question = [
    {
        question: "dsfskfjbsd sfdjksdbf ds fskj",
        answers: [
            { Text: "mi mi", correct: false },
            { Text: "mi mi ma ma", correct: false },
            { Text: "upin ipin", correct: true },
            { Text: "tra la leo", correct: false },
        ]
    },
    {
        question: "dsfskfjbsd sfdjksdbf ds fskj",
        answers: [
            { Text: "mdfgi", correct: true },
            { Text: "fdggfa", correct: false },
            { Text: "upin in", correct: false },
            { Text: "tra la leo", correct: false },
        ]
    },
        {
        question: "dsfskfjbsd sfdjksdbf ds fskj",
        answers: [
            { Text: "mdfgi", correct: true },
            { Text: "fdggfa", correct: false },
            { Text: "upin in", correct: false },
            { Text: "tra la leo", correct: false },
        ]
    },
        {
        question: "dsfskfjbsd sfdjksdbf ds fskj",
        answers: [
            { Text: "mdfgi", correct: false },
            { Text: "fdggfa", correct: false },
            { Text: "upin in", correct: true },
            { Text: "tra la leo", correct: false },
        ]
    },
        {
        question: "dsfskfjbsd sfdjksdbf ds fskj",
        answers: [
            { Text: "mdfgi", correct: false },
            { Text: "fdggfa", correct: false },
            { Text: "upin in", correct: false },
            { Text: "tra la leo", correct: true },
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
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
    let currentQuestion = question[currentQuestionIndex]
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
    Array.from(answerButtons.children).forEach(
        button => {
            if (button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        }
    );
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();