import React from 'react';
export default function Header(){return (
<header className="w-full fixed top-0 left-0 z-40 bg-white/80 backdrop-blur-sm">
  <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Fitness Sphere" className="h-10 w-10 object-contain rounded-md shadow-sm" />
      <span className="font-semibold text-lg">Fitness Sphere</span>
    </div>
    <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-700">
      <a href="#home" className="hover:text-primary transition">Home</a>
      <a href="#library" className="hover:text-primary transition">Library</a>
      <a href="#nutrition" className="hover:text-primary transition">Nutrition</a>
      <a href="#calculator" className="hover:text-primary transition">Calculator</a>
      <a href="#premium" className="hover:text-primary transition">Premium</a>
    </nav>
    <div className="flex items-center gap-3">
      <button className="px-3 py-2 border rounded-md text-sm">Log in</button>
      <button className="px-3 py-2 btn-primary">Sign up</button>
    </div>
  </div>
</header>
)}
