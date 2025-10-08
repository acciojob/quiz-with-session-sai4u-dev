// your JS code here.
const div = document.getElementById("questions");

// Do not change code below this line
// This code will just display the questions to the screen
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
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const progress = {};

// Display the quiz questions and choices
function renderQuestions() {
  const questionsElement = document.createElement("div");
    questionsElement.setAttribute("id", "question");

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);
    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Handle selection
      choiceElement.addEventListener("change", () => {
        progress[i] = choice;
      });

      if (progress[i] === choice) {
        choiceElement.checked = true;
      }

      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
      questionElement.appendChild(document.createElement("br"));
    }

    questionsElement.appendChild(questionElement);
  }

  div.appendChild(questionsElement);
}

let score = 0;

function submitScore() {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].answer === progress[i]) {
      score++;
    }
  }
  document.getElementById("score").innerText = `Your score is out of ${score}`;
  const btn = document.getElementById("submit");
  btn.disabled = true;
  sessionStorage.setItem("score", score);
  localStorage.setItem("progress", progress);
}
renderQuestions();
