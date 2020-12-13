# JavaScript Powered Code Quiz

![languages](https://img.shields.io/github/languages/count/jxhnkndl/code-quiz?style=plastic)
![html](https://img.shields.io/github/languages/top/jxhnkndl/code-quiz?style=plastic)
![commit](https://img.shields.io/github/last-commit/jxhnkndl/code-quiz?style=plastic)

## Table of Contents
* [Deployed Application](#deployed-application)
* [Project Goals](#project-goals)
* [Features](#features)
* [Design Notes](#design-notes)
* [Technologies](#technologies)
* [Live Demo](#live-demo)
* [License](#license)

## Deployed Application
The deployed application can be viewed at the link below.

[Code Quiz - Live Demo](https://jxhnkndl.github.io/code-quiz)

## Project Goals

The goal of this project was to create a front-end quiz application using vanilla JavaScript to dynamically update the application's HTML and CSS. The rules for the application's logic were relatively simple. When a user starts a quiz, the application should present the user with a question and start a timer. As the user navigates through the quiz, correct answers earn one point while incorrect answers penalize the user by removing an increment of time from the clock. When the user completes the quiz, they are given the option of entering their initials and posting their score to a leaderboard. The user can then either clear out the scores on the leaderboard or restart the quiz.

## Features

* **Responsive UI:** Using HTML with Bootstrap 4, the application has a clean, simple, and fully responsive layout.

* **Dynamically Updated HTML & CSS:** Once the core document and scripts have loaded, almost everything else about how the application runs and interacts with the user, both logically and visually, is powered by 100% vanilla JavaScript.

* **Scalability & Flexibility:** The application infrastructure and UI can both be used to support quizzes of various lengths, difficulty levels, and topics. Simply add to, remove from, update, or replace the **data.js** file with a similarly formatted data file and watch as the application renders and powers an entirely new quiz.

* **Locally Stored High Scores:** When a user enters a high score to post on the leaderboard, that high score gets added to local storage so that next time the user comes back to the application, it gets loaded back into the leaderboard's UI. Once the user decides to clear out the scores on the leaderboard UI, the high score data gets cleared out of local storage as well.

## Design Notes

My approach to designing and building this application feels similar to how one might think about building a very simple single page web application. The core index.html document is broken into sections and containers for different types of content, all pre-styled using Bootstrap 4 component and utility classes. Almost everything that changes in the browser as the user initially loads and then navigates through and interacts with the quiz is dynamically created, manipulated, or injected using vanilla JavaScript. No additional http requests should be necessary for the user to engage with the application.

As an additional challenge, I wanted to try to build an infrastructure that could both be scalable and versatile. By separating the quiz data - the questions and answers - from the actual application logic itself, the number of questions on the quiz, its difficulty level, and its topic are all easily changeable. Since the script containing the quiz data and the script running the application are separated from one another, nothing about the user experience or functionality of the application should change if quiz data gets added, removed, edited, or replaced altogether.

The form of the quiz can also be easily manipulated through global variables holding pieces of gameplay data referenced throughout the application. Time per quiz, how many seconds a user loses if they answer a question incorrectly, how many points a correct answer is worth, and more can all be easily changed in the primary application script to create new and different quiz scenarios.

Lastly, I integrated local storage capability into the high scores leaderboard. Entering a high score and posting it to the leaderboard will also save it to local storage. Similarly, clearing the leaderboard on the UI will clear out whatever high score data the application is storing in local storage.


## Technologies
* HTML
* CSS
* Bootstrap 4
* Vanilla JavaScript

## Live Demo

![Application Preview](assets/code-quiz-demo.gif)

## License

MIT @ [J.K. Royston](https://github.com/jxhnkndl)