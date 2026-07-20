import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, BookOpen, Presentation, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { playAudio, stopNarration } from '../utils/audio';

const IntroModal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Play audio on mount
    playAudio("Ready to crack the code in every table?");
    return () => stopNarration();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto relative z-10"
    >
      {/* Background faint numbers */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        <span className="absolute top-10 left-10 text-6xl font-black text-white/[0.03] rotate-12">10</span>
        <span className="absolute top-20 right-20 text-8xl font-black text-white/[0.03] -rotate-12">50</span>
        <span className="absolute bottom-20 left-1/4 text-9xl font-black text-white/[0.03] rotate-6">2</span>
        <span className="absolute top-1/3 left-4 text-7xl font-black text-white/[0.03] -rotate-6">15</span>
        <span className="absolute bottom-10 right-1/4 text-8xl font-black text-white/[0.03] rotate-12">5</span>
        <span className="absolute top-1/4 right-10 text-9xl font-black text-white/[0.03] rotate-45">20</span>
        <span className="absolute bottom-1/3 right-4 text-6xl font-black text-white/[0.03] -rotate-12">12</span>
      </div>
      <div className="bg-[#2a1a4a]/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-4 flex items-center space-x-2">
        <Sparkles size={16} className="text-[var(--color-accent-gold)]" />
        <span className="text-sm font-bold text-white/90">Grade 5 Reading tables ✨</span>
      </div>

      <div className="flex flex-col items-center mb-3">
        <h1 className="text-4xl md:text-6xl font-black text-center leading-tight tracking-tight drop-shadow-xl">
          <span className="text-[var(--color-accent-orange)]">Reading</span> <span className="text-[var(--color-accent-gold)]">Tables</span>
        </h1>
        <p className="text-[var(--color-accent-gold)] font-black text-xs md:text-sm mt-1 tracking-wide">
          TableQuest • Reading Tables Adventure
        </p>
      </div>
      <div className="flex items-center justify-center space-x-4 mb-4 w-full max-w-lg">
        <div className="w-12 h-12 bg-[var(--color-accent-gold)] rounded-full flex items-center justify-center border-4 border-[#2a1a4a] shadow-lg text-3xl shrink-0 z-10">
          🦁
        </div>
        <div className="bg-white text-[#2a1a4a] px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold relative shadow-lg text-xs md:text-sm w-full">
          Hi! I'm Leo. Ready to crack the code? 📊
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>
      </div>

      <p className="text-center text-white/80 max-w-2xl mb-4 font-semibold text-xs md:text-sm leading-relaxed px-4">
        Learn to read, interpret, and compute data from tables, connect information to stories, and master data handling!
      </p>

      {/* Learning Journey Box */}
      <div className="bg-[#241646] border border-white/5 rounded-3xl p-4 md:p-6 w-full max-w-3xl mb-4 shadow-2xl shrink-0">
        <h3 className="text-[var(--color-accent-gold)] text-center text-[10px] md:text-xs font-black tracking-[0.2em] mb-4 uppercase">YOUR LEARNING JOURNEY</h3>
        
        <div className="flex flex-col items-center space-y-2 md:space-y-4">
          <div className="flex items-center space-x-1 md:space-x-4">
            <div className="flex items-center space-x-3 w-32">
              <div className="w-10 h-10 rounded-full bg-[#3a256a] flex items-center justify-center text-xl shrink-0">✨</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xs text-white">Wonder</span>
                <span className="text-[9px] text-white/50 leading-tight">Spark curiosity!</span>
              </div>
            </div>
            <div className="text-white/30 text-xs">→</div>
            
            <div className="flex items-center space-x-3 w-32">
              <div className="w-10 h-10 rounded-full bg-[#3a256a] flex items-center justify-center text-xl shrink-0">📖</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xs text-white">Story</span>
                <span className="text-[9px] text-white/50 leading-tight">Hear the tale</span>
              </div>
            </div>
            <div className="text-white/30 text-xs">→</div>
            
            <div className="flex items-center space-x-3 w-32">
              <div className="w-10 h-10 rounded-full bg-[#3a256a] flex items-center justify-center text-xl shrink-0">🧪</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xs text-white">Simulate</span>
                <span className="text-[9px] text-white/50 leading-tight">Interactive labs</span>
              </div>
            </div>
            <div className="hidden md:block text-white/30 text-xs">→</div>
          </div>

          <div className="flex items-center space-x-1 md:space-x-4 ml-0 md:ml-12">
            <div className="flex items-center space-x-3 w-32">
              <div className="w-10 h-10 rounded-full bg-[#3a256a] flex items-center justify-center text-xl shrink-0">🎮</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xs text-white">Practice</span>
                <span className="text-[9px] text-white/50 leading-tight">100 challenges</span>
              </div>
            </div>
            <div className="text-white/30 text-xs">→</div>
            
            <div className="flex items-center space-x-3 w-32">
              <div className="w-10 h-10 rounded-full bg-[#3a256a] flex items-center justify-center text-xl shrink-0">📝</div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-xs text-white">Reflect</span>
                <span className="text-[9px] text-white/50 leading-tight">What did you learn?</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/wonder')}
        className="bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#150c2e] font-black text-lg md:text-xl px-10 py-3 md:px-12 md:py-4 rounded-full flex items-center space-x-3 transition-transform hover:scale-105 shadow-[0_4px_0_#c47910,0_0_30px_rgba(245,166,35,0.4)] active:translate-y-1 active:shadow-[0_0_0_#c47910] mb-4 shrink-0"
      >
        <span>🚀 Begin Your Journey!</span>
      </button>

      <div className="flex justify-center space-x-4 md:space-x-6 shrink-0 pb-2">
        {[
          { title: "100 Questions", icon: "🎯" },
          { title: "Table Simulations", icon: "🧪" },
          { title: "Badges & XP", icon: "✨" }
        ].map((tile, i) => (
          <div key={i} className="bg-[#2a1a4a]/60 border border-white/5 rounded-2xl p-2 md:p-4 flex flex-col items-center justify-center w-28 md:w-36 h-20 md:h-24 hover:bg-white/10 transition-colors cursor-default shadow-lg">
            <span className="text-2xl md:text-3xl mb-1 md:mb-2 drop-shadow-md">{tile.icon}</span>
            <span className="text-[10px] md:text-xs font-bold text-center leading-tight text-white/80">{tile.title}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IntroModal;
