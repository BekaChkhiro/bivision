import { useEffect } from '@wordpress/element';

export default function Carousel({ logos }) {
    return (
        <div className="partners-section carousel" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="carousel-inner flex flex-wrap justify-center transition-all duration-500 ease-out">
                {logos.map((logo, index) => (
                    <div key={index} 
                        className="partner-logo-container"
                        style={{
                            width: '170px',
                            height: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',

                            padding: '10px'
                        }}
                    >
                        <img 
                            className="partner-logo min-h-[50px] md:min-h-[60px] h-auto min-w-[120px] object-contain grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
                            src={logo.url} 
                            alt={logo.alt}
                        />
                    </div>
                ))}
            </div>
            <div className="carousel-dots flex justify-center gap-2 mt-8" style={{display: 'none'}}>
                {/* Dots will be dynamically created by JavaScript based on screen size */}
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    document.addEventListener('DOMContentLoaded', function() {
                        const ACTIVE_DOT_COLOR = '#6653C6';
                        const INACTIVE_DOT_COLOR = '#E0E0E0';
                        const AUTO_SLIDE_INTERVAL = 1500; // 1.5 seconds between slides
                        
                        const carousels = document.querySelectorAll('.partners-section.carousel');
                        
                        carousels.forEach(carousel => {
                            const carouselInner = carousel.querySelector('.carousel-inner');
                            const cards = Array.from(carouselInner.querySelectorAll('.partner-logo-container'));
                            const dotsContainer = carousel.querySelector('.carousel-dots');
                            
                            if (!carouselInner || !dotsContainer || cards.length === 0) return;
                            
                            // Instead of pages, we'll use individual logo positions for one-at-a-time movement
                            let currentPosition = 0;
                            let autoSlideTimer = null;
                            let isSmallScreen = window.innerWidth <= 768;
                            
                            function setupCarousel() {
                                isSmallScreen = window.innerWidth <= 768;
                                
                                // Setup container for sliding effect with proper overflow handling
                                carousel.style.position = 'relative';
                                carousel.style.overflow = 'hidden';
                                
                                // Calculate exact width to show logos without any partial logos
                                const logoContainerWidth = 170;
                                const logoMargin = 20; // 10px each side
                                const totalLogoWidth = logoContainerWidth + logoMargin;
                                // Show 3 logos on mobile and 6 on desktop
                                const visibleLogos = isSmallScreen ? 3 : 6;
                                const carouselWidth = visibleLogos * totalLogoWidth;
                                carousel.style.width = carouselWidth + 'px';
                                carousel.style.maxWidth = '100%'; // Ensure it doesn't overflow on smaller screens
                                carousel.style.margin = '0 auto'; // Center the carousel
                                
                                // Setup carousel inner with proper alignment
                                carouselInner.style.display = 'flex';
                                carouselInner.style.flexWrap = 'nowrap';
                                carouselInner.style.justifyContent = 'flex-start';
                                carouselInner.style.alignItems = 'center';
                                carouselInner.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
                                
                                // Reset current position to ensure we start fresh
                                currentPosition = 0;
                                
                                // Clear any existing contents and prepare wrapper
                                carouselInner.innerHTML = '';
                                
                                // Create infinite loop by duplicating logos at start and end
                                const numClones = Math.max(3, cards.length); // Ensure enough clones for seamless loop
                                
                                // Add clones at the beginning (for seamless backward transition)
                                for (let i = 0; i < numClones; i++) {
                                    const originalIndex = (cards.length - numClones + i) % cards.length;
                                    const cardClone = cards[originalIndex].cloneNode(true);
                                    
                                    // Keep exact same styling - DO NOT CHANGE LOGO SIZES
                                    cardClone.style.flexShrink = '0';
                                    cardClone.style.width = isSmallScreen ? '110px' : '170px';
                                    cardClone.style.height = '100px';
                                    cardClone.style.margin = isSmallScreen ? '0 5px' : '0 10px';
                                    cardClone.style.display = 'flex';
                                    cardClone.style.alignItems = 'center';
                                    cardClone.style.justifyContent = 'flex-start';

                                    cardClone.style.padding = '10px';
                                    cardClone.style.boxSizing = 'border-box';
                                    
                                    const img = cardClone.querySelector('.partner-logo');
                                    if (img) {
                                        img.style.objectFit = 'contain';
                                        img.style.objectPosition = 'center';
                                    }
                                    
                                    carouselInner.appendChild(cardClone);
                                }
                                
                                // Add original logos
                                cards.forEach((card, index) => {
                                    const cardClone = card.cloneNode(true);
                                    
                                    // Keep exact same styling - DO NOT CHANGE LOGO SIZES
                                    cardClone.style.flexShrink = '0';
                                    cardClone.style.width = isSmallScreen ? '110px' : '170px';
                                    cardClone.style.height = '100px';
                                    cardClone.style.margin = isSmallScreen ? '0 5px' : '0 10px';
                                    cardClone.style.display = 'flex';
                                    cardClone.style.alignItems = 'center';
                                    cardClone.style.justifyContent = 'flex-start';

                                    cardClone.style.padding = '10px';
                                    cardClone.style.boxSizing = 'border-box';
                                    
                                    const img = cardClone.querySelector('.partner-logo');
                                    if (img) {
                                        img.style.objectFit = 'contain';
                                        img.style.objectPosition = 'center';
                                    }
                                    
                                    carouselInner.appendChild(cardClone);
                                });
                                
                                // Add clones at the end (for seamless forward transition)
                                for (let i = 0; i < numClones; i++) {
                                    const originalIndex = i % cards.length;
                                    const cardClone = cards[originalIndex].cloneNode(true);
                                    
                                    // Keep exact same styling - DO NOT CHANGE LOGO SIZES
                                    cardClone.style.flexShrink = '0';
                                    cardClone.style.width = isSmallScreen ? '110px' : '170px';
                                    cardClone.style.height = '100px';
                                    cardClone.style.margin = isSmallScreen ? '0 5px' : '0 10px';
                                    cardClone.style.display = 'flex';
                                    cardClone.style.alignItems = 'center';
                                    cardClone.style.justifyContent = 'flex-start';

                                    cardClone.style.padding = '10px';
                                    cardClone.style.boxSizing = 'border-box';
                                    
                                    const img = cardClone.querySelector('.partner-logo');
                                    if (img) {
                                        img.style.objectFit = 'contain';
                                        img.style.objectPosition = 'center';
                                    }
                                    
                                    carouselInner.appendChild(cardClone);
                                }
                                
                                // Set initial position to show first original logo (skip the clones at start)
                                const initialOffset = -(numClones * totalLogoWidth);
                                carouselInner.style.transform = 'translateX(' + initialOffset + 'px)';
                                
                                // Store these values for later use
                                carousel._infiniteData = {
                                    numClones: numClones,
                                    totalLogoWidth: totalLogoWidth,
                                    originalLogosCount: cards.length
                                };
                                
                                // Setup dots for original logos only
                                setupDots();
                                updateDots();
                                
                                // Start auto-sliding if we have multiple logos
                                startAutoSlide();
                            }
                            
                            function setupDots() {
                                // Clear existing dots
                                dotsContainer.innerHTML = '';
                                
                                // Hide dots - they are disabled
                                dotsContainer.style.display = 'none';
                                return;
                                
                                // Create dots for each original logo
                                for (let i = 0; i < cards.length; i++) {
                                    const dot = document.createElement('button');
                                    dot.className = 'carousel-dot';
                                    dot.style.width = '10px';
                                    dot.style.height = '10px';
                                    dot.style.borderRadius = '50%';
                                    dot.style.border = 'none';
                                    dot.style.margin = '0 5px';
                                    dot.style.cursor = 'pointer';
                                    dot.style.transition = 'background-color 0.3s ease';
                                    dot.style.backgroundColor = i === currentPosition ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
                                    dot.setAttribute('aria-label', 'Go to logo ' + (i + 1));
                                    
                                    dot.addEventListener('click', () => {
                                        showPosition(i);
                                        resetAutoSlide();
                                    });
                                    
                                    dotsContainer.appendChild(dot);
                                }
                            }
                            
                            function updateDots() {
                                // Update dots based on current position
                                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                                dots.forEach((dot, index) => {
                                    dot.style.backgroundColor = index === currentPosition ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
                                });
                            }
                            
                            function showPosition(position, skipAnimation = false) {
                                const data = carousel._infiniteData;
                                if (!data) return;
                                
                                // Normalize position to be within the original logos range
                                const normalizedPosition = ((position % data.originalLogosCount) + data.originalLogosCount) % data.originalLogosCount;
                                currentPosition = normalizedPosition;
                                
                                // Calculate translation for infinite carousel
                                const translateX = -(data.numClones * data.totalLogoWidth + (normalizedPosition * data.totalLogoWidth));
                                
                                // Temporarily disable animation if requested
                                if (skipAnimation) {
                                    carouselInner.style.transition = 'none';
                                }
                                
                                carouselInner.style.transform = 'translateX(' + translateX + 'px)';
                                
                                // Re-enable animation after a brief delay
                                if (skipAnimation) {
                                    setTimeout(() => {
                                        carouselInner.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
                                    }, 50);
                                }
                                
                                updateDots();
                            }
                            
                            function startAutoSlide() {
                                // Clear any existing timers
                                if (autoSlideTimer) {
                                    clearInterval(autoSlideTimer);
                                }
                                
                                // Only set up auto-sliding if there are multiple logos
                                if (cards.length > 1) {
                                    autoSlideTimer = setInterval(() => {
                                        // Move to next logo
                                        const nextPosition = currentPosition + 1;
                                        
                                        if (nextPosition >= cards.length) {
                                            // We've reached the end, create seamless transition to beginning
                                            const data = carousel._infiniteData;
                                            const translateX = -(data.numClones * data.totalLogoWidth + (cards.length * data.totalLogoWidth));
                                            carouselInner.style.transform = 'translateX(' + translateX + 'px)';
                                            
                                            // After transition completes, jump to actual first logo without animation
                                            setTimeout(() => {
                                                showPosition(0, true); // Skip animation for seamless jump
                                            }, 550); // Wait for transition to complete
                                        } else {
                                            showPosition(nextPosition);
                                        }
                                    }, AUTO_SLIDE_INTERVAL);
                                }
                            }
                            
                            function resetAutoSlide() {
                                // Reset the auto-slide timer when user interacts with carousel
                                if (autoSlideTimer) {
                                    clearInterval(autoSlideTimer);
                                }
                                startAutoSlide();
                            }
                            
                            // Touch/swipe support
                            let touchStartX = 0;
                            let touchEndX = 0;
                            
                            carousel.addEventListener('touchstart', (e) => {
                                touchStartX = e.changedTouches[0].screenX;
                            }, { passive: true });
                            
                            carousel.addEventListener('touchend', (e) => {
                                touchEndX = e.changedTouches[0].screenX;
                                handleSwipe();
                            }, { passive: true });
                            
                            function handleSwipe() {
                                const swipeThreshold = 50;
                                if (touchEndX < touchStartX - swipeThreshold) {
                                    // Swiped left - next logo
                                    const nextPosition = currentPosition + 1;
                                    if (nextPosition >= cards.length) {
                                        // Handle infinite transition forward
                                        const data = carousel._infiniteData;
                                        const translateX = -(data.numClones * data.totalLogoWidth + (cards.length * data.totalLogoWidth));
                                        carouselInner.style.transform = 'translateX(' + translateX + 'px)';
                                        setTimeout(() => {
                                            showPosition(0, true);
                                        }, 550);
                                    } else {
                                        showPosition(nextPosition);
                                    }
                                    resetAutoSlide();
                                }
                                if (touchEndX > touchStartX + swipeThreshold) {
                                    // Swiped right - previous logo
                                    const prevPosition = currentPosition - 1;
                                    if (prevPosition < 0) {
                                        // Handle infinite transition backward
                                        const data = carousel._infiniteData;
                                        const translateX = -(data.numClones * data.totalLogoWidth - data.totalLogoWidth);
                                        carouselInner.style.transform = 'translateX(' + translateX + 'px)';
                                        setTimeout(() => {
                                            showPosition(cards.length - 1, true);
                                        }, 550);
                                    } else {
                                        showPosition(prevPosition);
                                    }
                                    resetAutoSlide();
                                }
                            }
                            
                            // Handle window resize
                            window.addEventListener('resize', function() {
                                // Reset to first position on resize
                                currentPosition = 0;
                                setupCarousel();
                            });
                            
                            // Pause auto-sliding when user hovers over carousel
                            carousel.addEventListener('mouseenter', () => {
                                if (autoSlideTimer) {
                                    clearInterval(autoSlideTimer);
                                    autoSlideTimer = null;
                                }
                            });
                            
                            // Resume auto-sliding when user leaves carousel
                            carousel.addEventListener('mouseleave', () => {
                                startAutoSlide();
                            });
                            
                            // Initial setup
                            setupCarousel();
                        });
                    });
                    `
                }}
            />
        </div>
    );
}