const SAVE_PREFIX = "AMEN_iT_USER_";

let userEmail = "";
let currentLevel = 1;
let coins = 100;
let completedLevels = [];

let questionIndex = 0;
let answerLocked = false;
let eliminated = false;

let soundEnabled = true;
let musicEnabled = true;
let volume = 0.7;

const $ = id => document.getElementById(id);


/* SCREEN */

function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  $(id).classList.add("active");
}


/* SAVE */

function saveUser() {

  if (!userEmail) return;

  localStorage.setItem(
    SAVE_PREFIX + userEmail,
    JSON.stringify({
      coins,
      currentLevel,
      completedLevels,
      soundEnabled,
      musicEnabled,
      volume
    })
  );
}


/* LOAD */

function loadUser() {

  const saved =
    localStorage.getItem(
      SAVE_PREFIX + userEmail
    );

  if (!saved) {
    coins = 100;
    currentLevel = 1;
    completedLevels = [];
    return;
  }

  try {

    const data = JSON.parse(saved);

    coins = Number.isFinite(data.coins)
      ? data.coins
      : 100;

    currentLevel =
      Number.isFinite(data.currentLevel)
      ? data.currentLevel
      : 1;

    completedLevels =
      Array.isArray(data.completedLevels)
      ? data.completedLevels
      : [];

    soundEnabled =
      data.soundEnabled ?? true;

    musicEnabled =
      data.musicEnabled ?? true;

    volume =
      data.volume ?? .7;

  } catch {

    coins = 100;
    currentLevel = 1;
    completedLevels = [];
  }
}


/* COINS */

function updateCoins() {

  $("coins").textContent = coins;
  $("homeCoins").textContent = coins;

  if ($("gameCoins")) {
    $("gameCoins").textContent = coins;
  }
}


/* HOME */

function updateHome() {

  const name =
    userEmail.split("@")[0];

  $("welcomeText").textContent =
    `بەخێربێیت ${name} 👋`;

  $("completedLevels").textContent =
    completedLevels.length;

  $("currentLevel").textContent =
    currentLevel;

  updateCoins();
}


/* LOGIN */

function login() {

  const email =
    $("email").value.trim().toLowerCase();

  const error =
    $("loginError");

  error.textContent = "";

  if (
    !email ||
    !email.includes("@") ||
    !email.includes(".")
  ) {

    error.textContent =
      "⚠️ تکایە Email ـێکی دروست بنووسە";

    return;
  }

  userEmail = email;

  loadUser();
  updateHome();
  saveUser();

  showScreen("homeScreen");
}


/* LEVELS */

function totalLevels() {

  return Math.floor(
    QUESTIONS.length / 10
  );
}


function renderLevels() {

  const grid =
    $("levelsGrid");

  grid.innerHTML = "";

  const total =
    totalLevels();

  for (
    let level = 1;
    level <= total;
    level++
  ) {

    const button =
      document.createElement("button");

    button.className = "level";

    const unlocked =
      level === 1 ||
      completedLevels.includes(level - 1);

    const completed =
      completedLevels.includes(level);

    if (completed) {

      button.classList.add("completed");

      button.innerHTML =
        `🏆 ${level}`;

    } else if (unlocked) {

      button.classList.add("unlocked");

      button.innerHTML =
        `🎮 ${level}`;

    } else {

      button.classList.add("locked");

      button.innerHTML =
        `🔒 ${level}`;
    }

    if (unlocked) {

      button.addEventListener(
        "click",
        () => startLevel(level)
      );
    }

    grid.appendChild(button);
  }
}


/* START */

function startLevel(level) {

  const unlocked =
    level === 1 ||
    completedLevels.includes(level - 1);

  if (!unlocked) return;

  currentLevel = level;
  questionIndex = 0;
  answerLocked = false;
  eliminated = false;

  showScreen("gameScreen");

  renderQuestion();
}


/* CURRENT QUESTION */

function getCurrentQuestion() {

  const index =
    (currentLevel - 1) * 10 +
    questionIndex;

  return QUESTIONS[index];
}


/* RENDER QUESTION */

function renderQuestion() {

  const question =
    getCurrentQuestion();

  if (!question) {
    completeLevel();
    return;
  }

  answerLocked = false;
  eliminated = false;

  $("gameLevel").textContent =
    `مەرحەلە ${currentLevel}`;

  $("questionNumber").textContent =
    `پرسیاری ${questionIndex + 1} / 10`;

  $("progressBar").style.width =
    `${((questionIndex + 1) / 10) * 100}%`;

  $("questionText").textContent =
    question.question;

  const answers =
    $("answers");

  answers.innerHTML = "";

  question.options.forEach(
    (option, index) => {

      const button =
        document.createElement("button");

      button.className =
        "answer";

      button.textContent =
        `${String.fromCharCode(65 + index)}) ${option}`;

      button.addEventListener(
        "click",
        () => answerQuestion(
          index,
          button
        )
      );

      answers.appendChild(button);
    }
  );

  $("unlockBtn").disabled = false;

  updateCoins();
}


/* ANSWER */

function answerQuestion(
  selectedIndex,
  clickedButton
) {

  if (answerLocked) return;

  answerLocked = true;

  const question =
    getCurrentQuestion();

  const buttons =
    [...document.querySelectorAll(".answer")];

  if (
    selectedIndex ===
    question.answer
  ) {

    clickedButton.classList.add(
      "correct"
    );

    coins += 20;

    playCorrect();

  } else {

    clickedButton.classList.add(
      "wrong"
    );

    if (buttons[question.answer]) {

      buttons[
        question.answer
      ].classList.add("correct");
    }

    playWrong();
  }

  buttons.forEach(button => {
    button.disabled = true;
  });

  updateCoins();
  saveUser();

  setTimeout(() => {

    questionIndex++;

    if (questionIndex >= 10) {

      completeLevel();

    } else {

      renderQuestion();
    }

  }, 900);
}


