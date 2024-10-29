import { useEffect, useState } from 'react';

interface SelectionPosition {
  x: number;
  y: number;
}

export const useSelectionListener = () => {
  const [position, setPosition] = useState<SelectionPosition>(null);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const selectionHandler = () => {
      const selection = window.getSelection();

      const invalidRange = !selection.rangeCount;
      const sameStartAndEnd = selection.getRangeAt(0).collapsed;
      if (invalidRange || sameStartAndEnd) {
        setPosition(null);
        setSelectedText('');
        return;
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
