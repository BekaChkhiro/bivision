import React from 'react';
import styles from './styles';

const CarouselDots = ({ testimonials }) => {
    const dotStyles = (isActive) => ({
        width: '12px',
        height: '12px',
        minWidth: '12px',
        minHeight: '12px',
        borderRadius: '50%',
        backgroundColor: isActive ? '#6653C6' : '#E0E0E0',
        cursor: 'pointer',
        margin: '0 6px',
        border: 'none',
        padding: '0',
        transition: 'background-color 0.3s',
        display: 'inline-block'
    });
    
    // Check if it's mobile device
    const isMobile = window.innerWidth <= 767;
    
    // Calculate how many slides we would have on desktop (3 testimonials per slide)
    const desktopSlideCount = Math.ceil(testimonials.length / 3);
    
    // Limit dots based on device type
    const maxDots = isMobile ? 4 : 5;
    const limitedSlideCount = Math.min(desktopSlideCount, maxDots);
    
    // Create an array with the calculated number of slides (limited to max 5)
    const slidesArray = Array.from({ length: limitedSlideCount });

    return (
        <div className="carousel-dots-container" style={styles.dotContainerStyles} data-testimonial-count={testimonials.length}>
            <div className="carousel-dots" style={styles.dotsStyles}>
                {slidesArray.map((_, index) => (
                    <div 
                        key={index} 
                        className={`carousel-dot ${index === 0 ? 'active' : ''}`}
                        data-index={index}
                        data-slide-type="desktop"
                        style={dotStyles(index === 0)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default CarouselDots;
