import React from 'react';
import { ChromePicker } from 'react-color';

const ColorPicker = ({ position, onChange }) => {
  return (
    <div style={{ position: 'absolute', zIndex: '2', top: position.top, left: position.left }}>
      <ChromePicker onChange={onChange} />
    </div>
  );
};

export default ColorPicker;