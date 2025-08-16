
// ---------------- UI.JS ----------------

// ---------- TOAST ----------
function showToast(message, type = 'info', duration = 3000) {
  let toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: type==='success' ? '#4caf50' : type==='error' ? '#f44336' : '#333',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: '6px',
    zIndex: 9999,
    fontSize: '0.95rem',
    opacity: 0,
    transition: 'opacity 0.3s ease, transform 0.3s ease'
  });

  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ toast.style.opacity = 1; toast.style.transform = 'translateX(-50%) translateY(-10px)'; });

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(()=> toast.remove(), 300);
  }, duration);
}

// ---------- MODAL ----------
function createModal({title='Modal', content='', buttons=[{text:'OK', class:'primary', callback:null}]}){
  // Overlay
  let overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  Object.assign(overlay.style, {
    position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.5)',
    display:'flex', justifyContent:'center', alignItems:'center', zIndex:9998
  });

  // Modal box
  let modal = document.createElement('div');
  modal.className = 'modal-box';
  Object.assign(modal.style, {
    background:'#fff', padding:'20px', borderRadius:'10px', maxWidth:'500px', width:'90%', boxShadow:'0 4px 15px rgba(0,0,0,0.2)'
  });

  modal.innerHTML = `<h3 style="margin-top:0">${title}</h3><div>${content}</div>`;
  
  // Buttons
  let btnContainer = document.createElement('div');
  Object.assign(btnContainer.style, {marginTop:'15px', display:'flex', gap:'10px', justifyContent:'flex-end'});
  buttons.forEach(b=>{
    let btn = document.createElement('button');
    btn.textContent = b.text;
    btn.className = `btn ${b.class||''}`;
    btn.onclick = ()=>{
      if(b.callback) b.callback();
      overlay.remove();
    };
    btnContainer.appendChild(btn);
  });
  modal.appendChild(btnContainer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

// ---------- FADE-IN / SCROLL REVEAL ----------
function triggerFadeIn() {
  document.querySelectorAll('.fade-in').forEach(el=>{
    if(!el.classList.contains('visible')){
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 50){
        el.classList.add('visible');
      }
    }
  });
}

function initScrollReveal() {
  triggerFadeIn();
  window.addEventListener('scroll', triggerFadeIn);
}

// ---------- SAVE/RESTORE INPUTS ----------
function saveInput(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function loadInput(key, fallback=null){ 
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : fallback;
}

// ---------- DOCUMENT READY ----------
document.addEventListener('DOMContentLoaded', ()=>{ 
  if(typeof initScrollReveal === 'function') initScrollReveal();
});
