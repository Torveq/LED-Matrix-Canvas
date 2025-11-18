import React from 'react';

const RecentColors = ({ recentColors, selectedColor, onSelectColor, rgbToHex }) => {
  if (recentColors.length === 0) return null;

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 w-full max-w-2xl">
      <h3 className="font-semibold text-sm mb-2">Recently Used</h3>
      <div className="flex gap-2 flex-wrap">
        {recentColors.map((color, idx) => {
          const isSelected = selectedColor.r === color.r && 
                             selectedColor.g === color.g && 
                             selectedColor.b === color.b;
          return (
            <button
              key={idx}
              onClick={() => onSelectColor(color)}
              className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${
                isSelected ? 'border-blue-400 ring-2 ring-blue-400' : 'border-slate-600'
              }`}
              style={{ backgroundColor: rgbToHex(color.r, color.g, color.b) }}
              title={`R:${color.r} G:${color.g} B:${color.b}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentColors;
