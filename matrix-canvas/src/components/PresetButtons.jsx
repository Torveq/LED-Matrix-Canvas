import React from 'react';
import { Trash2 } from 'lucide-react';

const PresetButtons = ({ onSetPreset }) => {
  const icons = [
    { id: 'smiley', label: '😊 Smiley', color: 'yellow' },
    { id: 'heart', label: '❤️ Heart', color: 'red' },
    { id: 'misc', label: '🂡 Misc', color: 'blue' }
  ];

  return (
    <div className="bg-slate-900/50 rounded-xl p-4 w-full max-w-2xl">
      <h3 className="font-semibold text-sm mb-3">Quick Presets</h3>
      
      {/* Icons */}
      <div className="flex gap-2 flex-wrap justify-center mb-3">
        {icons.map(icon => (
          <button 
            key={icon.id}
            onClick={() => onSetPreset(icon.id)} 
            className={`px-3 py-1.5 bg-${icon.color}-600 hover:bg-${icon.color}-700 rounded text-xs transition-colors`}
          >
            {icon.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetButtons;
