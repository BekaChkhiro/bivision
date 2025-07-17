import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

const Inspector = ({ 
    imageUrl,
    imageId,
    accordionItems,
    onSelectImage,
    onRemoveImage,
    onSelectAccordionImage,
    onRemoveAccordionImage
}) => {
    return (
        <InspectorControls>
            <PanelBody
                title="Image Settings"
                initialOpen={true}
            >
                <PanelRow>
                    <div style={{ width: '100%' }}>
                        <p><strong>Default Section Image</strong></p>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <>
                                        {imageUrl ? (
                                            <div className="inspector-image-container" style={{ marginBottom: '10px' }}>
                                                <img 
                                                    src={imageUrl} 
                                                    alt="" 
                                                    style={{ 
                                                        maxWidth: '100%', 
                                                        height: 'auto',
                                                        marginBottom: '8px'
                                                    }} 
                                                />
                                                <div>
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        isSmall
                                                        style={{ marginRight: '8px' }}
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
                                                className="editor-media-placeholder__button"
                                                icon="upload"
                                                style={{ width: '100%' }}
                                            >
                                                Upload Default Image
                                            </Button>
                                        )}
                                    </>
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                </PanelRow>
            </PanelBody>
            
            <PanelBody
                title="Accordion Item Images"
                initialOpen={false}
            >
                {accordionItems.map((item, index) => (
                    <PanelRow key={index}>
                        <div style={{ width: '100%', marginBottom: '20px' }}>
                            <p><strong>{item.title || `Accordion ${index + 1}`} Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => onSelectAccordionImage(media, index)}
                                    allowedTypes={['image']}
                                    value={item.imageId}
                                    render={({ open }) => (
                                        <>
                                            {item.imageUrl ? (
                                                <div className="inspector-image-container" style={{ marginBottom: '10px' }}>
                                                    <img 
                                                        src={item.imageUrl} 
                                                        alt="" 
                                                        style={{ 
                                                            maxWidth: '100%', 
                                                            height: 'auto',
                                                            marginBottom: '8px'
                                                        }} 
                                                    />
                                                    <div>
                                                        <Button
                                                            onClick={open}
                                                            variant="secondary"
                                                            isSmall
                                                            style={{ marginRight: '8px' }}
                                                        >
                                                            Replace
                                                        </Button>
                                                        <Button
                                                            onClick={() => onRemoveAccordionImage(index)}
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
                                                    className="editor-media-placeholder__button"
                                                    icon="upload"
                                                    style={{ width: '100%' }}
                                                >
                                                    Upload Image
                                                </Button>
                                            )}
                                        </>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </PanelRow>
                ))}
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;