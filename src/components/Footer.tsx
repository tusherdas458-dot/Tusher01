import React from 'react';
import { Youtube, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-black pt-24 pb-8 border-t border-white/10 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6 text-white">
              <span className="text-2xl font-black tracking-tighter uppercase">Scavenger</span>
            </div>
            <p className="text-sm font-medium mb-6">Premium fitness facility designed to push boundaries and build unbreakable physiques. Join the elite.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/scavenger_gym_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3 font-medium text-sm">
              <li><a href="#about" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#membership" className="hover:text-red-500 transition-colors">Membership</a></li>
              <li><a href="#trainers" className="hover:text-red-500 transition-colors">Trainers</a></li>
              <li><a href="#gallery" className="hover:text-red-500 transition-colors">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 font-medium text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <span>Arpana Lane , Thana Road, Dharmanagar<br />North Tripura</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>9862893612</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>rajusarma000@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Web Creator</h4>
            <div className="flex flex-col gap-3">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-zinc-800">
                <img 
                  src="/WhatsApp Image 2026-06-12 at 2.23.34 PM.jpeg" 
                  alt="Web Creator" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-white font-medium">Tusher Das</span>
            </div>
          </div>
        </div>
        
        <div className="text-center text-xs font-semibold uppercase tracking-widest pt-8 border-t border-white/10">
          &copy; 2026 SCAVENGER GYM. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
