import React from 'react';

const Logo = ({ logo, logoHeight, logoWidth }) => {
    return (
        <div className="logo-section">
            <img 
                src={logo} 
                alt="Logo" 
                style={{
                    height: `${logoHeight}px`,
                    width: logoWidth === 'auto' ? 'auto' : `${logoWidth}px`,
                    objectFit: 'contain'
                }} 
            />
        </div>
    );
};

export default Logo;
