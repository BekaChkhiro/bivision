import React from 'react';

const MobileSave = ({ attributes }) => {
    // We'll handle the mobile menu toggle through the PHP script instead of React
    // This prevents React errors in the editor while still providing the functionality on the frontend
    
    // Define the products menu items based on the screenshot (fallback if WordPress menu is not used)
    const productItems = [
        { title: 'BiRetail', description: 'Lorem ipsum dolor sit amet' },
        { title: 'BiFinance', description: 'Sed tincidunt, sapien ut aliquam dapibus' },
        { title: 'BiStock', description: 'Proin nec tortor nec justo consequat luctus.' },
        { title: 'BiAudit', description: 'Lorem ipsum dolor sit amet' },
        { title: 'BiDebitors', description: 'Sed tincidunt, sapien ut aliquam dapibus' },
        { title: 'BiHostipal', description: 'Proin nec tortor nec justo consequat luctus.' },
    ];

    // Define the main menu items (fallback if WordPress menu is not used)
    const mainMenuItems = [
        { text: 'Products', hasSubmenu: true, submenu: productItems },
        { text: 'Why BI', url: '#why-bi', hasSubmenu: false },
        { text: 'About us', url: '#about-us', hasSubmenu: false },
        { text: 'Clients', url: '#clients', hasSubmenu: false },
        { text: 'Contact', url: '#contact', hasSubmenu: false },
    ];

    return (
        <div className="mobile-menu hidden">
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                    <a href="/">
                        <img 
                            src={attributes.logo} 
                            alt="Logo"
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
                        <img 
                            src="/wp-content/themes/BeVision/assets/images/mobile-close.svg" 
                            alt="Close Menu" 
                            style={{
                                width: '24px',
                                height: '24px'
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            <div className="mobile-menu-content">
                <nav className="mobile-navigation">
                    {/* WordPress Menu Rendering with custom styling */}
                    {attributes.useMobileWordPressMenu && attributes.selectedMobileMenuId > 0 ? (
                        <div
                            className="wp-mobile-menu-container custom-styled-menu"
                            data-menu-id={attributes.selectedMobileMenuId}
                            data-use-mobile-wp-menu="true"
                            data-menu-style="custom"
                        ></div>
                    ) : (
                        /* Fallback custom menu if WordPress menu is not selected */
                        <>
                            {/* Products section with dropdown arrow */}
                            <div className="mobile-menu-section">
                                <div className="mobile-section-header">
                                    <span>Products</span>
                                    <span className="section-arrow">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                                
                                {/* Products submenu items */}
                                <div className="mobile-section-content">
                                    {productItems.map((product, index) => (
                                        <div key={index} className="mobile-product-item">
                                            <div className="product-title">{product.title}</div>
                                            <div className="product-description">{product.description}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Other menu items */}
                            <div className="mobile-menu-item">
                                <a href="#why-bi" className="mobile-menu-link">Why BI</a>
                            </div>
                            <div className="mobile-menu-item">
                                <a href="#about-us" className="mobile-menu-link">About us</a>
                            </div>
                            <div className="mobile-menu-item">
                                <a href="#clients" className="mobile-menu-link">Clients</a>
                            </div>
                            <div className="mobile-menu-item">
                                <a href="#contact" className="mobile-menu-link">Contact</a>
                            </div>
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
                            height: '50px',
                            padding: '10px 20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px',
                            borderRadius: '10px',
                            fontSize: '16px',
                            fontWeight: attributes.buttonFontWeight || '500',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: 'none',
                            cursor: 'pointer',
                            width: '100%'
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