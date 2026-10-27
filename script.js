const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Trainer Markup Language",
            "HyperText Markup Language",
            "HyperText Markdown Language",
            "HighText Markup Language"
        ],
        answer: 1
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "background", "color", "text-align"],
        answer: 2
    },
    {
        question: "In JavaScript, which keyword declares a block-scoped variable?",
        options: ["var", "let", "function", "constantly"],
        answer: 1
    },
    {
        question: "What does an AI coding assistant typically use as context?",
        options: [
            "Only the last line you typed",
            "Your open files, prompts, and related project code",
            "Your operating system password",
            "Random internet comments"
        ],
        answer: 1
    },
    {
        question: "Which array method creates a new array of transformed items?",
        options: ["forEach", "push", "map", "pop"],
        answer: 2
    },
    {
        question: "What is the purpose of git commit?",
        options: [
            "Delete the repository",
            "Save a snapshot of staged changes with a message",
            "Publish a website",
            "Install npm packages"
        ],
        answer: 1
    },
    {
        question: "Which HTTP status code means “Not Found”?",
        options: ["200", "301", "404", "500"],
        answer: 2
    },
    {
        question: "A prompt that is specific and includes constraints usually produces:",
        options: [
            "Worse results",
            "More useful, targeted answers",
            "Only images",
            "A compile error"
        ],
        answer: 1
    },
    {
        question: "Which symbol starts a single-line comment in JavaScript?",
        options: ["<!--", "//", "#", "/* only"],
        answer: 1
    },
    {
        question: "What should you do before trusting AI-generated code in production?",
        options: [
            "Paste it without reading",
            "Review, test, and check for bugs or secrets",
            "Assume it is always correct",
            "Delete your tests"
        ],
        answer: 1
    }
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const progressEl = document.getElementById("progress");
const scoreLiveEl = document.getElementById("score-live");
const progressFillEl = document.getElementById("progress-fill");
const quizEl = document.getElementById("quiz");
const restartBtn = document.getElementById("restart");

let current = 0;
let score = 0;

function showQuestion() {
    const item = questions[current];
    questionEl.textContent = item.question;
    progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
    scoreLiveEl.textContent = `Score: ${score}`;
    progressFillEl.style.width = `${((current) / questions.length) * 100}%`;
    resultEl.textContent = "";
    optionsEl.innerHTML = "";

    item.options.forEach((label, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.addEventListener("click", () => selectAnswer(index, button));
        optionsEl.appendChild(button);
    });
}

function selectAnswer(index, clicked) {
    const item = questions[current];
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach((btn) => {
        btn.disabled = true;
    });

    if (index === item.answer) {
        clicked.classList.add("correct");
        score += 1;
        resultEl.textContent = "Correct!";
    } else {
        clicked.classList.add("wrong");
        buttons[item.answer].classList.add("correct");
        resultEl.textContent = "Not quite — the highlighted option is right.";
    }

    scoreLiveEl.textContent = `Score: ${score}`;
    progressFillEl.style.width = `${((current + 1) / questions.length) * 100}%`;

    setTimeout(() => {
        current += 1;
        if (current < questions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 900);
}

function finishQuiz() {
    quizEl.hidden = true;
    resultEl.textContent = `You scored ${score} out of ${questions.length}.`;
    restartBtn.hidden = false;
}

restartBtn.addEventListener("click", () => {
    current = 0;
    score = 0;
    quizEl.hidden = false;
    restartBtn.hidden = true;
    showQuestion();
});

showQuestion();
