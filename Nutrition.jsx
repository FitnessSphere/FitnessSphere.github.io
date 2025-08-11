import React from 'react';
import {recipes} from '../sampleData';
export default function Nutrition(){return (
<section id="nutrition" className="py-12">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">Nutrition Hub</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recipes.map(r=> (
        <div key={r.id} className="card p-4 bg-white">
          <h3 className="font-semibold">{r.title}</h3>
          <p className="small-muted">{r.cal} kcal</p>
          <p className="mt-2 text-sm text-gray-600">Quick nutritious recipe — edit in sampleData.js</p>
        </div>
      ))}
    </div>
  </div>
</section>
)}
