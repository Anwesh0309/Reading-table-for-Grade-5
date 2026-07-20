import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playAudio, stopNarration } from '../../utils/audio';

const storySlides = [
  {
    id: 1,
    title: "Leo's Weekend Plans",
    text: "Leo is planning a fun weekend. He looks at the weather table.",
    highlightText: "\"What's the weather like?\"",
    mascotText: "Let's help Leo read the table! 📊",
    img: "/assets/img/slide1.png"
  },
  {
    id: 2,
    title: "Finding the Sun",
    text: "He wants to go to the park, but he needs to find a sunny day.",
    highlightText: "\"I need a sunny day!\"",
    mascotText: "Look for the sun! ☀️",
    img: "/assets/img/slide2.png"
  },
  {
    id: 3,
    title: "The Weather Table",
    text: "Which day has the highest temperature and no rain?",
    highlightText: "\"Highest temp & no rain?\"",
    mascotText: "Let's check the columns! 🔍",
    img: "/assets/img/slide3.png"
  },
  {
    id: 4,
    title: "Ready to Read!",
    text: "Let's help Leo read the weather table!",
    highlightText: "\"I'm ready!\"",
    mascotText: "On to the next challenge! 🚀",
    img: "/assets/img/slide4.png"
  }
];

const StoryCarousel = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Narrate the current slide
    playAudio(storySlides[currentSlide].text);
    return () => stopNarration();
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < storySlides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const slide = storySlides[currentSlide];

  return (
    <div className="w-full h-full max-w-4xl flex flex-col justify-center min-h-0 py-2">
      {/* Top Progress Bar */}
      <div className="flex items-center justify-between mb-2 md:mb-4 shrink-0">
        <div className="flex-1 bg-white/10 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--color-accent-gold)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / storySlides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="ml-4 text-xs font-bold text-white/50 tracking-widest">
          {currentSlide + 1} / {storySlides.length}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-[32px] p-2 md:p-4 shadow-2xl relative overflow-hidden flex flex-col md:flex-row flex-1 min-h-0">
        
        {/* Left Side: Illustration / Interactive area */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-0 bg-[#150c2e] rounded-2xl border border-white/5 relative overflow-hidden">
          <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
          

        </div>

        {/* Right Side: Text & Controls */}
        <div className="md:w-1/2 flex flex-col p-4 md:p-8 justify-center overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-xl md:text-3xl font-black mb-2 md:mb-6 text-[var(--color-accent-gold)]">{slide.title}</h2>
              <p className="text-sm md:text-xl leading-relaxed text-white/90 font-medium mb-6">
                {slide.text}
              </p>
              
              {slide.highlightText && (
                <div className="bg-[#2a1a4a] border border-[#b8aed6]/30 px-6 py-3 rounded-full font-bold text-center text-[var(--color-accent-gold)] shadow-inner mb-6 mx-auto w-full max-w-sm">
                  ✨ {slide.highlightText} ✨
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center space-x-2 md:space-x-4 mt-2 shrink-0 w-full max-w-sm mx-auto">
            <div className="w-12 h-12 bg-gradient-to-b from-[var(--color-accent-gold)] to-[var(--color-accent-orange)] rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-[#150c2e] shrink-0 z-10">
              🦁
            </div>
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none font-bold relative shadow-lg text-sm w-full">
              {slide.mascotText}
              <div className="absolute top-0 left-0 -ml-2 mt-3 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-2 md:mt-4 w-full shrink-0">
        <button 
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-8 py-3 rounded-full font-bold transition-all ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'bg-white/10 hover:bg-white/20 text-white'}`}
        >
          &larr; Back
        </button>

        <div className="flex space-x-2">
          {storySlides.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-[var(--color-accent-gold)]' : 'bg-white/20'}`} />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="px-6 py-2 md:px-8 md:py-3 bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#2a1a4a] rounded-full font-black shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-transform hover:scale-105"
        >
          {currentSlide === storySlides.length - 1 ? 'Simulate 🧪' : 'Next \u2192'}
        </button>
      </div>
    </div>
  );
};

export default StoryCarousel;
