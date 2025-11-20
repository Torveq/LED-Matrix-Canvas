import React, { useState, useEffect, useRef, useCallback } from 'react';
import LEDCanvas from './components/LEDCanvas';
import ColorPalette from './components/ColorPalette';
import RecentColors from './components/RecentColors';
import PresetButtons from './components/PresetButtons';
import ColorPicker from './components/ColorPicker';
import CodePanel from './components/CodePanel';
import { rgbToValue, valueToRgb, rgbToHex, hexToClosestRgb, generateCode } from './utils/codeUtils';
import { presetPatterns } from './utils/presets';
import { useDrawing } from './hooks/useDrawing';

const App = () => {
  // State
  const [grid, setGrid] = useState(Array(8).fill().map(() => Array(8).fill(null)));
  const [selectedColor, setSelectedColor] = useState({ r: 7, g: 7, b: 3 });
  const [selectedRegister, setSelectedRegister] = useState('R2');
  const [colorRegister, setColorRegister] = useState('R3');
  const [pointerRegister, setPointerRegister] = useState('R1');
  const [dataKeyword, setDataKeyword] = useState('DEFW');
  const [optimizeCode, setOptimizeCode] = useState(true);
  const [colorPalette, setColorPalette] = useState([
    { r: 7, g: 0, b: 0 }, { r: 0, g: 7, b: 0 }, { r: 0, g: 0, b: 3 },
    { r: 7, g: 7, b: 0 }, { r: 7, g: 3, b: 0 }, { r: 7, g: 7, b: 3 }, { r: 0, g: 0, b: 0 }
  ]);
  const [recentColors, setRecentColors] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isCodePanelCollapsed, setIsCodePanelCollapsed] = useState(false);
  const [panelPosition, setPanelPosition] = useState({
    x: window.innerWidth * (2/3) + (window.innerWidth / 3 - 550) / 2,
    y: window.innerHeight / 2 - 300
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const colorPickerRef = useRef(null);

  // Color management
  const addToRecentColors = useCallback((color) => {
    const colorValue = rgbToValue(color.r, color.g, color.b);
    setRecentColors(prev => {
      const exists = prev.some(c => rgbToValue(c.r, c.g, c.b) === colorValue);
      if (exists) return prev;
      return [color, ...prev].slice(0, 8);
    });
  }, []);

  const addColorToPalette = useCallback(() => {
    if (colorPalette.length >= 16) {
      alert('Palette is full! Remove a color first.');
      return;
    }
    const colorValue = rgbToValue(selectedColor.r, selectedColor.g, selectedColor.b);
    const exists = colorPalette.some(c => rgbToValue(c.r, c.g, c.b) === colorValue);
    if (exists) {
      alert('This color is already in your palette!');
      return;
    }
    setColorPalette([...colorPalette, selectedColor]);
  }, [colorPalette, selectedColor]);

  const removeColorFromPalette = useCallback((index) => {
    setColorPalette(colorPalette.filter((_, i) => i !== index));
  }, [colorPalette]);

  // Drawing hook
  const { handleMouseDown, handlePixelEnter, handleMouseUp } = useDrawing(
    grid, 
    setGrid,
    selectedColor,
    addToRecentColors
  );

  // Preset management
  const setPreset = useCallback((preset) => {
    const newGrid = Array(8).fill().map(() => Array(8).fill(null));
    const color = rgbToValue(selectedColor.r, selectedColor.g, selectedColor.b);
    
    if (presetPatterns[preset]) {
      presetPatterns[preset].forEach(([r, c]) => {
        newGrid[r][c] = color;
      });
    }
    setGrid(newGrid);
  }, [selectedColor]);

  const clearGrid = useCallback(() => {
    setGrid(Array(8).fill().map(() => Array(8).fill(null)));
  }, []);

  // Code generation
  const generatedCode = generateCode(grid, selectedRegister, colorRegister, pointerRegister, dataKeyword, optimizeCode);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  }, [generatedCode]);

  const downloadCode = useCallback(() => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'led_matrix.s';
    a.click();
  }, [generatedCode]);

  // Draggable panel
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - panelPosition.x,
      y: e.clientY - panelPosition.y
    });
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (isDragging) {
        setPanelPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      return () => {
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, dragOffset]);

  // Prevent context menu on canvas
  useEffect(() => {
    const preventContext = (e) => {
      if (e.target.closest('.led-canvas')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', preventContext);
    return () => document.removeEventListener('contextmenu', preventContext);
  }, []);

  return (
    <div className="h-full w-full bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col overflow-hidden" onMouseUp={handleMouseUp}>
      <div className="w-full flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-4 min-h-0 gap-6 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col items-center gap-6 w-full max-w-5xl pb-8">
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                STUMP LED Matrix Code Generator
              </h1>
              <p className="text-gray-400 text-sm">COMP22111 - Design your LED matrix patterns and generate assembly code</p>
            </div>
            
            {/* LED Canvas */}
            <LEDCanvas
              grid={grid}
              onMouseDown={handleMouseDown}
              onMouseEnter={handlePixelEnter}
              valueToRgb={valueToRgb}
              rgbToHex={rgbToHex}
            />

            {/* Color Palette */}
            <ColorPalette
              colorPalette={colorPalette}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onRemoveColor={removeColorFromPalette}
              onClearGrid={clearGrid}
              rgbToHex={rgbToHex}
            />

            {/* Recent Colors */}
            <RecentColors
              recentColors={recentColors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              rgbToHex={rgbToHex}
            />

            {/* Preset Buttons */}
            <PresetButtons onSetPreset={setPreset} />

            {/* Color Picker */}
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              onAddToPalette={addColorToPalette}
              rgbToHex={rgbToHex}
              rgbToValue={rgbToValue}
              hexToClosestRgb={hexToClosestRgb}
              colorPickerRef={colorPickerRef}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-3 text-gray-500 text-xs shrink-0 bg-slate-900/50 border-t border-slate-700">
          <p>Made for COMP22111 students • University of Manchester • By Mahmoud</p>
        </div>

        {/* Floating Code Panel */}
        <CodePanel
          isCollapsed={isCodePanelCollapsed}
          onToggleCollapse={() => setIsCodePanelCollapsed(!isCodePanelCollapsed)}
          position={panelPosition}
          onDragStart={handleDragStart}
          generatedCode={generatedCode}
          copySuccess={copySuccess}
          onCopy={copyToClipboard}
          onDownload={downloadCode}
          selectedRegister={selectedRegister}
          onRegisterChange={setSelectedRegister}
          colorRegister={colorRegister}
          onColorRegisterChange={setColorRegister}
          pointerRegister={pointerRegister}
          onPointerRegisterChange={setPointerRegister}
          dataKeyword={dataKeyword}
          onDataKeywordChange={setDataKeyword}
          optimizeCode={optimizeCode}
          onOptimizeCodeChange={setOptimizeCode}
        />
      </div>
    </div>
  );
};

export default App;
