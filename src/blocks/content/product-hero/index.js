import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl } from '@wordpress/components';

const blockStyle = `
    .product-hero-section .container {
        max-width: 1250px;
        background-color: #f8f7ff;
        margin: 0 auto;
        padding: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;!important
        gap: 4rem;
        box-sizing: border-box;
        border-radius: 20px;
    }

.product-hero-section {
margin-bottom: 70px !important;
}

    .product-hero-section__content {
        flex: 0 0 50%;
        
    }

    .product-hero-section__main-title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 40px;
        font-style: normal;
        font-weight: 600;
        line-height: 50px;
        margin: 0px 0px 20px;
    }
    
    .product-hero-section__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 40px;
        font-style: normal;
        font-weight: 750;
        line-height: 50px;
        margin: 0px 0px 40px;
    }

    .product-hero-section__description {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin: 0px 0px 40px;
    }

    .product-hero-section__cta {
        display: inline-block;
        background-color: #6C5CE7;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        padding: 15px 40px;
        border-radius: 6px;
        text-decoration: none;
        transition: background-color 0.3s ease;
        border: none;
        cursor: pointer;
    }

    .product-hero-section__cta:hover {
        background-color: #5649c0;
    }

    .product-hero-section__image {
        flex: 0 0 45%;
        min-height: 300px;
        display: flex;
        align-items: center;
        justify-content: end;
       
    }

    .product-hero-section__image img {
        max-width: 100%;
        height: auto;
    }

    .product-hero-section__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }

    .product-hero-section__image .image-overlay:hover {
        opacity: 1 !important;
    }

    .product-hero-section__image .image-overlay .components-button {
        height: auto;
        width: auto;
        border: none;
        padding: 8px 16px;
        margin: 0 5px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
    
    
    
        .product-hero-section { 
            margin-bottom: 0px !important;
        }

        .product-hero-section .container {
            flex-direction: column;
            text-align: center;
            padding: 40px 20px;
            gap: 40px;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
            border-radius: 10px;
        }
        
        .product-hero-section__content,
        .product-hero-section__image {
            width: 100%;
            flex: none;
        }
        
        .product-hero-section__main-title {
            font-size: 30px;
            line-height: 40px;
            margin-bottom: 10px;
        }
        
        .product-hero-section__title {
            font-size: 30px;
            line-height: 40px;
            margin-bottom: 20px;
        }
        
        .product-hero-section__description {
            font-size: 16px;
            margin-bottom: 30px;
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
        
        .product-hero-section__cta-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .product-hero-section__cta {
            display: inline-block;
            min-width: 180px;
            text-align: center;
        }
        
        .product-hero-section__image {
            order: 1;
            margin-top: 20px;
        }
        
        .product-hero-section__image img {
            max-width: 90%;
            margin: 0 auto;
        }
    }
`;

