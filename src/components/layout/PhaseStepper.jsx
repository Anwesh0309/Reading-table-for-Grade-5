import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import useProgressStore from '../../engine/progressStore';

const phases = [
  { id: 'wonder', num: '01', label: 'Wonder', path: '/wonder' },
  { id: 'story', num: '02', label: 'Story', path: '/story' },
  { id: 'simulate', num: '03', label: 'Simulate', path: '/simulate' },
  { id: 'practice', num: '04', label: 'Practice', path: '/practice' },
  { id: 'reflect', num: '05', label: 'Reflect', path: '/reflect' },
];

const PhaseStepper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Don't show stepper on intro
  if (currentPath === '/') return null;

  const currentIndex = phases.findIndex(p => p.path === currentPath);

  return (
    <div className="w-full flex items-center justify-center relative">
      {/* Home Button aligned to the left */}
      <button 
        onClick={() => navigate('/')}
        className="absolute left-0 flex items-center space-x-2 bg-[var(--color-card-bg)] hover:bg-white/10 border border-[var(--color-card-border)] rounded-full px-4 py-2 transition-all shadow-lg backdrop-blur-md"
      >
        <span>🏠</span>
        <span className="font-bold text-sm text-white">Home</span>
      </button>

      {/* Stepper */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-full px-4 py-2 flex items-center space-x-6 backdrop-blur-md shadow-lg shadow-black/50">
      {phases.map((phase, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        
        return (
          <div 
            key={phase.id} 
            className={`flex items-center space-x-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'} ${isPast ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => {
              if (isPast) navigate(phase.path);
            }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
              ${isActive ? 'bg-[var(--color-accent-gold)] text-[#2a1a4a]' : 
                isPast ? 'bg-[var(--color-success)] text-[#0d0820]' : 'bg-white/20 text-white'}`}
            >
              {isPast ? <Check size={14} strokeWidth={4} /> : phase.num}
            </div>
            <span className={`font-bold text-sm tracking-wide ${isActive ? 'text-[var(--color-accent-gold)]' : 'text-white'}`}>
              {phase.label}
            </span>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default PhaseStepper;
