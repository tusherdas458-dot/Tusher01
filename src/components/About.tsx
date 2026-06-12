import React from 'react';
import { motion } from 'motion/react';
import { Activity, Dumbbell, HeartPulse, ShieldCheck, Flame, Medal } from 'lucide-react';

const FEATURES = [
  { title: "Cardio", icon: <HeartPulse className="w-6 h-6" />, desc: "High-end treadmills and bikes to boost endurance." },
  { title: "Personal Training", icon: <ShieldCheck className="w-6 h-6" />, desc: "1-on-1 coaching from certified experts." },
  { title: "Nutrition Guidance", icon: <Flame className="w-6 h-6" />, desc: "Custom diet plans for your exact body type." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Why Choose <span className="text-red-500">Scavenger</span>
            </h2>
            <div className="space-y-4 text-zinc-400 font-medium leading-relaxed">
              <p>
                <strong>Our Mission:</strong> To provide an elite training environment where individuals of all levels can push their absolute limits. We forge discipline, power, and transformation.
              </p>
              <p>
                <strong>Our Vision:</strong> To be the premier destination for fitness enthusiasts worldwide, setting the platinum standard for equipment, atmosphere, and coaching excellence.
              </p>
            </div>

          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <img 
              src="/WhatsApp Image 2026-06-12 at 9.11.45 AM (1).jpeg" 
              alt="Gym environment" 
              className="w-full h-[500px] object-cover rounded-3xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-3xl border border-white/10" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-red-500/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{feature.title}</h3>
              <p className="text-zinc-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
