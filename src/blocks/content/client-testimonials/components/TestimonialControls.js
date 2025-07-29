import React from 'react';
import styles from './styles';

const TestimonialControls = ({ addTestimonial }) => {
    return (
        <div style={styles.controls}>
            <button 
                onClick={addTestimonial}
                style={styles.addButton}
            >
                Add Testimonial
            </button>
        </div>
    );
};

export default TestimonialControls;
