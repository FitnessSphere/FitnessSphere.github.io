import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Library from './components/Library'
import Nutrition from './components/Nutrition'
import Calculator from './components/Calculator'
import WeightZones from './components/WeightZones'
import Premium from './components/Premium'
import Blog from './components/Blog'
import Community from './components/Community'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24">
        <Hero />
        <Library />
        <Nutrition />
        <Calculator />
        <WeightZones />
        <Premium />
        <Blog />
        <Community />
      </main>
      <Footer />
    </div>
  )
}
