import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playAudio, stopNarration } from '../../utils/audio';

const SpotMismatchStation = () => {
  const [hasFoundError, setHasFoundError] = useState(false);
  const [clickedWrong, setClickedWrong] = useState(false);

  const [resetKey, setResetKey] = useState(0);

  // Generate table data based on resetKey
  const generateTableData = () => {
    const errorIndex = resetKey % 3;
    const baseTrains = [
      { train: 'Train A', departure: '7:00 am', arrival: '8:00 am', isError: false },
      { train: 'Train B', departure: '7:15 am', arrival: '8:15 am', isError: false },
      { train: 'Train C', departure: '7:30 am', arrival: '8:30 am', isError: false },
    ];
    
    baseTrains[errorIndex].isError = true;
    baseTrains[errorIndex].arrival = errorIndex === 0 ? '9:00 am' : errorIndex === 1 ? '9:15 am' : '9:30 am';
    return baseTrains;
  };

  const tableData = generateTableData();

  const handleCellClick = (isError) => {
    if (hasFoundError) return;

    if (isError) {
      setHasFoundError(true);
      setClickedWrong(false);
      stopNarration();
      playAudio("Great job spotting the error!");
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5a623', '#34d399', '#ffffff']
      });
    } else {
      setClickedWrong(true);
      stopNarration();
      playAudio("Cross-check needed!");
      setTimeout(() => setClickedWrong(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 min-h-0">
      <div className="flex flex-col items-center mb-1 md:mb-2 shrink-0">
        <div className="bg-[#3e345e] p-1.5 md:p-2 rounded-xl flex items-center space-x-2 shadow-lg mb-2">
          <span className="bg-[#483a6b] p-1 md:p-2 rounded-lg text-lg md:text-xl shrink-0 border border-white/5">🎯</span>
          <h3 className="text-lg md:text-xl font-bold text-white pr-3">Spot the Mismatch</h3>
        </div>

        <div className="bg-[#241646] px-3 py-1 md:px-4 md:py-2 rounded-full border border-[var(--color-accent-gold)]/30 shadow-inner max-w-lg text-center">
          <p className="text-[10px] md:text-xs font-semibold text-white/90">
            Rule: <span className="text-[var(--color-accent-gold)]">All trains take exactly 1 hour</span> to arrive. Find the mistake!
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg bg-[#150c2e] rounded-xl border border-white/10 overflow-hidden shadow-inner mb-2 shrink-0">
        <table className="w-full text-center text-xs md:text-sm">
          <thead className="bg-[#1e133d] text-[10px] text-white/50 uppercase tracking-[0.1em]">
            <tr>
              <th className="py-2 px-3 font-bold border-b border-white/5">Train</th>
              <th className="py-2 px-3 font-bold border-b border-white/5">Departure</th>
              <th className="py-2 px-3 font-bold border-b border-white/5">Arrival</th>
            </tr>
          </thead>
          <tbody className="font-bold cursor-pointer">
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-2 px-3 pointer-events-none">{row.train}</td>
                <td 
                  className="py-2 px-3 hover:bg-white/10 transition-colors"
                  onClick={() => handleCellClick(false)}
                >
                  {row.departure}
                </td>
                <td 
                  className={`py-2 px-3 transition-colors ${
                    hasFoundError && row.isError 
                      ? 'bg-[#265d56] text-[#4ade80] shadow-[inset_0_0_10px_rgba(74,222,128,0.1)]' 
                      : 'hover:bg-white/10'
                  }`}
                  onClick={() => handleCellClick(row.isError)}
                >
                  {hasFoundError && row.isError ? '8:15 am' : row.arrival}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`w-full max-w-lg h-10 md:h-12 rounded-xl border flex items-center justify-center font-bold text-xs md:text-sm transition-all shrink-0 ${
        hasFoundError 
          ? 'bg-[#244347] border-[#4ade80] text-[#4ade80]' 
          : clickedWrong 
            ? 'bg-[var(--color-danger)]/20 border-[var(--color-danger)] text-[var(--color-danger)]' 
            : 'bg-transparent border-transparent text-transparent'
      }`}>
        {hasFoundError ? (
          <div className="flex items-center space-x-2">
            <span className="bg-[#4ade80] text-[#150c2e] text-xs rounded-sm px-1 py-0.5">✔</span>
            <span>Correct! {tableData.find(t => t.isError).train} should arrive 1 hour after departure!</span>
          </div>
        ) : clickedWrong ? (
          <div className="flex items-center space-x-2">
            <span>🔴</span>
            <span>Cross-check needed!</span>
          </div>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>

      <div className="mt-2 md:mt-3 shrink-0">
        <button 
          onClick={() => { 
            setHasFoundError(false); 
            setClickedWrong(false); 
            setResetKey(prev => prev + 1);
          }}
          className="px-4 py-1.5 bg-[#403759] hover:bg-[#524673] rounded-full font-bold text-[10px] md:text-xs text-white/90 transition-colors shadow-lg"
        >
          New Table (Reset)
        </button>
      </div>
    </div>
  );
};

export default SpotMismatchStation;
