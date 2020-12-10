// UI Vars
var startPage = document.querySelector('#intro-section');
var quizPage = document.querySelector('#quiz-section');
var startBtn = document.querySelector('#start-quiz');
var backBtn = document.querySelector('#back-btn');


// Page Transition Test
startBtn.addEventListener("click", function(e) {
  startPage.classList.remove("d-block")
  startPage.classList.add("d-none");
  quizPage.classList.remove("d-none");
  quizPage.classList.add("d-block");
});

// Page Transition Test
backBtn.addEventListener("click", function(e) {
  quizPage.classList.remove("d-block");
  quizPage.classList.add("d-none");
  startPage.classList.remove("d-none")
  startPage.classList.add("d-block");
});