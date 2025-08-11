import React from 'react'
export default function WeightZones(){return (
<section className="py-12">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">Weight Loss & Gain Zones</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="card p-4 bg-white">
        <h3 className="font-semibold" style={{color:'#00B894'}}>Weight Loss</h3>
        <p className="small-muted">Safe plans, calorie deficits, sample meal plans. Edit content in src/components/WeightZones.jsx</p>
      </div>
      <div className="card p-4 bg-white">
        <h3 className="font-semibold" style={{color:'#6C5CE7'}}>Weight Gain</h3>
        <p className="small-muted">Muscle-building plans, calorie surplus templates, protein targets.</p>
      </div>
    </div>
  </div>
</section>
)}
