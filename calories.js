
/* Manual calorie tracker with local data + logging + 7-day chart. */
let foods = [];
let log = []; // array of {dateISO, items:[{name, grams, kcal, protein, carbs, fat}], totalKcal}

document.addEventListener('DOMContentLoaded', () => {
  foods = (typeof FOODS !== 'undefined') ? FOODS : [];
  loadLog();
  mountAutocomplete();
  mountActions();
  renderLogTable();
  drawChart();
  setupPremiumPhoto();
});

function mountAutocomplete(){
  const input = document.querySelector('#foodInput');
  const list = document.querySelector('#suggestions');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    list.innerHTML = '';
    if(!q){ list.classList.add('hidden'); return; }
    const matches = foods.filter(f => f.name.toLowerCase().includes(q)).slice(0,8);
    matches.forEach(m => {
      const li = document.createElement('div');
      li.className = 'card';
      li.style.padding='10px';
      li.textContent = `${m.name} • ${m.unit} ≈ ${m.kcal} kcal`;
      li.addEventListener('click', () => {
        document.querySelector('#foodInput').value = m.name;
        list.classList.add('hidden');
      });
      list.appendChild(li);
    });
    list.classList.toggle('hidden', matches.length===0);
  });
}

function mountActions(){
  document.querySelector('#addItem').addEventListener('click', addItem);
  document.querySelector('#saveLog').addEventListener('click', saveToday);
  document.querySelector('#clearItems').addEventListener('click', () => {
    document.querySelector('#items').innerHTML = '';
    updateTotals();
  });
}

function addItem(){
  const name = document.querySelector('#foodInput').value.trim();
  const grams = parseFloat(document.querySelector('#gramsInput').value || '0');
  if(!name || !grams || grams<=0){ alert('Enter a valid food and grams.'); return; }

  const found = foods.find(f => f.name.toLowerCase()===name.toLowerCase());
  let kcalP100=0, p=0,c=0,f=0, unit='custom';
  if(found){
    kcalP100 = found.kcal; p=found.protein||0; c=found.carbs||0; f=found.fat||0; unit=found.unit;
  }else{
    // Allow custom entry by assuming user enters kcal per 100g in "grams" field? No.
    // If not found, ask for calories per 100g.
    const v = prompt('Food not in database. Enter calories per 100 g for '+name+':', '100');
    const parsed = parseFloat(v||'0'); 
    if(!parsed || parsed<=0) return;
    kcalP100 = parsed;
  }
  const kcal = kcalP100 * (grams/100);
  const protein = p * (grams/100);
  const carbs = c * (grams/100);
  const fat = f * (grams/100);

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${unit}</td>
    <td>${grams}</td>
    <td>${Math.round(kcal)}</td>
    <td>${protein?protein.toFixed(1):'-'}</td>
    <td>${carbs?carbs.toFixed(1):'-'}</td>
    <td>${fat?fat.toFixed(1):'-'}</td>
    <td><button class="btn secondary" data-remove>&times;</button></td>
  `;
  row.querySelector('[data-remove]').addEventListener('click', () => {
    row.remove(); updateTotals();
  });
  document.querySelector('#items').appendChild(row);
  document.querySelector('#foodInput').value='';
  document.querySelector('#gramsInput').value='';
  updateTotals();
}

function updateTotals(){
  let kcal=0, p=0, c=0, f=0;
  document.querySelectorAll('#items tr').forEach(tr => {
    const tds = tr.querySelectorAll('td');
    kcal += parseFloat(tds[3].textContent||'0');
    const pv = parseFloat(tds[4].textContent||'0'); if(!isNaN(pv)) p+=pv;
    const cv = parseFloat(tds[5].textContent||'0'); if(!isNaN(cv)) c+=cv;
    const fv = parseFloat(tds[6].textContent||'0'); if(!isNaN(fv)) f+=fv;
  });
  document.querySelector('#totalKcal').textContent = Math.round(kcal);
  document.querySelector('#totalP').textContent = p.toFixed(1);
  document.querySelector('#totalC').textContent = c.toFixed(1);
  document.querySelector('#totalF').textContent = f.toFixed(1);
}

function saveToday(){
  const dateISO = new Date().toISOString().slice(0,10);
  const items = [];
  document.querySelectorAll('#items tr').forEach(tr => {
    const tds = tr.querySelectorAll('td');
    items.push({
      name: tds[0].textContent,
      unit: tds[1].textContent,
      grams: parseFloat(tds[2].textContent),
      kcal: parseFloat(tds[3].textContent),
      protein: parseFloat(tds[4].textContent) || 0,
      carbs: parseFloat(tds[5].textContent) || 0,
      fat: parseFloat(tds[6].textContent) || 0,
    });
  });
  const totalKcal = items.reduce((a, b) => a + b.kcal, 0);
  if(items.length===0){ alert('No items added.'); return; }
  // Update existing or push new
  const idx = log.findIndex(d => d.dateISO === dateISO);
  const entry = {dateISO, items, totalKcal: Math.round(totalKcal)};
  if(idx>=0) log[idx] = entry; else log.push(entry);
  localStorage.setItem('fs_calorie_log', JSON.stringify(log));
  renderLogTable();
  drawChart();
  alert('Saved!');
}

function loadLog(){
  try{
    log = JSON.parse(localStorage.getItem('fs_calorie_log')||'[]');
  }catch(e){ log = []; }
}

function renderLogTable(){
  const tbody = document.querySelector('#logBody');
  if(!tbody) return;
  tbody.innerHTML = '';
  log.sort((a,b) => a.dateISO.localeCompare(b.dateISO)); // ascending
  log.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.dateISO}</td><td>${d.totalKcal}</td>
      <td><button class='btn ghost' data-view>View</button></td>
      <td><button class='btn secondary' data-del>Delete</button></td>`;
    tr.querySelector('[data-view]').addEventListener('click', () => {
      alert(d.items.map(i => `${i.name} ${i.grams}g → ${Math.round(i.kcal)} kcal`).join('\n'));
    });
    tr.querySelector('[data-del]').addEventListener('click', () => {
      if(confirm('Delete this day?')){
        const idx = log.findIndex(x => x.dateISO === d.dateISO);
        log.splice(idx,1);
        localStorage.setItem('fs_calorie_log', JSON.stringify(log));
        renderLogTable();
        drawChart();
      }
    });
    tbody.appendChild(tr);
  });
}

