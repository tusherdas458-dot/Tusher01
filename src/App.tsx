import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import Gallery from './components/Gallery';
import Trainers from './components/Trainers';
import Memberships from './components/Memberships';
import Testimonials from './components/Testimonials';
import BmiCalculator from './components/BmiCalculator';
import Footer from './components/Footer';

function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Memberships />
      <Gallery />
      <Facilities />
      <Trainers />
      <BmiCalculator />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
