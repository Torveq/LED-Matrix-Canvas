import React from 'react';
import { Plus } from 'lucide-react';

const ColorPicker = ({ 
  selectedColor, 
  onColorChange, 
  onAddToPalette,
  rgbToHex,
  rgbToValue,
  hexToClosestRgb,
  colorPickerRef
}) => {
  return (
    <div className="bg-slate-900/50 rounded-xl p-6 w-full max-w-2xl">
      <div className="flex flex-wrap items-center gap-4 justify-center mb-6">
        <span className="text-sm font-semibold">Preview:</span>
        <div 
          className="w-14 h-14 rounded-lg border-2 border-blue-400 shadow-lg"
          style={{ backgroundColor: rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) }}
        />
        <div className="text-xs text-gray-400">
          R:{selectedColor.r} G:{selectedColor.g} B:{selectedColor.b} | 0x{rgbToValue(selectedColor.r, selectedColor.g, selectedColor.b).toString(16).padStart(2, '0').toUpperCase()}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-400">Hex Picker:</label>
          <input
            ref={colorPickerRef}
            type="color"
            onChange={(e) => {
              const closest = hexToClosestRgb(e.target.value);
              onColorChange(closest);
            }}
            className="w-14 h-14 rounded-lg cursor-pointer bg-slate-700 border-2 border-slate-600"
            title="Quick color picker (approximates to nearest valid color)"
          />
        </div>
        <button
          onClick={onAddToPalette}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
          title="Add current color to palette"
        >
          <Plus className="w-4 h-4" />
          Add to Palette
        </button>
      </div>

      {/* RGB Sliders */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-center mb-3">Fine-tune with sliders:</h3>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-red-400">Red (3-bit: 0-7)</label>
            <span className="text-sm font-mono text-gray-300 bg-slate-800 px-2 py-1 rounded">{selectedColor.r}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={selectedColor.r}
            onChange={(e) => onColorChange({...selectedColor, r: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-green-400">Green (3-bit: 0-7)</label>
            <span className="text-sm font-mono text-gray-300 bg-slate-800 px-2 py-1 rounded">{selectedColor.g}</span>
          </div>
          <input
            type="range"
            min="0"
            max="7"
            value={selectedColor.g}
            onChange={(e) => onColorChange({...selectedColor, g: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-blue-400">Blue (2-bit: 0-3)</label>
            <span className="text-sm font-mono text-gray-300 bg-slate-800 px-2 py-1 rounded">{selectedColor.b}</span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            value={selectedColor.b}
            onChange={(e) => onColorChange({...selectedColor, b: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
