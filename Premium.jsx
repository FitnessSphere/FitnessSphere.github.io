import React from 'react'
export default function Premium(){return (
<section id="premium" className="py-12 bg-white">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="text-2xl font-bold mb-4">Premium</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="card p-4">
        <h3 className="font-semibold">Photo-to-Calorie Scanner</h3>
        <p className="small-muted">Take photos and get calorie estimates (mock included). Ready to connect to ML API.</p>
      </div>
      <div className="card p-4">
        <h3 className="font-semibold">AI Coach & Custom Plans</h3>
        <p className="small-muted">Chat-based coach and custom workouts. Payments UI placeholder.</p>
      </div>
    </div>
    <div className="mt-6">
      <button className="btn-primary">Start free 7-day trial</button>
    </div>
  </div>
</section>
)}
