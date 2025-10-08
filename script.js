const div = document.getElementById("questions");
const scoreDiv = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];


let progress = JSON.parse(sessionStorage.getItem("progress")) || {};


function renderQuestions() {
  div.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // Restore checked state if user already selected
      if (progress[index] === choice) {
        input.checked = true;
      }

      // Save progress to sessionStorage when user selects
      input.addEventListener("change", () => {
        progress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    div.appendChild(questionDiv);
  });
}

// Calculate and display score
function submitScore() {
  let score = 0;

  questions.forEach((q, i) => {
    if (progress[i] === q.answer) {
      score++;
    }
  });

  scoreDiv.innerText = `Your score is ${score} out of ${questions.length}.`;

  // Save final score in localStorage
  localStorage.setItem("score", score);
}

// Display previously saved score if exists
window.addEventListener("load", () => {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.innerText = `Your score is ${savedScore} out of ${questions.length}.`;
  }
});

// Render the quiz initially
renderQuestions();
