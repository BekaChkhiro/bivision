import React from 'react';
import { RichText } from '@wordpress/block-editor';
import LanguageSelector from './LanguageSelector';

const RightSection = ({ 
    buttonText, 
    buttonColor, 
    buttonTextColor,
    buttonPaddingV,
    buttonPaddingH,
    buttonBorderRadius,
    buttonFontWeight,
    buttonFontSize,
    languageText,
    languageFlag,
    languageFlagSize,
    setAttributes
}) => {
    return (
        <div className="right-section" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <LanguageSelector 
                languageText={languageText}
                languageFlag={languageFlag}
                languageFlagSize={languageFlagSize}
                setAttributes={setAttributes}
            />

            {/* Demo Button */}
            <RichText
                tagName="a"
                value={buttonText}
                onChange={(text) => setAttributes({ buttonText: text })}
                style={{
                    backgroundColor: buttonColor,
                    color: buttonTextColor,
                    display: 'flex',
                    height: '40px',
                    padding: '10px 20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: buttonFontWeight,
                    fontSize: `${buttonFontSize}px`,
                    fontFamily: 'bold',
                    transition: 'all 0.3s ease'
                }}
            />
        </div>
    );
};

export default RightSection;
