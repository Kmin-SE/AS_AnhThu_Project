const question = [
    {
        question: "According to the article, what can organic waste be used for after processing?",
        answers: [
            { Text: "Turned into nutrient-dense compost for gardens", correct: true },
            { Text: "Sent directly to recycling plants to make construction materials", correct: false },
            { Text: "It must be incinerated at a high cost", correct: false },
            { Text: "It can only be used for landfilling", correct: false },
        ]
    },
    {
        question: "Based on the recycling code table, which plastic is rated as VERY SAFE and has GOOD RECYCLABILITY?",
        answers: [
            { Text: "PETE plastic (Code 1)", correct: false },
            { Text: "PS plastic (Code 6)", correct: false },
            { Text: "PVC plastic (Code 3)", correct: false },
            { Text: "PP plastic (Code 5)", correct: true },
        ]
    },
    {
        question: "According to the article, what is an example of the NON-RECYCLABLE or difficult to recycle group?",
        answers: [
            { Text: "Ceramics, porcelain, and broken glass", correct: true },
            { Text: "Tea bags and eggshells", correct: false },
            { Text: "Aluminum cans and cardboard", correct: false },
            { Text: "Plastic bottles and leaves", correct: false },
        ]
    },
    {
        question: "Which recycling code indicates a product that is NON-RECYCLABLE and becomes TOXIC/DEFORMED when exposed to heat?",
        answers: [
            { Text: "Code 2 (HDPE)", correct: false },
            { Text: "Code 6 (PS)", correct: true },
            { Text: "Code 7 (Other)", correct: false },
            { Text: "Code 4 (LDPE)", correct: false },
        ]
    },
    {
        question: "According to the 'Quick Tip' in the article, where should you look for the recycling symbol if you are unsure?",
        answers: [
            { Text: "On the top of the lid or mouth of the product", correct: false },
            { Text: "On the bottom of the product", correct: true },
            { Text: "In the printed user manual provided", correct: false },
            { Text: "On the side or in the middle of the packaging", correct: false },
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
    questionNumber.innerHTML = "Quiz Completed!";
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