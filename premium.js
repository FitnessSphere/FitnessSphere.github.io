
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#unlockForm');
  const codeInput = document.querySelector('#code');
  const status = document.querySelector('#unlockStatus');
  const reset = document.querySelector('#resetPremium');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const code = (codeInput.value||'').trim();
    if(code==='DEMO123'){
      activatePremium();
      status.textContent = 'Premium unlocked on this device (demo).';
      status.className = 'notice good mt-2';
    }else{
      status.textContent = 'Invalid code. Try DEMO123 for testing.';
      status.className = 'notice warn mt-2';
    }
  });
  reset.addEventListener('click', ()=>{
    deactivatePremium();
    status.textContent = 'Premium reset to Free.';
    status.className = 'notice mt-2';
  });
});
