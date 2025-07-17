import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const ImageSection = ({ 
    imageUrl,
    imageId,
    accordionItems,
    activeAccordion,
    isEditing = false,
    onSelectImage,
    onRemoveImage,
    getCurrentImage
}) => {
    if (!isEditing) {
        return (
            <div className="importance-section__image">
                <img 
                    id="importance-main-image" 
                    src={imageUrl || (accordionItems[0]?.imageUrl)} 
                    alt="" 
                    style={{ display: (imageUrl || accordionItems.some(item => item.imageUrl)) ? 'block' : 'none' }}
                />
            </div>
        );
    }

    const currentImage = getCurrentImage();

    return (
        <div className="importance-section__image">
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={onSelectImage}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                        <>
                            {currentImage ? (
                                <div className="image-container" style={{ position: 'relative' }}>
                                    <img
                                        src={currentImage}
                                        onClick={open}
                                        style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                                        alt="Click to change image"
                                    />
                                    <div style={{ 
                                        marginTop: '10px',
                                        display: 'flex',
                                        gap: '10px'
                                    }}>
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                            isSmall
                                        >
                                            Replace Image
                                        </Button>
                                        <Button
                                            onClick={onRemoveImage}
                                            variant="link"
                                            isDestructive
                                            isSmall
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    onClick={open}
                                    variant="secondary"
                                    className="upload-button"
                                >
                                    Upload Image
                                </Button>
                            )}
                        </>
                    )}
                />
            </MediaUploadCheck>
        </div>
    );
};

export default ImageSection;