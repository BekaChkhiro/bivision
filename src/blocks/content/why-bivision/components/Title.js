import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Title Component for the main title
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title text
 * @param {Function} props.onChange - Function to handle title change (for edit mode)
 * @param {boolean} props.isEdit - True if in edit mode, false if in save mode
 * @param {boolean} props.isMobile - True if in mobile view
 * @returns {JSX.Element} Title component
 */
const Title = ({ title, onChange, isEdit = false, isMobile = false }) => {
    // Mobile styles for edit mode
    const mobileStyle = isMobile ? { fontSize: '40px', color: 'green', border: '5px solid green' } : {};

    // Save view (frontend)
    if (!isEdit) {
        return (
            <div className="why-bivision__titles">
                <h2 className="why-bivision__main-title">
                    <RichText.Content value={title} />
                </h2>
            </div>
        );
    }

    // Edit view (admin)
    return (
        <div className="why-bivision__titles">
            <RichText
                tagName="h2"
                className="why-bivision__main-title"
                value={title}
                onChange={onChange}
                placeholder={__('Enter main title...', 'bevision')}
                style={mobileStyle}
            />
        </div>
    );
};

export default Title;
