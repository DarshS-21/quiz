function selectQuiz(topic) {
    // Save topic to localStorage and go to quiz page
    localStorage.setItem("selectedTopic", topic);
    window.location.href = "quiz.html";
  }