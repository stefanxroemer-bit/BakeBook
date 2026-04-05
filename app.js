// app.js - BakeBook komplett
let currentRec = '', currentStep = 0, sessionData = {};

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.getElementById('page-'+pageId)?.classList.add('on');
  updateStepsBar([]);
  document.getElementById('stepsBar').style.display = 'none';
}

function pickRec(rec, el) {
  currentRec = rec;
  document.querySelectorAll('#page-s1 .rec-c').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  document.querySelectorAll('#page-s2 > div').forEach(d => d.style.display = 'none');
  document.getElementById('s2-'+rec).style.display = 'block';
  setTimeout(() => goStep(2), 300);
}

function setSeg(group, val, el) {
  document.querySelectorAll(`#${group}Seg .seg`).forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  sessionData[group] = val;
  if (group.includes('pz')) calcPizza();
}

// Pizza-Funktionen (wie vorher)
function setPzSize(el) {
  document.querySelectorAll('.sz-c').forEach(s => s.classList.remove('on'));
  el.classList.add('on');
  const g = el.dataset.g;
  document.getElementById('pzFreiWrap').style.display = g == 0 ? 'block' : 'none';
  if (g != 0) {
    document.getElementById('pzFreiG').value = g;
    calcPizza();
  }
}

function calcPizza() {
  const pz = parseInt(document.querySelector('.sz-c.on')?.dataset.g || document.getElementById('pzFreiG').value);
  const num = parseInt(getScrollWheelValue('swPizza') || 1);
  const mehl = Math.round((pz * num * 1.1) / 1000);
  const wasser = Math.round(mehl * 0.65);
  const salz = Math.round(mehl * 0.028);
  const hefeTyp = sessionData.pzHefe || 'frisch';
  const hefe = hefeTyp === 'frisch' ? Math.round(mehl * 0.003 * 10)/10 : Math.round(mehl * 0.001 * 10)/10;
  
  document.getElementById('pzZutaten').innerHTML = `
    <div class="zi"><div class="zn">Mehl</div><div class="zv">${mehl}kg</div></div>
    <div class="zi"><div class="zn">Wasser</div><div class="zv">${wasser}g</div></div>
    <div class="zi"><div class="zn">Salz</div><div class="zv">${salz}g</div></div>
    <div class="zi"><div class="zn">Hefe</div><div class="zv">${hefe}g</div></div>
  `;
  document.getElementById('pzResult').style.display = 'block';
}

function getScrollWheelValue(id) {
  const items = document.querySelectorAll(`#${id} .sw-item`);
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('sw-on')) return i + 1;
  }
  return 1;
}

function goStep(step) { currentStep = step; showPage('page-s' + step); }
function toggleTheme() { 
  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'; 
}
function startNewSession() { sessionData = {}; showPage('s1'); }

// DOM Ready - Initialisierung
document.addEventListener('DOMContentLoaded', () => {
  // Kochbuch-Accordion
  document.querySelectorAll('.kb-card-hdr').forEach(hdr => {
    hdr.onclick = () => {
      hdr.nextElementSibling.classList.toggle('open');
      hdr.querySelector('.kb-chevron').classList.toggle('open');
    };
  });
  
  // Scroll Wheels erstellen
  ['swPizza', 'swPasta', 'swBrot', 'swPfannkuchen', 'swCookies', 'swTacos'].forEach(id => initScrollWheel(id));
});

function initScrollWheel(id) {
  const wheel = document.createElement('div');
  wheel.className = 'sw-track';
  wheel.id = id;
  for (let i = 1; i <= 6; i++) {
    const item = document.createElement('div');
    item.className = `sw-item ${i === 1 ? 'sw-on' : ''}`;
    item.textContent = i;
    wheel.appendChild(item);
  }
  document.getElementById(id).parentNode.replaceChild(wheel, document.getElementById(id));
}
