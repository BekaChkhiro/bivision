import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, RangeControl, Button, TextControl, TextareaControl } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/blog-quote-block', {
    title: 'Blog Quote Block',
    icon: 'format-quote',
    category: 'design',
    attributes: {
        quote: {
            type: 'string',
            source: 'html',
            selector: '.quote-text',
            default: 'Vivamus ac eleifend massa. Sed a dui aliquam, posuere risus eget, maximus risus. Morbi a purus mi. Vivamus enim tortor, lacinia nec lacus non, efficitur varius velit. Nunc id facilisis massa, et lobortis lorem'
        },
        authorName: {
            type: 'string',
            source: 'html',
            selector: '.author-name',
            default: 'Tamar Maisuradze'
        },
        authorTitle: {
            type: 'string',
            source: 'html',
            selector: '.author-title',
            default: 'Data analyst'
        },
        backgroundColor: {
            type: 'string',
            default: '#FFFFFF'
        },
        borderColor: {
            type: 'string',
            default: '#6E56CF'
        },
        quoteColor: {
            type: 'string',
            default: '#2D2A5F'
        },
        authorNameColor: {
            type: 'string',
            default: '#2D2A5F'
        },
        authorTitleColor: {
            type: 'string',
            default: '#8399AF'
        },
        quoteFontSize: {
            type: 'number',
            default: 20
        },
        authorNameFontSize: {
            type: 'number',
            default: 18
        },
        authorTitleFontSize: {
            type: 'number',
            default: 14
        },
        borderRadius: {
            type: 'number',
            default: 16
        },
        authorImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            quote, authorName, authorTitle,
            backgroundColor, borderColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
        } = attributes;

        return (
            <>
                <style>
                    {`
                        .author-image-clickable:hover + .author-image-edit-overlay,
                        .author-image-edit-overlay:hover {
                            opacity: 1 !important;
                        }
                        .author-image-clickable:hover {
                            filter: brightness(0.8);
                        }
                    `}
                </style>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <TextareaControl
                            label="Quote Text"
                            value={quote}
                            onChange={(value) => setAttributes({ quote: value })}
                            rows={4}
                            help="Edit the main quote text"
                        />
                        
                        <TextControl
                            label="Author Name"
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}
                            help="Edit the author's name"
                        />
                        
                        <TextControl
                            label="Author Title"
                            value={authorTitle}
                            onChange={(value) => setAttributes({ authorTitle: value })}
                            help="Edit the author's title or position"
                        />
                    </PanelBody>
                    
                    <PanelBody title="Appearance Settings" initialOpen={false}>
                        <div>
                            <p><strong>Background Color</strong></p>
                            <ColorPalette
                                value={backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                            />
                        </div>
                        <div>
                            <p><strong>Border Color</strong></p>
                            <ColorPalette
                                value={borderColor}
                                onChange={(color) => setAttributes({ borderColor: color })}
                            />
                        </div>
                        <div>
                            <p><strong>Border Radius</strong></p>
                            <RangeControl
                                value={borderRadius}
                                onChange={(value) => setAttributes({ borderRadius: value })}
                                min={0}
                                max={50}
                                step={1}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Quote Settings" initialOpen={false}>
                        <div>
                            <p><strong>Quote Text Color</strong></p>
                            <ColorPalette
                                value={quoteColor}
                                onChange={(color) => setAttributes({ quoteColor: color })}
                            />
                        </div>
                        <div>
                            <p><strong>Quote Font Size</strong></p>
                            <RangeControl
                                value={quoteFontSize}
                                onChange={(value) => setAttributes({ quoteFontSize: value })}
                                min={12}
                                max={36}
                                step={1}
                            />
                        </div>
                    </PanelBody>
                    <PanelBody title="Author Settings" initialOpen={false}>
                        <div>
                            <p><strong>Author Name Color</strong></p>
                            <ColorPalette
                                value={authorNameColor}
                                onChange={(color) => setAttributes({ authorNameColor: color })}
                            />
                        </div>
                        <div>
                            <p><strong>Author Name Font Size</strong></p>
                            <RangeControl
                                value={authorNameFontSize}
                                onChange={(value) => setAttributes({ authorNameFontSize: value })}
                                min={12}
                                max={28}
                                step={1}
                            />
                        </div>
                        <div>
                            <p><strong>Author Title Color</strong></p>
                            <ColorPalette
                                value={authorTitleColor}
                                onChange={(color) => setAttributes({ authorTitleColor: color })}
                            />
                        </div>
                        <div>
                            <p><strong>Author Title Font Size</strong></p>
                            <RangeControl
                                value={authorTitleFontSize}
                                onChange={(value) => setAttributes({ authorTitleFontSize: value })}
                                min={10}
                                max={24}
                                step={1}
                            />
                        </div>
                        <div>
                            <p><strong>Author Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        // Make sure we have all required properties
                                        const imageData = {
                                            url: media.url || '',
                                            alt: media.alt || '',
                                            id: media.id || null
                                        };
                                        setAttributes({ authorImage: imageData });
                                    }}
                                    allowedTypes={['image']}
                                    value={authorImage?.id}
                                    render={({ open }) => (
                                        <div>
                                            {authorImage?.url ? (
                                                <div style={{ marginBottom: '15px' }}>
                                                    <img
                                                        src={authorImage.url}
                                                        alt={authorImage.alt || ""}
                                                        style={{ 
                                                            width: '70px', 
                                                            height: '70px', 
                                                            objectFit: 'cover',
                                                            borderRadius: '50%',
                                                            border: '2px solid #fff',
                                                            boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                                                            display: 'block'
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                            <Button
                                                onClick={open}
                                                isPrimary={true}
                                            >
                                                {authorImage?.url ? 'Replace Image' : 'Upload Image'}
                                            </Button>
                                            {authorImage?.url ? (
                                                <Button
                                                    onClick={() => setAttributes({
                                                        authorImage: {
                                                            url: '',
                                                            alt: '',
                                                            id: null
                                                        }
                                                    })}
                                                    isDestructive={true}
                                                    style={{ marginLeft: '10px' }}
                                                >
                                                    Remove
                                                </Button>
                                            ) : null}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div 
                    {...blockProps}
                    style={{
                        ...styles.container(),
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderRadius: `${borderRadius}px`
                    }}
                >
                    <div style={styles.quoteContainer()}>
                        <RichText
                            tagName="blockquote"
                            className="quote-text"
                            value={quote}
                            onChange={(content) => setAttributes({ quote: content })}
                            placeholder="Enter quote text here..."
                            style={{
                                ...styles.quote(),
                                color: quoteColor,
                                fontSize: `${quoteFontSize}px`
                            }}
                        />
                    </div>
                    <div style={styles.authorContainer()}>
                        <div style={styles.authorImageContainer()}>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        const imageData = {
                                            url: media.url || '',
                                            alt: media.alt || '',
                                            id: media.id || null
                                        };
                                        setAttributes({ authorImage: imageData });
                                    }}
                                    allowedTypes={['image']}
                                    value={authorImage?.id}
                                    render={({ open }) => (
                                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                            {authorImage?.url ? (
                                                <>
                                                    <img
                                                        src={authorImage.url}
                                                        alt={authorImage.alt || ""}
                                                        style={{
                                                            ...styles.authorImage(),
                                                            display: 'block',
                                                            maxWidth: '100%',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={open}
                                                        className="author-image-clickable"
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
                                                            padding: '4px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '10px',
                                                            opacity: '0',
                                                            transition: 'opacity 0.3s ease',
                                                            pointerEvents: 'none',
                                                            zIndex: '2'
                                                        }}
                                                        className="author-image-edit-overlay"
                                                    >
                                                        Click to change
                                                    </div>
                                                    {/* Remove button */}
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setAttributes({
                                                                authorImage: {
                                                                    url: '',
                                                                    alt: '',
                                                                    id: null
                                                                }
                                                            });
                                                        }}
                                                        className="button is-small"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '2px',
                                                            right: '2px',
                                                            backgroundColor: '#fff',
                                                            border: 'none',
                                                            borderRadius: '50%',
                                                            padding: '2px 4px',
                                                            cursor: 'pointer',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                            zIndex: '3',
                                                            fontSize: '10px',
                                                            lineHeight: '1',
                                                            minWidth: 'auto',
                                                            minHeight: 'auto'
                                                        }}
                                                        title="Remove author image"
                                                    >
                                                        ✕
                                                    </Button>
                                                </>
                                            ) : (
                                                <div 
                                                    style={{
                                                        ...styles.authorImagePlaceholder(),
                                                        borderRadius: '50%',
                                                        backgroundColor: '#f0f0f0',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        border: '2px dashed #ccc',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onClick={open}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = '#e8e8e8';
                                                        e.target.style.borderColor = '#999';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#f0f0f0';
                                                        e.target.style.borderColor = '#ccc';
                                                    }}
                                                >
                                                    <span style={{color: '#666', fontSize: '10px', textAlign: 'center'}}>
                                                        📷<br/>Click to add
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                        <div style={styles.authorInfo()}>
                            <RichText
                                tagName="h4"
                                className="author-name"
                                value={authorName}
                                onChange={(content) => setAttributes({ authorName: content })}
                                placeholder="Author Name"
                                style={{
                                    ...styles.authorName(),
                                    color: authorNameColor,
                                    fontSize: `${authorNameFontSize}px`
                                }}
                            />
                            <RichText
                                tagName="p"
                                className="author-title"
                                value={authorTitle}
                                onChange={(content) => setAttributes({ authorTitle: content })}
                                placeholder="Author Title"
                                style={{
                                    ...styles.authorTitle(),
                                    color: authorTitleColor,
                                    fontSize: `${authorTitleFontSize}px`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            quote, authorName, authorTitle,
            backgroundColor, borderColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage
        } = attributes;
        
        return (
            <div className="bevision-blog-quote-block" style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderRadius: `${borderRadius}px`
            }}>
                <blockquote 
                    className="quote-text" 
                    style={{
                        color: quoteColor,
                        fontSize: `${quoteFontSize}px`
                    }}
                    dangerouslySetInnerHTML={{ __html: quote }}
                ></blockquote>
                
                <div className="author-container">
                    {authorImage?.url && (
                        <div className="author-image-container">
                            <img 
                                src={authorImage.url} 
                                alt={authorImage.alt || ""} 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '50%'
                                }}
                            />
                        </div>
                    )}
                    <div className="author-info">
                        <h4 
                            className="author-name" 
                            style={{
                                color: authorNameColor,
                                fontSize: `${authorNameFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: authorName }}
                        ></h4>
                        <p 
                            className="author-title" 
                            style={{
                                color: authorTitleColor,
                                fontSize: `${authorTitleFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: authorTitle }}
                        ></p>
                    </div>
                </div>
            </div>
        );
    }
});
