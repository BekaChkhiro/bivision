import React from 'react';
import { useBlockProps } from '@wordpress/block-editor';
import MobileSave from './MobileSave';

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        style: {
            backgroundColor: attributes.backgroundColor,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }
    });

    // Add mobile styles with a style tag
    const customStyles = `
        /* Custom button styles */
        .bevision-demo-button-custom {
            display: flex !important;
            height: 40px !important;
            padding: 10px 20px !important;
            justify-content: center !important;
            align-items: center !important;
            gap: 10px !important;
            border-radius: 10px !important;
        }
        
        /* Language dropdown styles */
        .language-selector, .language-selector-mobile {
            position: relative;
            cursor: pointer;
        }
        
        .language-current {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 20px;
            font-weight: 600;
            color: #333;
            line-height: 1;
        }
        
        /* Arrow styles are now in the language-dropdown.css file */
        
        .language-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #eee;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            display: none;
            z-index: 1000;
            min-width: 120px;
            margin-top: 5px;
        }
        
        .language-dropdown.open {
            display: block;
        }
        
        .language-option {
            padding: 10px 15px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: background 0.2s;
            font-size: 20px;
            font-weight: 600;
            color: #333;
        }
        
        .language-option:hover {
            background: #f5f5f5;
        }
        
        .language-option img {
            width: 20px;
            height: 20px;
        }
        
            .mobile-menu-toggle {
                display: none;
            }
            
            @media (max-width: 768px) {
                .header-container {
                    flex-direction: column !important;
                    padding: 0px 20px !important;
                }
                .main-navigation {
                    display: none !important;
                }
                .mobile-menu-toggle {
                    display: flex !important;
                    order: 3;
                    align-items: center !important;
                    justify-content: center !important;
                }
                .right-section {
                    display: none !important;
                }
            .language-selector-mobile {
                display: flex !important;
                align-items: center !important;
                gap: 0.5rem !important;
                margin-right: 15px !important;
                margin-bottom: 0 !important;
            }
            .mobile-nav-container {
                display: flex !important;
                width: 100% !important;
                justify-content: space-between !important;
                align-items: center !important;
                height: 50px !important;
            }
            /* Mobile menu styles */
            .mobile-menu-close:hover {
                color: #6c5ce7;
            }
            .mobile-menu a:hover {
                color: #6c5ce7 !important;
            }
        }
        
        /* Mobile Menu Styles */
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 9999;
            overflow-y: auto;
        }
        
        .mobile-menu.hidden {
            display: none;
        }
        
        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }
        
        .mobile-menu-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .mobile-language-selector {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 600;
            color: #333;
            position: relative;
            cursor: pointer;
        }
        
        .mobile-close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 4px;
        }
        
        .mobile-menu-content {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 60px);
        }
        
        .mobile-navigation {
            flex: 1;
            padding: 0;
        }

        .mobile-navigation ul {
            padding: 0 !important;   
            margin: 0 !important;
        }

        .mobile-navigation {
            padding: 0 !important;
        }
        
        #mobile-navigation {
            padding: 0 !important;
        }
        
        .wp-mobile-menu-container {
            padding: 0 !important;
        }
        
        /* Mobile menu section styles */
        .mobile-menu-section {
            border-bottom: 1px solid #eee;
        }
        
        .mobile-section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            font-size: 16px;
            font-weight: 700;
            color: #221A4C;
            cursor: pointer;
        }
        
        .section-arrow {
            transition: transform 0.3s ease;
        }
        
        .mobile-section-content {
            padding: 0;
            background: transparent;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .mobile-submenu {
            background: transparent;
            border-bottom: 1px solid #eee;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .mobile-submenu-toggle {
            cursor: pointer;
        }
        
        .mobile-submenu-toggle svg {
            transition: transform 0.3s ease;
        }
        
        .mobile-product-item {
            padding: 12px 20px;
            border-top: 1px solid #eee;
        }
        
        .product-title {
            font-size: 16px;
            font-weight: 700;
            color: #221A4C;
            margin-bottom: 4px;
        }
        
        .product-description {
            font-size: 14px;
            color: #8399AF;
            font-weight: 400;
        }
        
        .mobile-menu-item {
            border-bottom: 1px solid #eee;
        }
        
        .mobile-menu-link {
            display: block;
            padding: 16px 20px;
            color: #221A4C;
            text-decoration: none;
            font-size: 16px;
            font-weight: 700;
        }
        
        .mobile-menu-demo {
            padding: 20px;
            margin-top: auto;
        }
        
        .mobile-demo-button {
            width: 100%;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 16px;
        }
        
        /* Body scroll lock when mobile menu is open */
        body.mobile-menu-open {
            overflow: hidden;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <header {...blockProps}>
                <div className="header-container" style={{
                    maxWidth: '1250px',
                    margin: '0 auto',
                    padding: '25px 0px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div className="mobile-nav-container">
                        <div className="logo-section">
                            <a href="/">
                                <img 
                                    src={attributes.logo} 
                                    alt="Logo" 
                                    className="desktop-header-logo"
                                    style={{
                                        height: `${attributes.logoHeight}px`,
                                        width: attributes.logoWidth === 'auto' ? 'auto' : `${attributes.logoWidth}px`,
                                        objectFit: 'contain'
                                    }} 
                                />
                            </a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            {/* Mobile Language Selector - hidden on desktop */}
                            <div className="language-selector-mobile hover-dropdown" style={{
                                display: 'none', /* Hide in desktop view */
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
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
                                        lineHeight: '1',
                                        fontFamily: 'roman'
                                    }}>{attributes.languageText}</span>
                                </div>
                                <div className="language-dropdown" id="mobile-language-dropdown">
                                    {attributes.languages.map((language, index) => (
                                        <a key={index} href={language.url} className="language-option" data-lang-code={language.code}>
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
                            
                            {/* Mobile Menu Toggle */}
                            <button 
                                className="mobile-menu-toggle" 
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '5px'
                                }}
                                aria-label="Toggle menu"
                            >
                                <img 
                                    src="/wp-content/themes/BeVision/assets/images/mobile-icon.svg" 
                                    alt="Menu"
                                    style={{
                                        width: '24px',
                                        height: '23px'
                                    }}
                                />
                            </button>
                        </div>
                    </div>

                   <div style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                    }}>
                        {/* Navigation Menu */}
                        <div className="main-navigation" style={{ flex: 1, margin: '0 40px 0 40px', display: 'flex', alignItems: 'center' }}>
                        {/* WordPress Menu Rendering - Will be processed by PHP */}
                        {attributes.useWordPressMenu && attributes.selectedMenuId > 0 && (
                            <div
                                className="wp-menu-container"
                                data-menu-id={attributes.selectedMenuId}
                                data-use-wp-menu="true"
                            ></div>
                        )}
                        
                        {/* Custom Menu Items */}
                        {(!attributes.useWordPressMenu || attributes.selectedMenuId === 0) && (
                            <nav style={{ display: 'flex', gap: '2rem' }}>
                                <ul>
                                    {attributes.menuItems.map((item, index) => (
                                        attributes.submenuEnabled ? (
                                            <li key={index} className="menu-item-with-description" style={{
                                                background: '#fff',
                                                padding: '20px',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s ease',
                                                width: '220px'
                                            }}>
                                                <a 
                                                    href={item.url} 
                                                    className="menu-item-title"
                                                    style={{ 
                                                        fontSize: '18px',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'bold',
                                                        color: '#333',
                                                        marginBottom: '8px',
                                                        display: 'block'
                                                    }}
                                                >
                                                    {item.text}
                                                </a>
                                                <span className="menu-item-description" style={{
                                                    color: '#777',
                                                    fontSize: '14px',
                                                    lineHeight: '1.4',
                                                    fontFamily: 'roman'
                                                }}>
                                                    {item.description}
                                                </span>
                                            </li>
                                        ) : (
                                            <li key={index}>
                                                <a 
                                                    href={item.url} 
                                                    style={{ color: '#333', textDecoration: 'none', fontFamily: 'bold' }}
                                                >
                                                    {item.text}
                                                </a>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </nav>
                        )}
                        </div>

                        {/* Right Section */}
                        <div className="right-section" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.5rem',
                            paddingTop: '5px'  /* Add a slight padding to move content down */
                        }}>
                            {/* Language Selector */}
                            <div className="language-selector hover-dropdown">
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
                                        lineHeight: '1',
                                        fontFamily: 'roman'
                                    }}>{attributes.languageText}</span>
                                </div>
                                <div className="language-dropdown" id="desktop-language-dropdown">
                                    {attributes.languages.map((language, index) => (
                                        <a key={index} href={language.url} className="language-option" data-lang-code={language.code}>
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

                            {/* Demo Button */}
                            <button 
                                id="header-demo-button"
                                className="demo-button bevision-demo-button-custom" 
                                style={{
                                    backgroundColor: attributes.buttonColor,
                                    color: attributes.buttonTextColor,
                                    display: 'flex',
                                    height: '40px',
                                    padding: '10px 20px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '10px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontWeight: attributes.buttonFontWeight,
                                    fontSize: '16px',
                                    fontFamily: 'bold',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {attributes.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu */}
            <MobileSave attributes={attributes} />
            
            {/* Lead Popup */}
            <div id="bevision-lead-popup" className="bevision-lead-popup" style={{ display: 'none' }}>
                <button className="popup-close">&times;</button>
                <div className="popup-content">
                    <h2 className="popup-title">Request a demo</h2>
                    <p className="popup-subtitle">Please enter your name and number, we will contact you shortly</p>
                    
                    <form id="lead-form" className="popup-form">
                        <input type="hidden" id="lead_form_nonce" name="lead_form_nonce" value="" />
                        <div className="form-group">
                            <input type="text" id="name" name="name" placeholder="Your name" required />
                        </div>
                        <div className="form-group">
                            <input type="text" id="company" name="company" placeholder="Company" required />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phone" name="phone" placeholder="Phone number" required />
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="form-buttons">
                            <button 
                                type="submit"
                                className="submit-button"
                                style={{
                                    backgroundColor: '#6c5ce7',
                                    color: '#ffffff'
                                }}
                            >
                                Request
                            </button>
                            <button 
                                type="button"
                                className="cancel-button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div id="success-message" className="success-message" style={{ display: 'none' }}>
                        Thank you for your submission! We will contact you shortly.
                    </div>
                </div>
            </div>
            <div id="popup-overlay" className="popup-overlay" style={{ display: 'none' }}></div>
        </>
    );
};

export default Save;
