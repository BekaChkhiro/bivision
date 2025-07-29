import { RichText } from '@wordpress/block-editor';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, IconButton } from '@wordpress/components';
import { arrowUp, arrowDown, trash } from '@wordpress/icons';

const AccordionItem = ({ 
    item, 
    index, 
    isActive, 
    isEditing = false,
    accordionItems,
    onToggle,
    onUpdateItem,
    onSelectImage,
    onRemoveImage,
    onMoveItem,
    onRemoveItem 
}) => {
    return (
        <div className={`accordion-item ${isActive ? 'active' : ''}`}>
            {isEditing && (
                <div className="accordion-item-controls">
                    <IconButton
                        icon={arrowUp}
                        label="Move Up"
                        onClick={() => onMoveItem(index, 'up')}
                        className="move-accordion-button"
                        disabled={index === 0}
                    />
                    <IconButton
                        icon={arrowDown}
                        label="Move Down"
                        onClick={() => onMoveItem(index, 'down')}
                        className="move-accordion-button"
                        disabled={index === accordionItems.length - 1}
                    />
                    <IconButton
                        icon={trash}
                        label="Remove Accordion Item"
                        onClick={() => onRemoveItem(index)}
                        className="remove-accordion-button"
                        disabled={accordionItems.length <= 1}
                    />
                </div>
            )}
            
            <div className="accordion-header" onClick={() => onToggle(index)}>
                {isEditing ? (
                    <RichText
                        tagName="div"
                        className="accordion-title"
                        value={item.title}
                        onChange={(value) => onUpdateItem(index, 'title', value)}
                        placeholder="Enter title"
                    />
                ) : (
                    <div className="accordion-title">
                        {item.title}
                    </div>
                )}
            </div>
            
            <div className="accordion-content">
                {isEditing ? (
                    <>
                        <RichText
                            tagName="p"
                            value={item.content}
                            onChange={(value) => onUpdateItem(index, 'content', value)}
                            placeholder="Enter content"
                        />
                        <div className="accordion-image-upload">
                            <p>Accordion Image:</p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => onSelectImage(media, index)}
                                    allowedTypes={['image']}
                                    value={item.imageId}
                                    render={({ open }) => (
                                        <>
                                            {item.imageUrl ? (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <img 
                                                        src={item.imageUrl} 
                                                        alt="" 
                                                        style={{ 
                                                            maxWidth: '100%', 
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                            borderRadius: '4px',
                                                            marginBottom: '8px'
                                                        }} 
                                                    />
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <Button
                                                            onClick={open}
                                                            variant="secondary"
                                                            isSmall
                                                        >
                                                            Replace
                                                        </Button>
                                                        <Button
                                                            onClick={() => onRemoveImage(index)}
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
                                                    isSmall
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
                    </>
                ) : (
                    <>
                        <RichText.Content
                            tagName="p"
                            value={item.content}
                        />
                        {item.imageUrl && (
                            <div className="accordion-mobile-image accordion-mobile-only">
                                <img 
                                    src={item.imageUrl} 
                                    alt="" 
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AccordionItem;