registerBlockType('bevision/product-hero-section', {
    title: 'Product Hero Section',
    icon: 'cover-image',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        mainTitle: {
            type: 'string',
            default: ''
        },
        title: {
            type: 'string',
            default: 'Discover Our Products'
        },
        description: {
            type: 'string',
            default: 'Transform your business with our innovative solutions. Explore our product line designed to meet your needs.'
        },
        ctaText: {
            type: 'string',
            default: 'Learn More'
        },
        ctaUrl: {
            type: 'string',
            default: '#'
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'product-hero-section'
        });

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <TextControl
                            label="Main Title"
                            value={attributes.mainTitle}
                            onChange={(mainTitle) => setAttributes({ mainTitle })}
                            placeholder="Enter main title..."
                        />
                        <TextControl
                            label="Title"
                            value={attributes.title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder="Enter title..."
                        />
                        <TextareaControl
                            label="Description"
                            value={attributes.description}
                            onChange={(description) => setAttributes({ description })}
                            placeholder="Enter description..."
                            rows={4}
                        />
                        <TextControl
                            label="CTA Button Text"
                            value={attributes.ctaText}
                            onChange={(ctaText) => setAttributes({ ctaText })}
                            placeholder="Enter button text..."
                        />
                        <TextControl
                            label="CTA URL"
                            value={attributes.ctaUrl}
                            onChange={(ctaUrl) => setAttributes({ ctaUrl })}
                            placeholder="Enter URL (e.g., #, /contact, https://example.com)"
                        />
                    </PanelBody>
                    <PanelBody title="Image Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            {attributes.imageUrl ? (
                                <div>
                                    <img 
                                        src={attributes.imageUrl} 
                                        alt="Preview" 
                                        style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                                    />
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => setAttributes({ imageUrl: '', imageId: null })}
                                        isDestructive
                                    >
                                        Remove Image
                                    </Button>
                                </div>
                            ) : (
                                <div style={{ 
                                    border: '1px dashed #ccc', 
                                    padding: '20px', 
                                    textAlign: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <p>No image selected</p>
                                </div>
                            )}
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open} 
                                            variant="primary"
                                            style={{ marginTop: '8px' }}
                                        >
                                            {attributes.imageUrl ? 'Replace Image' : 'Upload Image'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </PanelBody>
                </InspectorControls>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="product-hero-section__content">
                            <RichText
                                tagName="h1"
                                className="product-hero-section__main-title"
                                value={attributes.mainTitle}
                                onChange={(mainTitle) => setAttributes({ mainTitle })}
                                placeholder="Enter main title here..."
                                allowedFormats={['core/bold', 'core/italic']}
                            />
                            <RichText
                                tagName="h2"
                                className="product-hero-section__title"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Enter title here..."
                                allowedFormats={['core/bold', 'core/italic']}
                            />
                            <RichText
                                tagName="div"
                                className="product-hero-section__description"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                placeholder="Enter description"
                                allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
                            />
                            <div className="product-hero-section__cta-wrapper">
                                <RichText
                                    tagName="div"
                                    className="product-hero-section__cta"
                                    value={attributes.ctaText}
                                    onChange={(ctaText) => setAttributes({ ctaText })}
                                    placeholder="Enter button text"
                                    allowedFormats={['core/bold', 'core/italic']}
                                />

                            </div>
                        </div>
                        <div className="product-hero-section__image">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        attributes.imageUrl ? (
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <img
                                                    src={attributes.imageUrl}
                                                    onClick={open}
                                                    style={{ cursor: 'pointer', maxWidth: '100%', height: 'auto' }}
                                                    alt="Click to change image"
                                                />
                                                <div 
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '10px',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                        cursor: 'pointer'
                                                    }}
                                                    className="image-overlay"
                                                    onMouseEnter={(e) => e.target.style.opacity = 1}
                                                    onMouseLeave={(e) => e.target.style.opacity = 0}
                                                >
                                                    <Button
                                                        onClick={open}
                                                        variant="primary"
                                                        size="small"
                                                        style={{ backgroundColor: '#6C5CE7' }}
                                                    >
                                                        Replace
                                                    </Button>
                                                    <Button
                                                        onClick={() => setAttributes({ imageUrl: '', imageId: null })}
                                                        variant="secondary"
                                                        size="small"
                                                        isDestructive
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                            >
                                                Upload Image
                                            </Button>
                                        )
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'product-hero-section'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="product-hero-section__content">
                            {attributes.mainTitle && (
                                <RichText.Content
                                    tagName="h1"
                                    className="product-hero-section__main-title"
                                    value={attributes.mainTitle}
                                />
                            )}
                            <RichText.Content
                                tagName="h2"
                                className="product-hero-section__title"
                                value={attributes.title}
                            />
                            <RichText.Content
                                tagName="div"
                                className="product-hero-section__description"
                                value={attributes.description}
                            />
                            <div className="product-hero-section__cta-wrapper">
                                {attributes.ctaUrl && attributes.ctaUrl !== '#' ? (
                                    <a 
                                        href={attributes.ctaUrl}
                                        className="product-hero-section__cta"
                                        target={attributes.ctaUrl.startsWith('http') ? '_blank' : '_self'}
                                        rel={attributes.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        <RichText.Content value={attributes.ctaText} />
                                    </a>
                                ) : (
                                    <button 
                                        className="product-hero-section__cta open-lead-popup" 
                                        data-open-popup="true"
                                    >
                                        <RichText.Content value={attributes.ctaText} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="product-hero-section__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="" />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});