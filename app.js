// app.js - FEHLERSICHER
let currentRec = '', sessionData = {};

function showPage(pageId) {
  console.log('showPage called:', pageId); // DEBUG
  
  // Alle Pages ausblenden
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('on'));
  
  // Ziel-Page finden & einblenden
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('on');
    console.log('Page shown:', pageId);
  } else {
    console.error('PAGE NICHT GEFUNDEN:', 'page-' + pageId);
    alert('Fehler: Seite "' + pageId + '" existiert nicht!');
  }
  
  // Steps verstecken
  const stepsBar = document.getElementById('stepsBar');
  if (stepsBar) stepsBar.style.display = 'none';
}

// Kochbuch-Click Handler (direkt)
document.addEventListener('DOMContentLoaded', function() {
  console.log('BakeBook JS geladen!');
  
  // Home-Action Kochbuch fixen
  const kochbuchBtn = document.querySelector('.home-action:nth-child(2)');
  if (kochbuchBtn) {
    kochbuchBtn.onclick = function(e) {
      e.preventDefault();
      console.log('Kochbuch geklickt!');
      showPage('kochbuch');
    };
  }
  
  // Logo-Click
  document.querySelector('.hdr-logo').onclick = () => showPage('home');
});
