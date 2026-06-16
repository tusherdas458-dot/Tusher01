import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center mt-24 lg:mt-48">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] -mt-32 lg:-mt-48 mb-20 lg:mb-32">
            Scavenger <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Gym</span>
          </h1>

          <div className="mb-6 text-[34px] font-black italic text-red-500 uppercase tracking-tight leading-[1.1]">
            <div className="text-white">Special Training for</div>
            <div>Powerlifting, Weightlifting and Bodybuilding</div>
          </div>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-lg font-medium">
            "Transform Your Body. Build Your Strength. Unlock Your Potential."
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#membership" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
              Join Now <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-bold uppercase tracking-wide flex items-center gap-2 transition-all">
              Explore <Play className="w-4 h-4 fill-current" />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 gap-4 lg:ml-auto mt-12 lg:mt-32"
        >
          <StatsCard value="300+" label="Members" />
          <StatsCard value="2" label="Expert Trainers" />
          <StatsCard value="Mon-Sat" label="Open Access" className="col-span-2 justify-self-center min-w-[200px] bg-red-600/20 border-red-500/30 text-white" />
        </motion.div>
      </div>
    </section>
  );
}

function StatsCard({ value, label, className = '' }: { value: string, label: string, className?: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-center items-center text-center ${className}`}>
      <span className="text-3xl md:text-4xl font-black tracking-tighter mb-1">{value}</span>
      <span className="text-sm font-medium text-zinc-400 uppercase tracking-wide">{label}</span>
    </div>
  );
}
