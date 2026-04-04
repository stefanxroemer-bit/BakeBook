// --- Globale Variablen ---
let pages;

window.onload = () => {
  pages = document.querySelectorAll(".page");

  const saved = localStorage.getItem("bakebook_theme");
  if (saved) document.body.dataset.theme = saved;
};

// --- Navigation ---
function showPage(id) {
  pages.forEach(p => p.classList.remove("on"));
  document.getElementById("page-" + id)?.classList.add("on");
}
function showHome() { showPage("home"); }
function startNewSession() { alert("Neue Session wird gestartet."); }

// --- Theme ---
function toggleTheme() {
  const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = theme;
  localStorage.setItem("bakebook_theme", theme);
}
