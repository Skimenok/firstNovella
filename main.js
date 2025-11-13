const textEl = document.getElementById("text");
const choicesEl = document.getElementById("choices");

const scenes = {
  start: {
    text: "Ты просыпаешься в тёмной комнате. На стене мигает зелёный терминал.",
    choices: [
      { text: "Подойти к терминалу", next: "terminal" },
      { text: "Остаться лежать", next: "sleep" },
    ],
  },
  sleep: {
    text: "Ты решаешь ничего не делать. Через несколько минут комната заполняется газом... Конец.",
    choices: [{ text: "Начать заново", next: "start" }],
  },
  terminal: {
    text: "Терминал оживает. На экране появляется надпись: 'Введите команду'.",
    choices: [
      { text: "hack", next: "minigame" },
      { text: "shutdown", next: "sleep" },
    ],
  },
  minigame: {
    type: "game",
  },
  win: {
    text: "Экран вспыхивает, дверь открывается. Ты выбрался наружу!",
    choices: [{ text: "Сыграть снова", next: "start" }],
  },
  lose: {
    text: "Ошибка! Терминал заблокирован. Тебя находит охрана.",
    choices: [{ text: "Попробовать снова", next: "minigame" }],
  },
};

let currentScene = "start";
showScene(currentScene);

function showScene(name) {
  const scene = scenes[name];
  currentScene = name;
  textEl.classList.add("fade-in");
  setTimeout(() => textEl.classList.remove("fade-in"), 800);

  if (scene.type === "game") {
    showMiniGame();
    return;
  }

  textEl.innerHTML = scene.text;
  choicesEl.innerHTML = "";
  scene.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => showScene(choice.next);
    choicesEl.appendChild(btn);
  });
}

// === Мини-игра ===
function showMiniGame() {
  textEl.innerHTML = "На экране три кнопки. Только одна откроет дверь...";
  choicesEl.innerHTML = "";

  const correct = Math.floor(Math.random() * 3) + 1;

  for (let i = 1; i <= 3; i++) {
    const btn = document.createElement("button");
    btn.textContent = "Кнопка " + i;
    btn.onclick = () => checkAnswer(i === correct);
    choicesEl.appendChild(btn);
  }
}

function checkAnswer(isCorrect) {
  if (isCorrect) showScene("win");
  else showScene("lose");
}
