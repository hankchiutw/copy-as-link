import { useEffect, useState } from 'react';

interface SelectionPosition {
  x: number;
  y: number;
}

export const useSelectionListener = () => {
  const [position, setPosition] = useState<SelectionPosition>(null);
  const [selectedText, setSelectedText] = useState('');

  const reset = () => {
    setPosition(null);
    setSelectedText('');
  };

  useEffect(() => {
    const selectionHandler = () => {
      const selection = window.getSelection();

      if (!selection.rangeCount) {
        return reset();
      }

      // same start and end
      if (selection.getRangeAt(0).collapsed) {
        return reset();
      }

      const { left, top, width, height } = selection
        .getRangeAt(0)
        .getBoundingClientRect();

      const pos = {
        x: left + window.scrollX + width,
        y: top + window.scrollY + height,
      };
      setPosition(pos);
      setSelectedText(selection.toString());
    };
    document.addEventListener('selectionchange', selectionHandler);
    return () =>
      document.removeEventListener('selectionchange', selectionHandler);
  }, []);

  return { position, selectedText };
};
