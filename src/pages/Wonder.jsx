import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { playAudio, stopNarration, narrateSequence } from '../utils/audio';

const Wonder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Play narration on mount
    narrateSequence([
      "Hmm... I wonder...",
      "Which bus should Emma take to reach school by 7:45 am?",
      "What if two buses arrive at the same time?",
      "We might need to compare more than one column!"
    ]);
    return () => stopNarration();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center w-full h-full max-w-3xl mx-auto min-h-0"
    >
      <div className="flex flex-col items-center mb-1 md:mb-2 shrink-0">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-accent-gold)] rounded-full flex items-center justify-center border-4 border-white/10 shadow-lg text-2xl md:text-4xl mb-2 md:mb-4 relative z-10">
          🐻
        </div>
        <div className="bg-white text-gray-800 px-4 py-1 md:px-6 md:py-2 rounded-2xl font-bold relative shadow-lg -mt-4 md:-mt-6 pt-4 md:pt-6 z-0 text-sm md:text-base">
          Hmm... I wonder... 🤔
        </div>
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-[32px] p-4 md:p-6 w-full flex flex-col items-center shadow-2xl relative overflow-y-auto flex-1 min-h-0">
        {/* Glow effect behind the question mark */}
        <div className="absolute top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-3xl shrink-0"></div>
        
        <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600/30 rounded-full border border-purple-400/50 flex items-center justify-center mb-2 shadow-inner shrink-0 mt-2">
          <span className="text-[var(--color-danger)] text-3xl md:text-5xl font-black">?</span>
        </div>

        <h2 className="text-lg md:text-2xl font-black text-center mb-2 leading-tight shrink-0">
          Which bus should Emma take to reach school by <span className="text-[var(--color-accent-gold)]">7:45 am</span>?
        </h2>

        <div className="bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden w-full max-w-sm mx-auto mb-2 shadow-inner shrink-0">
          <table className="w-full text-center text-xs md:text-sm">
            <thead className="bg-[#2a1a4a]/50 text-[10px] md:text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              <tr>
                <th className="py-2 px-3 font-bold border-b border-white/10">Bus No.</th>
                <th className="py-2 px-3 font-bold border-b border-white/10">Arrival Time</th>
              </tr>
            </thead>
            <tbody className="text-base md:text-xl font-bold">
              <tr>
                <td className="py-2 px-3 border-b border-white/5">12A</td>
                <td className="py-2 px-3 border-b border-white/5">7:30 am</td>
              </tr>
              <tr className="bg-white/5">
                <td className="py-2 px-3">15B</td>
                <td className="py-2 px-3">7:50 am</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[var(--color-text-muted)] italic text-xs md:text-base font-semibold mb-2 text-center shrink-0 mt-2">
          What if two buses arrive at the same time?
        </p>

        <div className="bg-[#412759]/40 border border-[#b8aed6]/30 text-[#e2d9f3] px-4 py-1.5 md:px-6 md:py-2 rounded-full font-bold flex items-center space-x-2 shadow-inner mb-4 w-full justify-center shrink-0 text-xs md:text-sm">
          <Sparkles size={16} className="text-[var(--color-accent-gold)]" />
          <span className="text-center">We might need to compare more than one column!</span>
          <Sparkles size={16} className="text-[var(--color-accent-gold)]" />
        </div>

        <button 
          onClick={() => {
            stopNarration();
            playAudio("Let's investigate!");
            navigate('/story');
          }}
          className="bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#2a1a4a] font-black text-base md:text-lg px-8 py-2 md:py-3 rounded-full flex items-center space-x-3 transition-transform hover:scale-105 shadow-[0_0_15px_rgba(245,166,35,0.3)] w-full justify-center max-w-xs shrink-0 mt-auto mb-2"
        >
          <Search size={20} strokeWidth={3} />
          <span>Let's Investigate!</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Wonder;
