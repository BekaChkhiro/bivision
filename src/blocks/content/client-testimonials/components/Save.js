import React from 'react';
import styles from './styles';
import CarouselDots from './CarouselDots';

const Save = ({ attributes }) => {
    const { title, subtitle, testimonials, selectedTestimonials, orderBy } = attributes;
    
    // Function to clean testimonial content and remove duplicate p tags
    const cleanTestimonialContent = (content) => {
        if (!content) return '';
        
        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // Remove any wrapper divs with testimonial-content-styled class
        const wrapperDiv = tempDiv.querySelector('.testimonial-content-styled');
        if (wrapperDiv) {
            tempDiv.innerHTML = wrapperDiv.innerHTML;
        }
        
        // Get all p elements
        const paragraphs = tempDiv.querySelectorAll('p');
        
        // If there are multiple p elements, combine their innerHTML content
        if (paragraphs.length > 1) {
            const htmlContent = Array.from(paragraphs)
                .map(p => p.innerHTML.trim())
                .filter(html => html.length > 0)
                .join(' ');
            return htmlContent;
        }
        
        // If there's one p element, get its innerHTML
        if (paragraphs.length === 1) {
            return paragraphs[0].innerHTML.trim();
        }
        
        // If no p elements, return the original content
        return tempDiv.innerHTML.trim();
    };
    
    // Function to get filtered and sorted testimonials
    const getFilteredTestimonials = () => {
        // If no selection or empty selection, return empty array
        if (!selectedTestimonials || selectedTestimonials.length === 0) {
            return [];
        }
        
        // Get only the selected testimonials
        const filtered = selectedTestimonials
            .map(index => testimonials[index])
            .filter(Boolean);
        
        // Sort based on orderBy value
        if (orderBy === 'name') {
            filtered.sort((a, b) => 
                (a.authorName || '').localeCompare(b.authorName || '')
            );
        } else if (orderBy === 'position') {
            filtered.sort((a, b) => 
                (a.authorPosition || '').localeCompare(b.authorPosition || '')
            );
        }
        
        return filtered;
    };
    
    // Get filtered testimonials
    const filteredTestimonials = getFilteredTestimonials();
    
    return (
        <div className="wp-block-bevision-client-testimonials" style={styles.clientTestimonials}>
            <p style={styles.subtitle}>{subtitle}</p>
            <h2 style={styles.title}>{title}</h2>
            <div className="carousel-wrapper" style={styles.carouselWrapper}>
                <div style={styles.carousel} className="carousel">
                    <div className="carousel-inner" style={styles.carouselInner}>
                        {filteredTestimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card" style={{
                                ...styles.testimonialCard,
                                ...(index === 0 ? { marginLeft: '20px' } : {})
                            }}>
                                {testimonial.companyLogo && (
                                    <div className="company-logo-container" style={styles.logoContainer}>
                                        <img 
                                            className="company-logo" 
                                            src={testimonial.companyLogo} 
                                            alt="" 
                                            style={styles.companyLogo}
                                            onMouseOver={(e) => {
                                                e.target.style.transform = 'scale(1.15)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        />
                                    </div>
                                )}
                                <p className="content" style={styles.content} dangerouslySetInnerHTML={{ __html: cleanTestimonialContent(testimonial.content) }}></p>
                                <div className="author" style={styles.author}>
                                    {testimonial.authorImage && (
                                        <img className="author-image" src={testimonial.authorImage} alt="" style={styles.authorImage} />
                                    )}
                                    <div className="author-info" style={styles.authorInfo}>
                                        <h4 className="author-name" style={styles.authorName}>{testimonial.authorName}</h4>
                                        <p className="author-position" style={styles.authorPosition}>{testimonial.authorPosition}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CarouselDots testimonials={testimonials} />
                </div>
            </div>
            {/* Add a hidden element with additional HTML for dots that will be used by JavaScript */}
            <div className="carousel-dots-fallback" style={{display: 'none'}}>
                <div className="carousel-dots">
                    {testimonials.map((_, index) => (
                        <div 
                            key={index} 
                            className={`carousel-dot ${index === 0 ? 'active' : ''}`}
                            data-index={index}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Save;
