document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
      const difficulty = button.dataset.difficulty;
      welcomeScreen.classList.add("hidden");
      quizScreen.classList.remove("hidden");
      loadQuiz(difficulty);
    });
  });
});

function loadQuiz(difficulty) {
  const questionText = document.getElementById("question-text");
  const answerForm = document.getElementById("answer-form");

  questionText.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit?";

  const answers = [
    "Lorem option A",
    "Lorem option B",
    "Lorem option C",
    "Lorem option D"
  ];

  answerForm.innerHTML = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.className = "answer-btn";
    button.addEventListener("click", () => {
      alert("You selected an answer. In the future, we'll check if it's correct.");
    });
    answerForm.appendChild(button);
  });
}

