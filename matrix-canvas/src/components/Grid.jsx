import React from 'react';

const Grid = ({ grid, onPixelClick }) => {
  // We'll add the real color logic and mouse handlers in the next steps
  return (
    <div className="bg-slate-900 p-6 rounded-xl inline-block select-none led-canvas">
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <button
              key={`${rowIdx}-${colIdx}`}
              onMouseDown={(e) => onPixelClick(rowIdx, colIdx, e)} // Use onMouseDown
              onContextMenu={(e) => e.preventDefault()}
              className="w-16 h-16 rounded border-2 border-slate-700 cursor-crosshair"
              style={{ backgroundColor: cell ? '#FF0000' : '#1e293b' }} // Hardcode color for now
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Grid;