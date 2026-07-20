import React, { useState } from 'react';
import { playAudio, stopNarration } from '../../utils/audio';

const ColumnDetectiveStation = () => {
  const [activeCol, setActiveCol] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const generateData = () => {
    const base = [
      { name: 'Lucas', points: 120, rank: 2 },
      { name: 'Mia', points: 150, rank: 1 },
      { name: 'Emma', points: 90, rank: 3 },
    ];
    return base;
  };

  const data = generateData();

  const handleColClick = (index) => {
    setActiveCol(index);
    stopNarration();
    if (index === 0) playAudio("Player Column: Lists all the students participating.");
    if (index === 1) {
      const total = data.reduce((a, b) => a + b.points, 0);
      playAudio(`Points Column: Total points = ${total}.`);
    }
    if (index === 2) playAudio("Rank Column: Lowest number means 1st place!");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="bg-white/20 p-1.5 rounded-md mr-2">🔍</span> Column Detective
      </h3>
      
      <div className="w-full max-w-lg bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden shadow-inner mb-6">
        <table className="w-full text-center text-lg table-fixed">
          <thead className="bg-[#2a1a4a]/50 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
            <tr>
              <th 
                className={`py-3 px-4 font-bold border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors ${activeCol === 0 ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]' : ''}`}
                onClick={() => handleColClick(0)}
              >
                Player
              </th>
              <th 
                className={`py-3 px-4 font-bold border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors ${activeCol === 1 ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]' : ''}`}
                onClick={() => handleColClick(1)}
              >
                Points
              </th>
              <th 
                className={`py-3 px-4 font-bold border-b border-white/10 cursor-pointer hover:bg-white/10 transition-colors ${activeCol === 2 ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]' : ''}`}
                onClick={() => handleColClick(2)}
              >
                Rank
              </th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-white/5">
                <td className={`py-3 px-4 ${activeCol === 0 ? 'bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]' : ''}`}>{row.name}</td>
                <td className={`py-3 px-4 ${activeCol === 1 ? 'bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]' : ''}`}>{row.points}</td>
                <td className={`py-3 px-4 ${activeCol === 2 ? 'bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]' : ''}`}>{row.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-lg h-20 bg-black/30 rounded-xl border border-white/10 flex items-center justify-center text-center px-4">
        {activeCol === 0 && (
          <p className="text-lg font-bold text-[var(--color-accent-gold)]">
            Player Column: Lists all the students participating.
          </p>
        )}
        {activeCol === 1 && (
          <p className="text-lg font-bold text-[var(--color-accent-gold)]">
            Points Column: Total points = {data.reduce((a, b) => a + b.points, 0)}.
          </p>
        )}
        {activeCol === 2 && (
          <p className="text-lg font-bold text-[var(--color-accent-gold)]">
            Rank Column: Lowest number means 1st place!
          </p>
        )}
        {activeCol === null && (
          <p className="text-[var(--color-text-muted)] italic">Click any column header to highlight it.</p>
        )}
      </div>

      <div className="mt-6">
        <button 
          onClick={() => { setActiveCol(null); setResetKey(k => k + 1); }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full font-semibold text-sm transition-colors"
        >
          New Table (Reset)
        </button>
      </div>
    </div>
  );
};

export default ColumnDetectiveStation;
