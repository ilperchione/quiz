const questions = [
  {
    question: "Qual è il tuo piatto di pasta preferito?",
    answers: [
      { text: "Spaghetti alla carbonara", score: 2 },
      { text: "Pennette al ragù", score: 1 },
      { text: "Cavatelli ai frutti di mare", score: 4 },
      { text: "Orecchiette al sugo", score: 3 }
    ]
  },
  {
    question: "Cosa preferisci per condire le tue insalate?",
    answers: [
      { text: "Olio", score: 4 },
      { text: "Salsa barbeque", score: 2 },
      { text: "Aceto balsamico", score: 3 },
      { text: "Senza condimento", score: 1 }
    ]
  },
  {
    question: "Di secondo cosa ti piace di più?",
    answers: [
      { text: "Pollo", score: 1 },
      { text: "Manzo", score: 2 },
      { text: "Maiale", score: 3 },
      { text: "Pesce", score: 4 }
    ]
  },
  {
    question: "Cosa preferisci come dessert?",
    answers: [
      { text: "Tiramisù", score: 3 },
      { text: "Cannoli siciliani", score: 4 },
      { text: "Gelato al cioccolato", score: 2 },
      { text: "Crostata di frutta", score: 1 }
    ]
  },
  {
    question: "Qual è il tuo snack preferito?",
    answers: [
      { text: "Barette", score: 2 },
      { text: "Patatine", score: 1 },
      { text: "Frutta secca", score: 3 },
      { text: "Biscotti", score: 4 }
    ]
  }
];

const dish = [
  { dish: "Parmigiana", score: 5, image: "static/images/parmigiana.jpg" },
  { dish: "Pizza", score: 20, image: "static/images/pizza.jpeg" },
  { dish: "Focaccia", score: 10, image: "static/images/focaccia.jpg" },
  { dish: "Sgagliozza", score: 15, image: "static/images/sgagliozza.jpg" }
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");

function buildQuiz() {
  const output = [];

  questions.forEach((question, index) => {
    const answers = [];

    for (const answer of question.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${index}" value="${answer.score}">
          ${answer.text}
        </label>`
      );
    }

    output.push(
      `<div class="question">
        <h3>${question.question}</h3>
        <div class="answers">${answers.join("")}</div>
      </div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function calculateResult() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let score = 0;

  questions.forEach((question, index) => {
    const selectedOption = answerContainers[index].querySelector(
      `input[name=question${index}]:checked`
    );

    if (selectedOption) {
      score += parseInt(selectedOption.value);
    }
  });

  let range20 = Math.abs(score - 20);
  let range15 = Math.abs(score - 15);
  let range10 = Math.abs(score - 10);
  let range5 = Math.abs(score - 5);
  let result = "";

  if (range20 <= range15 && range20 <= range10 && range20 <= range5) {
      result = dish.find((dish) => dish.score === 20);
  } else if (range15 <= range20 && range15 <= range10 && range15 <= range5) {
      result = dish.find((dish) => dish.score === 15);
  } else if (range10 <= range20 && range10 <= range15 && range10 <= range5) {
    result = dish.find((dish) => dish.score === 10);
  } else {
      result = dish.find((dish) => dish.score === 5);
  }

  displayResult(result);
  return result
}

function displayResult(result) {
  const resultOutput = `
    <h2>Risultato:</h2>
    <h4>Ti associamo ad una ${result.dish}!</h4>
    <img src="${result.image}" alt="${result.dish}">
  `;

  resultContainer.innerHTML = resultOutput;
}

buildQuiz();

submitButton.addEventListener("click", calculateResult);
