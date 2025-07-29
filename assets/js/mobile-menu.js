document.addEventListener("DOMContentLoaded", function() {
    // Add CSS to ensure proper mobile menu styling
    const mobileMenuStyles = document.createElement('style');
    mobileMenuStyles.textContent = `
        body.mobile-menu-open {
            overflow: hidden !important;
            position: fixed;
            width: 100%;
            height: 100%;
        }
        .mobile-menu-logo img {
            height: 18px !important;
            width: 106px !important;
            object-fit: contain !important;
            max-width: 106px !important;
            min-width: 106px !important;
            min-height: 18px !important;
        }
        .mobile-menu:not(.hidden) .mobile-menu-logo img {
            height: 18px !important;
            width: 106px !important;
            object-fit: contain !important;
            max-width: 106px !important;
            min-width: 106px !important;
            min-height: 18px !important;
        }
        @media (max-width: 768px) {
            .mobile-menu-logo img,
            .mobile-menu .mobile-menu-logo img,
            .mobile-menu-header .mobile-menu-logo img {
                height: 18px !important;
                width: 106px !important;
                object-fit: contain !important;
                max-width: 106px !important;
                min-width: 106px !important;
                min-height: 18px !important;
            }
        }
        .mobile-menu {
            height: 100% !important;
            width: 100% !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            position: fixed !important;
            z-index: 9999 !important;
            background-color: #ffffff !important;
            display: flex !important;
            flex-direction: column !important;
        }
        .mobile-menu.hidden {
            display: none !important;
        }
    `;
    document.head.appendChild(mobileMenuStyles);
    // Get mobile menu toggle button
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileMenuToggle) return;
    
    // Check if mobile menu already exists
    let mobileMenu = document.querySelector('.mobile-menu');
    
    // If mobile menu doesn't exist, create it
    if (!mobileMenu) {
        // Create mobile menu
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.classList.add('hidden');
        mobileMenu.style.position = 'fixed';
        mobileMenu.style.top = '0';
        mobileMenu.style.left = '0';
        mobileMenu.style.width = '100%';
        mobileMenu.style.height = '100vh';
        mobileMenu.style.backgroundColor = '#ffffff';
        mobileMenu.style.zIndex = '2000';
        mobileMenu.style.overflowY = 'auto';
        mobileMenu.style.flexDirection = 'column';
        
        // Create header with logo and close button
        const mobileHeader = document.createElement('div');
        mobileHeader.style.display = 'flex';
        mobileHeader.style.justifyContent = 'space-between';
        mobileHeader.style.alignItems = 'center';
        mobileHeader.style.padding = '15px 20px';
        mobileHeader.style.borderBottom = '1px solid #eee';
        
        // Logo section
        const logoSection = document.createElement('div');
        logoSection.className = 'mobile-menu-logo';
        logoSection.style.display = 'flex';
        logoSection.style.alignItems = 'center';
        
        const logoLink = document.createElement('a');
        logoLink.href = '/';
        logoLink.style.display = 'flex';
        logoLink.style.alignItems = 'center';
        
        // Get desktop logo
        const desktopLogo = document.querySelector('.logo-section img');
        const logoImg = document.createElement('img');
        
        if (desktopLogo) {
            // Use the same logo as desktop version
            logoImg.src = desktopLogo.src;
            logoImg.alt = desktopLogo.alt || 'Logo';
            // Set explicit size for mobile logo
            logoImg.style.height = '18px'; // Mobile logo height
            logoImg.style.width = '106px'; // Mobile logo width
            logoImg.style.objectFit = 'contain';
            logoImg.style.maxWidth = '106px'; // Prevent logo from being too wide
            logoImg.style.minWidth = '106px'; // Ensure minimum width
            logoImg.style.minHeight = '18px'; // Ensure minimum height
        } else {
            // Fallback if desktop logo not found
            logoImg.src = '/wp-content/themes/BeVision/assets/images/logo.svg';
            logoImg.alt = 'Logo';
            logoImg.style.height = '18px';
            logoImg.style.width = '106px';
            logoImg.style.objectFit = 'contain';
            logoImg.style.maxWidth = '106px';
            logoImg.style.minWidth = '106px';
            logoImg.style.minHeight = '18px';
        }
        logoLink.appendChild(logoImg);
        logoSection.appendChild(logoLink);
        mobileHeader.appendChild(logoSection);
        
        // Force the logo size after appending to DOM
        setTimeout(() => {
            const mobileLogo = mobileMenu.querySelector('.mobile-menu-logo img');
            if (mobileLogo) {
                mobileLogo.style.height = '18px';
                mobileLogo.style.width = '106px';
                mobileLogo.style.objectFit = 'contain';
                mobileLogo.style.maxWidth = '106px';
                mobileLogo.style.minWidth = '106px';
                mobileLogo.style.minHeight = '18px';
            }
        }, 10);
        
        // Language and close button container
        const headerActions = document.createElement('div');
        headerActions.style.display = 'flex';
        headerActions.style.alignItems = 'center';
        headerActions.style.justifyContent = 'flex-end';
        headerActions.style.gap = '0';
        
        // Language selector with dropdown
        const langSelector = document.createElement('div');
        langSelector.className = 'language-selector hover-dropdown';
        langSelector.style.position = 'relative';
        langSelector.style.cursor = 'pointer';
        langSelector.style.marginRight = '15px';
        
        // Get desktop language selector elements
        const desktopLangSelector = document.querySelector('.language-selector');
        const desktopDropdown = document.querySelector('#desktop-language-dropdown');
        const desktopLangText = document.querySelector('.language-selector .language-current span:not(.arrow-down)');
        
        // Create language current container
        const langCurrent = document.createElement('div');
        langCurrent.className = 'language-current';
        langCurrent.style.display = 'flex';
        langCurrent.style.alignItems = 'center';
        langCurrent.style.gap = '0.5rem';
        langCurrent.style.fontSize = '20px';
        langCurrent.style.fontWeight = '600';
        langCurrent.style.color = '#333';
        
        // Add language text
        const langText = document.createElement('span');
        if (desktopLangText) {
            // Use the same language text as desktop version
            langText.textContent = desktopLangText.textContent;
        } else {
            // Fallback if desktop language text not found
            langText.textContent = 'GE';
        }
        
        // Add arrow down
        const arrowDown = document.createElement('span');
        arrowDown.className = 'arrow-down';
        
        langCurrent.appendChild(langText);
        langCurrent.appendChild(arrowDown);
        langSelector.appendChild(langCurrent);
        
        // Create dropdown menu
        const langDropdown = document.createElement('div');
        langDropdown.className = 'language-dropdown';
        langDropdown.id = 'mobile-menu-language-dropdown';
        langDropdown.style.position = 'absolute';
        langDropdown.style.top = '100%';
        langDropdown.style.right = '0';
        langDropdown.style.background = 'white';
        langDropdown.style.border = '1px solid #eee';
        langDropdown.style.borderRadius = '4px';
        langDropdown.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        langDropdown.style.display = 'none';
        langDropdown.style.zIndex = '1000';
        langDropdown.style.minWidth = '120px';
        langDropdown.style.marginTop = '5px';
        
        // Clone language options from desktop dropdown if available
        if (desktopDropdown) {
            const desktopOptions = desktopDropdown.querySelectorAll('.language-option');
            desktopOptions.forEach(option => {
                const langOption = option.cloneNode(true);
                langOption.style.padding = '8px 16px';
                langOption.style.display = 'flex';
                langOption.style.alignItems = 'center';
                langOption.style.gap = '8px';
                langOption.style.transition = 'background 0.2s';
                langOption.style.fontSize = '20px';
                langOption.style.fontWeight = '600';
                langOption.style.color = '#333';
                langOption.addEventListener('mouseover', function() {
                    this.style.background = '#f5f5f5';
                });
                langOption.addEventListener('mouseout', function() {
                    this.style.background = '';
                });
                langDropdown.appendChild(langOption);
            });
        } else {
            // Fallback if desktop dropdown not found
            const languages = [
                { code: 'GE', name: 'GE', url: '#' },
                { code: 'EN', name: 'EN', url: '#' }
            ];
            
            languages.forEach(lang => {
                const langOption = document.createElement('a');
                langOption.href = lang.url;
                langOption.className = 'language-option';
                langOption.setAttribute('data-lang-code', lang.code);
                langOption.style.padding = '8px 16px';
                langOption.style.display = 'flex';
                langOption.style.alignItems = 'center';
                langOption.style.gap = '8px';
                langOption.style.transition = 'background 0.2s';
                langOption.style.fontSize = '20px';
                langOption.style.fontWeight = '600';
                langOption.style.color = '#333';
                
                const optionText = document.createElement('span');
                optionText.textContent = lang.name;
                
                langOption.appendChild(optionText);
                langOption.addEventListener('mouseover', function() {
                    this.style.background = '#f5f5f5';
                });
                langOption.addEventListener('mouseout', function() {
                    this.style.background = '';
                });
                langDropdown.appendChild(langOption);
            });
        }
        
        langSelector.appendChild(langDropdown);
        
        // Toggle dropdown on click
        langSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = langDropdown.style.display === 'block';
            langDropdown.style.display = isOpen ? 'none' : 'block';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langSelector.contains(e.target)) {
                langDropdown.style.display = 'none';
            }
        });
        
        headerActions.appendChild(langSelector);
        
        // Close button
        const closeButton = document.createElement('button');
        closeButton.className = 'mobile-menu-close';
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '24px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.padding = '0';
        closeButton.style.color = '#333';
        closeButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 6L18 18" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
        
        headerActions.appendChild(closeButton);
        mobileHeader.appendChild(headerActions);
        
        mobileMenu.appendChild(mobileHeader);
        
        // Create menu container
        const menuContainer = document.createElement('div');
        menuContainer.style.padding = '0';
        menuContainer.style.margin = '0';
        menuContainer.style.display = 'flex';
        menuContainer.style.flexDirection = 'column';
        menuContainer.style.flexGrow = '1';
        menuContainer.style.width = '100%';
        
        // Add menu items
        const menuLinks = document.querySelectorAll('.main-navigation a');
        menuLinks.forEach((link, index) => {
            const menuItem = document.createElement('a');
            menuItem.href = link.href;
            menuItem.textContent = link.textContent;
            menuItem.style.color = '#333';
            menuItem.style.textDecoration = 'none';
            menuItem.style.fontSize = '18px';
            menuItem.style.fontWeight = '500';
            menuItem.style.padding = '18px 20px';
            menuItem.style.borderBottom = '1px solid #eee';
            menuItem.style.display = 'flex';
            menuItem.style.justifyContent = 'space-between';
            
            // Add dropdown arrow for Products (first item)
            if (index === 0) {
                const arrow = document.createElement('span');
                arrow.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
                menuItem.appendChild(arrow);
            }
            
            menuContainer.appendChild(menuItem);
        });
        
        mobileMenu.appendChild(menuContainer);
        
        // Add demo button container at the bottom
        const demoButtonContainer = document.createElement('div');
        demoButtonContainer.style.padding = '20px';
        demoButtonContainer.style.width = '100%';
        demoButtonContainer.style.marginTop = 'auto';
        demoButtonContainer.style.boxSizing = 'border-box';
        
        // Add demo button
        const demoButton = document.createElement('button');
        demoButton.textContent = 'Request a demo';
        demoButton.className = 'demo-button';
        demoButton.style.backgroundColor = '#6c5ce7';
        demoButton.style.color = '#ffffff';
        demoButton.style.border = 'none';
        demoButton.style.borderRadius = '4px';
        demoButton.style.padding = '15px';
        demoButton.style.width = '100%';
        demoButton.style.fontSize = '16px';
        demoButton.style.fontWeight = '500';
        demoButton.style.cursor = 'pointer';
        demoButton.style.textAlign = 'center';
        demoButton.style.marginTop = 'auto';
        
        demoButtonContainer.appendChild(demoButton);
        mobileMenu.appendChild(demoButtonContainer);
        document.body.appendChild(mobileMenu);
        
        // Toggle menu
        mobileMenuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                document.body.classList.add('mobile-menu-open');
                
                // Ensure logo size is correct when menu opens
                const mobileLogo = mobileMenu.querySelector('.mobile-menu-logo img');
                if (mobileLogo) {
                    mobileLogo.style.height = '18px';
                    mobileLogo.style.width = '106px';
                    mobileLogo.style.objectFit = 'contain';
                    mobileLogo.style.maxWidth = '106px';
                    mobileLogo.style.minWidth = '106px';
                    mobileLogo.style.minHeight = '18px';
                }
            } else {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('mobile-menu-open');
            }
        });
        
        // Close menu
        closeButton.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('mobile-menu-open');
        });
        
        // Add click event for demo button
        demoButton.addEventListener('click', function(e) {
            e.preventDefault();
            const popupElement = document.getElementById('bevision-lead-popup');
            const overlayElement = document.getElementById('popup-overlay');
            
            if (popupElement && overlayElement) {
                popupElement.style.display = 'block';
                overlayElement.style.display = 'block';
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('mobile-menu-open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    }
});