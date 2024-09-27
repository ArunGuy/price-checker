import React from 'react';

const PlaceholderImage = ({ size = 32, text = '' }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#64748b',
    fontSize: `${size / 4}px`,
    fontWeight: 'bold',
    borderRadius: '4px',
  };

  return (
    <div style={style}>
      {text || `${size}x${size}`}
    </div>
  );
};

export default PlaceholderImage;