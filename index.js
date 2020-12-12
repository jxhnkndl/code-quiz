// UI Vars
var landingPageEl = document.getElementById("landing-section");
var quizPageEl = document.getElementById("quiz-section");
var scorePageEl = document.getElementById("high-score");
var leaderboardEl = document.getElementById("leaderboard");
var answersEl = document.getElementById("answer-container");
var questionEl = document.getElementById("question");
var scoreContainerEl = document.getElementById("score-container");
var scoreEl = document.getElementById("score");
var timerEl = document.getElementById("timer");
var formEl = document.getElementById("form");
var startBtnEl = document.getElementById("start-quiz");
var scoreBtnEl = document.getElementById("post-score");
var restartBtnEl = document.getElementById("restart-btn");
var clearBtnEl = document.getElementById("clear-btn");


// Global Quiz Vars
var index = 0;
var score = 0;
var seconds = 20;
var interval;


// Render Question in UI
function renderQuestion(quizData) {

  // Get current question and answer array from quiz data
  var question = quizData[index].question;
  var answers = quizData[index].answers;

  // Init output variable
  var output = "";

  // Inject question into question field on page
  questionEl.textContent = question;

  // Loop through answers and create an answer button for each
  answers.forEach(function(answer, index) {
    output += `
      <button id="${index}" class="btn btn-primary btn-block btn-lg answer">
        ${answer}
      </button>
    `;
  });
  
  // Insert the newly created answer buttons into the answer container
  answersEl.innerHTML = output;
}


// Render Score
function renderScore() {
  scoreEl.textContent = score;
}


// Show Alert
function showAlert(classes, message) {
  
  // Clear existing alerts
  clearAlert();

  // Create new alert
  var alertDiv = document.createElement("div");
  alertDiv.className = classes;
  alertDiv.textContent = message;

  // Append new alert to page
  quizPageEl.insertBefore(alertDiv, scoreContainerEl);
}


// Clear Alert
function clearAlert() {

  var currentAlert = document.querySelector('.alert');

  if (currentAlert) {
    currentAlert.remove();
  }
}


// Submit Answer
function submitAnswer(event) {

  // Check that an answer button is clicked
  if (event.target.classList.contains("answer")) {

    // Check whether user chose correct answer
    checkAnswer(event);

    // Check that there are questions left to load
    if (index < quizData.length - 1) {
      index++;
      renderQuestion(quizData);
    } else {
      quizOver();
    }
  }
}


// Check Answer
function checkAnswer(event) {

  // Get user answer and correct answer
  var userAnswer = event.target.id * 1;
  var correctAnswer = quizData[index].correctIndex;

  // Compare answers to determine whether user's answer is correct or not
  if (userAnswer === correctAnswer) {
    score++;
    renderScore();
    showAlert("alert alert-success text-center", "Nice job!");

  } else {
    seconds = seconds - 10;
    showAlert("alert alert-primary text-center", "Whoops! Incorrect.");
  }
}


// Start timer
function runTimer() {

  // Init timer
  timerEl.textContent = seconds;

  // Manage the operation of the timer running and stopping
  if (seconds > 0) {
    interval = setInterval(function() {
      if (seconds === 0) {
        stopTimer();

      } else {
        seconds--;
        timerEl.textContent = seconds;
      }
    }, 1000);
  } 
}


// Stop Timer
function stopTimer() {
  clearInterval(interval);
  seconds = 60;
}


// Start Quiz
function startQuiz() {

  // Toggle from instructions page to quiz page
  toggleSection(landingPageEl, quizPageEl);

  // Render first quiz question into the UI
  renderQuestion(quizData);

  // Start timer
  runTimer();
}


// End Quiz
function quizOver() {

  // Toggle from quiz page to leaderboard page
  toggleSection(quizPageEl, scorePageEl);
}


// Post Score
function postScore() {

  // Toggle internal section from form to leaderboard
  toggleSection(formEl, leaderboardEl);
}


// Restart Quiz
function restartQuiz() {

  // Toggle from score page back to landing page
  toggleSection(scorePageEl, landingPageEl);

  // Reset Current Question
  index = 0;
}


// Toggle Sections
function toggleSection(prev, next) {
  prev.classList.replace("d-block", "d-none");
  next.classList.replace("d-none", "d-block");
}



////////////////////////////////////////////////////



// Event Listener: Start Quiz Button
startBtnEl.addEventListener("click", startQuiz);


// Event Listener: Answer Buttons
answersEl.addEventListener("click", submitAnswer);


// Event Listener: Add High Score to Leaderboard
scoreBtnEl.addEventListener("click", function(event) {

  // Prevent default submit behavior
  event.preventDefault();

  // Post score to leaderboard
  postScore();

});


// Event Listener: Restart
restartBtnEl.addEventListener("click", restartQuiz);