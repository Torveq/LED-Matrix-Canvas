import React from 'react';
import { Copy, Download, Code, Minimize2, Maximize2, GripHorizontal } from 'lucide-react';

const CodePanel = ({
  isCollapsed,
  onToggleCollapse,
  position,
  onDragStart,
  generatedCode,
  copySuccess,
  onCopy,
  onDownload,
  selectedRegister,
  onRegisterChange,
  colorRegister,
  onColorRegisterChange,
  pointerRegister,
  onPointerRegisterChange,
  dataKeyword,
  onDataKeywordChange,
  optimizeCode,
  onOptimizeCodeChange
}) => {
  return (
    <div 
      className="fixed w-[550px] bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-500/30 z-50 flex flex-col"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        maxHeight: isCollapsed ? 'auto' : 'calc(100vh - 12rem)'
      }}
    >
      {/* Draggable Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-move bg-slate-700/50 rounded-t-2xl border-b border-slate-600"
        onMouseDown={onDragStart}
      >
        <div className="flex items-center gap-2">
          <GripHorizontal className="w-5 h-5 text-gray-400" />
          <Code className="w-5 h-5" />
          <h2 className="text-xl font-bold">Code Generation</h2>
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-slate-600 rounded-lg transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Panel Content */}
      {!isCollapsed && (
        <div className="p-6 flex flex-col flex-1 min-h-0">
          {/* Settings */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Address Register</label>
                <select
                  value={selectedRegister}
                  onChange={(e) => onRegisterChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                >
                  {['R1', 'R2', 'R3', 'R4', 'R5', 'R6'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Color Register</label>
                <select
                  value={colorRegister}
                  onChange={(e) => onColorRegisterChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                >
                  {['R1', 'R2', 'R3', 'R4', 'R5', 'R6'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Pointer Register</label>
                <select
                  value={pointerRegister}
                  onChange={(e) => onPointerRegisterChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                >
                  {['R1', 'R2', 'R3', 'R4', 'R5', 'R6'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Data Keyword</label>
                <select
                  value={dataKeyword}
                  onChange={(e) => onDataKeywordChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <option value="DEFW">DEFW</option>
                  <option value="DATA">DATA</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={optimizeCode}
                  onChange={(e) => onOptimizeCodeChange(e.target.checked)}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm">Optimize code (Max 8 colors)</span>
              </label>
            </div>
          </div>

          {/* Generated Code - Scrollable */}
          <div className="bg-slate-900 rounded-xl p-4 mb-4 font-mono text-sm overflow-y-auto overflow-x-hidden flex-1 min-h-0 max-h-[250px]">
            <pre className="text-green-400 whitespace-pre">{generatedCode}</pre>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onCopy}
              className={`flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition-all ${
                copySuccess ? 'shadow-inner ring-2 ring-green-400 bg-green-600' : 'shadow-lg'
              }`}
            >
              <Copy className="w-4 h-4" />
              {copySuccess ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={onDownload}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download .s
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePanel;