/* REMOVE WRONG ANSWER */

function unlockAnswer() {

  if (
    answerLocked ||
    eliminated
  ) return;

  if (coins < 50) {

    alert("🪙 پارەت بەس نییە!");

    return;
  }

  const question =
    getCurrentQuestion();

  const wrongIndexes = [];

  question.options.forEach(
    (_, index) => {

      if (
        index !==
        question.answer
      ) {
        wrongIndexes.push(index);
      }
    }
  );

  const randomIndex =
    wrongIndexes[
      Math.floor(
        Math.random() *
        wrongIndexes.length
      )
    ];

  const buttons =
    document.querySelectorAll(".answer");

  if (buttons[randomIndex]) {

    buttons[randomIndex].style.visibility =
      "hidden";
  }

  coins -= 50;

  eliminated = true;

  $("unlockBtn").disabled = true;

  updateCoins();
  saveUser();
}


/* COMPLETE */

function completeLevel() {

  if (
    !completedLevels.includes(
      currentLevel
    )
  ) {

    completedLevels.push(
      currentLevel
    );
  }

  const next =
    currentLevel + 1;

  if (
    next <= totalLevels()
  ) {
    currentLevel = next;
  }

  saveUser();
  updateHome();

  playLevelComplete();

  $("levelCompletePopup")
    .classList.add("show");
}


/* SOUND */

let audioContext = null;

function getAudioContext() {

  if (!audioContext) {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext)
      return null;

    audioContext =
      new AudioContext();
  }

  return audioContext;
}


function playTone(
  frequency,
  duration,
  type = "sine"
) {

  if (!soundEnabled)
    return;

  const ctx =
    getAudioContext();

  if (!ctx)
    return;

  if (
    ctx.state === "suspended"
  ) {
    ctx.resume();
  }

  const oscillator =
    ctx.createOscillator();

  const gain =
    ctx.createGain();

  oscillator.type =
    type;

  oscillator.frequency.value =
    frequency;

  gain.gain.setValueAtTime(
    volume,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    .001,
    ctx.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();

  oscillator.stop(
    ctx.currentTime + duration
  );
}


function playCorrect() {

  playTone(600, .12);

  setTimeout(
    () => playTone(850, .18),
    100
  );
}


function playWrong() {

  playTone(
    180,
    .25,
    "sawtooth"
  );
}


function playLevelComplete() {

  playTone(500, .12);

  setTimeout(
    () => playTone(700, .12),
    130
  );

  setTimeout(
    () => playTone(950, .25),
    260
  );
}


/* SETTINGS */

function updateSettingsUI() {

  $("soundToggle").textContent =
    soundEnabled
      ? "ON"
      : "OFF";

  $("musicToggle").textContent =
    musicEnabled
      ? "ON"
      : "OFF";

  $("soundToggle")
    .classList.toggle(
      "active",
      soundEnabled
    );

  $("musicToggle")
    .classList.toggle(
      "active",
      musicEnabled
    );

  $("volume").value =
    volume;
}


/* EVENTS */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    $("loginButton")
      .addEventListener(
        "click",
        login
      );

    $("email")
      .addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter"
          ) {
            login();
          }
        }
      );

    $("playButton")
      .addEventListener(
        "click",
        () =>
          startLevel(
            currentLevel
          )
      );

    $("levelsButton")
      .addEventListener(
        "click",
        () => {

          renderLevels();

          showScreen(
            "levelsScreen"
          );
        }
      );

    $("levelsBackButton")
      .addEventListener(
        "click",
        () =>
          showScreen(
            "homeScreen"
          )
      );

    $("backButton")
      .addEventListener(
        "click",
        () =>
          showScreen(
            "homeScreen"
          )
      );

    $("settingsButton")
      .addEventListener(
        "click",
        () => {

          updateSettingsUI();

          showScreen(
            "settingsScreen"
          );
        }
      );

    $("settingsBackButton")
      .addEventListener(
        "click",
        () => {

          saveUser();

          showScreen(
            "homeScreen"
          );
        }
      );

    $("unlockBtn")
      .addEventListener(
        "click",
        unlockAnswer
      );

    $("soundToggle")
      .addEventListener(
        "click",
        () => {

          soundEnabled =
            !soundEnabled;

          updateSettingsUI();
          saveUser();
        }
      );

    $("musicToggle")
      .addEventListener(
        "click",
        () => {

          musicEnabled =
            !musicEnabled;

          updateSettingsUI();
          saveUser();
        }
      );

    $("volume")
      .addEventListener(
        "input",
        event => {

          volume =
            Number(
              event.target.value
            );

          saveUser();
        }
      );

    $("nextLevelButton")
      .addEventListener(
        "click",
        () => {

          $("levelCompletePopup")
            .classList.remove("show");

          if (
            currentLevel <=
            totalLevels()
          ) {

            startLevel(
              currentLevel
            );

          } else {

            showScreen(
              "homeScreen"
            );
          }
        }
      );

    $("homeButton")
      .addEventListener(
        "click",
        () => {

          $("levelCompletePopup")
            .classList.remove("show");

          updateHome();

          showScreen(
            "homeScreen"
          );
        }
      );

    $("closePopup")
      .addEventListener(
        "click",
        () => {

          $("levelCompletePopup")
            .classList.remove("show");
        }
      );

    updateSettingsUI();
    updateCoins();

    console.log(
      "✅ AMEN iT READY"
    );
  }
);