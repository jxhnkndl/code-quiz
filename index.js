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
var users = [];


/* UI FUNCTIONS: These functions are all designed to manage how 
data gets dynamically painted into the UI. */

// Render Question in UI
function renderQuestion(quizData) {

  // Clear existing answers from the UI
  answersEl.innerHTML = "";

  // Get current question and answers from quiz data array
  var question = quizData[index].question;
  var answers = quizData[index].answers;

  // Inject question into question field on page
  questionEl.textContent = question;

  // Create answer buttons for each answer and append them to the answer container
  answers.forEach(function(answer, index) {
    var button = document.createElement("button");
    button.setAttribute("id", index);
    button.className = "btn btn-primary btn-block btn-lg answer";
    button.textContent = answer;
    answersEl.appendChild(button);
  });
}

// Show Alert: Quiz Section
function showAlert(classes, message, parent, before) {
  
  // Clear existing alerts
  clearAlert();

  // Abort alert if an argument is missing to avoid causing UI problems
  if (classes === undefined || message === undefined || 
    parent === undefined || before === undefined) {
    return;
  }

  // Create and render new alert
  var alertDiv = document.createElement("div");
  alertDiv.className = classes;
  alertDiv.textContent = message;
  parent.insertBefore(alertDiv, before);
}

// Clear Alert
function clearAlert() {
  var currentAlert = document.querySelector('.alert');

  if (currentAlert) {
    currentAlert.remove();
  }
}

// Render Score
function renderScore() {
  scoreEl.textContent = score;
}

// Render Leaderboard
function renderLeaderboard(user, percentScore) {

  // Clear existing validation alert
  clearAlert();

  // Capture user's initials and final score
  var initials = user;
  var percentScore = percentScore;

  // Generate high score list item 
  var li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  // Generate score badge
  var badge = document.createElement("span");
  badge.className = "badge badge-primary badge-pill p-2";
  badge.textContent = percentScore + "%";

  // Insert user data into the list item and prepend it to the leaderboard
  li.insertAdjacentText("afterbegin", initials);
  li.appendChild(badge);
  highScoresEl.prepend(li);
}


/* STORAGE FUNCTIONS: These functions are responsible for
setting and getting leaderboard data from local storage. */

// Render Leaderboard Data from Local Storage into UI
function renderHighScores() {

  // Check for users already in local storage
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  // Loop through stored scores and render to the leaderboard
  users.forEach((user) => {
    renderLeaderboard(user.initials, user.score);
  });
}

// Save User's High Score into Local Storage
function saveHighScore(initials, score) {

  // Create user object
  var user = { initials, score }

  // Check for users in local storage
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  // Add the new user to the other saved users
  users.push(user);

  // Reset local storage
  localStorage.setItem("users", JSON.stringify(users));
}

// Clear Leaderboard from UI and Local Storage
function clearLeaderboard() {
  highScoresEl.innerHTML = "";
  localStorage.clear();
}


/* GRADING FUNCTIONS: These functions are designed to 
control the submission and checking of user answers. */

// Submit Answer
function submitAnswer(event) {

  // Check that an answer button is clicked
  if (event.target.classList.contains("answer")) {

    // Check if user's answer choice is correct
    checkAnswer(event);

    // If there are questions left to load
    if (index < quizData.length - 1) {
      index++;
      renderQuestion(quizData);
    } 
    // If there aren't questions left to laod
    else {
      quizOver();
    }
  }
}

// Check Answer
function checkAnswer(event) {

  // Capture user's answer and correct answer
  var userAnswer = event.target.id * 1;
  var correctAnswer = quizData[index].correctIndex;

  // If user's answer is correct
  if (userAnswer === correctAnswer) {
    score++;
    renderScore();
    showAlert(
      "alert alert-success text-center", 
      "Nice job!",
      quizPageEl,
      scoreContainerEl
    );
  } 
  // If user's answer is incorrect
  else {
    seconds = seconds - penalty;

    // If there are more than 10 seconds left
    if (seconds > 0) {
      showAlert(
        "alert alert-primary text-center", 
        "Incorrect. 10 second penalty incurred.",
        quizPageEl,
        scoreContainerEl
      );
    } 
    // If there are less than 10 seconds on the clock
    else {
      quizOver();
    }
  }
}


/* TIMER FUNCTIONS: These functions control the operation of
the quiz's timer. */

// Start timer
function runTimer() {

  // Init timer
  timerEl.textContent = seconds;

  // If there are seconds left on the clock
  if (seconds > 0) {
    interval = setInterval(function() {
      if (seconds === 0) {
        quizOver();
      } else {
        seconds--;
        timerEl.textContent = seconds;
      }
    }, 1000);
  } 
  // If there are no seconds left on the clock
  else {
    quizOver();
  }
}

// Stop Timer
function stopTimer() {
  clearInterval(interval);
}


/* QUIZ FUNCTIONS: These functions control what
happens when a user starts the quiz, finishes 
the quiz, or restarts the quiz again at the end
of the application cycle. */

// Start Quiz
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

// End Quiz
function quizOver() {

  // Stop timer
  stopTimer();
  // Calculate and Render Final Score Percentage:
  finalScoreEl.textContent = calculateScorePercent() + "%";
  // Toggle from quiz page to leaderboard page
  toggleSection(quizPageEl, scorePageEl);
}

// Restart Quiz
function resetQuiz() {

  // Reset quiz variables
  index = 0;
  score = 0;
  seconds = 60;
  interval;

  // Reset UI
  scoreEl.textContent = score;
  timerEl.textContent = seconds;
  initialsEl.value = "";

  // Toggle sections
  toggleSection(leaderboardEl, formEl);
  toggleSection(scorePageEl, landingPageEl);
}


/* HELPER FUNCTIONS: Small, utilitarian functions designed
to handle small but predictably repetitive tasks.  */

// Calculate Score as a Percent
function calculateScorePercent() {
  return (score / totalQuestions) * 100;
}

// Toggle Sections
function toggleSection(prev, next) {
  prev.classList.replace("d-block", "d-none");
  next.classList.replace("d-none", "d-block");
}


/* EVENT LISTENERS */

// Event Listener: DOM Content Loaded
document.addEventListener("DOMContentLoaded", renderHighScores);

// Event Listener: Start Quiz Button
startBtnEl.addEventListener("click", startQuiz);

// Event Listener: Answer Buttons
answersEl.addEventListener("click", submitAnswer);

// Event Listener: Add High Score to Leaderboard
scoreBtnEl.addEventListener("click", function(event) {

  // Prevent default submit behavior
  event.preventDefault();

  // If the initials input does not pass validation
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
  } 
  // If the initials input does pass validation
  else {
    // Capture user data
    var initials = initialsEl.value;
    var percentScore = calculateScorePercent();

    // Render the user's high score on the leaderboard and save it local storage
    renderLeaderboard(initials, percentScore);
    saveHighScore(initials, percentScore);

    // Toggle sections
    toggleSection(formEl, leaderboardEl);
  }
});

// Event Listener: Clear Scores
clearBtnEl.addEventListener("click", clearLeaderboard);

// Event Listener: Restart
restartBtnEl.addEventListener("click", resetQuiz);