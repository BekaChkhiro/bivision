import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl, RangeControl, TextControl, TextareaControl } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/media-description-block', {
    title: 'Media with Description Block',
    icon: 'format-video',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Video or image with description'
        },
        description: {
            type: 'string',
            default: 'Vivamus ac eleifend massa. Sed a dui aliquam, posuere risus eget, maximus risus. Morbi a purus mi. Vivamus enim tortor, lacinia nec lacus non, efficitur varius velit. Nunc id facilisis massa, et lobortis lorem. Aenean in neque nec massa placerat eleifend.'
        },
        hasVideo: {
            type: 'boolean',
            default: false
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageAlt: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number',
            default: null
        },
        videoUrl: {
            type: 'string',
            default: ''
        },
        videoEmbedCode: {
            type: 'string',
            default: ''
        },
        playButtonImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        titleColor: {
            type: 'string',
            default: '#4CD137'
        },
        descriptionColor: {
            type: 'string',
            default: '#8A97A0'
        },
        titleFontSize: {
            type: 'number',
            default: 32
        },
        descriptionFontSize: {
            type: 'number',
            default: 16
        },
        isContentFirst: {
            type: 'boolean',
            default: false
        },
        authorName: {
            type: 'string',
            default: ''
        },
        authorTitle: {
            type: 'string',
            default: ''
        },
        authorImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        showAuthor: {
            type: 'boolean',
            default: false
        },
        authorNameColor: {
            type: 'string',
            default: '#2D2A5F'
        },
        authorTitleColor: {
            type: 'string',
            default: '#8399AF'
        },
        authorNameFontSize: {
            type: 'number',
            default: 18
        },
        authorTitleFontSize: {
            type: 'number',
            default: 14
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            title, description, hasVideo,
            imageUrl, imageAlt, imageId,
            videoUrl, videoEmbedCode, playButtonImage,
            titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            isContentFirst,
            authorName, authorTitle, authorImage, showAuthor,
            authorNameColor, authorTitleColor, authorNameFontSize, authorTitleFontSize
        } = attributes;

        // Helper functions removed - no longer needed for single description

        // Handle media selection
        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageAlt: media.alt || '',
                imageId: media.id
            });
        };

        // Handle author image selection
        const onSelectAuthorImage = (media) => {
            setAttributes({
                authorImage: {
                    url: media.url,
                    alt: media.alt || '',
                    id: media.id
                }
            });
        };

        // Handle media removal
        const removeImage = () => {
            setAttributes({
                imageUrl: '',
                imageAlt: '',
                imageId: null
            });
        };
        
        // Handle play button image selection
        const onSelectPlayButtonImage = (media) => {
            setAttributes({
                playButtonImage: {
                    url: media.url,
                    alt: media.alt || 'Play button',
                    id: media.id
                }
            });
        };
        
        // Handle play button image removal
        const removePlayButtonImage = () => {
            setAttributes({
                playButtonImage: {
                    url: '',
                    alt: '',
                    id: null
                }
            });
        };

        // Preview HTML for the play button
        const playButtonHtml = (
            <div style={styles.videoOverlay()}>
                {playButtonImage && playButtonImage.url ? (
                    <img 
                        src={playButtonImage.url}
                        alt={playButtonImage.alt || 'Play'}
                        style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'contain'
                        }}
                    />
                ) : (
                    <div style={styles.playButton()}>
                        <div style={styles.playIcon()}></div>
                    </div>
                )}
            </div>
        );

        return (
            <>
                <style>
                    {`
                        .media-wrapper:hover .edit-overlay {
                            opacity: 1 !important;
                        }
                    `}
                </style>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <TextControl
                            label="Title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            help="Edit the main title text"
                        />
                        
                        <TextareaControl
                            label="Description"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            rows={4}
                            help="Edit the description text"
                        />
                    </PanelBody>
                    
                    <PanelBody title="Media Settings" initialOpen={false}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>მთავარი სურათი</label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={imageId}
                                    render={({ open }) => (
                                        <div>
                                            {imageUrl ? (
                                                <div style={{ position: 'relative', marginBottom: '10px' }}>
                                                    <img 
                                                        src={imageUrl} 
                                                        alt={imageAlt} 
                                                        style={{ 
                                                            maxWidth: '100%', 
                                                            maxHeight: '150px',
                                                            display: 'block',
                                                            borderRadius: '4px'
                                                        }} 
                                                    />
                                                    <Button
                                                        onClick={removeImage}
                                                        className="button is-small"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            right: '5px',
                                                            backgroundColor: '#fff',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            padding: '4px 6px',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        ✕
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div style={{ 
                                                    padding: '40px', 
                                                    border: '2px dashed #ddd', 
                                                    textAlign: 'center', 
                                                    marginBottom: '10px',
                                                    borderRadius: '4px',
                                                    backgroundColor: '#f9f9f9'
                                                }}>
                                                    <span style={{ color: '#666' }}>სურათი არ არის არჩეული</span>
                                                </div>
                                            )}
                                            <Button 
                                                onClick={open}
                                                className="button"
                                                variant="secondary"
                                                style={{ width: '100%' }}
                                            >
                                                {imageUrl ? 'შეცვალეთ სურათი' : 'აირჩიეთ სურათი'}
                                            </Button>
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                        
                        <ToggleControl
                            label="დაამატეთ ვიდეო"
                            help={hasVideo ? 'ვიდეო ჩართულია' : 'ვიდეო გამორთულია'}
                            checked={hasVideo}
                            onChange={(value) => setAttributes({ hasVideo: value })}
                        />
                        
                        {hasVideo && (
                            <>
                                <TextControl
                                    label="ვიდეოს URL (YouTube ან Vimeo)"
                                    value={videoUrl}
                                    onChange={(value) => setAttributes({ videoUrl: value })}
                                    help="შეიყვანეთ YouTube ან Vimeo ბმული"
                                />
                                
                                <div style={{ marginTop: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>დაკვრის ღილაკის სურათი</label>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectPlayButtonImage}
                                            allowedTypes={['image']}
                                            value={playButtonImage?.id}
                                            render={({ open }) => (
                                                <div>
                                                    {playButtonImage && playButtonImage.url ? (
                                                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                                                            <img 
                                                                src={playButtonImage.url} 
                                                                alt={playButtonImage.alt} 
                                                                style={{ 
                                                                    maxWidth: '100%', 
                                                                    maxHeight: '80px',
                                                                    display: 'block' 
                                                                }} 
                                                            />
                                                            <Button
                                                                onClick={removePlayButtonImage}
                                                                className="button is-small"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '0',
                                                                    right: '0',
                                                                    backgroundColor: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    padding: '2px',
                                                                    cursor: 'pointer',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                                }}
                                                            >
                                                                ✕
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                    <Button 
                                                        onClick={open}
                                                        className="button"
                                                        variant="secondary"
                                                    >
                                                        {playButtonImage && playButtonImage.url 
                                                            ? 'შეცვალეთ ღილაკის სურათი' 
                                                            : 'აირჩიეთ ღილაკის სურათი'}
                                                    </Button>
                                                    <div style={{ fontSize: '11px', marginTop: '5px', color: '#777' }}>
                                                        იდეალური ზომა: 80x80px
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </>
                        )}
                    </PanelBody>

                    <PanelBody title="Style Settings" initialOpen={false}>
                        <div>
                            <label>Title Color</label>
                            <input
                                type="color"
                                value={titleColor}
                                onChange={(e) => setAttributes({ titleColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <div>
                            <label>Description Color</label>
                            <input
                                type="color"
                                value={descriptionColor}
                                onChange={(e) => setAttributes({ descriptionColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <RangeControl
                            label="Title Font Size"
                            value={titleFontSize}
                            onChange={(value) => setAttributes({ titleFontSize: value })}
                            min={16}
                            max={48}
                        />
                        
                        <RangeControl
                            label="Description Font Size"
                            value={descriptionFontSize}
                            onChange={(value) => setAttributes({ descriptionFontSize: value })}
                            min={12}
                            max={24}
                        />
                    </PanelBody>

                    <PanelBody title="Author Settings" initialOpen={false}>
                        <ToggleControl
                            label="Show Author Section"
                            help={showAuthor ? 'Author section is visible' : 'Author section is hidden'}
                            checked={showAuthor}
                            onChange={(value) => setAttributes({ showAuthor: value })}
                        />

                        <TextControl
                            label="Author Name"
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}
                            help="Enter the author's name"
                        />
                        
                        <TextControl
                            label="Author Title/Workplace"
                            value={authorTitle}
                            onChange={(value) => setAttributes({ authorTitle: value })}
                            help="Enter the author's position or workplace"
                        />
                        
                        <div style={{ marginTop: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Author Photo
                            </label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectAuthorImage}
                                    allowedTypes={['image']}
                                    value={authorImage?.id}
                                    render={({ open }) => (
                                        <div>
                                            <Button 
                                                onClick={open}
                                                className={authorImage?.url ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                                                variant="secondary"
                                                style={{ width: '100%', marginBottom: '10px' }}
                                            >
                                                {authorImage?.url ? 'Change Author Photo' : 'Select Author Photo'}
                                            </Button>
                                            {authorImage?.url && (
                                                <Button 
                                                    onClick={() => setAttributes({
                                                        authorImage: {
                                                            url: '',
                                                            alt: '',
                                                            id: null
                                                        }
                                                    })}
                                                    isDestructive
                                                    style={{ width: '100%' }}
                                                >
                                                    Remove Photo
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                            {authorImage?.url && (
                                <div style={{ marginTop: '10px' }}>
                                    <img 
                                        src={authorImage.url} 
                                        alt={authorImage.alt} 
                                        style={{ maxWidth: '100px', borderRadius: '50%' }} 
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <label>Author Name Color</label>
                            <input
                                type="color"
                                value={authorNameColor}
                                onChange={(e) => setAttributes({ authorNameColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <div>
                            <label>Author Title Color</label>
                            <input
                                type="color"
                                value={authorTitleColor}
                                onChange={(e) => setAttributes({ authorTitleColor: e.target.value })}
                                style={{ width: '100%', marginBottom: '10px' }}
                            />
                        </div>
                        
                        <RangeControl
                            label="Author Name Font Size"
                            value={authorNameFontSize}
                            onChange={(value) => setAttributes({ authorNameFontSize: value })}
                            min={12}
                            max={24}
                        />
                        
                        <RangeControl
                            label="Author Title Font Size"
                            value={authorTitleFontSize}
                            onChange={(value) => setAttributes({ authorTitleFontSize: value })}
                            min={10}
                            max={20}
                        />
                    </PanelBody>
                    
                    <PanelBody title="Layout Settings" initialOpen={false}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Column Order
                            </label>
                            <Button
                                isPrimary={!isContentFirst}
                                isSecondary={isContentFirst}
                                onClick={() => setAttributes({ isContentFirst: false })}
                                style={{ marginRight: '10px', marginBottom: '10px' }}
                            >
                                Media First
                            </Button>
                            <Button
                                isPrimary={isContentFirst}
                                isSecondary={!isContentFirst}
                                onClick={() => setAttributes({ isContentFirst: true })}
                                style={{ marginBottom: '10px' }}
                            >
                                Content First
                            </Button>
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    variant="secondary"
                                    onClick={() => setAttributes({ isContentFirst: !isContentFirst })}
                                    style={{ 
                                        width: '100%',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    🔄 Swap Columns
                                </Button>
                            </div>
                            <p style={{ 
                                fontSize: '12px', 
                                color: '#666', 
                                marginTop: '10px', 
                                fontStyle: 'italic' 
                            }}>
                                {isContentFirst 
                                    ? 'Currently: Content on left, Media on right'
                                    : 'Currently: Media on left, Content on right'
                                }
                            </p>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.container()}>
                    {/* Conditionally render columns based on isContentFirst */}
                    {isContentFirst ? (
                        <>
                            {/* Content Column First */}
                            <div style={styles.contentColumn()}>
                                <RichText
                                    tagName="h2"
                                    value={title}
                                    onChange={(content) => setAttributes({ title: content })}
                                    placeholder="Enter a title"
                                    style={{
                                        ...styles.title(),
                                        color: titleColor,
                                        fontSize: `${titleFontSize}px`
                                    }}
                                />
                                
                                <RichText
                                    tagName="p"
                                    value={description}
                                    onChange={(content) => setAttributes({ description: content })}
                                    placeholder="Enter description"
                                    style={{
                                        ...styles.descriptionText(),
                                        color: descriptionColor,
                                        fontSize: `${descriptionFontSize}px`
                                    }}
                                />

                                {/* Author section - inline editable */}
                                {showAuthor && (
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            {/* Author Image */}
                                            <div style={{ position: 'relative' }}>
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={onSelectAuthorImage}
                                                        allowedTypes={['image']}
                                                        value={authorImage?.id}
                                                        render={({ open }) => (
                                                            <div 
                                                                onClick={open}
                                                                style={{ 
                                                                    width: 60, 
                                                                    height: 60, 
                                                                    borderRadius: '50%', 
                                                                    border: '2px dashed #ccc',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    backgroundImage: authorImage?.url ? `url(${authorImage.url})` : 'none',
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    position: 'relative',
                                                                    backgroundColor: authorImage?.url ? 'transparent' : '#f5f5f5'
                                                                }}
                                                            >
                                                                {!authorImage?.url && (
                                                                    <span style={{ fontSize: '10px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                                                                        Click to<br/>add photo
                                                                    </span>
                                                                )}
                                                                {authorImage?.url && (
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        top: '-5px',
                                                                        right: '-5px',
                                                                        width: '18px',
                                                                        height: '18px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #ccc',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                        fontSize: '10px',
                                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        open();
                                                                    }}
                                                                    title="Change photo">
                                                                        ✎
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                            </div>
                                            
                                            {/* Author Info */}
                                            <div>
                                                <RichText
                                                    tagName="div"
                                                    className="author-name"
                                                    value={authorName}
                                                    onChange={(value) => setAttributes({ authorName: value })}
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        color: authorNameColor,
                                                        fontSize: `${authorNameFontSize}px`,
                                                        marginBottom: '5px'
                                                    }}
                                                    placeholder="Author name..."
                                                    allowedFormats={['core/bold', 'core/italic']}
                                                />
                                                <RichText
                                                    tagName="div"
                                                    className="author-title"
                                                    value={authorTitle}
                                                    onChange={(value) => setAttributes({ authorTitle: value })}
                                                    style={{ 
                                                        fontSize: `${authorTitleFontSize}px`, 
                                                        color: authorTitleColor
                                                    }}
                                                    placeholder="Author title..."
                                                    allowedFormats={['core/bold', 'core/italic']}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Media Column Second */}
                            <div style={styles.mediaColumn()}>
                                <div style={styles.mediaWrapper()}>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectImage}
                                            allowedTypes={['image']}
                                            value={imageId}
                                            render={({ open }) => (
                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                    {imageUrl ? (
                                                        <>
                                                            <img 
                                                                src={imageUrl} 
                                                                alt={imageAlt} 
                                                                style={{
                                                                    ...styles.mediaImage(),
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={open}
                                                            />
                                                            {/* Edit overlay */}
                                                            <div 
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                                                    color: 'white',
                                                                    padding: '8px 12px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '12px',
                                                                    opacity: '0',
                                                                    transition: 'opacity 0.3s ease',
                                                                    pointerEvents: 'none',
                                                                    zIndex: '2'
                                                                }}
                                                                className="edit-overlay"
                                                            >
                                                                Click to change image
                                                            </div>
                                                            {/* Remove button */}
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeImage();
                                                                }}
                                                                className="button is-small"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '10px',
                                                                    right: '10px',
                                                                    backgroundColor: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    padding: '5px 7px',
                                                                    cursor: 'pointer',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                                    zIndex: '3',
                                                                    fontSize: '12px',
                                                                    lineHeight: '1'
                                                                }}
                                                                title="Remove image"
                                                            >
                                                                ✕
                                                            </Button>

                                                            {hasVideo && videoUrl && playButtonHtml}
                                                        </>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                ...styles.placeholderMedia(),
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '10px',
                                                                border: '2px dashed #ccc',
                                                                borderRadius: '8px',
                                                                backgroundColor: '#f9f9f9',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onClick={open}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = '#f0f0f0';
                                                                e.target.style.borderColor = '#999';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = '#f9f9f9';
                                                                e.target.style.borderColor = '#ccc';
                                                            }}
                                                        >
                                                            <div style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                backgroundColor: '#ddd',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '18px',
                                                                color: '#666'
                                                            }}>
                                                                📷
                                                            </div>
                                                            <span style={{ color: '#666', fontSize: '14px' }}>Click to add image</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Media Column First */}
                            <div style={styles.mediaColumn()}>
                                <div style={styles.mediaWrapper()}>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectImage}
                                            allowedTypes={['image']}
                                            value={imageId}
                                            render={({ open }) => (
                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                    {imageUrl ? (
                                                        <>
                                                            <img 
                                                                src={imageUrl} 
                                                                alt={imageAlt} 
                                                                style={{
                                                                    ...styles.mediaImage(),
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={open}
                                                            />
                                                            {/* Edit overlay */}
                                                            <div 
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '50%',
                                                                    left: '50%',
                                                                    transform: 'translate(-50%, -50%)',
                                                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                                                    color: 'white',
                                                                    padding: '8px 12px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '12px',
                                                                    opacity: '0',
                                                                    transition: 'opacity 0.3s ease',
                                                                    pointerEvents: 'none',
                                                                    zIndex: '2'
                                                                }}
                                                                className="edit-overlay"
                                                            >
                                                                Click to change image
                                                            </div>
                                                            {/* Remove button */}
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    removeImage();
                                                                }}
                                                                className="button is-small"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '10px',
                                                                    right: '10px',
                                                                    backgroundColor: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    padding: '5px 7px',
                                                                    cursor: 'pointer',
                                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                                    zIndex: '3',
                                                                    fontSize: '12px',
                                                                    lineHeight: '1'
                                                                }}
                                                                title="Remove image"
                                                            >
                                                                ✕
                                                            </Button>

                                                            {hasVideo && videoUrl && playButtonHtml}
                                                        </>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                ...styles.placeholderMedia(),
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '10px',
                                                                border: '2px dashed #ccc',
                                                                borderRadius: '8px',
                                                                backgroundColor: '#f9f9f9',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                            onClick={open}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = '#f0f0f0';
                                                                e.target.style.borderColor = '#999';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = '#f9f9f9';
                                                                e.target.style.borderColor = '#ccc';
                                                            }}
                                                        >
                                                            <div style={{
                                                                width: '40px',
                                                                height: '40px',
                                                                backgroundColor: '#ddd',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '18px',
                                                                color: '#666'
                                                            }}>
                                                                📷
                                                            </div>
                                                            <span style={{ color: '#666', fontSize: '14px' }}>Click to add image</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            </div>

                            {/* Content Column Second */}
                            <div style={styles.contentColumn()}>
                                <RichText
                                    tagName="h2"
                                    value={title}
                                    onChange={(content) => setAttributes({ title: content })}
                                    placeholder="Enter a title"
                                    style={{
                                        ...styles.title(),
                                        color: titleColor,
                                        fontSize: `${titleFontSize}px`
                                    }}
                                />
                                
                                <RichText
                                    tagName="p"
                                    value={description}
                                    onChange={(content) => setAttributes({ description: content })}
                                    placeholder="Enter description"
                                    style={{
                                        ...styles.descriptionText(),
                                        color: descriptionColor,
                                        fontSize: `${descriptionFontSize}px`
                                    }}
                                />

                                {/* Author section - inline editable */}
                                {showAuthor && (
                                    <div style={{ marginTop: '30px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            {/* Author Image */}
                                            <div style={{ position: 'relative' }}>
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={onSelectAuthorImage}
                                                        allowedTypes={['image']}
                                                        value={authorImage?.id}
                                                        render={({ open }) => (
                                                            <div 
                                                                onClick={open}
                                                                style={{ 
                                                                    width: 60, 
                                                                    height: 60, 
                                                                    borderRadius: '50%', 
                                                                    border: '2px dashed #ccc',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    cursor: 'pointer',
                                                                    backgroundImage: authorImage?.url ? `url(${authorImage.url})` : 'none',
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    position: 'relative',
                                                                    backgroundColor: authorImage?.url ? 'transparent' : '#f5f5f5'
                                                                }}
                                                            >
                                                                {!authorImage?.url && (
                                                                    <span style={{ fontSize: '10px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                                                                        Click to<br/>add photo
                                                                    </span>
                                                                )}
                                                                {authorImage?.url && (
                                                                    <div style={{
                                                                        position: 'absolute',
                                                                        top: '-5px',
                                                                        right: '-5px',
                                                                        width: '18px',
                                                                        height: '18px',
                                                                        borderRadius: '50%',
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #ccc',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        cursor: 'pointer',
                                                                        fontSize: '10px',
                                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                                    }}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        open();
                                                                    }}
                                                                    title="Change photo">
                                                                        ✎
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                            </div>
                                            
                                            {/* Author Info */}
                                            <div>
                                                <RichText
                                                    tagName="div"
                                                    className="author-name"
                                                    value={authorName}
                                                    onChange={(value) => setAttributes({ authorName: value })}
                                                    style={{ 
                                                        fontWeight: 'bold', 
                                                        color: authorNameColor,
                                                        fontSize: `${authorNameFontSize}px`,
                                                        marginBottom: '5px'
                                                    }}
                                                    placeholder="Author name..."
                                                    allowedFormats={['core/bold', 'core/italic']}
                                                />
                                                <RichText
                                                    tagName="div"
                                                    className="author-title"
                                                    value={authorTitle}
                                                    onChange={(value) => setAttributes({ authorTitle: value })}
                                                    style={{ 
                                                        fontSize: `${authorTitleFontSize}px`, 
                                                        color: authorTitleColor
                                                    }}
                                                    placeholder="Author title..."
                                                    allowedFormats={['core/bold', 'core/italic']}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            title, description, hasVideo,
            imageUrl, imageAlt,
            videoUrl, videoEmbedCode, playButtonImage,
            titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            isContentFirst,
            authorName, authorTitle, authorImage, showAuthor,
            authorNameColor, authorTitleColor, authorNameFontSize, authorTitleFontSize
        } = attributes;

        // YouTube video ID extraction
        const getYouTubeVideoId = (url) => {
            if (!url) return '';
            
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            
            return (match && match[2].length === 11) ? match[2] : '';
        };

        const youtubeVideoId = getYouTubeVideoId(videoUrl);
        const thumbnailUrl = youtubeVideoId ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg` : '';

        return (
            <div className={`wp-block-bevision-media-description-block ${isContentFirst ? 'content-first' : 'media-first'}`}>
                {isContentFirst ? (
                    <>
                        {/* Content Column First */}
                        <div className="content-column">
                            <RichText.Content
                                tagName="h2"
                                className="title" 
                                style={{
                                    color: titleColor,
                                    fontSize: `${titleFontSize}px`
                                }}
                                value={title}
                            />
                            
                            <RichText.Content
                                tagName="p"
                                className="description-text"
                                style={{
                                    color: descriptionColor,
                                    fontSize: `${descriptionFontSize}px`
                                }}
                                value={description}
                            />

                            {/* Author Section */}
                            {showAuthor && (authorName || authorTitle || authorImage?.url) && (
                                <div className="text-author" style={{ marginTop: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        {authorImage?.url && (
                                            <img 
                                                src={authorImage.url} 
                                                alt={authorImage.alt || authorName || 'Author'} 
                                                className="author-image" 
                                                style={{ 
                                                    width: '60px', 
                                                    height: '60px', 
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }} 
                                            />
                                        )}
                                        <div>
                                            {authorName && (
                                                <RichText.Content
                                                    tagName="div"
                                                    className="author-name"
                                                    value={authorName}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: authorNameColor,
                                                        fontSize: `${authorNameFontSize}px`,
                                                        marginBottom: '5px'
                                                    }}
                                                />
                                            )}
                                            {authorTitle && (
                                                <RichText.Content
                                                    tagName="div"
                                                    className="author-title"
                                                    value={authorTitle}
                                                    style={{
                                                        fontSize: `${authorTitleFontSize}px`,
                                                        color: authorTitleColor
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Media Column Second */}
                        <div className="media-column">
                            <div className="media-wrapper">
                                {imageUrl && (
                                    <>
                                        <img 
                                            src={imageUrl} 
                                            alt={imageAlt} 
                                            className="media-image" 
                                        />
                                        
                                        {hasVideo && videoUrl && (
                                            <a 
                                                href={videoUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="video-overlay"
                                            >
                                                {playButtonImage && playButtonImage.url ? (
                                                    <img 
                                                        src={playButtonImage.url}
                                                        alt={playButtonImage.alt || 'Play'}
                                                        className="custom-play-button"
                                                    />
                                                ) : (
                                                    <div className="play-button">
                                                        <div className="play-icon"></div>
                                                    </div>
                                                )}
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Media Column First */}
                        <div className="media-column">
                            <div className="media-wrapper">
                                {imageUrl && (
                                    <>
                                        <img 
                                            src={imageUrl} 
                                            alt={imageAlt} 
                                            className="media-image" 
                                        />
                                        
                                        {hasVideo && videoUrl && (
                                            <a 
                                                href={videoUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="video-overlay"
                                            >
                                                {playButtonImage && playButtonImage.url ? (
                                                    <img 
                                                        src={playButtonImage.url}
                                                        alt={playButtonImage.alt || 'Play'}
                                                        className="custom-play-button"
                                                    />
                                                ) : (
                                                    <div className="play-button">
                                                        <div className="play-icon"></div>
                                                    </div>
                                                )}
                                            </a>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Content Column Second */}
                        <div className="content-column">
                            <RichText.Content
                                tagName="h2"
                                className="title" 
                                style={{
                                    color: titleColor,
                                    fontSize: `${titleFontSize}px`
                                }}
                                value={title}
                            />
                            
                            <RichText.Content
                                tagName="p"
                                className="description-text"
                                style={{
                                    color: descriptionColor,
                                    fontSize: `${descriptionFontSize}px`
                                }}
                                value={description}
                            />

                            {/* Author Section */}
                            {showAuthor && (authorName || authorTitle || authorImage?.url) && (
                                <div className="text-author" style={{ marginTop: '30px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        {authorImage?.url && (
                                            <img 
                                                src={authorImage.url} 
                                                alt={authorImage.alt || authorName || 'Author'} 
                                                className="author-image" 
                                                style={{ 
                                                    width: '60px', 
                                                    height: '60px', 
                                                    borderRadius: '50%',
                                                    objectFit: 'cover'
                                                }} 
                                            />
                                        )}
                                        <div>
                                            {authorName && (
                                                <RichText.Content
                                                    tagName="div"
                                                    className="author-name"
                                                    value={authorName}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        color: authorNameColor,
                                                        fontSize: `${authorNameFontSize}px`,
                                                        marginBottom: '5px'
                                                    }}
                                                />
                                            )}
                                            {authorTitle && (
                                                <RichText.Content
                                                    tagName="div"
                                                    className="author-title"
                                                    value={authorTitle}
                                                    style={{
                                                        fontSize: `${authorTitleFontSize}px`,
                                                        color: authorTitleColor
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
});
