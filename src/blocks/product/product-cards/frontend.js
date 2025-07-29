// This file handles any frontend JavaScript functionality needed for the product cards block
document.addEventListener('DOMContentLoaded', function() {
    // Any frontend JavaScript functionality can be added here
    // For example, animations, filters, etc.
    
    // Basic animation when cards come into view
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.product-card');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
});
