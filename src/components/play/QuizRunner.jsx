import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAudio, stopNarration } from '../../utils/audio';
import useProgressStore from '../../engine/progressStore';

const QuizRunner = ({ world, questions, onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  
  const hearts = useProgressStore(state => state.hearts);
  const streak = useProgressStore(state => state.streak);
  const answerCorrect = useProgressStore(state => state.answerCorrect);
  const answerWrong = useProgressStore(state => state.answerWrong);
  
  const question = questions[currentQIndex];

  useEffect(() => {
    playAudio(question.audioText);
    return () => stopNarration();
  }, [currentQIndex, question]);

  const handleAnswer = (index) => {
    if (feedback !== null) return; // Prevent multiple clicks

    stopNarration();
    
    if (index === question.correctIndex) {
      setFeedback('correct');
      playAudio("That's right, keep it up!");
      answerCorrect(question.difficulty || 1);
    } else {
      setFeedback('wrong');
      playAudio("Not quite, try it in next questions.");
      answerWrong();
    }

    // Auto advance after 1 second (no continue button per PRD)
    setTimeout(() => {
      setFeedback(null);
      if (hearts - (index === question.correctIndex ? 0 : 1) <= 0) {
        onComplete(false); // Failed
      } else if (currentQIndex < questions.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        onComplete(true); // Success
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto h-full p-2 md:p-4 min-h-0">
      
      {/* Header Stats */}
      <div className="flex items-center justify-between w-full mb-2 bg-black/20 p-2 md:p-4 rounded-3xl border border-white/10 shrink-0">
        <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
          <span>{world.icon}</span>
          <span className="font-bold">{world.name}</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1 font-bold text-lg">
            <span>❤️</span>
            <span className={hearts <= 1 ? 'text-[var(--color-danger)] animate-pulse' : 'text-white'}>{hearts}</span>
          </div>
          <div className="flex items-center space-x-1 font-bold text-lg text-[var(--color-accent-gold)]">
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-white/10 rounded-full mb-2 md:mb-4 overflow-hidden shrink-0">
        <motion.div 
          className="h-full bg-[var(--color-accent-gold)]"
          initial={{ width: `${(currentQIndex / questions.length) * 100}%` }}
          animate={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-[32px] p-2 md:p-6 w-full shadow-2xl flex flex-col flex-1 min-h-0 items-center relative overflow-hidden mb-2">
        <h2 className="text-lg md:text-2xl font-black text-center mb-2 shrink-0">{question.questionText}</h2>
        
        {/* Table */}
        <div className="bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden w-full max-w-lg shadow-inner mb-2 shrink-0">
          <table className="w-full text-center text-xs md:text-sm">
            <thead className="bg-[#2a1a4a]/50 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              <tr>
                {question.tableData.cols.map((c, i) => (
                  <th key={i} className="py-2 px-2 border-b border-white/10">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-bold">
              {question.tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-white/5">
                  <td className="py-2 px-2">{row.cat}</td>
                  <td className="py-2 px-2">{row.mon}</td>
                  <td className="py-2 px-2">{row.tue}</td>
                  <td className="py-2 px-2">{row.wed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#150c2e]/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                className={`flex flex-col items-center justify-center p-10 rounded-[32px] shadow-2xl max-w-md w-full mx-4
                  ${feedback === 'correct' ? 'bg-[#4ade80] text-white' : 'bg-[#ef4444] text-white'}`}
              >
                <div className="text-7xl mb-4 drop-shadow-md">{feedback === 'correct' ? '🎉' : '🥺'}</div>
                <h2 className="text-4xl font-black mb-3 drop-shadow-sm">{feedback === 'correct' ? 'Correct!' : 'Not quite!'}</h2>
                {feedback === 'wrong' ? (
                  <p className="font-bold text-center text-lg text-white/90">
                    The correct answer was {question.options[question.correctIndex]}.
                  </p>
                ) : (
                  <p className="font-bold text-center text-lg text-white/90">
                    Great job!
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answer Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 w-full flex-1 min-h-0 overflow-y-auto mt-2">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={feedback !== null}
              className="bg-[#2a1a4a] hover:bg-[#412759] border-2 border-white/10 text-white font-black text-base md:text-xl py-2 md:py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center min-h-[48px] md:min-h-[60px]"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizRunner;
