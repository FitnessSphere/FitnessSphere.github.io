
// Basic utilities shared across pages
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  // Show premium ribbon if unlocked
  const badge = document.querySelector('#premiumStatus');
  if (badge) {
    badge.textContent = isPremium() ? 'Premium Active' : 'Free Plan';
    badge.className = 'badge ' + (isPremium() ? 'good' : '');
  }

  // Replace any default prompts/alerts with custom modal
  window.customPrompt = showPrompt;
  window.customAlert = showAlert;
});

// Premium check
function isPremium() {
  return localStorage.getItem('fs_premium') === 'true';
}
function activatePremium() {
  localStorage.setItem('fs_premium', 'true');
}
function deactivatePremium() {
  localStorage.removeItem('fs_premium');
}

// Number formatter
function fmt(n) {
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 });
}

/* ---------- Custom Modal System ---------- */

// Create modal HTML if not present
function ensureModalContainer() {
  if (!document.querySelector('#modalContainer')) {
    const div = document.createElement('div');
    div.id = 'modalContainer';
    div.innerHTML = `
      <div id="modalOverlay" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9998;"></div>
      <div id="modalBox" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); background:#fff; color:#000; padding:20px; border-radius:10px; max-width:90%; z-index:9999;">
        <h3 id="modalTitle"></h3>
        <p id="modalMessage"></p>
        <input id="modalInput" style="width:100%; padding:5px; margin-top:10px; display:none;"/>
        <div style="margin-top:15px; text-align:right;">
          <button id="modalCancel" style="margin-right:10px;">Cancel</button>
          <button id="modalOk">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);
  }
}

function showAlert(message, title = "Notice") {
  ensureModalContainer();
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  document.getElementById('modalInput').style.display = 'none';
  overlay.style.display = 'block';
  box.style.display = 'block';
  document.getElementById('modalCancel').style.display = 'none';
  document.getElementById('modalOk').onclick = () => {
    overlay.style.display = 'none';
    box.style.display = 'none';
  };
}

function showPrompt(message, callback, title = "Input") {
  ensureModalContainer();
  const overlay = document.getElementById('modalOverlay');
  const box = document.getElementById('modalBox');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  const input = document.getElementById('modalInput');
  input.style.display = 'block';
  input.value = '';
  overlay.style.display = 'block';
  box.style.display = 'block';
  document.getElementById('modalCancel').style.display = 'inline-block';
  document.getElementById('modalOk').onclick = () => {
    overlay.style.display = 'none';
    box.style.display = 'none';
    callback(input.value);
  };
  document.getElementById('modalCancel').onclick = () => {
    overlay.style.display = 'none';
    box.style.display = 'none';
    callback(null);
  };
      }
