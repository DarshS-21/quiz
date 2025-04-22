// Question sets
const geographyQuestions = [
  {
    question: "Which river runs through Baghdad?",
    options: ["Nile", "Euphrates", "Amazon", "Tigris"],
    answer: "Tigris",
    type: "multiple"
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
    answer: "Ottawa",
    type: "multiple"
  },
  {
    question: "Which country is home to the ancient city of Petra?",
    options: ["Jordan", "Egypt", "Lebanon", "Iran"],
    answer: "Jordan",
    type: "multiple"
  },
  {
    question: "Which U.S. state has the longest coastline?",
    options: ["Florida", "California", "Alaska", "Hawaii"],
    answer: "Alaska",
    type: "multiple"
  },
  {
    question: "Type the capital city of Iceland.",
    answer: "Reykjavik",
    type: "typed"
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    type: "multiple"
  },
  {
    question: "Which continent is Egypt in?",
    options: ["Asia", "Africa", "Europe", "South America"],
    answer: "Africa",
    type: "multiple"
  },
  {
    question: "Type the ocean west of the US.",
    answer: "Pacific",
    type: "typed"
  }
];

const scienceQuestions = [
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
    type: "multiple"
  },
  {
    question: "What part of the cell contains genetic material?",
    options: ["Nucleus", "Mitochondria", "Cytoplasm", "Ribosome"],
    answer: "Nucleus",
    type: "multiple"
  },
  {
    question: "What is the main gas in Earth's atmosphere?",
    options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
    answer: "Nitrogen",
    type: "multiple"
  },
  {
    question: "Which element has the chemical symbol 'Na'?",
    options: ["Nitrogen", "Sodium", "Neon", "Nickel"],
    answer: "Sodium",
    type: "multiple"
  },
  {
    question: "Type the force that attracts objects toward the Earth.",
    answer: "Gravity",
    type: "typed"
  },
  {
    question: "What planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: "Mars",
    type: "multiple"
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Salt", "Oxygen", "Water", "Hydrogen"],
    answer: "Water",
    type: "multiple"
  },
  {
    question: "Type the chemical symbol for gold.",
    answer: "Au",
    type: "typed"
  }
];

const historyQuestions = [
  {
    question: "In what year did the Berlin Wall fall?",
    options: ["1989", "1991", "1985", "1993"],
    answer: "1989",
    type: "multiple"
  },
  {
    question: "Which empire built the Colosseum?",
    options: ["Greek", "Byzantine", "Roman", "Ottoman"],
    answer: "Roman",
    type: "multiple"
  },
  {
    question: "Which ship sank in 1912 after hitting an iceberg?",
    options: ["Lusitania", "Bismarck", "Titanic", "Queen Mary"],
    answer: "Titanic",
    type: "multiple"
  },
  {
    question: "Type the name of the U.S. president during World War I.",
    answer: "Woodrow Wilson",
    type: "typed"
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945",
    type: "multiple"
  },
  {
    question: "Who was the British Prime Minister during most of World War II?",
    options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Harold Macmillan"],
    answer: "Winston Churchill",
    type: "multiple"
  },
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    answer: "George Washington",
    type: "multiple"
  },
  {
    question: "Type the year when the Declaration of Independence was signed.",
    answer: "1776",
    type: "typed"
  }
];

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const typedAnswerContainer = document.getElementById('typed-answer-container');
const typedAnswerInput = document.getElementById('typed-answer');
const submitAnswerButton = document.getElementById('submit-answer');
const feedbackElement = document.getElementById('feedback');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const returnButton = document.getElementById('return-btn');

function loadQuiz() {
  const topic = localStorage.getItem("selectedTopic");

  if (topic === "geography") {
    currentQuiz = [...geographyQuestions];
  } else if (topic === "science") {
    currentQuiz = [...scienceQuestions];
  } else if (topic === "history") {
    currentQuiz = [...historyQuestions];
  } else {
    alert("No topic selected.");
    window.location.href = "index.html";
    return;
  }

  currentQuestionIndex = 0;
  score = 0;
  currentQuiz.sort(() => Math.random() - 0.5);
  nextButton.classList.add('hidden');
  showQuestion(currentQuiz[currentQuestionIndex]);
}

function showQuestion(question) {
  resetState();
  questionElement.innerText = question.question;

  if (question.type === "multiple") {
    answerButtonsElement.classList.remove('hidden');
    typedAnswerContainer.classList.add('hidden');
    nextButton.classList.add('hidden');

    question.options.forEach(function(option) {
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
    submitAnswerButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
    typedAnswerInput.value = '';
    typedAnswerInput.disabled = false;
    typedAnswerInput.focus();
    typedAnswerInput.placeholder = "Type your answer here...";
    
    typedAnswerInput.addEventListener('input', function() {
      submitAnswerButton.disabled = !this.value.trim();
    });
    
    submitAnswerButton.onclick = function() {
      checkTypedAnswer(question.answer);
    };
  }
}

function resetState() {
  nextButton.classList.add('hidden');
  feedbackElement.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  typedAnswerInput.value = '';
  typedAnswerInput.disabled = false;
  submitAnswerButton.classList.remove('hidden');
  submitAnswerButton.disabled = true;
  
  if (scoreContainer) {
    scoreContainer.classList.add('hidden');
  }
}

function showFeedback(isCorrect, correctAnswer = '') {
  feedbackElement.classList.remove('hidden', 'correct', 'incorrect');
  feedbackElement.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  if (isCorrect) {
    feedbackElement.textContent = 'Correct! 🎉';
  } else {
    feedbackElement.textContent = correctAnswer ? 
      `Incorrect. The correct answer was: ${correctAnswer}` : 
      'Incorrect ❌';
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  showFeedback(correct === 'true');

  if (correct) {
    selectedButton.classList.add('btn-correct');
    score++;
  } else {
    selectedButton.classList.add('btn-wrong');
  }

  Array.from(answerButtonsElement.children).forEach(function(button) {
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
  const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  
  showFeedback(isCorrect, correctAnswer);
  
  if (isCorrect) {
    score++;
  }
  
  submitAnswerButton.classList.add('hidden');
  nextButton.classList.remove('hidden');
  typedAnswerInput.disabled = true;
}

function showFinalScore() {
  questionElement.classList.add('hidden');
  answerButtonsElement.classList.add('hidden');
  typedAnswerContainer.classList.add('hidden');
  nextButton.classList.add('hidden');
  feedbackElement.classList.add('hidden');

  finalScoreElement.textContent = `Your Score: ${score} out of ${currentQuiz.length}`;
  scoreContainer.classList.remove('hidden');
  
  returnButton.addEventListener('click', () => {
    window.location.href = "index.html";
  }, { once: true });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    showQuestion(currentQuiz[currentQuestionIndex]);
  } else {
    showFinalScore();
  }
}

nextButton.addEventListener('click', nextQuestion);
window.addEventListener('load', loadQuiz);