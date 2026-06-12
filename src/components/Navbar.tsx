import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Dumbbell } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Membership', href: '#membership' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Facilities', href: '#facilities' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-red-500 w-8 h-8" />
          <span className="text-2xl font-black tracking-tighter uppercase">Scavenger</span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-zinc-950 z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-black tracking-tighter uppercase text-white">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-xl mt-8">
              {NAV_LINKS.map(link => (
                <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="font-semibold text-zinc-300 hover:text-red-500">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
