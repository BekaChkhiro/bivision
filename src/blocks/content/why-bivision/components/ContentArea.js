import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import StatsList from './StatsList';

/**
 * ContentArea Component for the right side content section
 * 
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Set attributes function (optional for save view)
 * @param {boolean} props.isEdit - True if in edit mode, false if in save mode
 * @returns {JSX.Element} Content area component
 */
const ContentArea = ({ attributes, setAttributes, isEdit = false }) => {
    // Save view (frontend)
    if (!isEdit) {
        return (
            <div className="why-bivision__content" id="about-us">
                <div className="why-bivision__text-content">
                    <div className="why-bivision__about">
                        <RichText.Content
                            tagName="p"
                            value={attributes.aboutContent}
                        />
                    </div>
                </div>
                <StatsList 
                    attributes={attributes}
                    isEdit={false}
                />
            </div>
        );
    }

    // Edit view (admin)
    return (
        <div className="why-bivision__content">
            <div className="why-bivision__text-content">
                <div className="why-bivision__about">
                    <RichText
                        tagName="p"
                        value={attributes.aboutContent}
                        onChange={(content) => setAttributes({ aboutContent: content })}
                        placeholder={__('About content...', 'bevision')}
                    />
                </div>
            </div>
            <StatsList 
                attributes={attributes}
                setAttributes={setAttributes}
                isEdit={true}
            />
        </div>
    );
};

export default ContentArea;
