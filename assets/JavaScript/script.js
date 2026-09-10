const themeToggle = document.getElementById("theme-toggle");

// DARK / LIGHT MODE
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  // Save theme
  localStorage.setItem("rps-theme", theme);

  updateThemeButton(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  setTheme(newTheme);
}

// UPDATE THEME BUTTON
function updateThemeButton(theme) {
  if (!themeToggle) {
    return;
  }

  if (theme === "dark") {
    themeToggle.textContent = "☀️ Light";

    themeToggle.setAttribute("aria-label", "Switch to light mode");

    themeToggle.setAttribute("title", "Switch to light mode");
  } else {
    themeToggle.textContent = "🌙 Dark";

    themeToggle.setAttribute("aria-label", "Switch to dark mode");

    themeToggle.setAttribute("title", "Switch to dark mode");
  }
}

// LOAD SAVED THEME
function loadTheme() {
  const savedTheme = localStorage.getItem("rps-theme");

  // Use saved theme if available
  if (savedTheme === "dark" || savedTheme === "light") {
    setTheme(savedTheme);
  } else {
    // Default theme
    setTheme("dark");
  }
}
themeToggle.addEventListener("click", toggleTheme);

// START GAME
loadTheme();

// SOUND ON / OFF
const soundToggle = document.getElementById("sound-toggle");

// Sound files are stored in assets/audio/
const playerWinSound = new Audio("assets/audio/player-win.mp3");
const computerWinSound = new Audio("assets/audio/computer-win.mp3");
const drawSound = new Audio("assets/audio/draw.mp3");
const matchWinSound = new Audio("assets/audio/match-win.mp3");

let soundEnabled = true;

// Update the button text
function updateSoundButton() {
  if (soundEnabled) {
    soundToggle.textContent = "🔊 Sound On";
    soundToggle.setAttribute("aria-label", "Mute sound effects");
  } else {
    soundToggle.textContent = "🔇 Sound Off";
    soundToggle.setAttribute("aria-label", "Enable sound effects");
  }
}

// Turn sound on/off
function toggleSound() {
  soundEnabled = !soundEnabled;

  // Remember the setting
  localStorage.setItem("rps-sound", soundEnabled);

  updateSoundButton();
}

// Load saved setting
function loadSoundSetting() {
  const savedSound = localStorage.getItem("rps-sound");

  if (savedSound !== null) {
    soundEnabled = savedSound === "true";
  }

  updateSoundButton();
}

// Button click
if (soundToggle) {
  soundToggle.addEventListener("click", toggleSound);
}

// Start with saved setting
loadSoundSetting();

// PLAY SOUND
function playSound(sound) {
  if (!soundEnabled) {
    return;
  }

  sound.currentTime = 0;

  sound.play().catch(() => {
    console.log("Audio is unavailable.");
  });
}

//Game Logic below

//Query selecting the buttons so i can use them to make the game run
const rockButton = document.getElementById("rock-button");
const paperButton = document.getElementById("paper-button");
const scissorsButton = document.getElementById("scissors-button");

//Query selecting the result display so i can change it when the game starts
const resultDisplay = document.getElementById("round-result");
const playerDisplay = document.getElementById("player-choice");
const computerDisplay = document.getElementById("computer-choice");

// Added event listener on the move buttons so when clicked it picks the corresponding move.
// I used arrow functions because its easier to read than regular functions when inside another function
rockButton.addEventListener("click", () => {
  playerMove("Rock");
});
paperButton.addEventListener("click", () => {
  playerMove("Paper");
});
scissorsButton.addEventListener("click", () => {
  playerMove("Scissors");
});

// The following function picks a random number between 0-1 and gives the computer a coressponding move
// I use return here so i dont have to write else if and else making the code shorter
function computersMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) return "Rock";
  if (randomNumber < 2 / 3) return "Paper";
  return "Scissors";
}

// This functions lets the player pick which move they want and compares it to the computers move to determine the result
function playerMove(playerPick) {
  const computerPick = computersMove();
  let result = "";

  if (playerPick === computerPick) {
    result = "You, tie";
    playSound(drawSound);
  } else if (
    (playerPick === "Scissors" && computerPick === "Paper") ||
    (playerPick === "Paper" && computerPick === "Rock") ||
    (playerPick === "Rock" && computerPick === "Scissors")
  ) {
    result = "You, win!";
    playSound(playerWinSound);
  } else {
    result = "You, lose";
    playSound(computerWinSound);
  }

  displayResult(playerPick, computerPick, result);
  console.log(result);
}

// This shows what the result was and what pick you and the computer made via string interpolation
function displayResult(playerPick, computerPick, result) {
  resultDisplay.innerHTML = `Result: ${result}`;
  playerDisplay.innerHTML = `You picked: ${playerPick}`;
  computerDisplay.innerHTML = `Computer picked: ${computerPick}`;
}
