// --- Fade-in Animation ---
function triggerFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
}

// --- Toast Messages ---
function showToast(message, type='info') {
  // Simple toast using alert as fallback
  alert(message);
}

// --- Modal ---
function showModal(title, htmlContent) {
  let overlay = document.getElementById('modalOverlay');
  if(!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;z-index:999;";
    const box = document.createElement('div');
    box.id = 'modalBox';
    box.style.cssText = "background:#fff;padding:20px;border-radius:8px;max-width:400px;width:90%;";
    const content = document.createElement('div');
    content.id = 'modalContent';
    box.appendChild(content);
    const btn = document.createElement('button');
    btn.textContent = "Close";
    btn.onclick = ()=>overlay.style.display='none';
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }
  document.getElementById('modalContent').innerHTML = `<h3>${title}</h3>${htmlContent}`;
  overlay.style.display = 'flex';
}

// --- Toggle Tips / Read More ---
function toggleTips(contentId, btnElement, cautionBoxId=null) {
  const content = document.getElementById(contentId);
  const btn = btnElement;
  const cautionBox = cautionBoxId ? document.getElementById(cautionBoxId) : null;
  if(content.style.display === 'block') {
    content.style.display = 'none';
    btn.textContent = 'Read More';
    if(cautionBox) cautionBox.style.display='none';
    localStorage.removeItem(contentId+'_readmore');
  } else {
    content.style.display = 'block';
    btn.textContent = 'Read Less';
    if(cautionBox && document.documentElement.style.getPropertyValue('--theme-color') === '#ff5722') cautionBox.style.display='block';
    localStorage.setItem(contentId+'_readmore','open');
  }
}

// --- Tracker Renderer ---
function renderTracker(containerId, plan) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  plan.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'tracker-card fade-in';
    card.innerHTML = `<h3>${item.day}</h3>
                      <p>Exercise: ${item.exercise}</p>
                      <p>Diet: ${item.diet}</p>
                      <button class="btn" onclick="completeTask('${item.day}')">Mark Complete</button>`;
    container.appendChild(card);
  });
  triggerFadeIn();
}

// --- Tracker Task Complete ---
function completeTask(dayName) {
  showToast(`Great job! ${dayName} task completed.`, 'success');
}

// --- Weight Gain Calculator ---
function calculateSurplus(weightId, heightId, ageId, genderId, activityId, goalId) {
  const w = parseFloat(document.getElementById(weightId).value);
  const h = parseFloat(document.getElementById(heightId).value);
  const a = parseInt(document.getElementById(ageId).value);
  const g = document.getElementById(genderId).value;
  const act = parseFloat(document.getElementById(activityId).value);
  const goal = parseFloat(document.getElementById(goalId).value);

  if(!w || !h || !a) { showToast("Please fill all fields", 'error'); return; }

  let bmr = g==='male' 
    ? 88.362 + (13.397*w) + (4.799*h) - (5.677*a)
    : 447.593 + (9.247*w) + (3.098*h) - (4.330*a);

  let tdee = bmr * act;
  let surplus = goal * 7700 / 7; // kcal/day per kg/week
  let targetCalories = tdee + surplus;

  showModal("Calorie Surplus Result",
    `<p><strong>BMR:</strong> ${Math.round(bmr)} kcal/day</p>
     <p><strong>TDEE:</strong> ${Math.round(tdee)} kcal/day</p>
     <p><strong>Required Calories for Goal:</strong> ${Math.round(targetCalories)} kcal/day</p>
     <p class="note">A calorie surplus means eating more calories than your body burns. This fuels muscle growth and weight gain. Choose a gain rate that matches your comfort and training intensity.</p>`
  );

  // Save in localStorage
  localStorage.setItem('wg_calc', JSON.stringify({w,h,a,g,act,goal}));
}

// --- Restore Calculator Values ---
function restoreCalcValues(weightId, heightId, ageId, genderId, activityId, goalId) {
  const saved = localStorage.getItem('wg_calc');
  if(saved) {
    const d = JSON.parse(saved);
    document.getElementById(weightId).value = d.w;
    document.getElementById(heightId).value = d.h;
    document.getElementById(ageId).value = d.a;
    document.getElementById(genderId).value = d.g;
    document.getElementById(activityId).value = d.act;
    document.getElementById(goalId).value = d.goal;
  }
}

// --- Initialize ---
window.onload = () => {
  triggerFadeIn();
};
