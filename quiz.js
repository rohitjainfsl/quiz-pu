const quizDiv = document.querySelector("#quizDiv");
const scoreDiv = document.querySelector("#scoreDiv");
const scoreDivH2 = document.querySelector("#scoreDiv h2");
const timer = document.querySelector(".timer");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".option");
const nextQuestion = document.querySelector("button");

let questionNumber = 0;
let counter = 10;
let id1, id2;
const userAnswers = [];

const data = [
  {
    question: "What is the your favourite city?",
    answer: "New Delhi",
    options: ["Jaipur", "Mumbai", "New Delhi", "Kolkata"],
  },
  {
    question: "Which is the national bird of India?",
    answer: "Peacock",
    options: ["Sparrow", "Peacock", "Pigeon", "Crow"],
  },
  {
    question: "Who won the 2024 Cricket T20 world cup??",
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


displayQuestionAndOptions();
// TO DISPLAY TIMER AT START

timer.innerHTML = counter--; // 10
displayTimer();

id1 = setInterval(changeQuestion, 10000);

// STORING USER ANSWER
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", storeUserAnswer);
}

nextQuestion.addEventListener("click", changeQuestion);

function changeQuestion() {
  if (questionNumber === data.length - 1) {
    clearInterval(id1); // To stop question cycle
  }
  counter = 10;
  timer.innerHTML = counter--;
  displayQuestionAndOptions();
}

function displayQuestionAndOptions() {
  //TO DISPLAY QUESTION
  question.innerHTML = data[questionNumber].question;

  //TO DISPLAY OPTIONS
  for (let i = 0; i < options.length; i++) {
    options[i].innerHTML = data[questionNumber].options[i];
  }
  questionNumber++;
}

function displayTimer() {
  id2 = setInterval(() => {
    if (counter === 0) {
      counter = 10;
      timer.innerHTML = counter--;
      if (questionNumber === data.length) {
        clearInterval(id2); // To stop timer cycle
        quizDiv.style.display = "none";
        scoreDiv.style.display = "block";

        displayScore();
      }
    } else {
      timer.innerHTML = counter--;
    }
  }, 1000);
}

function storeUserAnswer(e) {
  userAnswers.push(e.target.innerHTML);
  console.log(userAnswers);
}

function displayScore() {
  let score = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === data[i].answer) score++;
  }
  scoreDivH2.innerHTML = "You have scored " + score + " out of " + data.length;
}

//HOISTING: to take var declarations & function definitions up top