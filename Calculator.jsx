import React, {useState, useEffect} from 'react'
import {kg_from_lbs, cm_from_ft_in, mifflin_sejor, tdee, calories_for_goal, macros_from_cal} from '../utils/calculator'

export default function Calculator(){
  const [unit, setUnit] = useState('metric')
  const [age,setAge]=useState(25)
  const [sex,setSex]=useState('male')
  const [weight,setWeight]=useState('70')
  const [heightCm,setHeightCm]=useState('170')
  const [ft,setFt]=useState('5')
  const [inch,setInch]=useState('7')
  const [activity,setActivity]=useState('moderate')
  const [goalType,setGoalType]=useState('maintain')
  const [kgPerWeek,setKgPerWeek]=useState(0.25)
  const [result,setResult]=useState(null)
  const [history,setHistory]=useState(()=> JSON.parse(localStorage.getItem('fs_history')||'[]'))

  useEffect(()=>{ localStorage.setItem('fs_history', JSON.stringify(history)) },[history])

  function compute(){
    let wKg = unit==='metric'? parseFloat(weight) : kg_from_lbs(parseFloat(weight))
    let hCm = unit==='metric'? parseFloat(heightCm) : cm_from_ft_in(parseFloat(ft), parseFloat(inch))
    const bmr = mifflin_sejor(wKg, hCm, parseInt(age), sex)
    const t = tdee(bmr, activity)
    const cal = calories_for_goal(t, goalType, parseFloat(kgPerWeek))
    const macros = macros_from_cal(cal)
    const res = {bmr,tdee:t,calories:cal,macros}
    setResult(res)
    const entry = {id:Date.now(), date:new Date().toISOString(), input:{unit,age,sex,weight,heightCm,ft,inch,activity,goalType,kgPerWeek}, output:res}
    setHistory([entry, ...history].slice(0,20))
  }

  // Photo scanner mock
  const [showScanner,setShowScanner]=useState(false)
  const [scanResult,setScanResult]=useState(null)
  function runMockScan(){
    setScanResult(null)
    setTimeout(()=>{
      setScanResult({items:[{name:'Chicken breast',cal:165},{name:'Rice (1 cup)',cal:200}], total:365})
      // save in history
      const entry = {id:Date.now(), date:new Date().toISOString(), photo:true, output:{items:[{name:'Chicken breast',cal:165},{name:'Rice (1 cup)',cal:200}], total:365}}
      setHistory([entry, ...history].slice(0,20))
    },2200)
  }

  return (<section id="calculator" className="py-12">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Calorie Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-4 bg-white">
          <div className="flex gap-2 mb-3">
            <button onClick={()=>setUnit('metric')} className={unit==='metric'? 'px-3 py-1 btn-primary':'px-3 py-1 border rounded'}>Metric</button>
            <button onClick={()=>setUnit('imperial')} className={unit==='imperial'? 'px-3 py-1 btn-primary':'px-3 py-1 border rounded'}>Imperial</button>
          </div>

          <label className="block small-muted">Age</label>
          <input value={age} onChange={e=>setAge(e.target.value)} className="w-full p-2 border rounded mb-2" />

          <label className="block small-muted">Sex</label>
          <select value={sex} onChange={e=>setSex(e.target.value)} className="w-full p-2 border rounded mb-2"><option value="male">Male</option><option value="female">Female</option></select>

          {unit==='metric'? (
            <>
              <label className="block small-muted">Weight (kg)</label>
              <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <label className="block small-muted">Height (cm)</label>
              <input value={heightCm} onChange={e=>setHeightCm(e.target.value)} className="w-full p-2 border rounded mb-2" />
            </>
          ):(
            <>
              <label className="block small-muted">Weight (lbs)</label>
              <input value={weight} onChange={e=>setWeight(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <label className="block small-muted">Height</label>
              <div className="flex gap-2">
                <input value={ft} onChange={e=>setFt(e.target.value)} className="w-1/2 p-2 border rounded" placeholder="ft" />
                <input value={inch} onChange={e=>setInch(e.target.value)} className="w-1/2 p-2 border rounded" placeholder="in" />
              </div>
            </>
          )}

          <label className="block small-muted">Activity</label>
          <select value={activity} onChange={e=>setActivity(e.target.value)} className="w-full p-2 border rounded mb-2">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>

          <label className="block small-muted">Goal</label>
          <select value={goalType} onChange={e=>setGoalType(e.target.value)} className="w-full p-2 border rounded mb-2">
            <option value="maintain">Maintain</option>
            <option value="lose">Lose</option>
            <option value="gain">Gain</option>
          </select>

          <label className="block small-muted">kg per week (for gain/lose)</label>
          <input value={kgPerWeek} onChange={e=>setKgPerWeek(e.target.value)} className="w-full p-2 border rounded mb-2" />

          <div className="flex gap-2 mt-2">
            <button onClick={compute} className="btn-primary">Calculate</button>
            <button onClick={()=>{setShowScanner(true); setScanResult(null);}} className="px-3 py-2 border rounded">Open Photo Scanner (Premium)</button>
          </div>
        </div>

        <div className="card p-4 bg-white">
          <h3 className="font-semibold mb-2">Results</h3>
          {result? (<div>
            <p className="small-muted">BMR: {result.bmr} kcal</p>
            <p className="small-muted">TDEE: {result.tdee} kcal</p>
            <p className="small-muted">Target calories: {result.calories} kcal</p>
            <p className="small-muted">Macros: Protein {result.macros.protein_g}g • Carbs {result.macros.carbs_g}g • Fats {result.macros.fats_g}g</p>
          </div>): <p className="small-muted">No calculation yet. Enter values and press Calculate.</p>}

          <hr className="my-3" />
          <h4 className="font-semibold">History</h4>
          {history.length===0? <p className="small-muted">No saved entries.</p> : (
            <div className="space-y-2 max-h-64 overflow-auto mt-2">
              {history.map(h=> (
                <div key={h.id} className="p-2 border rounded">
                  <div className="text-xs text-gray-500">{new Date(h.date).toLocaleString()}</div>
                  {h.photo? (
                    <div>Photo scan: {h.output.total} kcal</div>
                  ): (
                    <div>Calc: {h.output.calories} kcal</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scanner Modal (mock) */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Photo Scanner (Mock)</h3>
            <p className="small-muted mb-3">This is a demo scanner. Premium feature: connect to real API later.</p>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center mb-3">
              {!scanResult? <div className="text-center">Mock camera view<br/><button onClick={runMockScan} className="mt-3 btn-primary">Capture</button></div> : (
                <div>
                  <h4 className="font-semibold">Scan Results</h4>
                  {scanResult.items.map((it,i)=> <div key={i} className="text-sm">{it.name} — {it.cal} kcal</div>)}
                  <div className="mt-2 font-semibold">Total: {scanResult.total} kcal</div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={()=>{setShowScanner(false); setScanResult(null);}} className="px-3 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  </section>)}
