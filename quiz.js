const quizDiv = document.querySelector("#quizDiv");
const scoreDiv = document.querySelector("#scoreDiv");
const scoreDivH2 = document.querySelector("#scoreDiv h2");
const timer = document.querySelector(".timer");
const question = document.querySelector(".question");
const options = document.querySelectorAll(".option");
let questionNumber = 0;
let counter = 5;
let id1, id2;
const userAnswers = [];

const data = [
  {
    question: "2+2",
    answer: 4,
    options: [1, 2, 3, 4],
  },
  {
    question: "2+2+2",
    answer: 6,
    options: [6, 5, 4, 3],
  },
  {
    question: "2+2*2",
    answer: 8,
    options: [6, 7, 8, 10],
  },
  {
    question: "2*2-4",
    answer: 0,
    options: [1, 0, 2, 4],
  },
  {
    question: "4*4*4",
    answer: 64,
    options: [12, 444, 64, 62],
  },
];

displayQuestionAndOptions();
// TO DISPLAY TIMER AT START
timer.innerHTML = counter--; // 5
displayTimer();

id1 = setInterval(changeQuestion, 5000);

function changeQuestion() {
  if (questionNumber === data.length - 1) {
    clearInterval(id1); // To stop question cycle
  }
  displayQuestionAndOptions();
}

function displayQuestionAndOptions() {
  //TO DISPLAY QUESTION
  question.innerHTML = data[questionNumber++].question;

  //TO DISPLAY OPTIONS
  for (let i = 0; i < options.length; i++) {
    options[i].innerHTML = data[questionNumber].options[i];
  }
}

function displayTimer() {
  id2 = setInterval(() => {
    if (counter === 0) {
      counter = 5;
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

// STORING USER ANSWER
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", storeUserAnswer);
}

function storeUserAnswer(e) {
  userAnswers.push(e.target.innerHTML);
  console.log(userAnswers);
}

function displayScore() {
  let score = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (Number(userAnswers[i]) === data[i].answer) score++;
  }
  scoreDivH2.innerHTML = "You have scored " + score + " out of " + data.length;
}

//HOISTING: to take var declarations & function definitions up top
