
// Basic utilities shared across pages
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle (if present)
  const menuBtn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');
  if(menuBtn && menu){
    menuBtn.addEventListener('click', () => menu.classList.toggle('hidden'));
  }

  // Show premium ribbon if unlocked
  const badge = document.querySelector('#premiumStatus');
  if(badge){
    badge.textContent = isPremium() ? 'Premium Active' : 'Free Plan';
    badge.className = 'badge ' + (isPremium() ? 'good' : '');
  }
});

function isPremium(){
  return localStorage.getItem('fs_premium') === 'true';
}
function activatePremium(){
  localStorage.setItem('fs_premium', 'true');
}
function deactivatePremium(){
  localStorage.removeItem('fs_premium');
}

// Format helper
function fmt(n){ return Number(n).toLocaleString(undefined, {maximumFractionDigits: 1}); }
