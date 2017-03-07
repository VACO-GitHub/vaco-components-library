import React from 'react';

const arrowRenderer = ({ onMouseDown }) => {
  return <span className="Select-arrow" onMouseDown={onMouseDown} />;
};

export default arrowRenderer;
