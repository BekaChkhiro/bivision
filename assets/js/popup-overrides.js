/**
 * This script ensures all demo buttons open the new popup
 */
document.addEventListener('DOMContentLoaded', function() {
    // Store reference to the new popup elements
    const newPopup = document.getElementById('bevision-new-popup');
    const newOverlay = document.getElementById('new-popup-overlay');
    
    // Function to open the new popup
    function openNewPopup() {
        if (newPopup && newOverlay) {
            newPopup.style.display = 'block';
            newOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Add event listeners to all demo buttons in the hero section
    function handleDemoButtons() {
        // Target all potential demo buttons
        const demoButtons = document.querySelectorAll('.demo-button, #header-demo-button, a[href*="#demo"], a[href*="contact"]');
        
        demoButtons.forEach(function(button) {
            try {
                // Remove existing handlers by cloning
                const newButton = button.cloneNode(true);
                if (button.parentNode) {
                    button.parentNode.replaceChild(newButton, button);
                    
                    // Add our handler
                    newButton.addEventListener('click', function(e) {
                        e.preventDefault();
                        openNewPopup();
                        return false;
                    });
                }
            } catch (err) {}
        });
    }
    
    // Handle all demo buttons now and when new ones are added
    handleDemoButtons();
    
    // Check for text-based demo buttons
    document.querySelectorAll('a, button').forEach(function(el) {
        if (el.textContent && (
            el.textContent.toLowerCase().includes('demo') || 
            el.textContent.toLowerCase().includes('request'))) {
            
            el.addEventListener('click', function(e) {
                e.preventDefault();
                openNewPopup();
                return false;
            });
        }
    });
    
    // Global click handler for any missed buttons
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Check if this is a demo button
        if (target.classList && (target.classList.contains('demo-button') || 
            target.id === 'header-demo-button')) {
            
            e.preventDefault();
            openNewPopup();
            return false;
        }
        
        // Check parent elements
        let parent = target.parentNode;
        while (parent && parent !== document) {
            if (parent.classList && (parent.classList.contains('demo-button') || 
                parent.id === 'header-demo-button')) {
                e.preventDefault();
                openNewPopup();
                return false;
            }
            parent = parent.parentNode;
        }
    }, true);
});
