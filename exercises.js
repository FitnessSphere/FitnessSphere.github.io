
document.addEventListener('DOMContentLoaded', () => {
  renderExercises();
  document.querySelector('#filterGoal').addEventListener('change', renderExercises);
  document.querySelector('#filterBody').addEventListener('change', renderExercises);
});

function renderExercises(){
  const goal = document.querySelector('#filterGoal').value;
  const body = document.querySelector('#filterBody').value;
  const host = document.querySelector('#exerciseList');
  host.innerHTML='';
  EXERCISES
    .filter(x => goal==='All' || x.goal===goal)
    .filter(x => body==='All' || x.body===body)
    .forEach(ex => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <div class="tag">${ex.goal}</div>
        <h3>${ex.name}</h3>
        <p>${ex.body} • ${ex.equipment} • ${ex.difficulty}</p>
        <div class="mt-2">
          <button class="btn secondary" data-steps>How to</button>
          <button class="btn" data-calc>Calories Estimator</button>
        </div>
      `;
      el.querySelector('[data-steps]').addEventListener('click', ()=>{
        alert(ex.steps);
      });
      el.querySelector('[data-calc]').addEventListener('click', ()=>{
        const w = parseFloat(prompt('Enter your weight in kg:', '60')||'0');
        const mins = parseFloat(prompt('Minutes of activity:', '20')||'0');
        if(!w || !mins){ return; }
        // Calories per minute = 0.0175 * MET * weight(kg)
        const cals = 0.0175 * ex.met * w * mins;
        alert(`${ex.name}: ~${Math.round(cals)} kcal for ${mins} min at your weight.`);
      });
      host.appendChild(el);
    });
}
