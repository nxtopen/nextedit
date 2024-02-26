import React, { useState, useRef, useEffect, useCallback } from 'react';
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

  const handleFormat = useCallback((format) => {
    textAreaRef.current.focus();
    document.execCommand(format);
    saveSelection();
  }, []);

  const handleHtmlChange = useCallback(() => {
    const html = textAreaRef.current.innerHTML;
    onChange(html);
  }, [onChange]);

  const handleColorChange = useCallback((color) => {
    setSelectedColor(color.hex);
    applyColor(color.hex);
  }, []);

  const applyColor = useCallback((color) => {
    textAreaRef.current.focus();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    saveSelection();
  }, []);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    localStorage.setItem('selectionStart', range.startOffset);
    localStorage.setItem('selectionEnd', range.endOffset);
  }, []);

  const restoreSelection = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (showColorPicker) {
      const iconRect = colorPickerRef.current.getBoundingClientRect();
      setColorPickerPosition({ top: iconRect.bottom, left: iconRect.left });
    }
  }, [showColorPicker]);

  const buttonStyle = {
    cursor: 'pointer',
    padding: '5px 10px',
    margin: '5px',
    backgroundColor: '#eaeaea',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: 'black'
  };

  // Button hover style
  const buttonHoverStyle = {
    backgroundColor: '#dcdcdc',
  };


  return (
    <div className="next-edit-container" style={{ minWidth: '100%', margin: 'auto', marginTop: '20px', color: 'black' }}>
      <div style={{ display: 'flex', background: '#fff', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => handleFormat('bold')}>Bold</button>
        <button style={buttonStyle} onClick={() => handleFormat('italic')}>Italic</button>
        <button style={buttonStyle} onClick={() => handleFormat('underline')}>Underline</button>
        <button style={buttonStyle} onClick={() => handleFormat('justifyLeft')}>Align Left</button>
        <button style={buttonStyle} onClick={() => handleFormat('justifyCenter')}>Align Center</button>
        <button style={buttonStyle} onClick={() => handleFormat('justifyRight')}>Align Right</button>
        <button style={buttonStyle} onClick={() => handleFormat('insertOrderedList')}>Numbered List</button>
        <button style={buttonStyle} onClick={() => handleFormat('insertUnorderedList')}>Bulleted List</button>
        <button style={buttonStyle} ref={colorPickerRef} onClick={() => handleFormat('color')}>Text Color</button>
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