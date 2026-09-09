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
