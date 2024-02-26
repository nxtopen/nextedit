import React, { useState, useRef, useEffect } from 'react';
import { IconButton } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatListNumbered,
  FormatListBulleted,
  FormatColorText
} from '@mui/icons-material';
import ColorPicker from './components/ColorPicker';

const NextEdit = ({ onChange, content }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const textAreaRef = useRef(null);
  const colorPickerRef = useRef(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        if (!event.target.closest('.next-edit-container')) {
          textAreaRef.current.focus();
        }
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showColorPicker) {
      const iconRect = colorPickerRef.current.getBoundingClientRect();
      setColorPickerPosition({ top: iconRect.bottom, left: iconRect.left });
    }
  }, [showColorPicker]);

  const handleFormat = (format) => {
    textAreaRef.current.focus();
    document.execCommand(format);
    saveSelection();
  };

  const handleHtmlChange = () => {
    const html = textAreaRef.current.innerHTML;
    onChange(html);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    applyColor(color.hex);
  };

  const applyColor = (color) => {
    textAreaRef.current.focus();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    saveSelection();
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    localStorage.setItem('selectionStart', range.startOffset);
    localStorage.setItem('selectionEnd', range.endOffset);
  };

  const restoreSelection = () => {
    const selectionStart = localStorage.getItem('selectionStart');
    const selectionEnd = localStorage.getItem('selectionEnd');

    if (selectionStart && selectionEnd) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (textAreaRef.current && textAreaRef.current.firstChild) {
          range.setStart(textAreaRef.current.firstChild, selectionStart);
          range.setEnd(textAreaRef.current.firstChild, selectionEnd);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  return (
    <div className="next-edit-container" style={{ minWidth: '100%', margin: 'auto', marginTop: '20px', color: 'black' }}>
      <div style={{ display: 'flex', background: '#fff', flexWrap: 'wrap' }}>
        <IconButton onClick={() => handleFormat('bold')}><FormatBold /></IconButton>
        <IconButton onClick={() => handleFormat('italic')}><FormatItalic /></IconButton>
        <IconButton onClick={() => handleFormat('underline')}><FormatUnderlined /></IconButton>
        <IconButton onClick={() => handleFormat('justifyLeft')}><FormatAlignLeft /></IconButton>
        <IconButton onClick={() => handleFormat('justifyCenter')}><FormatAlignCenter /></IconButton>
        <IconButton onClick={() => handleFormat('justifyRight')}><FormatAlignRight /></IconButton>
        <IconButton onClick={() => handleFormat('insertOrderedList')}><FormatListNumbered /></IconButton>
        <IconButton onClick={() => handleFormat('insertUnorderedList')}><FormatListBulleted /></IconButton>
        <IconButton ref={colorPickerRef} onClick={() => handleFormat('color')}><FormatColorText /></IconButton>
      </div>
      <div
        ref={textAreaRef}
        contentEditable={true}
        style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', marginBottom: '20px', lineHeight: '1.5', backgroundColor: '#fff', paddingInline: '25px', width: '100%' }}
        onInput={handleHtmlChange}
        dangerouslySetInnerHTML={{ __html: content }}
        onMouseUp={saveSelection}
        onMouseDown={restoreSelection}
      />
      {showColorPicker && (
        <ColorPicker position={colorPickerPosition} onChange={handleColorChange} />
      )}
    </div>
  );
};

export default NextEdit;