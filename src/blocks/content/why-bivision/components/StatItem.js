import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * StatItem Component for displaying individual stats
 * 
 * @param {Object} props - Component props
 * @param {string} props.iconUrl - URL for the stat icon
 * @param {number} props.iconId - Media ID for the stat icon
 * @param {string} props.value - Value text for the stat
 * @param {string} props.label - Label text for the stat
 * @param {Function} props.onIconSelect - Function to handle icon selection
 * @param {Function} props.onValueChange - Function to handle value text change
 * @param {Function} props.onLabelChange - Function to handle label text change
 * @param {boolean} props.isEdit - True if in edit mode, false if in save mode
 * @returns {JSX.Element} Stat item component
 */
const StatItem = ({ 
    iconUrl, 
    iconId, 
    value, 
    label,
    onIconSelect,
    onValueChange,
    onLabelChange,
    isEdit = false
}) => {
    // Save view (frontend)
    if (!isEdit) {
        return (
            <div className="stat-item">
                {iconUrl && <img src={iconUrl} alt="" />}
                <RichText.Content tagName="h3" value={value} />
                <RichText.Content tagName="p" value={label} />
            </div>
        );
    }

    // Edit view (admin)
    return (
        <div className="stat-item">
            <MediaUpload
                onSelect={onIconSelect}
                allowedTypes={['image']}
                value={iconId}
                render={({ open }) => (
                    <Button
                        onClick={open}
                        className="editor-post-featured-image__toggle"
                        style={{ marginBottom: '1rem' }}
                    >
                        {iconUrl ? 
                            <img src={iconUrl} alt="" style={{ maxWidth: '40px' }} /> :
                            __('Upload Icon', 'bevision')
                        }
                    </Button>
                )}
            />
            <RichText
                tagName="h3"
                value={value}
                onChange={onValueChange}
                placeholder={__('Value', 'bevision')}
            />
            <RichText
                tagName="p"
                value={label}
                onChange={onLabelChange}
                placeholder={__('Label', 'bevision')}
            />
        </div>
    );
};

export default StatItem;
