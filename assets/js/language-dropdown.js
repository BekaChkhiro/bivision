/**
 * Language Dropdown Functionality
 * Handles both desktop and mobile language dropdowns with dynamic language options
 * and hover support
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize language dropdowns
        initLanguageDropdowns();

        /**
         * Initialize language dropdown functionality
         */
        function initLanguageDropdowns() {
            setupDropdown('.language-selector', '#desktop-language-dropdown');
            setupDropdown('.language-selector-mobile', '#mobile-language-dropdown');

            // Close dropdowns when clicking elsewhere on page
            document.addEventListener('click', function(event) {
                // Don't close if we're in hover mode and interacting with the dropdown
                if (event.target.closest('.hover-dropdown')) {
                    return;
                }
                
                const dropdowns = document.querySelectorAll('.language-dropdown');
                let clickedOnDropdown = false;
                
                // Check if click was inside a language selector
                const selectors = document.querySelectorAll('.language-selector, .language-selector-mobile');
                selectors.forEach(function(selector) {
                    if (selector.contains(event.target)) {
                        clickedOnDropdown = true;
                    }
                });
                
                // If clicked outside, close all dropdowns that don't have hover-dropdown parent
                if (!clickedOnDropdown) {
                    const nonHoverDropdowns = document.querySelectorAll('.language-dropdown:not(.hover-dropdown .language-dropdown)');
                    nonHoverDropdowns.forEach(function(dropdown) {
                        dropdown.classList.remove('open');
                    });
                }
            });
        }

        /**
         * Set up dropdown toggle behavior
         * 
         * @param {string} selectorClass - Selector container class
         * @param {string} dropdownId - Dropdown element ID
         */
        function setupDropdown(selectorClass, dropdownId) {
            const selector = document.querySelector(selectorClass);
            const dropdown = document.querySelector(dropdownId);
            
            if (!selector || !dropdown) return;

            // Skip toggle for hover dropdowns - they'll work with CSS
            if (!selector.classList.contains('hover-dropdown')) {
                // Toggle dropdown on click
                selector.addEventListener('click', function(event) {
                    // Prevent click from immediately closing dropdown
                    event.stopPropagation();
                    
                    // Toggle open class
                    const isOpen = dropdown.classList.contains('open');
                    
                    // First close all dropdowns
                    const allDropdowns = document.querySelectorAll('.language-dropdown');
                    allDropdowns.forEach(function(dropdown) {
                        dropdown.classList.remove('open');
                    });
                    
                    // Then open this one if it was closed
                    if (!isOpen) {
                        dropdown.classList.add('open');
                    }
                });
            }

            // Handle language option click
            const languageOptions = dropdown.querySelectorAll('.language-option');
            languageOptions.forEach(function(option) {
                option.addEventListener('click', function(event) {
                    // Prevent default link behavior if it's a test link
                    const href = option.getAttribute('href');
                    if (href === '#') {
                        event.preventDefault();
                    }
                    
                    // Get language text and code
                    const languageText = option.querySelector('span').textContent;
                    const languageCode = option.getAttribute('data-lang-code');
                    
                    // Update current language display
                    const currentText = selector.querySelector('.language-current span:not(.arrow-down)');
                    if (currentText) currentText.textContent = languageText;
                    
                    // Close dropdown if not hover type
                    if (!selector.classList.contains('hover-dropdown')) {
                        dropdown.classList.remove('open');
                    }
                    
                    // Create custom event for language change
                    const event = new CustomEvent('languageChanged', {
                        detail: {
                            code: languageCode,
                            name: languageText,
                            url: href
                        }
                    });
                    document.dispatchEvent(event);
                    
                    // Only navigate if it's not a test link and prevention hasn't occurred
                    if (href && href !== '#') {
                        // Give time for any custom event handlers to run before navigating
                        setTimeout(function() {
                            window.location.href = href;
                        }, 100);
                    }
                });
            });
        }
    });
})();
