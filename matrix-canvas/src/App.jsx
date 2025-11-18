import React, { useState } from 'react';
import Grid from './components/Grid';

const App = () => {
  const [grid, setGrid] = useState(Array(8).fill().map(() => Array(8).fill(null)));

  const handlePixelDown = (row, col) => {
    const newGrid = grid.map(r => [...r]);
    // will add real color and erase logic soon
    newGrid[row][col] = newGrid[row][col] === null ? 1 : null; // 1 for "on"
    setGrid(newGrid);
  };

  return (
    <div className="h-full w-full ...">
      <div className="flex-1 flex flex-col items-center justify-start ...">
        <Grid grid={grid} onPixelClick={handlePixelDown} />
      </div>
    </div>
  );
};
export default App;