import React, { useState } from 'react';
import styles from './styles';
import TestimonialCard from './TestimonialCard';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const TestimonialCarousel = ({ testimonials, updateTestimonial, removeTestimonial, duplicateTestimonial }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Function to navigate between testimonials in the editor
    const navigateTo = (index) => {
        if (index >= 0 && index < testimonials.length) {
            setActiveIndex(index);
        }
    };

    return (
        <div style={styles.carousel}>
            <div style={styles.carouselInner}>
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard
                        key={index}
                        testimonial={testimonial}
                        index={index}
                        updateTestimonial={updateTestimonial}
                        removeTestimonial={removeTestimonial}
                        duplicateTestimonial={duplicateTestimonial}
                        isActive={index === activeIndex}
                        style={index === activeIndex ? { transform: 'scale(1.02)', boxShadow: '0 6px 20px rgba(0,0,0,0.1)' } : {}}
                    />
                ))}
            </div>
            
            {/* Improved editor navigation controls */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button 
                    isSecondary
                    icon="arrow-left-alt2"
                    onClick={() => navigateTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    style={{ marginRight: '10px' }}
                >
                    {__('Previous', 'bevision')}
                </Button>
                <Button 
                    isSecondary
                    icon="arrow-right-alt2"
                    iconPosition="right"
                    onClick={() => navigateTo(activeIndex + 1)}
                    disabled={activeIndex === testimonials.length - 1}
                    style={{ marginLeft: '10px' }}
                >
                    {__('Next', 'bevision')}
                </Button>
            </div>
            
            {/* Enhanced dots with improved visibility */}
            <div className="carousel-dots-container" style={{ marginTop: '15px', position: 'relative', zIndex: 5 }}>
                <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {testimonials.map((_, index) => (
                        <div 
                            key={index} 
                            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`} 
                            data-index={index}
                            onClick={() => navigateTo(index)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: index === activeIndex ? '#6653C6' : '#E0E0E0',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
                                opacity: index === activeIndex ? 1 : 0.8,
                                border: 'none'
                            }}
                            aria-label={`${__('Go to slide', 'bevision')} ${index + 1}`}
                            role="button"
                            tabIndex={0}
                        ></div>
                    ))}
                </div>
            </div>
            
            {/* Slide indicator */}
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
                {testimonials.length > 0 ? `${activeIndex + 1} / ${testimonials.length}` : __('No testimonials', 'bevision')}
            </div>
        </div>
    );
};

export default TestimonialCarousel;
