// --- Globale Variablen ---
let pages;

window.onload = () => {
  pages = document.querySelectorAll(".page");

  const saved = localStorage.getItem("bakebook_theme");
  if (saved) document.body.dataset.theme = saved;
}
let currentPage = "home";

// --- Navigation ---
function showPage(id) {
  pages.forEach(p => p.classList.remove("on"));
  document.getElementById("page-" + id)?.classList.add("on");
  currentPage = id;
}

function showHome() {
  showPage("home");
}

function startNewSession() {
  alert("Neue Session wird gestartet (Funktion folgt).");
}

// --- Theme ---
function toggleTheme() {
  const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = theme;
  localStorage.setItem("bakebook_theme", theme);
}

// --- Initialisierung ---
window.onload = () => {
  const saved = localStorage.getItem("bakebook_theme");
  if (saved) document.body.dataset.theme = saved;
};
