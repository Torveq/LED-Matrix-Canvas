import React, { useState } from 'react';

const App = () => {
  const [grid, setGrid] = useState(Array(8).fill().map(() => Array(8).fill(null)));

  const handlePixelClick = (row, col) => {
    console.log(`Clicked: ${row}, ${col}`);
    // basic toggle logic (for now)
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = newGrid[row][col] === null ? '#FFFFFF' : null;
    setGrid(newGrid);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-8">STUMP LED Generator</h1>
      <div className="flex justify-center">
        <div className="bg-slate-800 p-4 rounded-xl inline-block select-none">
          <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handlePixelClick(rowIdx, colIdx)}
                  className="w-12 h-12 rounded border-2 border-slate-700"
                  style={{ backgroundColor: cell || '#1e293b' }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;