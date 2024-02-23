import React, { useState, useRef } from 'react';
import { IconButton } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatListNumbered, FormatListBulleted, FormatIndentIncrease, FormatIndentDecrease } from '@mui/icons-material';

const NEXTEditor = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const textAreaRef = useRef(null);

  const handleFormat = (format) => {
    document.execCommand(format);
    textAreaRef.current.focus();
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto', marginTop: '20px', color: 'black' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Custom HTML Editor</h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', background: '#fff' }}>
        <IconButton onClick={() => handleFormat('bold')}><FormatBold /></IconButton>
        <IconButton onClick={() => handleFormat('italic')}><FormatItalic /></IconButton>
        <IconButton onClick={() => handleFormat('underline')}><FormatUnderlined /></IconButton>
        <IconButton onClick={() => handleFormat('justifyLeft')}><FormatAlignLeft /></IconButton>
        <IconButton onClick={() => handleFormat('justifyCenter')}><FormatAlignCenter /></IconButton>
        <IconButton onClick={() => handleFormat('justifyRight')}><FormatAlignRight /></IconButton>
        <IconButton onClick={() => handleFormat('insertOrderedList')}><FormatListNumbered /></IconButton>
        <IconButton onClick={() => handleFormat('insertUnorderedList')}><FormatListBulleted /></IconButton>
        <IconButton onClick={() => handleFormat('indent')}><FormatIndentIncrease /></IconButton>
        <IconButton onClick={() => handleFormat('outdent')}><FormatIndentDecrease /></IconButton>
      </div>
      <div
        ref={textAreaRef}
        contentEditable={true}
        style={{ border: '1px solid #ccc', padding: '10px', minHeight: '100px', marginBottom: '20px', lineHeight: '1.5', backgroundColor: '#fff', paddingInline: '25px' }}
        onInput={(e) => setHtmlContent(e.target.innerHTML)}
      />
    </div>
  );
};

export default NEXTEditor;