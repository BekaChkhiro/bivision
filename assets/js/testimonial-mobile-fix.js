/**
 * Force mobile testimonial card styles
 * This script applies styles directly to the DOM to override any cached styles
 */
document.addEventListener('DOMContentLoaded', function() {
    function applyMobileStyles() {
        if (window.innerWidth <= 767) {
            // Get all testimonial cards
            const cards = document.querySelectorAll('.wp-block-bevision-client-testimonials .testimonial-card');
            
            // Apply styles to each card
            cards.forEach(card => {
                card.style.width = '100%';
                card.style.minWidth = '100%';
                card.style.maxWidth = '100%';
                card.style.flex = '0 0 100%';
                card.style.margin = '0';
                card.style.padding = '30px';
                card.style.boxSizing = 'border-box';
            });
            
            // Limit dots to 5
            const mobileDotsContainers = document.querySelectorAll('.mobile-carousel-dots');
            mobileDotsContainers.forEach(container => {
                const dots = container.querySelectorAll('button');
                if (dots.length > 5) {
                    for (let i = 5; i < dots.length; i++) {
                        dots[i].style.display = 'none';
                    }
                }
            });
            
            // Force carousel containers to show only one card
            const carousels = document.querySelectorAll('.wp-block-bevision-client-testimonials .carousel-inner');
            carousels.forEach(carousel => {
                carousel.style.scrollSnapType = 'x mandatory';
                carousel.style.scrollBehavior = 'smooth';
            });
        }
    }
    
    // Apply immediately
    applyMobileStyles();
    
    // Apply on resize
    window.addEventListener('resize', applyMobileStyles);
    
    // Apply after a short delay to ensure DOM is fully loaded
    setTimeout(applyMobileStyles, 500);
    setTimeout(applyMobileStyles, 1000);
    setTimeout(applyMobileStyles, 2000);
});
