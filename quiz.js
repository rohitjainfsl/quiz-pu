const quizDiv = document.querySelector("#quizDiv");
const scoreDiv = document.querySelector("#scoreDiv");
const scoreDivH2 = document.querySelector("#scoreDiv h2");
const timer = document.querySelector(".timer");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".option");
const nextQuestion = document.querySelector("button");

let questionNumber = 0;
let counter = 10;
let timerIntervalId;
const userAnswers = [];

const data = [
  {
    question: "What is the capital of India?",
    answer: "New Delhi",
    options: ["Jaipur", "Mumbai", "New Delhi", "Kolkata"],
  },
  {
    question: "Which is the national bird of India?",
    answer: "Peacock",
    options: ["Sparrow", "Peacock", "Pigeon", "Crow"],
  },
  {
    question: "Who won the 2024 Cricket T20 world cup?",
    answer: "India",
    options: ["Australia", "South Africa", "West Indies", "India"],
  },
  {
    question: "Who is the president of India?",
    answer: "Draupadi Murmu",
    options: [
      "APJ Abdul Kalam",
      "Narendra Modi",
      "Draupadi Murmu",
      "Rahul Gandhi",
    ],
  },
];

function startQuiz() {
  displayQuestionAndOptions();
  timer.innerHTML = counter;
  startTimer();

  options.forEach(option => option.addEventListener("click", storeUserAnswer));
  nextQuestion.addEventListener("click", nextQuestionHandler);
}

function startTimer() {
  timerIntervalId = setInterval(displayTimer, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalId);
}

function displayTimer() {
  if (counter <= 0) {
    clearInterval(timerIntervalId);
    nextQuestionHandler();
  } else {
    timer.innerHTML = counter--;
  }
}

function displayQuestionAndOptions() {
  question.innerHTML = data[questionNumber].question;

  options.forEach((option, index) => {
    option.innerHTML = data[questionNumber].options[index];
    option.classList.remove("selected");
  });
}

function storeUserAnswer(e) {
  // Store the selected answer and highlight it
  userAnswers[questionNumber] = e.target.innerHTML;
  options.forEach(option => option.classList.remove("selected"));
  e.target.classList.add("selected");

  // Stop the timer as soon as an answer is selected
  stopTimer();

  // Automatically go to the next question
  nextQuestionHandler();
}

function nextQuestionHandler() {
  // Move to the next question
  if (questionNumber < data.length - 1) {
    questionNumber++;
    counter = 10;
    timer.innerHTML = counter;
    displayQuestionAndOptions();
    startTimer();
  } else {
    showScore();
  }
}

function showScore() {
  quizDiv.style.display = "none";
  scoreDiv.style.display = "block";
  displayScore();
}

function displayScore() {
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === data[index].answer) score++;
  });
  scoreDivH2.innerHTML = `You have scored ${score} out of ${data.length}`;
}

startQuiz();
