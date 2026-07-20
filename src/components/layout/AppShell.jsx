import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import PhaseStepper from './PhaseStepper';
import { setAudioEnabled, getAudioEnabled } from '../../utils/audio';

const AppShell = ({ children }) => {
  const [isMuted, setIsMuted] = useState(!getAudioEnabled());

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setAudioEnabled(!newMuted);
  };

  return (
    <div className="w-full h-[100dvh] overflow-hidden bg-[var(--bg-gradient)] text-white font-display flex flex-col relative">
      {/* Floating decorative elements could go here */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/assets/img/dots-pattern.png')] bg-repeat"></div>
      
      <header className="flex-none p-4 flex justify-center z-10 relative">
        <PhaseStepper />

        <button 
          onClick={toggleMute}
          className="absolute right-4 top-4 bg-[var(--color-card-bg)] hover:bg-white/10 border border-[var(--color-card-border)] rounded-full p-2 transition-all shadow-lg backdrop-blur-md"
        >
          {isMuted ? <VolumeX size={20} className="text-white/60" /> : <Volume2 size={20} className="text-white" />}
        </button>
      </header>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 flex flex-col items-center justify-center relative z-10 min-h-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
