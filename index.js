/* GLOBAL VARIABLES: Elements queried from the DOM and
quiz logic variables that will need to be accessible 
across scopes. */

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
var seconds = 60;
var penalty = 10;
var interval;


/* UI FUNCTIONS: These functions are all designed to manage how 
data gets dynamically rendered onto the HTML document. These
functions include logic to control how question, answer, score,
alerts, and high score data get dynamically rendered into the 
appropriate section's UI.  */

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

// Show Alert: Quiz Section
function showAlert(classes, message, parent, before) {
  
  // Clear existing alerts
  clearAlert();

  // Create new alert
  var alertDiv = document.createElement("div");
  alertDiv.className = classes;
  alertDiv.textContent = message;

  // Append new alert to page
  parent.insertBefore(alertDiv, before);
}

// Clear Alert: Quiz Section
function clearAlert() {
  var currentAlert = document.querySelector('.alert');

  if (currentAlert) {
    currentAlert.remove();
  }
}

// Render Score: Quiz Section
function renderScore() {
  scoreEl.textContent = score;
}

// Render Leaderboard: Leaderboard Section
function renderLeaderboard(user) {

  // Clear existing validation alert
  clearAlert();

  // Capture user's initials and final score
  var initials = user;
  var percentScore = calculateScorePercent();

  // Generate list item for user's high score on the leaderboard
  var li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  
  // Genereate badge element to wrap the score percentage
  var badge = document.createElement("span");
  badge.className = "badge badge-primary badge-pill p-2";
  badge.textContent = percentScore + "%";

  // Insert user's initials and badge score into the list item
  li.insertAdjacentText("afterbegin", initials);
  li.appendChild(badge);

  // Add the new entry to the top of the leaderboard
  highScoresEl.prepend(li);

  // Switch from form view to leaderboard view
  toggleSection(formEl, leaderboardEl);
}

// Clear Leaderboard: Leaderboard Section
function clearLeaderboard() {

  // Clear out all high score list items from the leaderboard
  highScoresEl.innerHTML = "";
}


/* GRADING FUNCTIONS: These functions are designed to 
control the grading of the quiz's questions, such as the
submission of user answers, checking user answers against 
the correct answer, and determining how to proceed after 
each answer submission depending on the state of the user's 
interaction with the quiz. */

// Submit Answer: Quiz Page
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

// Check Answer: Quiz Section
function checkAnswer(event) {

  // Get user answer and correct answer
  var userAnswer = event.target.id * 1;
  var correctAnswer = quizData[index].correctIndex;

  // Compare answers to determine whether user's answer is correct or not
  if (userAnswer === correctAnswer) {

    // If so, increment and render the score and alert the user
    score++;
    renderScore();
    showAlert(
      "alert alert-success text-center", 
      "Nice job!",
      quizPageEl,
      scoreContainerEl
    );
  } else {

    // If not, impose the time penalty and alert the user!
    seconds = seconds - penalty;
    showAlert(
      "alert alert-primary text-center", 
      "Incorrect. 10 second penalty incurred.",
      quizPageEl,
      scoreContainerEl
    );
  }
}


/* TIMER FUNCTIONS: These functions control the operation of
the quiz's timer. */

// Start timer: Quiz Section
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
    quizOver();
  }
}

// Stop Timer: Quiz Section
function stopTimer() {
  clearInterval(interval);
}


/* QUIZ FUNCTIONS: These functions control what
happens when a user starts the quiz, finishes 
the quiz, or restarts the quiz again at the end
of the process. */

// Start Quiz: Landing -> Quiz Section
function startQuiz() {

  // Toggle from instructions page to quiz page
  toggleSection(landingPageEl, quizPageEl);

  // Clear existing alerts
  clearAlert();

  // Render first quiz question into the UI
  renderQuestion(quizData);

  // Start timer
  runTimer();
}

// End Quiz: Quiz -> High Score Section
function quizOver() {

  // Stop timer
  stopTimer();

  // Calculate and Render Final Score Percentage:
  finalScoreEl.textContent = calculateScorePercent() + "%";

  // Toggle from quiz page to leaderboard page
  toggleSection(quizPageEl, scorePageEl);
}

// Restart Quiz: High Score Section -> Landing Section
function restartQuiz() {

  // Reset quiz variables
  index = 0;
  score = 0;
  seconds = 60;
  interval;

  // Reset UI
  scoreEl.textContent = score;
  timerEl.textContent = seconds;

  // Toggle from score page back to landing page
  toggleSection(scorePageEl, landingPageEl);
}


/* HELPER FUNCTIONS: These are small functions designed
to minimize the need for repetitive code that is required
in multiple contexts and scopes. */

// Calculate Score as a Percent
function calculateScorePercent() {
  return (score / totalQuestions) * 100;
}

// Toggle Section Display
function toggleSection(prev, next) {
  prev.classList.replace("d-block", "d-none");
  next.classList.replace("d-none", "d-block");
}


/* EVENT LISTENERS: All event listeners for all sections of 
the application. */

// Event Listener: Start Quiz Button
startBtnEl.addEventListener("click", startQuiz);

// Event Listener: Answer Buttons
answersEl.addEventListener("click", submitAnswer);

// Event Listener: Add High Score to Leaderboard
scoreBtnEl.addEventListener("click", function(event) {

  // Prevent default submit behavior
  event.preventDefault();

  if (initialsEl.value === "") {
    showAlert(
      "alert alert-primary",
      "Oops! We're going to need your initials to put you on the board!",
      scorePageEl,
      formEl
    );

    setTimeout(function() {
      clearAlert();
    }, 2000);

  } else {
    var initials = initialsEl.value;
    renderLeaderboard(initials);
  }
});

// Event Listener: Clear Scores
clearBtnEl.addEventListener("click", clearLeaderboard);

// Event Listener: Restart
restartBtnEl.addEventListener("click", restartQuiz);