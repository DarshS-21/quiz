const questions = [
  {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
      type: "multiple"
  },
  {
      question: "What is 5 + 3?",
      options: ["6", "7", "8", "9"],
      answer: "8",
      type: "multiple"
  },
  {
      question: "Type the programming language used to style web pages.",
      answer: "CSS",
      type: "typed"
  },
  {
      question: "Type the largest planet in the solar system.",
      answer: "Jupiter",
      type: "typed"
  }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const typedAnswerContainer = document.getElementById('typed-answer-container');
const typedAnswerInput = document.getElementById('typed-answer');
const submitAnswerButton = document.getElementById('submit-answer');

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  nextButton.classList.add('hidden');
  showQuestion(questions[currentQuestion]);
}

function showQuestion(question) {
  resetState();
  questionElement.innerText = question.question;

  if (question.type === "multiple") {
      answerButtonsElement.classList.remove('hidden');
      typedAnswerContainer.classList.add('hidden');

      question.options.forEach(option => {
          const button = document.createElement('button');
          button.innerText = option;
          button.classList.add('btn');
          if (option === question.answer) {
              button.dataset.correct = true;
          }
          button.addEventListener('click', selectAnswer);
          answerButtonsElement.appendChild(button);
      });
  } else if (question.type === "typed") {
      answerButtonsElement.classList.add('hidden');
      typedAnswerContainer.classList.remove('hidden');
      submitAnswerButton.onclick = () => checkTypedAnswer(question.answer);
  }
}

function resetState() {
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  typedAnswerInput.value = '';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  // Highlight the selected button
  if (correct) {
      selectedButton.classList.add('btn-correct');
      score++;
  } else {
      selectedButton.classList.add('btn-wrong');
  }

  // Highlight all buttons to show correct and incorrect answers
  Array.from(answerButtonsElement.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct) {
          button.classList.add('btn-correct');
      } else {
          button.classList.add('btn-wrong');
      }
  });

  nextButton.classList.remove('hidden');
}

function checkTypedAnswer(correctAnswer) {
  const userAnswer = typedAnswerInput.value.trim();
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      score++;
      alert("Correct!");
  } else {
      alert(`Wrong! The correct answer was: ${correctAnswer}`);
  }
  nextButton.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
      showQuestion(questions[currentQuestion]);
  } else {
      alert(`Quiz finished! Your score is ${score}/${questions.length}`);
      startQuiz();
  }
}

nextButton.addEventListener('click', nextQuestion);

startQuiz();