function drawChart(){
  const ctx = document.getElementById('kcalChart');
  if(!ctx) return;
  // Last 7 days ending today
  const days = [];
  for(let i=6;i>=0;i--){
    const d = new Date(); d.setDate(d.getDate()-i);
    const iso = d.toISOString().slice(0,10);
    days.push(iso);
  }
  const data = days.map(d => (log.find(x => x.dateISO===d)?.totalKcal)||0);
  if(window._kcalChart){ window._kcalChart.destroy(); }
  window._kcalChart = new Chart(ctx, {
    type:'line',
    data:{ labels: days, datasets:[{ label:'Daily Calories', data:data, tension:0.35 }] },
    options:{ scales:{ y:{ beginAtZero:true } } }
  });
}

// Premium "photo to calories" demo (locked unless premium)
function setupPremiumPhoto(){
  const wrapper = document.querySelector('#photoSection');
  if(!wrapper) return;
  const input = wrapper.querySelector('#photoInput');
  const out = wrapper.querySelector('#photoResult');
  const btn = wrapper.querySelector('#photoEstimate');
  const lock = wrapper.querySelector('#premiumLock');

  const enable = isPremium();
  input.disabled = !enable;
  btn.disabled = !enable;
  lock.classList.toggle('hidden', enable);

  btn.addEventListener('click', () => {
    if(!isPremium()){
      alert('Premium required. Go to Premium page to unlock.');
      return;
    }
    if(!input.files || input.files.length===0){
      alert('Upload a meal photo first.'); return;
    }
    // Simple fake demo: ask user to type what foods are in the photo, then sum from database.
    const foodsInPhoto = prompt('Demo: enter foods detected (comma separated), e.g. "rice, dal, paneer"');
    if(!foodsInPhoto) return;
    const arr = foodsInPhoto.split(',').map(s => s.trim()).filter(Boolean);
    let est = 0;
    arr.forEach(n => {
      const f = foods.find(x => x.name.toLowerCase().includes(n.toLowerCase()));
      if(f) est += f.kcal; // rough per 100g / unit
      else est += 100; // fallback guess
    });
    out.textContent = `Estimated total: ~${Math.round(est)} kcal (demo).`;
  });
}
