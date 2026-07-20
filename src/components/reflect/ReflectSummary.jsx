import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import useProgressStore from '../../engine/progressStore';
import { playAudio, stopNarration, narrateSequence } from '../../utils/audio';

const ReflectSummary = () => {
  const navigate = useNavigate();
  const stars = useProgressStore(state => state.stars);
  const xp = useProgressStore(state => state.xp);
  const streak = useProgressStore(state => state.streak);
  const playAgainStore = useProgressStore(state => state.playAgain);

  // For MVP, assume 100 possible stars (10 worlds * 10 Qs)
  const totalPossible = 100;
  const percentage = Math.min(100, Math.round((stars / totalPossible) * 100));

  // 3-star rating calculation
  let rating = 1;
  if (percentage >= 80) rating = 3;
  else if (percentage >= 50) rating = 2;

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.3 },
      colors: ['#f5a623', '#ff7a3d', '#34d399', '#ffffff']
    });

    narrateSequence([
      "Journey Complete!",
      "Amazing! You've mastered reading tables."
    ]);

    return () => stopNarration();
  }, []);

  const handlePlayAgain = () => {
    stopNarration();
    playAgainStore();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-2 md:py-4 h-full min-h-0">
      
      {/* Trophy Header */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-[var(--color-accent-gold)] to-[var(--color-accent-orange)] rounded-full flex items-center justify-center text-4xl md:text-6xl shadow-[0_0_50px_rgba(245,166,35,0.6)] mb-4 z-10 shrink-0"
      >
        🏆
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-black text-center mb-4 shrink-0"
      >
        Journey <span className="text-[var(--color-accent-gold)]">Complete!</span>
      </motion.h1>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-[32px] p-6 shadow-2xl w-full flex flex-col md:flex-row items-center relative overflow-hidden mb-4 shrink-0">
        
        {/* Left: Ring Chart & Rating */}
        <div className="md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
          
          <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
              <motion.circle 
                cx="50" cy="50" r="40" 
                stroke="var(--color-accent-gold)" 
                strokeWidth="12" fill="none" 
                strokeDasharray="251.2" 
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 - (251.2 * percentage) / 100 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl md:text-3xl font-black text-white">{percentage}%</span>
              <span className="text-[10px] md:text-xs font-bold text-[var(--color-text-muted)] uppercase">Accuracy</span>
            </div>
          </div>

          <div className="flex space-x-2 text-2xl md:text-3xl">
            {[1, 2, 3].map((star) => (
              <span key={star} className={star <= rating ? 'text-[var(--color-accent-gold)] drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]' : 'text-white/20 grayscale'}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Right: Stats Tiles */}
        <div className="md:w-2/3 flex flex-wrap gap-2 md:gap-4 pt-4 md:pt-0 md:pl-4 justify-center">
          
          <div className="bg-[#150c2e] border border-white/10 rounded-2xl p-3 w-32 md:w-36 flex flex-col items-center shadow-inner">
            <span className="text-2xl mb-1 text-[var(--color-accent-orange)]">⭐</span>
            <span className="text-xl font-black text-white">{stars}</span>
            <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Total Stars</span>
          </div>

          <div className="bg-[#150c2e] border border-white/10 rounded-2xl p-3 w-32 md:w-36 flex flex-col items-center shadow-inner">
            <span className="text-2xl mb-1 text-[var(--color-accent-gold)]">✨</span>
            <span className="text-xl font-black text-white">{xp}</span>
            <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">XP Earned</span>
          </div>

          <div className="bg-[#150c2e] border border-white/10 rounded-2xl p-3 w-32 md:w-36 flex flex-col items-center shadow-inner">
            <span className="text-2xl mb-1 text-[var(--color-danger)]">🔥</span>
            <span className="text-xl font-black text-white">{streak}</span>
            <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Max Streak</span>
          </div>

        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 shrink-0 mt-auto">
        <button 
          onClick={handlePlayAgain}
          className="bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#2a1a4a] font-black text-base md:text-lg px-8 py-3 rounded-full flex items-center space-x-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(245,166,35,0.4)]"
        >
          <span>🔄 Play Again</span>
        </button>
      </div>

    </div>
  );
};

export default ReflectSummary;
