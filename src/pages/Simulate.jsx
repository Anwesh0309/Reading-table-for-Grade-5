import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RowRangerStation from '../components/simulate/RowRangerStation';
import ColumnDetectiveStation from '../components/simulate/ColumnDetectiveStation';
import CellCrackerStation from '../components/simulate/CellCrackerStation';
import SpotMismatchStation from '../components/simulate/SpotMismatchStation';
import { playAudio, stopNarration } from '../utils/audio';

const stations = [
  { id: 'row', label: 'Row Ranger', icon: '📏', component: RowRangerStation },
  { id: 'col', label: 'Column Detective', icon: '🔍', component: ColumnDetectiveStation },
  { id: 'cell', label: 'Cell Cracker', icon: '⚡', component: CellCrackerStation },
  { id: 'spot', label: 'Spot Mismatch', icon: '🎯', component: SpotMismatchStation },
];

const Simulate = () => {
  const navigate = useNavigate();
  const [activeStation, setActiveStation] = useState(0);

  useEffect(() => {
    // Narrate station change
    if (activeStation === 0) playAudio("Click any row to reveal a summary of that row's data.");
    if (activeStation === 1) playAudio("Click any column header to highlight that column across all rows.");
    if (activeStation === 2) playAudio("Use the slider to select a row and a column simultaneously.");
    if (activeStation === 3) playAudio("Tap the incorrect cell in the table to fix the mismatch.");
    return () => stopNarration();
  }, [activeStation]);

  const ActiveComponent = stations[activeStation].component;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto h-full min-h-0 py-2 md:py-4"
    >
      <div className="flex flex-col items-center mb-2 md:mb-4 shrink-0">
        <div className="flex items-center space-x-2 text-[var(--color-accent-gold)] mb-2">
          <span className="text-2xl">🧪</span>
          <h2 className="text-2xl font-black">Simulate</h2>
        </div>
        <p className="text-[var(--color-text-muted)] font-semibold">
          Explore and discover — no wrong answers!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 md:space-x-4 mb-2 md:mb-4 shrink-0 w-full justify-center flex-wrap gap-y-2">
        {stations.map((station, index) => (
          <button
            key={station.id}
            onClick={() => setActiveStation(index)}
            className={`px-3 py-2 md:px-6 md:py-3 rounded-2xl font-bold flex items-center space-x-2 transition-all text-xs md:text-sm ${
              activeStation === index 
                ? 'bg-[var(--color-accent-gold)] text-[#2a1a4a] shadow-lg scale-105' 
                : 'bg-[var(--color-card-bg)] text-white hover:bg-white/10'
            }`}
          >
            <span className="bg-white/20 w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center text-[10px] md:text-sm mr-1">
              {String.fromCharCode(65 + index)}
            </span>
            <span>{station.icon} <span>{station.label}</span></span>
          </button>
        ))}
      </div>

      {/* Station Container */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-[32px] p-4 md:p-6 shadow-2xl w-full flex-1 min-h-0 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStation}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col min-h-0 overflow-y-auto"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between mt-2 md:mt-4 border-t border-white/10 pt-2 md:pt-4 shrink-0">
          <button 
            onClick={() => setActiveStation(prev => Math.max(0, prev - 1))}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeStation === 0 ? 'opacity-0 pointer-events-none' : 'bg-white/10 hover:bg-white/20 text-white'}`}
          >
            &larr; Previous Station
          </button>

          {activeStation < stations.length - 1 ? (
            <button 
              onClick={() => setActiveStation(prev => Math.min(stations.length - 1, prev + 1))}
              className="px-6 py-2 bg-[var(--color-card-bg)] hover:bg-white/10 text-white rounded-full font-bold border border-white/20 transition-all"
            >
              Next Station &rarr;
            </button>
          ) : (
            <button 
              onClick={() => navigate('/practice')}
              className="px-8 py-3 bg-[var(--color-accent-gold)] hover:bg-[#e0941d] text-[#2a1a4a] rounded-full font-black shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-transform hover:scale-105"
            >
              Practice Phase 🎮
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Simulate;
