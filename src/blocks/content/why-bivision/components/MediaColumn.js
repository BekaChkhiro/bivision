import { __ } from '@wordpress/i18n';
import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * MediaColumn Component for editor and saved view
 * 
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Set attributes function (optional for save view)
 * @param {boolean} props.isEdit - True if in edit mode, false if in save mode
 * @returns {JSX.Element} Media column component
 */
const MediaColumn = ({ attributes, setAttributes, isEdit = false }) => {
    const onSelectImage = (media) => {
        setAttributes({
            mediaId: media.id,
            mediaUrl: media.url
        });
    };

    // Save view (frontend)
    if (!isEdit) {
        return (
            <div className="why-bivision__media-column">
                {attributes.mediaUrl && (
                    <img src={attributes.mediaUrl} alt={__('Team Image', 'bevision')} />
                )}
            </div>
        );
    }

    // Edit view (admin)
    return (
        <div className="why-bivision__media-column">
            <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={['image']}
                value={attributes.mediaId}
                render={({ open }) => (
                    <Button
                        onClick={open}
                        className={attributes.mediaUrl ? 'image-button' : 'button button-large'}
                    >
                        {!attributes.mediaUrl ? __('Upload Image', 'bevision') : (
                            <img src={attributes.mediaUrl} alt={__('Team Image', 'bevision')} />
                        )}
                    </Button>
                )}
            />
        </div>
    );
};

export default MediaColumn;
