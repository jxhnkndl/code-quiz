// Quiz Question Data
var quizData = [
  {
    question: "Which of the following is not a valid data type in JavaScript?",
    answers: [
      "Numbers",
      "Booleans",
      "Variables",
      "Strings"
    ],
    correctIndex: 2
  }, 
  {
    question: "What is the correct term for a discrete, reusable block of code designed to accomplish a specific task?",
    answers: [
      "Conditional",
      "Function",
      "Prompt",
      "Event"
    ],
    correctIndex: 1
  },
  {
    question: "Which of the following could best be described as an indexed collection of elements?",
    answers: [
      "List",
      "Batch",
      "Object",
      "Array"
    ],
    correctIndex: 3
  },
  {
    question: "Which of the following is not a valid type JavaScript event?",
    answers: [
      "swipe",
      "click",
      "submit",
      "keyup"
    ],
    correctIndex: 0
  },
  {
    question: "What is the object that allows JavaScript to access, interact with, and manipulate elements in an HTML document in the browser?",
    answers: [
      "Node.js",
      "DOM",
      "querySelector",
      "jQuery"
    ]
  }
]

// UI Vars
var intrucstionsPageEl = document.getElementById("instructions-section");
var quizPageEl = document.getElementById("quiz-section");
var scorePageEl = document.getElementById("high-score");
var answersEl = document.getElementById("answer-container");
var questionEl = document.getElementById("question");
var scoreEl = document.getElementById("score");
var timerEl = document.getElementById("timer");
var startBtnEl = document.getElementById("start-quiz");

// Global Vars
var currentQuestion = 0;
var seconds = 60;

// Render UI
function renderQuestion(quizData) {

  // Get current question and answer array from quiz data
  var question = quizData[currentQuestion].question;
  var answers = quizData[currentQuestion].answers;

  // Init output variable
  var output = "";

  // Inject question into question field on page
  questionEl.textContent = question;

  // Loop through answers and create an answer button for each
  answers.forEach(function(answer, index) {
    output += `
      <button id="${index}" class="btn btn-outline-primary btn-block btn-lg answer">
        ${answer}
      </button>
    `;
  });
  
  // Insert the newly created answer buttons into the answer container
  answersEl.innerHTML = output;
}

// Start Quiz
function takeQuiz() {

  // Toggle from instructions page to quiz page
  intrucstionsPageEl.classList.replace("d-block", "d-none");
  quizPageEl.classList.replace("d-none", "d-block");

  // Render first quiz question into the UI
  renderQuestion(quizData);
}

// End Quiz
function quizOver() {

  // Toggle from quiz page to leaderboard page
  quizPageEl.classList.replace("d-block", "d-none");
  scorePageEl.classList.replace("d-none", "d-block");

}

// Event Listener: Start Quiz Button
startBtnEl.addEventListener("click", takeQuiz);

// Event Listener: Any Answer Button
answersEl.addEventListener("click", function(e) {

  // Check that an answer button is clicked
  if (e.target.classList.contains("answer")) {

    // Check that there are questions left to load
    if (currentQuestion < quizData.length - 1) {

      // Increment current question iterator
      currentQuestion++;

      // Render the next question
      renderQuestion(quizData);
    } else {

      // End quiz
      quizOver();
    }
  }
});