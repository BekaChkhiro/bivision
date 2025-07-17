import { __ } from '@wordpress/i18n';

/**
 * Background Image Component
 * @param {Object} props - Component props
 * @param {string} props.imageUrl - URL for the background image
 * @param {string} props.className - CSS class name to apply (background or background2)
 * @param {string} props.altText - Alt text for the image
 * @returns {JSX.Element} Background image element
 */
const BackgroundImage = ({ imageUrl, className, altText }) => {
    if (!imageUrl) return null;
    
    return (
        <div className={`why-bivision__${className}`}>
            <img src={imageUrl} alt={__(altText, 'bevision')} />
        </div>
    );
};

export default BackgroundImage;
