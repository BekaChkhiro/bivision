document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for DOM to be fully ready
    setTimeout(function() {
        // Mobile menu functionality
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileCloseButton = document.querySelector('.mobile-close-button');
        const body = document.body;

        // Initialize mobile menu functionality
        if (mobileMenuToggle && mobileMenu) {
            // Open mobile menu
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                mobileMenu.classList.remove('hidden');
                body.classList.add('mobile-menu-open');
            });

            // Close mobile menu
            if (mobileCloseButton) {
                mobileCloseButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    mobileMenu.classList.add('hidden');
                    body.classList.remove('mobile-menu-open');
                });
            }

            // Close mobile menu when clicking outside
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    body.classList.remove('mobile-menu-open');
                }
            });
        }

        // Handle mobile submenu toggles
        const mobileSubmenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
        
        mobileSubmenuToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const submenu = toggle.nextElementSibling;
                
                if (submenu && submenu.classList.contains('mobile-submenu')) {
                    const isOpen = !submenu.classList.contains('hidden');
                    
                    if (isOpen) {
                        // Close submenu
                        submenu.classList.add('hidden');
                        toggle.setAttribute('aria-expanded', 'false');
                    } else {
                        // Close other open submenus first
                        mobileSubmenuToggles.forEach(function(otherToggle) {
                            if (otherToggle !== toggle) {
                                const otherSubmenu = otherToggle.nextElementSibling;
                                if (otherSubmenu && otherSubmenu.classList.contains('mobile-submenu')) {
                                    otherSubmenu.classList.add('hidden');
                                    otherToggle.setAttribute('aria-expanded', 'false');
                                }
                            }
                        });
                        
                        // Open this submenu
                        submenu.classList.remove('hidden');
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });
            
            // Set initial aria-expanded state
            toggle.setAttribute('aria-expanded', 'false');
        });

        // Handle mobile menu links (close menu when clicking on non-submenu links)
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu a:not(.mobile-submenu-toggle)');
        
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Close mobile menu when clicking on regular links
                if (mobileMenu && !link.closest('.mobile-submenu')) {
                    mobileMenu.classList.add('hidden');
                    body.classList.remove('mobile-menu-open');
                }
            });
        });

        // Handle demo button in mobile menu
        const mobileDemoButton = document.querySelector('.mobile-demo-button');
        if (mobileDemoButton) {
            mobileDemoButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu first
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                    body.classList.remove('mobile-menu-open');
                }
                
                // Try to trigger lead popup
                const popupElement = document.getElementById('bevision-lead-popup');
                const overlayElement = document.getElementById('popup-overlay');
                
                if (popupElement && overlayElement) {
                    popupElement.style.display = 'block';
                    overlayElement.style.display = 'block';
                    body.style.overflow = 'hidden';
                } else {
                    // Fallback: try to trigger popup via event
                    const event = new CustomEvent('openLeadPopup');
                    document.dispatchEvent(event);
                }
            });
        }
    }, 100); // Close setTimeout after 100ms
});