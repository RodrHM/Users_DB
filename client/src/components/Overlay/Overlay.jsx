import React from 'react';
import './styles/Overlay.css';

function Overlay({children, onClick}) {
  return (
    <div className="overlay" onClick={onClick} >
      {children}
    </div>
  );
}

export default Overlay;
