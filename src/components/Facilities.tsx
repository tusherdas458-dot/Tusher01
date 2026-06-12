import React from 'react';
import { motion } from 'motion/react';
import { Wifi, Snowflake, Coffee, Car, Shield, Fingerprint } from 'lucide-react';

const AMENITIES = [
  { icon: <Snowflake />, title: "Air Conditioned", desc: "Climate-controlled environment for peak performance." },
  { icon: <Car />, title: "Free Parking", desc: "Secure, monitored parking lot for members." },
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Premium <span className="text-red-500">Amenities</span></h2>
          <p className="text-zinc-400 font-medium">We provide everything you need to perform at your best, recover properly, and stay focused.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {AMENITIES.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-zinc-900 border border-white/5 p-6 rounded-2xl flex items-start gap-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-zinc-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
