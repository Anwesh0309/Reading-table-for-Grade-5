import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { worlds } from '../data/worlds';
import QuizRunner from '../components/play/QuizRunner';
import useProgressStore from '../engine/progressStore';
import { generateQuestionsForWorld } from '../engine/questionEngine';
import { playAudio, stopNarration } from '../utils/audio';

const Play = () => {
  const navigate = useNavigate();
  const [activeWorld, setActiveWorld] = useState(null); // holds world object when playing
  const [worldQuestions, setWorldQuestions] = useState([]);
  
  const worldsUnlocked = useProgressStore(state => state.worldsUnlocked);
  const unlockWorld = useProgressStore(state => state.unlockWorld);
  const resetHearts = useProgressStore(state => state.resetHearts);
  const saveWorldResult = useProgressStore(state => state.saveWorldResult);
  const stars = useProgressStore(state => state.stars);
  const hearts = useProgressStore(state => state.hearts);
  const worldResults = useProgressStore(state => state.worldResults);

  const allWorldsCompleted = Object.keys(worldResults).length === worlds.length;

  const startWorld = (world, index) => {
    resetHearts();
    const questions = generateQuestionsForWorld(world.id, index);
    setWorldQuestions(questions);
    setActiveWorld(world);
  };

  const handleWorldComplete = (success) => {
    stopNarration();
    
    if (success) {
      // Find current world index
      const currentIndex = worlds.findIndex(w => w.id === activeWorld.id);
      
      // Calculate stars based on remaining hearts (3 = 3 stars, 2 = 2 stars, etc.)
      saveWorldResult(activeWorld.id, 10, 10, hearts); 
      
      // Unlock next world if exists
      if (currentIndex < worlds.length - 1) {
        unlockWorld(worlds[currentIndex + 1].id);
      } else {
        // If it was the last world, go to reflect immediately
        navigate('/reflect');
        return;
      }
    }
    
    // Go back to world selection
    setActiveWorld(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto h-full min-h-0 py-2 md:py-4"
    >
      <AnimatePresence mode="wait">
        {!activeWorld ? (
          <motion.div 
            key="world-select"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full h-full flex flex-col items-center min-h-0 flex-1"
          >
            <div className="flex flex-col items-center mb-4 shrink-0">
              <div className="flex items-center justify-center space-x-2 text-white/90 mb-1">
                <span className="text-xl">🎮</span>
                <h2 className="text-xl md:text-2xl font-bold">Play — Choose Your World!</h2>
              </div>
              <p className="text-[10px] md:text-xs text-white/50 mb-2">
                Answer questions in each world. Earn stars and XP!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 w-full flex-1 min-h-0 overflow-y-auto shrink-0 pb-4">
              {worlds.map((world, idx) => {
                const isUnlocked = worldsUnlocked.includes(world.id);
                return (
                  <div 
                    key={world.id}
                    className={`relative rounded-3xl p-4 md:p-6 flex flex-col items-center justify-center text-center transition-all h-36 md:h-48 border ${
                      isUnlocked 
                        ? 'bg-[#1e133d] border-[#382664] shadow-[0_0_20px_rgba(56,38,100,0.4)]' 
                        : 'bg-[#150d2e]/50 border-white/5 opacity-50'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-3 right-3 text-white/40">
                        <Lock size={16} />
                      </div>
                    )}
                    
                    <span className={`text-4xl md:text-5xl mb-2 md:mb-4 ${!isUnlocked && 'opacity-60'}`}>{world.icon}</span>
                    <span className="font-bold text-xs md:text-sm text-white/90 leading-tight mb-1">{world.name}</span>
                    <span className="text-[9px] md:text-[10px] text-white/40 mb-3 md:mb-4">Questions {idx*10 + 1}-{idx*10 + 10}</span>
                    
                    {isUnlocked && (
                      <button 
                        onClick={() => startWorld(world, idx)}
                        className="bg-[#ff2a5f] hover:bg-[#ff4d79] text-white text-[10px] md:text-xs font-bold px-6 py-1.5 md:px-8 md:py-2 rounded-full tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-lg mt-auto w-full max-w-[120px]"
                      >
                        ▶ PLAY
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 md:mt-8 flex space-x-6 shrink-0">
              <button 
                onClick={() => navigate('/simulate')}
                className="px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold transition-all text-sm md:text-base"
              >
                &larr; Back to Simulate
              </button>
              
              {allWorldsCompleted && (
                <button 
                  onClick={() => navigate('/reflect')}
                  className="px-6 py-2 md:py-3 bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#2a1a4a] rounded-full font-black shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-transform hover:scale-105 text-sm md:text-base"
                >
                  Finish Journey 🏆
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="quiz-runner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex-1 min-h-0"
          >
            <QuizRunner 
              world={activeWorld} 
              questions={worldQuestions} 
              onComplete={handleWorldComplete} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Play;
