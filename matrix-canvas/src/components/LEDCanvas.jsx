import React from 'react';

const LEDCanvas = ({ grid, onMouseDown, onMouseEnter, valueToRgb, rgbToHex }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-slate-900 p-6 rounded-xl inline-block select-none led-canvas">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(8, 1fr)' }}>
          {grid.map((row, rowIdx) => 
            row.map((cell, colIdx) => {
              const rgb = cell !== null ? valueToRgb(cell) : null;
              return (
                <button
                  key={`${rowIdx}-${colIdx}`}
                  onMouseDown={(e) => onMouseDown(rowIdx, colIdx, e)}
                  onMouseEnter={() => onMouseEnter(rowIdx, colIdx)}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-16 h-16 rounded border-2 border-slate-700 transition-all hover:scale-110 hover:border-blue-400 cursor-crosshair"
                  style={{
                    backgroundColor: cell !== null ? rgbToHex(rgb.r, rgb.g, rgb.b) : '#1e293b'
                  }}
                />
              );
            })
          )}
        </div>
        <div className="text-xs text-gray-500 mt-3 text-center">
          🖱️ Left-click to draw • Right-click to erase • Hold & drag
        </div>
      </div>
    </div>
  );
};

export default LEDCanvas;
