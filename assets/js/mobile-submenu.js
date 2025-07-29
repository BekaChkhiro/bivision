/**
 * Mobile submenu toggle functionality for WordPress menus
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        function initMobileSubmenu() {
            // Get all WordPress menu items with children in mobile menu
            const wpMenuItems = document.querySelectorAll('.mobile-menu .menu-item-has-children');
            
            wpMenuItems.forEach(function(item) {
                // Find existing toggle button or create one
                let toggle = item.querySelector('.mobile-submenu-toggle');
                
                if (!toggle) {
                    // If no toggle exists, this might be a custom menu item
                    return;
                }
                
                // Set initial aria-expanded state
                toggle.setAttribute('aria-expanded', 'false');
                
                // Add click event to toggle button
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const submenu = item.querySelector('.mobile-submenu');
                    if (!submenu) return;
                    
                    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
                    
                    if (isOpen) {
                        // Close submenu
                        submenu.style.maxHeight = '0';
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.querySelector('svg').style.transform = 'rotate(0deg)';
                    } else {
                        // Close other open submenus first
                        wpMenuItems.forEach(function(otherItem) {
                            if (otherItem !== item) {
                                const otherSubmenu = otherItem.querySelector('.mobile-submenu');
                                const otherToggle = otherItem.querySelector('.mobile-submenu-toggle');
                                if (otherSubmenu && otherToggle) {
                                    otherSubmenu.style.maxHeight = '0';
                                    otherToggle.setAttribute('aria-expanded', 'false');
                                    const otherSvg = otherToggle.querySelector('svg');
                                    if (otherSvg) {
                                        otherSvg.style.transform = 'rotate(0deg)';
                                    }
                                }
                            }
                        });
                        
                        // Open this submenu
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                        toggle.querySelector('svg').style.transform = 'rotate(180deg)';
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }
        
        // Initialize submenu functionality
        initMobileSubmenu();
        
        // Re-initialize when mobile menu is toggled (if needed)
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                // Allow time for mobile menu to be shown in the DOM
                setTimeout(initMobileSubmenu, 100);
            });
        }
    });
})();
