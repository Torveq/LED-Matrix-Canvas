import React from 'react';
import { X } from 'lucide-react';

const ColorPalette = ({ 
  colorPalette, 
  selectedColor, 
  onSelectColor, 
  onRemoveColor, 
  rgbToHex 
}) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-4 w-full max-w-2xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">Color Palette</h3>
        
      </div>
      <div className="grid grid-cols-8 gap-3">
        {colorPalette.map((color, idx) => {
          const isSelected = selectedColor.r === color.r && 
                             selectedColor.g === color.g && 
                             selectedColor.b === color.b;
          return (
            <div key={idx} className="relative group flex items-center justify-center">
              <button
                onClick={() => onSelectColor(color)}
                className={`w-12 h-12 rounded border-2 transition-all hover:scale-110 ${
                  isSelected ? 'border-blue-400 ring-2 ring-blue-400' : 'border-slate-600'
                }`}
                style={{ backgroundColor: rgbToHex(color.r, color.g, color.b) }}
                title={`R:${color.r} G:${color.g} B:${color.b}`}
              />
              <button
                onClick={() => onRemoveColor(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 w-4 h-4 flex items-center justify-center text-[10px] leading-none rounded-sm"
                title="Remove color"
              >
                ×
              </button>
            </div>
          );
        })}
        {colorPalette.length < 16 && (
          <div className="w-12 h-12 rounded border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-500 text-xs">
            {16 - colorPalette.length}
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Click to select • Hover & click X to remove • Max 16 colors
      </div>
    </div>
  );
};

export default ColorPalette;
