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

//Game Logic below

//Query selecting the buttons so i can use them to make the game run
const rockButton = document.querySelector(".rock-button");
const paperButton = document.querySelector(".paper-button");
const scissorsButton = document.querySelector(".scissors-button");


//Query selecting the result display so i can change it when the game starts
const resultDisplay = document.querySelector(".round-result");
const playerDisplay = document.querySelector(".player-choice");
const computerDisplay = document.querySelector(".computer-choice");


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
  } else if (
    (playerPick === "Scissors" && computerPick === "Paper") ||
    (playerPick === "Paper" && computerPick === "Rock") ||
    (playerPick === "Rock" && computerPick === "Scissors")
  ) {
    result = "You, win!";
  } else {
    result = "You, lose";
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
