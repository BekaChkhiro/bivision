import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const styles = {
    imageContainer: {
        width: '100%',
        height: '400px',
        borderRadius: '16px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    uploadButton: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        border: '2px dashed rgba(123, 97, 255, 0.3)',
        borderRadius: '16px'
    },
    imageControls: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        display: 'flex',
        gap: '4px'
    },
    imageButton: {
        padding: '0',
        width: '28px',
        height: '28px',
        background: 'rgba(255,255,255,0.9)',
        border: 'none',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }
};

const ProductImage = ({ image, onSelect, onRemove, isEditing = false, className = '' }) => {
    if (isEditing) {
        return (
            <MediaUploadCheck>
                <div style={{ ...styles.imageContainer, position: 'relative' }} className={className}>
                    {image ? (
                        <>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }} />
                            <div style={styles.imageControls}>
                                <MediaUpload
                                    onSelect={(media) => onSelect(media.url)}
                                    allowedTypes={['image']}
                                    value={image}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            style={styles.imageButton}
                                            aria-label="Change image"
                                        >
                                            <span className="dashicons dashicons-update" style={{ fontSize: '18px', color: '#6653C6' }} />
                                        </Button>
                                    )}
                                />
                                <Button 
                                    isDestructive
                                    onClick={() => onRemove()}
                                    style={styles.imageButton}
                                    aria-label="Remove image"
                                >
                                    <span className="dashicons dashicons-no-alt" style={{ fontSize: '18px', color: '#d63638' }} />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <MediaUpload
                            onSelect={(media) => onSelect(media.url)}
                            allowedTypes={['image']}
                            value={image}
                            render={({ open }) => (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '24px 16px',
                                    cursor: 'pointer',
                                    height: '100%',
                                    justifyContent: 'center'
                                }} onClick={open}>
                                    <span className="dashicons dashicons-upload" style={{ 
                                        fontSize: '24px',
                                        width: '24px',
                                        height: '24px',
                                        color: '#007cba'
                                    }} />
                                    <span style={{
                                        fontSize: '13px',
                                        color: '#1e1e1e'
                                    }}>
                                        Click to upload image
                                    </span>
                                </div>
                            )}
                        />
                    )}
                </div>
            </MediaUploadCheck>
        );
    }

    return (
        <div style={styles.imageContainer} className={className}>
            {image && (
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
            )}
        </div>
    );
};

export default ProductImage;