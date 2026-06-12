import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';

export default function BmiCalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{ score: number, category: string, recommendation: string } | null>(null);

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    if (!h || !w) return;

    const bmi = +(w / (h * h)).toFixed(1);
    let category = '';
    let recommendation = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Focus on a caloric surplus and strength training.';
    } else if (bmi < 24.9) {
      category = 'Normal weight';
      recommendation = 'Maintain your current diet and mix cardio with weights.';
    } else if (bmi < 29.9) {
      category = 'Overweight';
      recommendation = 'Incorporate more HIIT and steady-state cardio. Eat in a slight caloric deficit.';
    } else {
      category = 'Obese';
      recommendation = 'Consult with our nutritionists and start a supervised cardio program.';
    }

    setResult({ score: bmi, category, recommendation });
  };

  return (
    <section className="py-24 bg-zinc-950 relative border-t border-white/5">
       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay" />
       
       <div className="max-w-4xl mx-auto px-4 relative z-10">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
         >
           <div className="text-center mb-10">
             <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
                <Calculator className="w-8 h-8 text-white" />
             </div>
             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Calculate Your BMI</h2>
             <p className="text-zinc-400 font-medium max-w-lg mx-auto">Input your metrics to get a baseline analysis of your current body composition.</p>
           </div>

           <div className="grid md:grid-cols-2 gap-12 items-center">
             <form onSubmit={calculateBmi} className="space-y-6 text-left">
               <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">Height (cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="e.g. 180"
                    required
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-zinc-400 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="e.g. 85"
                    required
                  />
               </div>
               <button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest py-4 rounded-xl transition-colors"
               >
                 Calculate Now
               </button>
             </form>

             <div className="bg-black/40 rounded-2xl p-8 border border-white/5 h-full flex flex-col justify-center items-center text-center">
               {result ? (
                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                   <div className="mb-2 text-zinc-400 uppercase tracking-widest text-sm font-bold">Your Score</div>
                   <div className="text-6xl font-black text-red-500 mb-4">{result.score}</div>
                   <div className="text-2xl font-bold uppercase tracking-tight mb-2 text-white">{result.category}</div>
                   <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{result.recommendation}</p>
                 </motion.div>
               ) : (
                 <div className="text-zinc-600 font-medium">
                   Enter your details on the left to see your results.
                 </div>
               )}
             </div>
           </div>
         </motion.div>
       </div>
    </section>
  );
}
