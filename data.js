/* Data Array: By separating the quiz data from the quiz logic itself, 
the application is more scalable. Making a quiz longer could be accomplished 
by adding additional questions to this array. Alternatively, the infrastructure 
supporting this application could be used to power other quizzes about different 
topics by simply this quiz data array for a different one with different 
questions. */

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
    question: "What object allows JavaScript to access, interact with, and manipulate elements in an HTML document in the browser?",
    answers: [
      "Node.js",
      "DOM",
      "querySelector",
      "jQuery"
    ],
    correctIndex: 1
  }
];