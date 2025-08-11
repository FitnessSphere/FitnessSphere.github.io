import React from 'react';
import {workouts} from '../sampleData';
export default function Library(){return (
<section id="library" className="py-12">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">Fitness Library</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {workouts.map(w=> (
        <div key={w.id} className="card p-4 bg-white">
          <h3 className="font-semibold">{w.title}</h3>
          <p className="small-muted">{w.duration} • {w.level}</p>
          <p className="mt-2 text-sm text-gray-600">{w.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
)}
