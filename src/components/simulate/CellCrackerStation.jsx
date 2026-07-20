import React, { useState } from 'react';
import { playAudio, stopNarration } from '../../utils/audio';

const CellCrackerStation = () => {
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);

  const [resetKey, setResetKey] = useState(0);

  const generateData = () => {
    const base = [
      { item: 'Pencils', storeA: '$2', storeB: '$3', storeC: '$2' },
      { item: 'Erasers', storeA: '$1', storeB: '$1', storeC: '$2' },
      { item: 'Rulers', storeA: '$3', storeB: '$2', storeC: '$4' },
      { item: 'Markers', storeA: '$4', storeB: '$5', storeC: '$3' },
      { item: 'Folders', storeA: '$2', storeB: '$1', storeC: '$3' },
    ];
    return [...base.slice(resetKey % 3, (resetKey % 3) + 3)];
  };

  const data = generateData();

  const cols = ['item', 'storeA', 'storeB', 'storeC'];
  const colLabels = ['Item', 'Store A', 'Store B', 'Store C'];

  const handleRowChange = (e) => {
    setRowIndex(parseInt(e.target.value));
  };

  const handleColChange = (e) => {
    setColIndex(parseInt(e.target.value));
  };

  const selectedValue = data[rowIndex][cols[colIndex]];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2">
      <h3 className="text-xl font-bold mb-2 flex items-center shrink-0">
        <span className="bg-white/20 p-1.5 rounded-md mr-2">⚡</span> Cell Cracker
      </h3>

      <div className="flex flex-col md:flex-row w-full max-w-4xl space-y-2 md:space-y-0 md:space-x-4 flex-1 min-h-0">
        {/* Table View */}
        <div className="md:w-1/2 bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden shadow-inner flex flex-col justify-center">
          <table className="w-full text-center text-sm table-fixed">
            <thead className="bg-[#2a1a4a]/50 text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
              <tr>
                {colLabels.map((label, idx) => (
                  <th key={idx} className={`py-3 px-2 border-b border-white/10 ${colIndex === idx ? 'bg-[var(--color-accent-gold)]/20 text-[var(--color-accent-gold)]' : ''}`}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-bold">
              {data.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-white/5">
                  {cols.map((col, cIdx) => {
                    const isTarget = rIdx === rowIndex && cIdx === colIndex;
                    const isRow = rIdx === rowIndex;
                    const isCol = cIdx === colIndex;
                    
                    let bgClass = '';
                    let textClass = '';
                    if (isTarget) {
                      bgClass = 'bg-[var(--color-accent-gold)] shadow-[inset_0_0_15px_rgba(245,166,35,0.6)]';
                      textClass = 'text-[#150c2e] text-lg font-black';
                    } else if (isRow || isCol) {
                      bgClass = 'bg-[var(--color-accent-gold)]/10';
                      textClass = 'text-[var(--color-accent-gold)]';
                    }

                    return (
                      <td key={cIdx} className={`py-3 px-2 transition-all ${bgClass} ${textClass}`}>
                        {row[col]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controls View */}
        <div className="md:w-1/2 flex flex-col justify-center bg-black/20 p-4 rounded-2xl border border-white/10 shrink-0">
          
          <div className="mb-4">
            <label className="block text-xs font-bold text-[var(--color-text-muted)] mb-1 uppercase tracking-wide">
              Row Index: <span className="text-white text-base">{rowIndex + 1}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max={data.length - 1} 
              value={rowIndex} 
              onChange={handleRowChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent-gold)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-[var(--color-text-muted)] mb-1 uppercase tracking-wide">
              Column Index: <span className="text-white text-base">{colLabels[colIndex]}</span>
            </label>
            <input 
              type="range" 
              min="0" 
              max={cols.length - 1} 
              value={colIndex} 
              onChange={handleColChange}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent-gold)]"
            />
          </div>

          <div className="bg-[#150c2e] rounded-xl border border-[var(--color-accent-gold)]/50 p-2 shadow-[0_0_15px_rgba(245,166,35,0.2)] text-center mb-2">
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-bold">Intersection Formula</p>
            <p className="text-lg font-black text-white">
              Row {rowIndex + 1} <span className="text-[var(--color-accent-gold)]">×</span> {colLabels[colIndex]} <span className="text-[var(--color-accent-gold)]">=</span> {selectedValue}
            </p>
          </div>

          <div className="flex justify-center mt-2">
            <button 
              onClick={() => { setRowIndex(0); setColIndex(0); setResetKey(k => k + 1); }}
              className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full font-semibold text-xs transition-colors"
            >
              New Table (Reset)
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CellCrackerStation;
