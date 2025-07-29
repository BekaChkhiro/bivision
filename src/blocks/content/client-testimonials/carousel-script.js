document.addEventListener('DOMContentLoaded', function() {
    /**
     * Enhanced mobile carousel for client testimonials
     * Fixed container overflow issues and navigation for both mobile and desktop
     */
    
    // Force mobile styles immediately
    function forceApplyMobileStyles() {
        if (window.innerWidth <= 767) {
            document.querySelectorAll('.wp-block-bevision-client-testimonials .testimonial-card').forEach(card => {
                card.style.cssText = 'width: 100% !important; min-width: 100% !important; max-width: 100% !important; flex: 0 0 100% !important; margin: 0 !important; padding: 30px !important;';
            });
            
            // Add padding to carousel-inner for mobile view
            document.querySelectorAll('.wp-block-bevision-client-testimonials .carousel-inner').forEach(carouselInner => {
                carouselInner.style.padding = '0px 20px';
            });
            
            // Hide desktop dots container completely on mobile
            document.querySelectorAll('.carousel-dots-container').forEach(container => {
                container.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; pointer-events: none !important; position: absolute !important;';
            });
            
            // Limit dots to 5
            document.querySelectorAll('.mobile-carousel-dots').forEach(dotsContainer => {
                const dots = dotsContainer.querySelectorAll('button');
                if (dots.length > 5) {
                    for (let i = 5; i < dots.length; i++) {
                        dots[i].style.display = 'none';
                    }
                }
            });
        }
    }
    
    // Call immediately and on resize
    forceApplyMobileStyles();
    window.addEventListener('resize', forceApplyMobileStyles);
    
    // Configuration
    const MOBILE_BREAKPOINT = 767;
    const ACTIVE_DOT_COLOR = '#6653C6';
    const INACTIVE_DOT_COLOR = '#E0E0E0';
    // Auto-loop for all testimonials, regardless of count
    const AUTO_LOOP_INTERVAL = 4000; // 4 seconds between slides for smoother experience
    // Always enable autoplay on both mobile and desktop
    const ENABLE_MOBILE_AUTOPLAY = true;
    
    // Store auto-loop intervals to clear them when needed
    const autoLoopIntervals = {};
    
    // Mobile detection - reliable check based on viewport width
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }
    
    // NEW FUNCTION: Ensure cards are properly sized for desktop
    function adjustCardSizes() {
        if (isMobile()) return; // Only run on desktop
        
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            const carouselInner = block.querySelector('.carousel-inner');
            if (!carouselInner) return;
            
            const cards = carouselInner.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // Set carousel inner width
            carouselInner.style.maxWidth = '1290px';
            carouselInner.style.width = '100%';
            carouselInner.style.margin = '0 auto';
            carouselInner.style.scrollBehavior = 'smooth';
            carouselInner.style.scrollSnapType = 'x mandatory';
            carouselInner.style.padding = '20px';
            carouselInner.style.boxSizing = 'border-box';
  
            // Get available width after setting max-width and padding
            const availableWidth = carouselInner.clientWidth - 40; // Subtract padding (20px * 2)
            
            // Calculate card width - 3 cards fill entire container with gap
            const cardWidth = Math.floor((availableWidth - 40) / 3); // Account for 2 gaps (20px each)
            
            // Apply to cards
            cards.forEach((card, index) => {
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.width = `${cardWidth}px`;
                card.style.minWidth = `${cardWidth}px`;
                card.style.maxWidth = `${cardWidth}px`;
                card.style.scrollSnapAlign = 'start';
                // Using gap instead of margins
            });
            
            carouselInner.style.display = 'flex';
            carouselInner.style.justifyContent = 'flex-start';
        });
    }
    
    // Setup mobile dots if they don't exist yet
    function setupMobileDots() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            // Clean up any existing mobile dots first to prevent duplicates
            const existingMobileDots = block.querySelector('.mobile-carousel-dots');
            if (existingMobileDots) {
                existingMobileDots.remove();
            }
            
            // Create dots container
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'mobile-carousel-dots';
            
            // Explicitly set styles for dot container
            dotsContainer.style.display = 'flex';
            dotsContainer.style.justifyContent = 'center';
            dotsContainer.style.alignItems = 'center';
            dotsContainer.style.gap = '8px';
            dotsContainer.style.margin = '20px auto';
            dotsContainer.style.padding = '0';
            dotsContainer.style.width = '100%';
            
            // Get all cards
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            const cards = carousel.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // For mobile, we'll keep one dot per testimonial since we show one at a time
            cards.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.style.width = '10px';
                dot.style.height = '10px';
                dot.style.borderRadius = '50%';
                dot.style.border = 'none';
                dot.style.padding = '0';
                dot.style.margin = '0 5px';
                dot.style.cursor = 'pointer';
                dot.style.backgroundColor = index === 0 ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
                dot.setAttribute('data-index', index);
                dot.setAttribute('data-slide-type', 'mobile');
                
                dotsContainer.appendChild(dot);
            });
            
            // Add dots after the carousel
            block.appendChild(dotsContainer);
            
            // Force display to make sure it's visible
            setTimeout(() => {
                dotsContainer.style.display = 'flex';
            }, 100);
        });
    }
      // Initialize desktop dots (non-mobile)
    function setupDesktopDots() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            // Find desktop dots container - first make sure it exists
            let dotsContainer = block.querySelector('.carousel-dots');
            
            // If dots container doesn't exist, check if we need to find its parent first
            if (!dotsContainer) {
                const dotContainerParent = block.querySelector('.carousel-dots-container');
                if (dotContainerParent) {
                    // See if we need to create the dots container
                    if (!dotContainerParent.querySelector('.carousel-dots')) {
                        const newDotsContainer = document.createElement('div');
                        newDotsContainer.className = 'carousel-dots';
                        dotContainerParent.appendChild(newDotsContainer);
                        dotsContainer = newDotsContainer;
                    } else {
                        dotsContainer = dotContainerParent.querySelector('.carousel-dots');
                    }
                } else {
                    // Create the entire dots structure if it doesn't exist
                    const newDotContainerParent = document.createElement('div');
                    newDotContainerParent.className = 'carousel-dots-container';
                    newDotContainerParent.style.display = 'flex';
                    newDotContainerParent.style.justifyContent = 'center';
                    newDotContainerParent.style.marginTop = '30px';
                    
                    const newDotsContainer = document.createElement('div');
                    newDotsContainer.className = 'carousel-dots';
                    newDotsContainer.style.display = 'flex';
                    newDotsContainer.style.justifyContent = 'center';
                    newDotsContainer.style.gap = '12px';
                    
                    newDotContainerParent.appendChild(newDotsContainer);
                    block.appendChild(newDotContainerParent);
                    dotsContainer = newDotsContainer;
                }
            }
            
            // Get all cards to know how many dots are needed
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            const cards = carousel.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // Clear any existing dots to prevent duplicates
            dotsContainer.innerHTML = '';
            
            // Calculate how many slides we need on desktop (1 testimonial per slide)
            const CARDS_PER_SLIDE = 1;
            const slideCount = cards.length; // Each card is its own slide
            
            // Create a dot for each slide
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
                dot.setAttribute('data-index', i);
                dot.setAttribute('data-slide-type', 'desktop');
                
                // Apply styling directly
                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.minWidth = '12px';
                dot.style.minHeight = '12px';
                dot.style.borderRadius = '50%';
                dot.style.backgroundColor = i === 0 ? '#6653C6' : '#E0E0E0';
                dot.style.cursor = 'pointer';
                dot.style.margin = '0 6px';
                dot.style.border = 'none';
                dot.style.padding = '0';
                dot.style.transition = 'background-color 0.3s';
                
                dotsContainer.appendChild(dot);
            }
            
            // Get the updated dots collection
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            if (!dots.length) return;
            
            // Set initial scroll position to first card
            // This ensures the carousel is at the beginning
            carousel.scrollLeft = 0;
            
            // Add click event listeners
            dots.forEach((dot, index) => {
                dot.setAttribute('data-index', index);
                dot.style.cursor = 'pointer';
                
                // Remove old event listeners if any
                const newDot = dot.cloneNode(true);
                dot.parentNode.replaceChild(newDot, dot);
                
                // Add new click event
                newDot.addEventListener('click', () => {
                    // Update active class on dots
                    dotsContainer.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('active'));
                    newDot.classList.add('active');
                    
                    // Get slide type from the dot
                    const slideType = newDot.getAttribute('data-slide-type') || 'desktop';
                    
                    // Calculate how many cards per slide based on the device type
                    const CARDS_PER_SLIDE = 1; // Both mobile and desktop: 1 card per slide
                    
                    // Calculate which card is the first in the current slide
                    const firstCardIndex = index * CARDS_PER_SLIDE;
                    const targetCard = cards[firstCardIndex];
                    
                    if (!targetCard) return;
                    
                    // Use scroll for both desktop and mobile
                    if (slideType === 'desktop') {
                        // Desktop: scroll to the specific card position
                        const cardWidth = cards[0].offsetWidth;
                        const gap = 20;
                        const scrollPosition = firstCardIndex * (cardWidth + gap);
                        
                        carousel.scrollTo({
                            left: scrollPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Mobile: use scroll
                        const scrollPosition = targetCard.offsetLeft;
                        carousel.scrollTo({
                            left: scrollPosition,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update active card visually
                    updateActiveCard(firstCardIndex);
                });
            });
            
            // Handle scroll events to update active dot
            carousel.addEventListener('scroll', () => {
                if (isMobile()) return; // Only for desktop
                
                // Debounce the scroll event
                clearTimeout(carousel.scrollTimeout);
                carousel.scrollTimeout = setTimeout(() => {
                    const scrollPos = carousel.scrollLeft;
                    const cardWidth = cards[0].offsetWidth + 
                                     parseInt(window.getComputedStyle(cards[0]).marginRight || 30);
                    
                    // Find the card that's most visible
                    let visibleCardIndex = 0;
                    let minDistance = Infinity;
                    
                    cards.forEach((card, idx) => {
                        const cardLeft = card.offsetLeft;
                        const distance = Math.abs(cardLeft - scrollPos);
                        if (distance < minDistance) {
                            minDistance = distance;
                            visibleCardIndex = idx;
                        }
                    });
                    
                    // For desktop, calculate which slide this card belongs to (1 card per slide)
                    const CARDS_PER_SLIDE = 1;
                    const slideIndex = Math.floor(visibleCardIndex / CARDS_PER_SLIDE);
                    
                    if (slideIndex >= 0 && slideIndex < dots.length) {
                        // Update active dot
                        dots.forEach(d => d.classList.remove('active'));
                        dots[slideIndex].classList.add('active');
                        
                        // Update active card visually - we'll keep this to highlight the current card
                        updateActiveCard(visibleCardIndex);
                    }
                }, 50);
            });
        });
    }
      // Function to handle resize
    function handleResize() {
        const isMobileView = isMobile();
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            // Get desktop and mobile dots containers
            const desktopDots = block.querySelector('.carousel-dots-container');
            const mobileDots = block.querySelector('.mobile-carousel-dots');
            
            // Setup for mobile or desktop based on screen size
            if (isMobileView) {
                // Set up mobile dots
                setupMobileDots();
                
                // Hide desktop dots if they exist
                if (desktopDots) {
                    desktopDots.style.display = 'none';
                }
                
                // Show mobile dots if they exist
                if (mobileDots) {
                    mobileDots.style.display = 'flex';
                }
            } else {
                // Set up desktop dots
                setupDesktopDots();
                
                // Show desktop dots if they exist
                if (desktopDots) {
                    desktopDots.style.display = 'flex';
                }
                
                // Hide mobile dots if they exist
                if (mobileDots) {
                    mobileDots.style.display = 'none';
                }
            }
            
            // Adjust card sizes for desktop
            if (!isMobileView) {
                adjustCardSizes();
            }
        });
    }
      // Setup desktop drag-to-scroll functionality
    function setupDesktopDragScroll() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            const cards = carousel.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // Variables to track dragging state
            let isDragging = false;
            let startX;
            let scrollLeft;
            let lastPageX;
            let velocity = 0;
            let lastTimestamp = 0;
            let animationFrameId = null;
            let momentumAnimationId = null;
            
            // Set cursor style to indicate draggable area
            carousel.style.cssText += 'user-select: none !important; -webkit-user-select: none !important;';
            
            // Add hover effects to cards for better interaction cues
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    if (!isDragging) {
                        card.style.transform = 'translateY(-2px)';
                        card.style.transition = 'transform 0.3s ease';
                        card.style.cursor = 'pointer';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
            
            // Mouse down event - start dragging
            carousel.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.pageX;
                lastPageX = e.pageX;
                scrollLeft = carousel.scrollLeft;
                lastTimestamp = Date.now();
                velocity = 0;
                
                // Change cursor to indicate active dragging
                carousel.style.cursor = 'grabbing';
                document.body.style.cursor = 'grabbing'; // Apply to body for consistent experience
                
                // Add a grabbing class to the carousel for additional styling
                carousel.classList.add('grabbing');
                
                // Clear any existing animation
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                if (momentumAnimationId) {
                    cancelAnimationFrame(momentumAnimationId);
                }
                
                // Prevent default behavior to avoid text selection
                e.preventDefault();
            });
            
            // Mouse move event - update position
            window.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                const x = e.pageX;
                const walk = (startX - x) * 0.8; // Reduce sensitivity for smoother, slower drag
                
                // Calculate velocity
                const now = Date.now();
                const timeElapsed = now - lastTimestamp;
                if (timeElapsed > 0) {
                    // Pixels per millisecond
                    const distanceMoved = x - lastPageX;
                    velocity = distanceMoved / timeElapsed;
                }
                
                lastPageX = x;
                lastTimestamp = now;
                
                // Update position using scroll
                carousel.scrollLeft = scrollLeft + walk;
            });
            
            // Function to update the active card visually
            const updateActiveCard = (index) => {
                if (index >= 0 && index < cards.length) {
                    // Remove active style from all cards
                    cards.forEach(card => {
                        card.style.boxShadow = '0px 10px 50px 0px rgba(102, 83, 198, 0.15)';
                        card.style.transform = '';
                    });
                    
                    // Add active style to the current card
                    cards[index].style.boxShadow = '0px 8px 30px 0px rgba(0, 0, 0, 0.15)';
                    cards[index].style.transform = 'translateY(-2px)';
                }
            };
            
            // Function to update the active dot based on scroll position
            const updateActiveDot = () => {
                const dotsContainer = block.querySelector('.carousel-dots');
                if (!dotsContainer) return;
                
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                if (!dots.length) return;
                
                const scrollPos = carousel.scrollLeft;
                const cardWidth = cards[0].offsetWidth + 
                                parseInt(window.getComputedStyle(cards[0]).marginRight || 30);
                const index = Math.round(scrollPos / cardWidth);
                
                if (index >= 0 && index < dots.length) {
                    // Update active dot
                    dots.forEach((d, i) => {
                        d.classList.toggle('active', i === index);
                        d.style.backgroundColor = i === index ? '#6653C6' : '#E0E0E0';
                    });
                }
            };
            
            // Function to snap to nearest slide after momentum scrolling
            const snapToNearestSlide = () => {
                if (isMobile()) {
                    const scrollPos = carousel.scrollLeft;
                    const cardWidth = cards[0].offsetWidth + 
                                    parseInt(window.getComputedStyle(cards[0]).marginRight || 30);
                    const index = Math.round(scrollPos / cardWidth);
                    
                    if (index >= 0 && index < cards.length) {
                        carousel.scrollTo({
                            left: index * cardWidth,
                            behavior: 'smooth'
                        });
                        updateActiveCard(index);
                    }
                } else {
                    // Desktop: snap to nearest card
                    const scrollPos = carousel.scrollLeft;
                    const cardWidth = cards[0].offsetWidth;
                    const gap = 20;
                    const cardAndGap = cardWidth + gap;
                    
                    const index = Math.round(scrollPos / cardAndGap);
                    const snapX = index * cardAndGap;
                    
                    carousel.scrollTo({
                        left: snapX,
                        behavior: 'smooth'
                    });
                    updateActiveDot();
                    updateActiveCard(index);
                }
            };
            
            // Mouse up event - end dragging and apply momentum
            window.addEventListener('mouseup', () => {
                if (!isDragging) return;
                isDragging = false;
                
                // Reset cursor styles
                carousel.style.cursor = 'grab';
                document.body.style.cursor = ''; // Reset body cursor
                carousel.classList.remove('grabbing');
                
                // Apply momentum scrolling with easing
                const momentumFactor = 100; // Adjust for desired momentum effect
                const momentumDistance = velocity * momentumFactor;
                
                if (Math.abs(velocity) > 0.1) {
                    let startTime = null;
                    const duration = 800; // ms - longer duration for smoother momentum animation
                    const startScrollLeft = carousel.scrollLeft;
                    const targetScrollLeft = startScrollLeft - momentumDistance;
                    
                    const momentumScroll = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Easing function - decelerate smoothly
                        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                        
                        carousel.scrollLeft = startScrollLeft - (momentumDistance * easeOutCubic);
                        
                        if (progress < 1) {
                            momentumAnimationId = requestAnimationFrame(momentumScroll);
                        } else {
                            // When momentum ends, snap to nearest slide
                            snapToNearestSlide();
                        }
                    };
                    
                    momentumAnimationId = requestAnimationFrame(momentumScroll);
                } else {
                    // If velocity is too low, just snap to nearest slide
                    snapToNearestSlide();
                }
            });
            
            // Mouse leave event - end dragging
            carousel.addEventListener('mouseleave', () => {
                if (!isDragging) return;
                isDragging = false;
                
                // Reset cursor styles
                carousel.style.cursor = 'grab';
                document.body.style.cursor = ''; // Reset body cursor
                carousel.classList.remove('grabbing');
                
                snapToNearestSlide();
            });
            
            // Make cards clickable to center them in the carousel
            cards.forEach((card, index) => {
                card.addEventListener('click', (e) => {
                    // Only trigger if we didn't just finish dragging
                    if (Math.abs(velocity) < 0.05) {
                        const cardWidth = cards[0].offsetWidth + 
                            parseInt(window.getComputedStyle(cards[0]).marginRight || 30);
                        
                        // Scroll to center this card
                        carousel.scrollTo({
                            left: index * cardWidth,
                            behavior: 'smooth'
                        });
                        
                        // Update active states
                        updateActiveCard(index);
                        
                        // Update active dot
                        const dotsContainer = block.querySelector('.carousel-dots');
                        if (dotsContainer) {
                            const dots = dotsContainer.querySelectorAll('.carousel-dot');
                            if (dots.length) {
                                dots.forEach((d, i) => {
                                    d.classList.toggle('active', i === index);
                                    d.style.backgroundColor = i === index ? '#6653C6' : '#E0E0E0';
                                });
                            }
                        }
                    }
                });
            });
            
            // Disable default drag behavior on images inside carousel to prevent conflicts
            const images = carousel.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('dragstart', (e) => e.preventDefault());
            });
        });
    }
      
    // Initialize all testimonial blocks
    function initTestimonialCarousels() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach((block, blockIndex) => {
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            const cards = carousel.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // Always start at the beginning - fix initial positioning
            carousel.scrollLeft = 0;
            if (!isMobile()) {
                // Desktop: ensure transform starts at 0
                carousel.style.transform = 'translateX(0px)';
            }
            
            // Clear any existing auto-loop interval for this carousel
            if (autoLoopIntervals[blockIndex]) {
                clearInterval(autoLoopIntervals[blockIndex]);
                autoLoopIntervals[blockIndex] = null;
            }
            
            // Setup desktop styles immediately
            if (!isMobile()) {
                // Desktop setup
                carousel.style.cssText = 'display: flex !important; flex-wrap: nowrap !important; gap: 20px !important; scroll-snap-type: x mandatory !important; scrollbar-width: none !important; -ms-overflow-style: none !important; scroll-behavior: smooth !important; position: relative !important; left: 0 !important; max-width: 100% !important; overflow-x: auto !important; padding: 20px !important; box-sizing: border-box !important; justify-content: flex-start !important;';
                
                // Desktop card styling - 3 cards visible
                cards.forEach((card, index) => {
                    // Set default styles - fill container with gap
                    card.style.flex = '1 1 calc(33.333% - 14px)';
                    card.style.minWidth = 'calc(33.333% - 14px)';
                    card.style.maxWidth = 'none';
                    card.style.scrollSnapAlign = 'center';
                    card.style.background = '#fff';
                    card.style.boxShadow = '0px 10px 50px 0px rgba(102, 83, 198, 0.15)';
                    card.style.borderRadius = '20px';
                    card.style.padding = '30px';
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    card.style.transition = 'all 0.3s ease';
                    card.style.boxSizing = 'border-box';
                    
                    // Set margin based on position
                    if (index === 0) {
                        card.style.margin = '50px 0 50px 20px'; // First card: left margin for shadow
                    } else {
                        card.style.margin = '50px 0'; // Other cards: no horizontal margin
                    }
                });
                
                // Ensure the last card doesn't have right margin
                if (cards.length > 0) {
                    cards[cards.length - 1].style.marginRight = '0';
                }
                
                // Make sure desktop dots container exists
                let dotsContainer = block.querySelector('.carousel-dots-container');
                
                if (!dotsContainer) { 
                    // Create the dots container structure
                    dotsContainer = document.createElement('div');
                    dotsContainer.className = 'carousel-dots-container';
                    dotsContainer.style.cssText = 'display: flex !important; justify-content: center !important; width: 100% !important; margin-top: 30px !important;';
                    
                    // Create the dots element
                    const dots = document.createElement('div');
                    dots.className = 'carousel-dots';
                    dots.style.cssText = 'display: flex !important; justify-content: center !important; align-items: center !important; gap: 12px !important;';
                    
                    // Add dots for each card
                    cards.forEach((_, index) => {
                        const dot = document.createElement('div');
                        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                        dot.setAttribute('data-index', index);
                        dot.style.cssText = 'width: 12px !important; height: 12px !important; min-width: 12px !important; min-height: 12px !important; border-radius: 50% !important; background-color: #E0E0E0 !important; cursor: pointer !important; margin: 0 6px !important; border: none !important; padding: 0 !important;';
                        
                        if (index === 0) {
                            dot.style.backgroundColor = '#6653C6';
                        }
                        
                        dots.appendChild(dot);
                    });
                    
                    dotsContainer.appendChild(dots);
                    block.appendChild(dotsContainer);
                } else {
                    // Make sure existing dots container is shown
                    dotsContainer.style.cssText = 'display: flex !important; justify-content: center !important; width: 100% !important; margin-top: 30px !important;';
                    
                    // Get the dots element
                    const dots = dotsContainer.querySelector('.carousel-dots');
                    if (dots) {
                        dots.style.cssText = 'display: flex !important; justify-content: center !important; align-items: center !important; gap: 12px !important;';
                    }
                }
                
                // Set up desktop dots
                setupDesktopDots();
            } else {
                // Mobile setup
                // Setup mobile dots
                setupMobileDots();
                
                // Make sure the grid is set up as a row
                carousel.style.display = 'flex';
                carousel.style.overflowX = 'auto';
                carousel.style.scrollSnapType = 'x mandatory';
                carousel.style.webkitOverflowScrolling = 'touch';
                carousel.style.scrollbarWidth = 'none';
                carousel.style.msOverflowStyle = 'none';
                carousel.style.position = 'relative';
                carousel.style.left = '0';
                carousel.style.padding = '0px 20px'; // Add padding for mobile view
                
                // Make sure each card takes appropriate width
                cards.forEach((card, index) => {
                    card.style.flex = '0 0 calc(100% - 40px)';
                    card.style.minWidth = 'calc(100% - 40px)';
                    card.style.maxWidth = 'calc(100% - 40px)';
                    card.style.scrollSnapAlign = 'center';
                    card.style.boxSizing = 'border-box';
                    
                    // Consistent margins
                    if (index === cards.length - 1) {
                        card.style.marginRight = '20px'; // Keep last card margin for padding
                    } else {
                        card.style.marginRight = '20px';
                    }
                });
                
                // Get mobile dots container
                const mobileDotsContainer = block.querySelector('.mobile-carousel-dots');
                if (mobileDotsContainer) {
                    const mobileDots = mobileDotsContainer.querySelectorAll('button');
                    
                    // Current slide tracking
                    let currentSlide = 0;
                    
                    // Handle dot clicks for mobile
                    mobileDots.forEach((dot, index) => {
                        dot.addEventListener('click', () => {
                            // Update mobile dots
                            updateMobileDots(mobileDots, index);
                            
                            // Calculate the exact position including margins
                            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight || 20); // Get actual margin
                            
                            // Scroll to the selected card
                            carousel.scrollTo({
                                left: index * cardWidth,
                                behavior: 'smooth'
                            });
                            
                            currentSlide = index;
                        });
                    });
                    
                    // Handle scrolling for mobile
                    carousel.addEventListener('scroll', function() {
                        if (!isMobile()) return;
                        
                        // Debounce the scroll event
                        clearTimeout(carousel.scrollTimeout);
                        carousel.scrollTimeout = setTimeout(() => {
                            const scrollPos = carousel.scrollLeft;
                            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight || 20); // Get actual margin
                            const index = Math.round(scrollPos / cardWidth);
                            
                            if (index !== currentSlide && index >= 0 && index < cards.length) {
                                currentSlide = index;
                                updateMobileDots(mobileDots, index);
                            }
                        }, 50);
                    });
                    
                    // Handle swipe on mobile
                    let touchStartX = 0;
                    
                    carousel.addEventListener('touchstart', (e) => {
                        touchStartX = e.changedTouches[0].screenX;
                    }, { passive: true });
                    
                    carousel.addEventListener('touchend', (e) => {
                        const touchEndX = e.changedTouches[0].screenX;
                        const swipeThreshold = 50;
                        const diff = touchStartX - touchEndX;
                        
                        if (Math.abs(diff) < swipeThreshold) return;
                        
                        if (diff > 0 && currentSlide < cards.length - 1) {
                            // Swipe left (next)
                            const nextSlide = currentSlide + 1;
                            updateMobileDots(mobileDots, nextSlide);
                            
                            // Calculate the exact position including margins
                            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight || 20);
                            
                            // Scroll to the selected card
                            carousel.scrollTo({
                                left: nextSlide * cardWidth,
                                behavior: 'smooth'
                            });
                            
                            currentSlide = nextSlide;
                        } else if (diff < 0 && currentSlide > 0) {
                            // Swipe right (previous)
                            const prevSlide = currentSlide - 1;
                            updateMobileDots(mobileDots, prevSlide);
                            
                            // Calculate the exact position including margins
                            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight || 20);
                            
                            // Scroll to the selected card
                            carousel.scrollTo({
                                left: prevSlide * cardWidth,
                                behavior: 'smooth'
                            });
                            
                            currentSlide = prevSlide;
                        }
                    }, { passive: true });
                }
            }
        });
    }
    
    // Update the mobile dots with improved visibility
    function updateMobileDots(dots, activeIndex) {
        dots.forEach((dot, index) => {
            // Update color and add additional styles for better visibility
            dot.style.backgroundColor = (index === activeIndex) ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
            
            // Apply active/inactive styles
            if (index === activeIndex) {
                dot.style.transform = 'scale(1.2)'; // Make active dot slightly larger
                dot.style.opacity = '1';
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.style.transform = 'scale(1)';
                dot.style.opacity = '0.8';
                dot.setAttribute('aria-current', 'false');
            }
        });
    }
      // Function to handle resize
    function handleResize() {
        if (isMobile()) {
            // Re-initialize on resize to mobile
            initTestimonialCarousels();
            
            // Ensure mobile dots are created and shown
            setupMobileDots();
            
            // Show mobile dots with !important to override any other styles
            document.querySelectorAll('.mobile-carousel-dots').forEach(dots => {
                dots.style.cssText = 'display: flex !important';
            });
            
            // Hide desktop dots with !important to ensure they're hidden
            document.querySelectorAll('.carousel-dots-container').forEach(container => {
                container.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; pointer-events: none !important; position: absolute !important;';
            });        } else {
            // First, make sure desktop dots are set up
            setupDesktopDots();
            
            // Re-initialize for desktop
            initTestimonialCarousels();
            
            // Apply desktop-specific card sizing
            adjustCardSizes();
            
            // Using gap instead of margins
            const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
            testimonialBlocks.forEach(block => {
                
                // Show desktop dots with !important to override any other styles
                const desktopDots = block.querySelector('.carousel-dots-container');
                if (desktopDots) {
                    desktopDots.style.cssText = 'display: flex !important; justify-content: center !important; width: 100% !important; margin-top: 30px !important;';
                }
                
                // Hide mobile dots with !important
                const mobileDots = block.querySelector('.mobile-carousel-dots');
                if (mobileDots) {
                    mobileDots.style.cssText = 'display: none !important;';
                }
            });
            
            // Ensure all carousel dots are properly styled
            document.querySelectorAll('.carousel-dot').forEach(dot => {
                dot.style.cssText = 'width: 12px !important; height: 12px !important; min-width: 12px !important; min-height: 12px !important; border-radius: 50% !important; background-color: #E0E0E0 !important; cursor: pointer !important; margin: 0 6px !important; border: none !important; padding: 0 !important; transition: background-color 0.3s !important; display: inline-block !important;';
            });
            
            // Make active dot visible
            document.querySelectorAll('.carousel-dot.active').forEach(dot => {
                dot.style.backgroundColor = '#6653C6 !important';
            });
            
            // Ensure desktop dots are visible
            ensureDesktopDotsVisible();
        }
    }
    
    // Function to explicitly ensure desktop dots are visible - called multiple times if needed
    function ensureDesktopDotsVisible() {
        if (isMobile()) return;
        
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach(block => {
            // Check if we have the dots container
            let dotsContainer = block.querySelector('.carousel-dots-container');
            
            // If dots container doesn't exist, create it
            if (!dotsContainer) {
                console.log('Creating desktop dots container');
                dotsContainer = document.createElement('div');
                dotsContainer.className = 'carousel-dots-container';
                dotsContainer.style.cssText = 'display: flex !important; justify-content: center !important; margin-top: 30px !important; width: 100% !important; position: relative !important; z-index: 10 !important;';
                
                let dotsElement = document.createElement('div');
                dotsElement.className = 'carousel-dots';
                dotsElement.style.cssText = 'display: flex !important; justify-content: center !important; align-items: center !important; gap: 12px !important;';
                
                // Get cards to know how many dots are needed
                const carousel = block.querySelector('.carousel-inner');
                if (carousel) {
                    const cards = carousel.querySelectorAll('.testimonial-card');
                    
                    // Create a dot for each card
                    cards.forEach((_, index) => {
                        const dot = document.createElement('div');
                        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                        dot.setAttribute('data-index', index);
                        dot.style.cssText = 'width: 12px !important; height: 12px !important; min-width: 12px !important; min-height: 12px !important; border-radius: 50% !important; background-color: ' + (index === 0 ? '#6653C6' : '#E0E0E0') + ' !important; cursor: pointer !important; margin: 0 6px !important; border: none !important; padding: 0 !important; transition: background-color 0.3s !important; display: inline-block !important;';
                        
                        // Add click handler
                        dot.addEventListener('click', () => {
                            // Update active state
                            dotsElement.querySelectorAll('.carousel-dot').forEach((d, i) => {
                                d.classList.toggle('active', i === index);
                                d.style.backgroundColor = i === index ? '#6653C6' : '#E0E0E0';
                            });
                            
                            // Find carousel and cards
                            const block = dot.closest('.wp-block-bevision-client-testimonials');
                            if (!block) return;
                            
                            const carousel = block.querySelector('.carousel-inner');
                            if (!carousel) return;
                            
                            const cards = carousel.querySelectorAll('.testimonial-card');
                            if (!cards.length || index >= cards.length) return;
                            
                            // Scroll to the card (desktop moves one card at a time)
                            const cardWidth = cards[0].offsetWidth;
                            const gap = 20;
                            const scrollPosition = index * (cardWidth + gap);
                            carousel.scrollTo({
                                left: scrollPosition,
                                behavior: 'smooth'
                            });
                        });
                        
                        dotsElement.appendChild(dot);
                    });
                    
                    dotsContainer.appendChild(dotsElement);
                    block.appendChild(dotsContainer);
                }
            } else {
                // If it exists, make sure it's visible
                dotsContainer.style.cssText = 'display: flex !important; justify-content: center !important; margin-top: 30px !important; width: 100% !important; position: relative !important; z-index: 10 !important; visibility: visible !important;';
                
                // Make sure dot elements are visible
                const dotsElement = dotsContainer.querySelector('.carousel-dots');
                if (dotsElement) {
                    dotsElement.style.cssText = 'display: flex !important; justify-content: center !important; align-items: center !important; gap: 12px !important; visibility: visible !important;';
                    
                    // Make dots visible
                    dotsElement.querySelectorAll('.carousel-dot').forEach(dot => {
                        const isActive = dot.classList.contains('active');
                        dot.style.cssText = 'width: 12px !important; height: 12px !important; min-width: 12px !important; min-height: 12px !important; border-radius: 50% !important; background-color: ' + (isActive ? '#6653C6' : '#E0E0E0') + ' !important; cursor: pointer !important; margin: 0 6px !important; border: none !important; padding: 0 !important; transition: background-color 0.3s !important; display: inline-block !important; visibility: visible !important;';
                    });
                }
            }
        });
        
        // Make sure dots are hooked up with click events
        document.querySelectorAll('.carousel-dots-container .carousel-dot').forEach(dot => {
            // Remove old handlers to prevent duplicates
            const newDot = dot.cloneNode(true);
            if (dot.parentNode) {
                dot.parentNode.replaceChild(newDot, dot);
                
                // Add new handler
                newDot.addEventListener('click', () => {
                    // Get index
                    const index = parseInt(newDot.getAttribute('data-index'));
                    if (isNaN(index)) return;
                    
                    // Find all dots in this container
                    const dotsContainer = newDot.closest('.carousel-dots');
                    if (!dotsContainer) return;
                    
                    // Update active state
                    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
                        d.classList.toggle('active', i === index);
                        d.style.backgroundColor = i === index ? '#6653C6' : '#E0E0E0';
                    });
                    
                    // Find carousel and cards
                    const block = newDot.closest('.wp-block-bevision-client-testimonials');
                    if (!block) return;
                    
                    const carousel = block.querySelector('.carousel-inner');
                    if (!carousel) return;
                    
                    const cards = carousel.querySelectorAll('.testimonial-card');
                    if (!cards.length || index >= cards.length) return;
                    
                    // Scroll to the card (desktop moves one card at a time)
                    const cardWidth = cards[0].offsetWidth;
                    const gap = 20;
                    const scrollPosition = index * (cardWidth + gap);
                    carousel.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                    });
                });
            }
        });
    }
      
    // Initialization sequence - improved to ensure dots are properly created and shown
    
    // Step 1: Initial setup based on device type
    handleResize();
    
    // Step 2: Initialize carousel components
    initTestimonialCarousels();
    
    // Step 2.5: Force proper initial positioning
    document.querySelectorAll('.wp-block-bevision-client-testimonials .carousel-inner').forEach(carousel => {
        carousel.scrollLeft = 0;
    });
      // Step 3: Additional desktop-specific setup
    if (!isMobile()) {
        console.log('Setting up desktop dots');
        
        // Call our improved function to ensure dots are visible
        ensureDesktopDotsVisible();
        
        // Make sure cards are properly sized
        adjustCardSizes();
        
        // Setup desktop drag-to-scroll functionality
        setupDesktopDragScroll();
        
        // Double-check all styles are applied properly
        document.querySelectorAll('.carousel-dots-container').forEach(container => {
            container.style.cssText = 'display: flex !important; justify-content: center !important; margin-top: 30px !important; width: 100% !important; position: relative !important; z-index: 10 !important; visibility: visible !important; opacity: 1 !important;';
        });
        
        document.querySelectorAll('.carousel-dots').forEach(dots => {
            dots.style.cssText = 'display: flex !important; justify-content: center !important; align-items: center !important; gap: 12px !important; visibility: visible !important; opacity: 1 !important;';
        });
        
        document.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.style.cssText = 'width: 12px !important; height: 12px !important; min-width: 12px !important; min-height: 12px !important; border-radius: 50% !important; background-color: #E0E0E0 !important; cursor: pointer !important; margin: 0 6px !important; border: none !important; padding: 0 !important; transition: background-color 0.3s !important; display: inline-block !important; visibility: visible !important; opacity: 1 !important;';
        });
        
        document.querySelectorAll('.carousel-dot.active').forEach(dot => {
            dot.style.backgroundColor = '#6653C6 !important';
        });
        
        setTimeout(function() {
            ensureDesktopDotsVisible();
        }, 300);
    }
    
    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('Window resized to ' + (isMobile() ? 'mobile' : 'desktop'));
            handleResize();
            adjustCardSizes();
            // Re-initialize to ensure proper layout
            initTestimonialCarousels();
            // Re-setup the autoloop after resize
            setupAutoLoop();
        }, 250);
    });
      
    // Set multiple timeouts to ensure dots are visible after any potential render or styling race conditions
    if (!isMobile()) {
        // Immediate check (after initial render)
        ensureDesktopDotsVisible();
        
        // Longer delay check (after any lazy loaded resources)
        setTimeout(function() {
            ensureDesktopDotsVisible();
            
            // Setup auto-loop functionality after everything is initialized
            setupAutoLoop();
        }, 1000);
    }
    
    // Function to set up auto-loop functionality
    function setupAutoLoop() {
        const testimonialBlocks = document.querySelectorAll('.wp-block-bevision-client-testimonials');
        
        testimonialBlocks.forEach((block, blockIndex) => {
            // Clear any existing interval
            if (autoLoopIntervals[blockIndex]) {
                clearInterval(autoLoopIntervals[blockIndex]);
                autoLoopIntervals[blockIndex] = null;
            }
            
            const carousel = block.querySelector('.carousel-inner');
            if (!carousel) return;
            
            const cards = carousel.querySelectorAll('.testimonial-card');
            if (!cards.length) return;
            
            // Ensure proper initial positioning - reset scroll position to start at first card
            carousel.scrollLeft = 0;
            
            // Initialize current slide tracking
            block.currentSlide = 0;
            
            // Ensure mobile device is properly initialized with the first slide
            if (isMobile()) {
                const mobileDots = block.querySelector('.mobile-carousel-dots');
                if (mobileDots) {
                    const mobileButtons = mobileDots.querySelectorAll('button');
                    if (mobileButtons && mobileButtons.length) {
                        updateMobileDots(mobileButtons, 0);
                    }
                }
            }
            
            // Enable auto-loop for all testimonial carousels
            console.log(`Setting up auto-loop for carousel ${blockIndex} with ${cards.length} cards`);
            
            // Create auto-loop functionality
            autoLoopIntervals[blockIndex] = setInterval(() => {
                    // Determine next slide based on device type
                    let nextSlide;
                    let maxSlides;
                    
                    if (isMobile()) {
                        // Mobile: one card per slide
                        maxSlides = cards.length;
                        nextSlide = block.currentSlide + 1;
                        if (nextSlide >= maxSlides) {
                            nextSlide = 0;
                        }
                    } else {
                        // Desktop: 1 card per slide
                        const CARDS_PER_SLIDE = 1;
                        maxSlides = cards.length;
                        nextSlide = block.currentSlide + 1;
                        if (nextSlide >= maxSlides) {
                            nextSlide = 0;
                        }
                    }
                    
                    // Get the appropriate dots container based on device
                    let dotsContainer;
                    let dots;
                    
                    if (isMobile()) {
                        dotsContainer = block.querySelector('.mobile-carousel-dots');
                        if (dotsContainer) {
                            dots = dotsContainer.querySelectorAll('button');
                        }
                    } else {
                        dotsContainer = block.querySelector('.carousel-dots');
                        if (dotsContainer) {
                            dots = dotsContainer.querySelectorAll('.carousel-dot');
                        }
                    }
                    
                    // Update the dots
                    if (dots && dots.length) {
                        if (isMobile()) {
                            updateMobileDots(dots, nextSlide);
                        } else {
                            dots.forEach((d, i) => {
                                d.classList.toggle('active', i === nextSlide);
                                d.style.backgroundColor = i === nextSlide ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR;
                            });
                        }
                    }
                    
                    // Handle navigation based on device type
                    if (isMobile()) {
                        // Mobile: use scroll for one card per slide
                        const cardWidth = cards[0].offsetWidth + 
                            parseInt(window.getComputedStyle(cards[0]).marginRight || 20);
                        const scrollPosition = nextSlide * cardWidth;
                        
                        carousel.scrollTo({
                            left: scrollPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Desktop: move by one card at a time
                        const cardWidth = cards[0].offsetWidth;
                        const gap = 20;
                        const scrollPosition = nextSlide * (cardWidth + gap);
                        
                        carousel.scrollTo({
                            left: scrollPosition,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update the current slide tracker
                    block.currentSlide = nextSlide;
                }, AUTO_LOOP_INTERVAL);
        });
    }
});