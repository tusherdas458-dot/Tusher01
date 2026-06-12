import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';

const CATEGORIES = ["All", "Weights", "Cardio", "CrossFit"];
const IMAGES = [
  { url: "/WhatsApp Image 2026-06-12 at 9.11.45 AM.jpeg", cat: "Weights", title: "Heavy Duty Racks" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.46 AM (1).jpeg", cat: "Weights", title: "Weight Bar" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.50 AM.jpeg", cat: "Weights", title: "Weight Lifting Zone" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.46 AM.jpeg", cat: "Weights", title: "Dumbbell Rack" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.47 AM.jpeg", cat: "", title: "Members" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.49 AM (1).jpeg", cat: "Weights", title: "Free Weights" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.49 AM.jpeg", cat: "Weights", title: "Strength Equipment" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.50 AM (1).jpeg", cat: "CrossFit", title: "Functional Training" },
  { url: "/WhatsApp Image 2026-06-12 at 9.11.46 AM (2).jpeg", cat: "Weights", title: "Machine Zone" },
];

export default function Gallery() {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? IMAGES : IMAGES.filter(i => i.cat === activeCat);

  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Inside <span className="text-red-500">Scavenger</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-colors border ${activeCat === cat ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={img.url}
                className="relative group overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {img.cat && <span className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">{img.cat}</span>}
                  <h3 className="text-white font-bold text-xl uppercase tracking-tight">{img.title}</h3>
                  <Search className="absolute top-4 right-4 text-white/50 w-6 h-6 z-10 block md:hidden group-hover:block" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
