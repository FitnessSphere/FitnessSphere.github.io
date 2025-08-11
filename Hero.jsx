import React from 'react';
export default function Hero(){return (
<section id="home" className="hero-bg pt-28 pb-12">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight fade-up">Fitness Sphere — Your complete fitness hub</h1>
    <p className="text-gray-600 max-w-2xl mx-auto mb-6 fade-up">Workouts, nutrition, calculators, and community — all in one place. Track progress, plan meals, and reach goals.</p>
    <div className="flex items-center justify-center gap-4 fade-up">
      <a href="#calculator" className="btn-primary">Calculate calories</a>
      <a href="#premium" className="px-6 py-3 rounded-lg border border-gray-200 text-gray-700">View Premium</a>
    </div>
  </div>
</section>
)}
