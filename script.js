// Quiz Data
const geographyQuestions = [
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
  
  let currentQuiz = [];
  let currentQuestionIndex = 0;
  let score = 0;
  
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  const typedAnswerContainer = document.getElementById('typed-answer-container');
  const typedAnswerInput = document.getElementById('typed-answer');
  const submitAnswerButton = document.getElementById('submit-answer');
  const quizSelector = document.getElementById('quiz-selector');
  

  
  function startQuiz(quizSet) {
    currentQuiz = [...quizSet]; // Make a copy so we don't modify the original
    currentQuestionIndex = 0;
    score = 0;
  
    // Shuffle the quiz
    currentQuiz.sort(() => Math.random() - 0.5);
  
    quizSelector.style.display = 'none'; // Hide topic selection
    nextButton.classList.add('hidden');
    showQuestion(currentQuiz[currentQuestionIndex]);
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
      submitAnswerButton.classList.remove('hidden');
      typedAnswerInput.value = '';
      typedAnswerInput.focus();
      typedAnswerInput.placeholder = "Type your answer here...";
  
      submitAnswerButton.onclick = () => {
        checkTypedAnswer(question.answer);
      };
    }
  }
  
  function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    typedAnswerInput.value = '';
    submitAnswerButton.classList.remove('hidden');
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
  
    if (correct) {
      selectedButton.classList.add('btn-correct');
      score++;
    } else {
      selectedButton.classList.add('btn-wrong');
    }
  
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
  
    submitAnswerButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
      showQuestion(currentQuiz[currentQuestionIndex]);
    } else {
      alert(`Quiz finished! Your score is ${score} out of ${currentQuiz.length}`);
      quizSelector.style.display = 'block'; // Show quiz options again
      resetState();
      questionElement.innerText = '';
    }
  }
  
  nextButton.addEventListener('click', nextQuestion);