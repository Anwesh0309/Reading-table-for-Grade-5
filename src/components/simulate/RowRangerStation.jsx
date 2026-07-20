import React, { useState } from 'react';
import { playAudio, stopNarration } from '../../utils/audio';

const RowRangerStation = () => {
  const [activeRow, setActiveRow] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const generateData = () => {
    const base = [
      { day: 'Monday', temp: '28°C', rain: 'No' },
      { day: 'Tuesday', temp: '30°C', rain: 'Yes' },
      { day: 'Wednesday', temp: '33°C', rain: 'No' },
    ];
    return base;
  };

  const data = generateData();

  const handleRowClick = (index) => {
    setActiveRow(index);
    stopNarration();
    const rowText = `Row ${index + 1}: On ${data[index].day}, it is ${data[index].temp} and rain is ${data[index].rain}.`;
    playAudio(rowText);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="bg-white/20 p-1.5 rounded-md mr-2">📏</span> Row Ranger
      </h3>
      
      <div className="w-full max-w-lg bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden shadow-inner mb-6">
        <table className="w-full text-center text-lg">
          <thead className="bg-[#2a1a4a]/50 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4 font-bold border-b border-white/10">Day</th>
              <th className="py-3 px-4 font-bold border-b border-white/10">Temperature</th>
              <th className="py-3 px-4 font-bold border-b border-white/10">Rain</th>
            </tr>
          </thead>
          <tbody className="font-bold cursor-pointer">
            {data.map((row, idx) => (
              <tr 
                key={idx} 
                onClick={() => handleRowClick(idx)}
                className={`transition-colors border-b border-white/5 ${
                  activeRow === idx 
                    ? 'bg-[var(--color-accent-gold)]/20 shadow-[inset_0_0_15px_rgba(245,166,35,0.3)]' 
                    : 'hover:bg-white/5'
                }`}
              >
                <td className={`py-3 px-4 ${activeRow === idx ? 'text-[var(--color-accent-gold)]' : ''}`}>{row.day}</td>
                <td className="py-3 px-4">{row.temp}</td>
                <td className="py-3 px-4">{row.rain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-lg h-20 bg-black/30 rounded-xl border border-white/10 flex items-center justify-center">
        {activeRow !== null ? (
          <p className="text-lg font-bold text-[var(--color-accent-gold)]">
            Row {activeRow + 1}: On {data[activeRow].day}, it is {data[activeRow].temp} and rain is {data[activeRow].rain}.
          </p>
        ) : (
          <p className="text-[var(--color-text-muted)] italic">Click any row to reveal its summary.</p>
        )}
      </div>

      <div className="mt-6">
        <button 
          onClick={() => { setActiveRow(null); setResetKey(k => k + 1); }}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full font-semibold text-sm transition-colors"
        >
          New Table (Reset)
        </button>
      </div>
    </div>
  );
};

export default RowRangerStation;
