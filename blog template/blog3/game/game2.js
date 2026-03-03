const question = [
    {
        question: "Theo bài viết, Polystyrene (PS) được xem là rác thải gây hại nghiêm trọng vì nguyên nhân nào sau đây?",
        answers: [
            { Text: "Nó là nguồn gốc chính gây ô nhiễm dầu mỏ trên toàn thế giới", correct: false },
            { Text: "Nó dễ dàng phân hủy, nhưng tạo ra lượng khí nhà kính khổng lồ", correct: false },
            { Text: "Nó dễ dàng phân hủy, nhưng tạo ra lượng khí nhà kính khổng lồ.", correct: false  },
            { Text: "Nó hầu như không phân hủy, chiếm gần 1/3 lượng rác chôn lấp và giải phóng chất độc như styrene", correct: true },
        ]
    },
    {
        question: "Phương pháp phân hủy Polystyrene mới của Stache Lab tại Đại học Cornell không yêu cầu điều kiện phức tạp nào?",
        answers: [
            { Text: "Phải có ánh sáng trắng", correct: false },
            { Text: "Phải có nhiệt độ rất cao hoặc thiết bị phức tạp", correct: true },
            { Text: "Phải có oxy trong không khí", correct: false },
            { Text: "Phải có chất xúc tác từ sắt", correct: false },
        ]
    },
        {
        question: "Sản phẩm cuối cùng được tạo ra sau khi phân hủy nhựa Polystyrene bằng phương pháp mới là gì?",
        answers: [
            { Text: "Phân bón hữu cơ", correct: false },
            { Text: "Chất khí Methane (CH4)", correct: false },
            { Text: "Một loại dầu mỏ tổng hợp mới", correct: false },
            { Text: "Axit benzoic", correct: true },
        ]
    },
        {
        question: "Thành phần nào được sử dụng trong phương pháp phân hủy mới đóng vai trò là chất xúc tác (catalyst)?",
        answers: [
            { Text: "Thủy ngân", correct: false },
            { Text: "Một lượng nhỏ chất xúc tác từ sắt", correct: true },
            { Text: "Polystyrene đã qua xử lý", correct: false },
            { Text: "Dầu mỏ", correct: false },
        ]
    },
        {
        question: "Phương pháp phân hủy Polystyrene mới này hoạt động hiệu quả với hầu hết các loại PS thông thường, ngoại trừ loại nào và vì sao?",
        answers: [
            { Text: "Sản phẩm trong suốt, vì chúng quá mỏng để hấp thụ chất xúc tác", correct: false },
            { Text: "Sản phẩm đã qua sử dụng, vì chúng đã bị nhiễm bẩn", correct: false },
            { Text: "Sản phẩm màu đỏ, vì màu đỏ phản chiếu ánh sáng trắng", correct: false },
            { Text: "Sản phẩm màu đen, vì thuốc nhuộm đen cản ánh sáng", correct: true },
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