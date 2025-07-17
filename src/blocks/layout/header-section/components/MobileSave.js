import React from 'react';

const MobileSave = ({ attributes }) => {
    return (
        <div className="mobile-menu hidden">
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                    <a href="/">
                        <img 
                            src={attributes.logo} 
                            alt="Logo" 
                            style={{ height: '36px', width: 'auto' }}
                        />
                    </a>
                </div>
                
                <div className="mobile-menu-actions">
                    {/* Language Selector */}
                    <div className="mobile-language-selector">
                        <div className="language-current">
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
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                lineHeight: '1'
                            }}>{attributes.languageText || 'GE'}</span>
                        </div>
                        <div className="language-dropdown hidden">
                            {attributes.languages?.map((language, index) => (
                                <a key={index} href={language.url} className="language-option" data-lang-code={language.code}>
                                    {language.flag && (
                                        <img 
                                            src={language.flag} 
                                            alt={language.code} 
                                            style={{ width: '20px', height: '15px' }}
                                        />
                                    )}
                                    <span style={{
                                        color: 'var(--Grey, #8399AF)',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                        fontStyle: 'normal',
                                        fontWeight: '400',
                                        lineHeight: 'normal'
                                    }}>{language.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Close Button */}
                    <button className="mobile-close-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6L18 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
              {/* Mobile Menu Content */}
            <div className="mobile-menu-content">
                <nav className="mobile-navigation">
                    {/* WordPress Menu Rendering for Mobile - Will be processed by PHP */}
                    {attributes.useMobileWordPressMenu && attributes.selectedMobileMenuId > 0 && (
                        <div
                            className="wp-mobile-menu-container"
                            data-menu-id={attributes.selectedMobileMenuId}
                            data-use-mobile-wp-menu="true"
                        ></div>
                    )}
                    
                    {/* Custom Mobile Menu Items */}
                    {(!attributes.useMobileWordPressMenu || attributes.selectedMobileMenuId === 0) && (
                        <>
                            {attributes.mobileMenuItems?.map((item, index) => (
                        <div key={index} className="mobile-menu-item">
                            {item.hasSubmenu ? (
                                <>
                                    <button 
                                        className="mobile-submenu-toggle"
                                        data-submenu-index={index}
                                    >
                                        <span>{item.text}</span>
                                        <span className="submenu-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </button>                                    <div className="mobile-submenu hidden">
                                        {item.submenu?.map((subItem, subIndex) => (
                                            <a 
                                                key={subIndex}
                                                href={subItem.url}
                                                className="mobile-submenu-item"
                                            >
                                                <div className="mobile-submenu-item-content">
                                                    <div className="mobile-submenu-title">{subItem.title}</div>
                                                    {subItem.description && (
                                                        <div className="mobile-submenu-description">{subItem.description}</div>
                                                    )}
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <a 
                                    href={item.url}
                                    className="mobile-menu-link"
                                >
                                    {item.text}
                                </a>                            )}
                        </div>
                    ))}
                        </>
                    )}
                </nav>
                
                {/* Demo Button */}
                <div className="mobile-menu-demo">
                    <button 
                        className="mobile-demo-button"
                        style={{
                            backgroundColor: attributes.buttonColor || '#6c5ce7',
                            color: attributes.buttonTextColor || '#ffffff',
                            display: 'flex',
                            height: '40px',
                            padding: '10px 20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            borderRadius: '10px',
                            fontSize: `${attributes.buttonFontSize || 16}px`,
                            fontWeight: attributes.buttonFontWeight || '500',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {attributes.buttonText || 'Request a demo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileSave;