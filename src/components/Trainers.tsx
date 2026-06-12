import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter } from 'lucide-react';

const TRAINERS = [
  { img: "/Rajesh_photo.jpg", name: "Rajesh Sarma", spec: "Head Coach / Bodybuilding", exp: "12 YRS", link: "https://www.instagram.com/rajesh_lifts_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { img: "/Screenshot_11-6-2026_204510_www.instagram.com.jpeg", name: "Atanu Mallik", spec: "HIIT & Powerlifting", exp: "8 YRS", link: "https://www.instagram.com/mr_mallik_048?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" }
];

export default function Trainers() {
  return (
     <section id="trainers" className="py-24 bg-zinc-950">
       <div className="max-w-7xl mx-auto px-4 md:px-8">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-xl">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Elite <span className="text-red-500">Coaches</span></h2>
             <p className="text-zinc-400 font-medium">Train with industry professionals who have dedicated their lives to forging exceptional physiques.</p>
           </div>
         </div>

         <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16">
           {TRAINERS.map((trainer, idx) => (
             <motion.div
               key={trainer.name}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className={`group relative overflow-hidden rounded-3xl ${trainer.link ? 'cursor-pointer' : ''}`}
               onClick={() => trainer.link && window.open(trainer.link, '_blank')}
             >
               <img src={trainer.img} alt={trainer.name} className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-1">{trainer.spec} &bull; {trainer.exp}</p>
                     <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{trainer.name}</h3>
                   </div>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-auto">
                     <a href={trainer.link || "#"} target={trainer.link ? "_blank" : undefined} rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                       <Instagram className="w-4 h-4" />
                     </a>
                   </div>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
  );
}
