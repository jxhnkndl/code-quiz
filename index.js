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
var finalScoreEl = document.getElementById("final-score");
var formEl = document.getElementById("form");
var initialsEl = document.getElementById("initials");
var highScoresEl = document.getElementById("high-scores");
var startBtnEl = document.getElementById("start-quiz");
var scoreBtnEl = document.getElementById("post-score");
var restartBtnEl = document.getElementById("restart-btn");
var clearBtnEl = document.getElementById("clear-btn");


// Global Quiz Vars
var index = 0;
var score = 0;
var totalQuestions = 5;
var seconds = 20;
var interval;


// Render Question in UI
function renderQuestion(quizData) {

  // Clear existing answers
  answersEl.innerHTML = "";

  // Get current question and answers from quiz data array
  var question = quizData[index].question;
  var answers = quizData[index].answers;

  // Inject question into question field on page
  questionEl.textContent = question;

  // Loop through answers array and create an answer button for each
  answers.forEach(function(answer, index) {

    // Generate buttons for each answer
    var button = document.createElement("button");
    button.setAttribute("id", index);
    button.className = "btn btn-primary btn-block btn-lg answer";
    button.textContent = answer;

    // Append answer buttons to answer container
    answersEl.appendChild(button);
  });
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


// Render Leaderboard
function renderLeaderboard() {

  var initials = initialsEl.value;
  var percentScore = calculateScorePercent();

  var li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  
  var badge = document.createElement("span");
  badge.className = "badge badge-primary badge-pill p-2";
  badge.textContent = percentScore + "%";

  li.insertAdjacentText("afterbegin", initials);
  li.appendChild(badge);

  highScoresEl.prepend(li);
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
        quizOver();

      } else {
        seconds--;
        timerEl.textContent = seconds;
      }
    }, 1000);

  } else {
    stopTimer();
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

  // Stop timer
  stopTimer();

  // Update Final Score Percentage:
  finalScoreEl.textContent = calculateScorePercent() + "%";

  // Toggle from quiz page to leaderboard page
  toggleSection(quizPageEl, scorePageEl);
}


// Calculate Score as a Percent
function calculateScorePercent() {
  return (score / totalQuestions) * 100;
}


// Post Score
function postScore() {

  // Add Initials + High Score to Leaderboard
  renderLeaderboard();

  // Toggle internal section from form to leaderboard
  toggleSection(formEl, leaderboardEl);
}


// Clear Leaderboard
function clearLeaderboard() {

  // Clear out all high score list items from the leaderboard
  highScoresEl.innerHTML = "";
}


// Restart Quiz
function restartQuiz() {

  // Toggle from score page back to landing page
  toggleSection(scorePageEl, landingPageEl);

  // Reset quiz variables
  index = 0;
  score = 0;
  seconds = 60;
  interval;

  // Reset UI
  scoreEl = score;
  timerEl = seconds;
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

// Event Listener: Clear Scores
clearBtnEl.addEventListener("click", clearLeaderboard);

// Event Listener: Restart
restartBtnEl.addEventListener("click", restartQuiz);