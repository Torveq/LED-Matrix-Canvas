import { useState, useCallback } from 'react';
import { rgbToValue } from '../utils/codeUtils';

export const useDrawing = (grid, setGrid, selectedColor, addToRecentColors) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawMode, setCurrentDrawMode] = useState(null);

  const handlePixelClick = useCallback((row, col) => {
    const newGrid = grid.map(r => [...r]);
    if (currentDrawMode === 'erase') {
      newGrid[row][col] = null;
    } else if (currentDrawMode === 'draw') {
      newGrid[row][col] = rgbToValue(selectedColor.r, selectedColor.g, selectedColor.b);
      addToRecentColors(selectedColor);
    }
    setGrid(newGrid);
  }, [grid, currentDrawMode, selectedColor, addToRecentColors, setGrid]);

  const handleMouseDown = useCallback((row, col, e) => {
    e.preventDefault();
    setIsDrawing(true);
    setCurrentDrawMode(e.button === 2 ? 'erase' : 'draw');
    
    const newGrid = grid.map(r => [...r]);
    if (e.button === 2) {
      newGrid[row][col] = null;
    } else {
      newGrid[row][col] = rgbToValue(selectedColor.r, selectedColor.g, selectedColor.b);
      addToRecentColors(selectedColor);
    }
    setGrid(newGrid);
  }, [grid, selectedColor, addToRecentColors, setGrid]);

  const handlePixelEnter = useCallback((row, col) => {
    if (isDrawing && currentDrawMode) {
      handlePixelClick(row, col);
    }
  }, [isDrawing, currentDrawMode, handlePixelClick]);

  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
    setCurrentDrawMode(null);
  }, []);

  return {
    isDrawing,
    handleMouseDown,
    handlePixelEnter,
    handleMouseUp
  };
};
