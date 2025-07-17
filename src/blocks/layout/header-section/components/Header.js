import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import RightSection from './RightSection';

const Header = ({ attributes, setAttributes, updateMenuItem }) => {
    return (
        <header style={{ backgroundColor: attributes.backgroundColor }}>
            <div className="header-container" style={{
                maxWidth: '1250px',
                margin: '0 auto',
                padding: '25px 0px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Logo 
                    logo={attributes.logo}
                    logoHeight={attributes.logoHeight}
                    logoWidth={attributes.logoWidth}
                />

                <Navigation 
                    menuItems={attributes.menuItems}
                    submenuEnabled={attributes.submenuEnabled}
                    updateMenuItem={updateMenuItem}
                />

                <RightSection 
                    buttonText={attributes.buttonText}
                    buttonColor={attributes.buttonColor}
                    buttonTextColor={attributes.buttonTextColor}
                    buttonPaddingV={attributes.buttonPaddingV}
                    buttonPaddingH={attributes.buttonPaddingH}
                    buttonBorderRadius={attributes.buttonBorderRadius}
                    buttonFontWeight={attributes.buttonFontWeight}
                    buttonFontSize={attributes.buttonFontSize}
                    languageText={attributes.languageText}
                    languageFlag={attributes.languageFlag}
                    languageFlagSize={attributes.languageFlagSize}
                    setAttributes={setAttributes}
                />
            </div>
        </header>
    );
};

export default Header;
