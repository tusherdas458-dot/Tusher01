import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  { name: "Alex Mercer", role: "Pro Member", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop", text: "Joining Scavenger was the best decision. The equipment is top tier and the coaches pushed me beyond limits I didn't know I had. I put on 10lbs of muscle in 4 months." },
  { name: "Sam Jenkins", role: "Elite Member", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop", text: "The atmosphere here is pure motivation. Whether it's 2 PM or 2 AM, the energy is unmatched. The locker rooms feel like a 5-star hotel." },
  { name: "Mike T.", role: "Basic Member", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop", text: "Finally, a gym that caters to real lifters. No nonsense, just heavy weights, clean facilities, and a community of people who actually want to work hard." }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <Quote className="absolute top-10 left-10 w-64 h-64 text-white/[0.02] -z-0" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16">Stories of <span className="text-red-500">Iron</span></h2>
        
        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="flex gap-1 text-red-500 mb-6">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-lg md:text-2xl font-medium text-white mb-8 italic leading-relaxed">
                "{REVIEWS[current].text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={REVIEWS[current].img} alt={REVIEWS[current].name} className="w-12 h-12 rounded-full object-cover border border-white/20" referrerPolicy="no-referrer" />
                <div className="text-left">
                  <div className="font-bold text-white uppercase tracking-wider">{REVIEWS[current].name}</div>
                  <div className="text-sm font-medium text-red-500 tracking-widest uppercase">{REVIEWS[current].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={() => setCurrent(c => c === 0 ? REVIEWS.length - 1 : c - 1)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrent(c => (c + 1) % REVIEWS.length)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
