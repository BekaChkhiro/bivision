import React from 'react';
import { RichText } from '@wordpress/block-editor';

const LanguageSelector = ({ languageText, languageFlag, languageFlagSize, setAttributes }) => {
    return (
        <div className="language-selector" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
        }}>
            <img 
                src="/wp-content/themes/BeVision/assets/images/language-icon.svg" 
                alt="Language Icon" 
                style={{
                    width: '15px',
                    height: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    transform: 'translateY(-1px)'
                }} 
            />
            <img 
                src={languageFlag} 
                alt="Language Flag" 
                style={{
                    width: `${languageFlagSize}px`,
                    height: `${languageFlagSize}px`,
                    display: 'flex',
                    alignItems: 'center'
                }} 
            />
            <RichText
                tagName="span"
                value={languageText}
                onChange={(text) => setAttributes({ languageText: text })}
                style={{
                    color: 'var(--Grey, #8399AF)',
                    textAlign: 'center',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontFamily: 'roman',
                    lineHeight: 'normal',
                    display: 'flex',
                    alignItems: 'center'
                }}
            />
        </div>
    );
};

export default LanguageSelector;
