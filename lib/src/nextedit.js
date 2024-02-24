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
import { ChromePicker } from 'react-color';

const NextEdit = ({ onChange }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const textAreaRef = useRef(null);
  const colorPickerRef = useRef(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({ top: 0, left: 0 });
  const [selectionRange, setSelectionRange] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        textAreaRef.current.focus();
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

  const handleFormat = (format, value = null) => {
    if (format === 'color') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        setSelectionRange(selection.getRangeAt(0));
      }
      setShowColorPicker(!showColorPicker);
    } else {
      if (format !== 'undo' && format !== 'redo') {
        document.execCommand(format);
      }
      textAreaRef.current.focus();
    }
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
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    if (selectionRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectionRange);
    }
  };

  return (
    <div style={{ minWidth: '600px', margin: 'auto', marginTop: '20px', color: 'black' }}>
      <div style={{ display: 'flex', background: '#fff' }}>
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
        style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', marginBottom: '20px', lineHeight: '1.5', backgroundColor: '#fff', paddingInline: '25px' }}
        onInput={handleHtmlChange}
      />
      {showColorPicker && (
        <div style={{ position: 'absolute', zIndex: '2', ...colorPickerPosition }}>
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default NextEdit;