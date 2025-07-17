import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, IconButton, Tooltip } from '@wordpress/components';

const blockStyle = `
    .category-analysis-icon-selector {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-bottom: 16px;
    }

    .category-analysis-icon-button {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        gap: 4px !important;
        padding: 12px 8px !important;
        height: auto !important;
        border: 2px solid #ddd !important;
        border-radius: 4px !important;
        background: #fff !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
    }

    .category-analysis-icon-button:hover {
        border-color: #6C5CE7 !important;
        background: #f8f9fa !important;
    }

    .category-analysis-icon-button.is-primary {
        border-color: #6C5CE7 !important;
        background: #6C5CE7 !important;
        color: white !important;
    }

    .category-analysis-icon-button .icon-preview {
        width: 20px !important;
        height: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .category-analysis-icon-button .icon-preview svg {
        width: 100% !important;
        height: 100% !important;
        fill: currentColor !important;
    }

    .category-analysis-icon-button .icon-name {
        font-size: 11px !important;
        font-weight: 500 !important;
        text-align: center !important;
        line-height: 1.2 !important;
    }

    .category-analysis .container {
        max-width: 1250px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    }
        .category-analysis {
        margin-bottom: 60px;        
        }

    .category-analysis__image {
        display: flex;
        align-items: center;
        justify-content: start;
        flex: 0 0 35%;
    }

    .category-analysis__image img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        width: 100%;
        object-fit: contain;
        box-sizing: border-box;
    }

    .category-analysis__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }

    .category-analysis__content {
        flex: 0 0 50%;
    }

    .category-analysis__icon {
        display: flex;
        align-items: center;
        color: #6C5CE7;
    }
    
    .category-analysis__icon svg {
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }

    .category-analysis__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 24px !important;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        
    }

    .category-analysis__title h2 {
    font-size: 24px;
    }

    .category-analysis__list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .category-analysis__list-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 5px;
        position: relative;
    }

    .category-analysis__list-item:before {
        content: '•';
        color: #8399AF;
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
        margin-top: 2px;
        flex-shrink: 0;
    }

    .category-analysis__list-item-content,
    .category-analysis__paragraph-content {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        flex: 1;
    }
    
    .category-analysis__paragraphs {
        margin-top: 1rem;
    }
    
    .category-analysis__paragraph-content {
        margin-bottom: 1rem;
        display: block;
    }

    .category-analysis__list-controls {
        margin-top: 1rem;
        display: flex;
        gap: 10px;
    }

    .category-analysis__admin-controls {
        padding: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 16px;
        background: #f8f9fa;
    }

    .category-analysis__admin-controls h4 {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
    }

    .category-analysis__admin-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }

    .category-analysis__admin-item input {
        flex: 1;
    }

    .category-analysis.reverse-layout .container {
        flex-direction: row-reverse;
    }

    .category-analysis__remove-item {
        background: #dc3545;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        margin-left: 10px;
    }

    .category-analysis__remove-item:hover {
        background: #c82333;
    }
    
    @media (max-width: 768px) {
        .category-analysis .container {
            flex-direction: column;
            gap: 40px;
            padding: 0 20px;
            width: 100%;
            max-width: 100%;
        }

        .category-analysis__title h2 {
        font-size: 22px;
        margin:0;

    }

        
        .category-analysis__content,
        .category-analysis__image {
            width: 100%;
            flex: none;
            max-width: 100%;
            box-sizing: border-box;
        }
        
        .category-analysis__image {
            order: 1;
            width: 100%;
        }
        
        .category-analysis__image img {
            width: 100%;
            max-width: 100%;
        }
        
        .category-analysis__content {
            order: 0;
        }
        
        .category-analysis__title {
            font-size: 20px;
                margin-bottom: 19px !important;
        }
        
        .category-analysis__list-item-content {
            font-size: 16px;
            margin: 0;
        }
        
        .category-analysis__icon svg {
            width: 24px;
            height: 24px;
        }
    }
`;

registerBlockType('bevision/category-analysis', {
    title: 'Category/Brand Analysis',
    icon: 'chart-bar',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        imageAlt: {
            type: 'string',
            default: ''
        },
        imageTitle: {
            type: 'string',
            default: ''
        },
        contentStyle: {
            type: 'string',
            default: 'list'
        },
        title: {
            type: 'string',
            default: 'Category/Brand analysis'
        },
        listItems: {
            type: 'array',
            default: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ]
        },
        reverseLayout: {
            type: 'boolean',
            default: false
        },
        selectedIcon: {
            type: 'string',
            default: 'star'
        },
        customIconUrl: {
            type: 'string',
            default: ''
        },
        customIconId: {
            type: 'number'
        },
        useCustomIcon: {
            type: 'boolean',
            default: false
        },
        showIcon: {
            type: 'boolean',
            default: true
        },
        showTitle: {
            type: 'boolean',
            default: true
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'category-analysis'
        });

        const addListItem = () => {
            const newItems = [...attributes.listItems, 'New item'];
            setAttributes({ listItems: newItems });
        };

        const removeListItem = (index) => {
            const newItems = attributes.listItems.filter((_, i) => i !== index);
            setAttributes({ listItems: newItems });
        };

        const updateListItem = (index, value) => {
            const newItems = [...attributes.listItems];
            newItems[index] = value;
            setAttributes({ listItems: newItems });
        };

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id,
                imageAlt: media.alt || '',
                imageTitle: media.title || ''
            });
        };

        const removeImage = () => {
            setAttributes({
                imageUrl: '',
                imageId: undefined,
                imageAlt: '',
                imageTitle: ''
            });
        };

        const iconOptions = {
            star: {
                name: 'Star',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L15.5 8L23 9.5L17.5 14.5L19 22L12 18.5L5 22L6.5 14.5L1 9.5L8.5 8L12 1Z" fill="currentColor"/>
                </svg>
            },
            chart: {
                name: 'Chart',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3v18h18M7 16l4-4 4 4 4-6" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
            },
            target: {
                name: 'Target',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
            },
            analytics: {
                name: 'Analytics',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17H7v-7h2v7zM13 17h-2V7h2v10zM17 17h-2v-4h2v4zM19.5 19.1H4.5V5h15v14.1z" fill="currentColor"/>
                </svg>
            },
            growth: {
                name: 'Growth',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="currentColor"/>
                </svg>
            },
            check: {
                name: 'Check',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
            },
            lightbulb: {
                name: 'Idea',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="currentColor"/>
                </svg>
            },
            shield: {
                name: 'Security',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/>
                </svg>
            },
            settings: {
                name: 'Settings',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                </svg>
            },
            heart: {
                name: 'Heart',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
            },
            globe: {
                name: 'Global',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
                </svg>
            },
            trophy: {
                name: 'Award',
                svg: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h2c1.1 0 2 .9 2 2v3.5c0 1.49-.84 2.73-2 3.38V15c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2.12c-1.16-.65-2-1.89-2-3.38V6c0-1.1.9-2 2-2h1zm10 2H7v3.5c0 .83.67 1.5 1.5 1.5S10 10.33 10 9.5V8h4v1.5c0 .83.67 1.5 1.5 1.5S17 10.33 17 9.5V6zM8 19h8v2H8v-2z" fill="currentColor"/>
                </svg>
            }
        };

        const renderIcon = () => {
            if (attributes.useCustomIcon && attributes.customIconUrl) {
                return <img 
                    src={attributes.customIconUrl} 
                    alt="Custom icon" 
                    style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                />;
            }
            return iconOptions[attributes.selectedIcon]?.svg || iconOptions.star.svg;
        };

        const onSelectCustomIcon = (media) => {
            setAttributes({
                customIconUrl: media.url,
                customIconId: media.id,
                useCustomIcon: true
            });
        };

        const removeCustomIcon = () => {
            setAttributes({
                customIconUrl: '',
                customIconId: undefined,
                useCustomIcon: false
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Visibility Settings:</h4>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <Button
                                    variant={attributes.showIcon ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ showIcon: !attributes.showIcon })}
                                    style={{ flex: 1 }}
                                >
                                    {attributes.showIcon ? 'Hide Icon' : 'Show Icon'}
                                </Button>
                                <Button
                                    variant={attributes.showTitle ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ showTitle: !attributes.showTitle })}
                                    style={{ flex: 1 }}
                                >
                                    {attributes.showTitle ? 'Hide Title' : 'Show Title'}
                                </Button>
                            </div>
                        </div>
                        {attributes.showTitle && (
                            <TextControl
                                label="Title"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Enter title..."
                                help="The main title displayed in the category analysis section"
                                style={{ marginBottom: '16px' }}
                            />
                        )}
                    </PanelBody>
                    <PanelBody title="Image Settings" initialOpen={false}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                allowedTypes={['image']}
                                value={attributes.imageId}
                                render={({ open }) => (
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        style={{ marginBottom: '8px', width: '100%' }}
                                    >
                                        {attributes.imageUrl ? 'Replace Image' : 'Upload Image'}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {attributes.imageUrl && (
                            <Button
                                variant="secondary"
                                isDestructive
                                onClick={removeImage}
                                style={{ marginBottom: '16px', width: '100%' }}
                            >
                                Remove Image
                            </Button>
                        )}
                        {attributes.imageUrl && (
                            <>
                                <TextControl
                                    label="Alt Text"
                                    value={attributes.imageAlt}
                                    onChange={(imageAlt) => setAttributes({ imageAlt })}
                                    help="Alternative text describes your image to people who can't see it."
                                    style={{ marginBottom: '8px' }}
                                />
                                <TextControl
                                    label="Image Title"
                                    value={attributes.imageTitle}
                                    onChange={(imageTitle) => setAttributes({ imageTitle })}
                                    style={{ marginBottom: '16px' }}
                                />
                            </>
                        )}
                    </PanelBody>
                    <PanelBody title="Layout Settings" initialOpen={false}>
                        <Button
                            variant={attributes.reverseLayout ? "primary" : "secondary"}
                            onClick={() => setAttributes({ reverseLayout: !attributes.reverseLayout })}
                            style={{ marginBottom: '16px', width: '100%' }}
                        >
                            {attributes.reverseLayout ? 'Content | Image (Switch)' : 'Image | Content (Switch)'}
                        </Button>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <h3 style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: 'bold' }}>Content Style:</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                    variant={attributes.contentStyle === 'list' ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ contentStyle: 'list' })}
                                    style={{ flex: 1 }}
                                >
                                    List (Bullets)
                                </Button>
                                <Button
                                    variant={attributes.contentStyle === 'paragraph' ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ contentStyle: 'paragraph' })}
                                    style={{ flex: 1 }}
                                >
                                    Paragraphs
                                </Button>
                            </div>
                        </div>
                    </PanelBody>
                    
                    <PanelBody title="Icon Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Icon Type:</h4>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <Button
                                    variant={!attributes.useCustomIcon ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ useCustomIcon: false })}
                                    style={{ flex: 1 }}
                                >
                                    Predefined Icons
                                </Button>
                                <Button
                                    variant={attributes.useCustomIcon ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ useCustomIcon: true })}
                                    style={{ flex: 1 }}
                                >
                                    Custom Icon
                                </Button>
                            </div>

                            {!attributes.useCustomIcon ? (
                                <>
                                    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Choose Predefined Icon:</h4>
                                    <div className="category-analysis-icon-selector">
                                        {Object.entries(iconOptions).map(([key, icon]) => (
                                            <button
                                                key={key}
                                                className={`category-analysis-icon-button ${attributes.selectedIcon === key ? 'is-primary' : ''}`}
                                                onClick={() => setAttributes({ selectedIcon: key })}
                                                type="button"
                                            >
                                                <div className="icon-preview" style={{ color: attributes.selectedIcon === key ? '#fff' : '#6C5CE7' }}>
                                                    {icon.svg}
                                                </div>
                                                <span className="icon-name">{icon.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Upload Custom Icon:</h4>
                                    {attributes.customIconUrl ? (
                                        <div style={{ marginBottom: '12px' }}>
                                            <div style={{ 
                                                border: '1px solid #ddd', 
                                                borderRadius: '4px', 
                                                padding: '12px', 
                                                textAlign: 'center',
                                                marginBottom: '8px'
                                            }}>
                                                <img 
                                                    src={attributes.customIconUrl} 
                                                    alt="Custom icon preview" 
                                                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <Button
                                                variant="secondary"
                                                isDestructive
                                                onClick={removeCustomIcon}
                                                style={{ width: '100%', marginBottom: '8px' }}
                                            >
                                                Remove Custom Icon
                                            </Button>
                                        </div>
                                    ) : (
                                        <div style={{ 
                                            border: '1px dashed #ccc', 
                                            padding: '20px', 
                                            textAlign: 'center',
                                            marginBottom: '12px'
                                        }}>
                                            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>No custom icon uploaded</p>
                                        </div>
                                    )}
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectCustomIcon}
                                            allowedTypes={['image']}
                                            value={attributes.customIconId}
                                            render={({ open }) => (
                                                <Button
                                                    onClick={open}
                                                    variant="primary"
                                                    style={{ width: '100%' }}
                                                >
                                                    {attributes.customIconUrl ? 'Replace Custom Icon' : 'Upload Custom Icon'}
                                                </Button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                    <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', marginBottom: 0 }}>
                                        Recommended: SVG files for best quality. PNG/JPG also supported.
                                    </p>
                                </>
                            )}
                        </div>
                    </PanelBody>
                    
                    <PanelBody title="List Items" initialOpen={true}>
                        <div style={{ marginBottom: '16px' }}>
                            {attributes.listItems.map((item, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <TextControl
                                        value={item}
                                        onChange={(value) => updateListItem(index, value)}
                                        placeholder={`List item ${index + 1}`}
                                        style={{ flex: 1 }}
                                    />
                                    <Button
                                        variant="secondary"
                                        isDestructive
                                        onClick={() => removeListItem(index)}
                                        style={{ minWidth: 'auto', padding: '6px 10px' }}
                                    >
                                        ×
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="primary"
                            onClick={addListItem}
                            style={{ width: '100%' }}
                        >
                            Add List Item
                        </Button>
                    </PanelBody>
                </InspectorControls>
                
                <style>{blockStyle}</style>
                <div {...blockProps} className={`category-analysis ${attributes.reverseLayout ? 'reverse-layout' : ''}`}>
                    <div className="container">
                        <div className="category-analysis__image">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectImage}
                                        allowedTypes={['image']}
                                        value={attributes.imageId}
                                        render={({ open }) => (
                                            attributes.imageUrl ? (
                                                <div className="category-analysis__image-container" style={{ position: 'relative' }}>
                                                    <img
                                                        src={attributes.imageUrl}
                                                        onClick={open}
                                                        style={{ cursor: 'pointer' }}
                                                        alt={attributes.imageAlt || "Analysis chart"}
                                                        title={attributes.imageTitle || ""}
                                                    />
                                                    <div className="category-analysis__image-controls" style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                                                        <Tooltip text="Replace Image">
                                                            <Button
                                                                icon="edit"
                                                                onClick={open}
                                                                variant="secondary"
                                                                style={{ padding: '5px', minWidth: 'auto', backgroundColor: 'white' }}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip text="Remove Image">
                                                            <Button
                                                                icon="trash"
                                                                onClick={removeImage}
                                                                isDestructive
                                                                variant="secondary"
                                                                style={{ padding: '5px', minWidth: 'auto', backgroundColor: 'white' }}
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={open}
                                                    variant="secondary"
                                                >
                                                    Upload Chart Image
                                                </Button>
                                            )
                                        )}
                                    />
                                </MediaUploadCheck>
                        </div>
                        <div className="category-analysis__content">
                            <div className="category-analysis__title">
                                {attributes.showIcon && (
                                    <div className="category-analysis__icon">
                                        {renderIcon()}
                                    </div>
                                )}
                                {attributes.showTitle && (
                                    <RichText
                                        tagName="h2"
                                        value={attributes.title}
                                        onChange={(title) => setAttributes({ title })}
                                        placeholder="Enter title"
                                    />
                                )}
                            </div>
                            {attributes.contentStyle === 'list' ? (
                                <ul className="category-analysis__list">
                                    {attributes.listItems.map((item, index) => (
                                        <li key={index} className="category-analysis__list-item">
                                            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                                                <RichText
                                                    tagName="div"
                                                    className="category-analysis__list-item-content"
                                                    value={item}
                                                    onChange={(value) => updateListItem(index, value)}
                                                    placeholder="Enter list item"
                                                />
                                                <button
                                                    className="category-analysis__remove-item"
                                                    onClick={() => removeListItem(index)}
                                                    title="Remove item"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="category-analysis__paragraphs">
                                    {attributes.listItems.map((item, index) => (
                                        <div key={index} className="category-analysis__paragraph-item" style={{ marginBottom: '16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                                                <RichText
                                                    tagName="p"
                                                    className="category-analysis__paragraph-content"
                                                    value={item}
                                                    onChange={(value) => updateListItem(index, value)}
                                                    placeholder="Enter paragraph"
                                                    style={{ margin: '0', flex: '1', color: '#8399AF', fontSize: '18px', lineHeight: '1.5' }}
                                                />
                                                <button
                                                    className="category-analysis__remove-item"
                                                    onClick={() => removeListItem(index)}
                                                    title="Remove item"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="category-analysis__list-controls">
                                <Button
                                    variant="secondary"
                                    onClick={addListItem}
                                >
                                    Add Item
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save({
            className: `category-analysis ${attributes.reverseLayout ? 'reverse-layout' : ''}`
        });

        const iconOptions = {
            star: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L15.5 8L23 9.5L17.5 14.5L19 22L12 18.5L5 22L6.5 14.5L1 9.5L8.5 8L12 1Z" fill="currentColor"/>
            </svg>,
            chart: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3v18h18M7 16l4-4 4 4 4-6" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>,
            target: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>,
            analytics: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17H7v-7h2v7zM13 17h-2V7h2v10zM17 17h-2v-4h2v4zM19.5 19.1H4.5V5h15v14.1z" fill="currentColor"/>
            </svg>,
            growth: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="currentColor"/>
            </svg>,
            check: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
            </svg>,
            lightbulb: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" fill="currentColor"/>
            </svg>,
            shield: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/>
            </svg>,
            settings: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
            </svg>,
            heart: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>,
            globe: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
            </svg>,
            trophy: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h2c1.1 0 2 .9 2 2v3.5c0 1.49-.84 2.73-2 3.38V15c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-2.12c-1.16-.65-2-1.89-2-3.38V6c0-1.1.9-2 2-2h1zm10 2H7v3.5c0 .83.67 1.5 1.5 1.5S10 10.33 10 9.5V8h4v1.5c0 .83.67 1.5 1.5 1.5S17 10.33 17 9.5V6zM8 19h8v2H8v-2z" fill="currentColor"/>
            </svg>
        };

        const renderIcon = () => {
            if (attributes.useCustomIcon && attributes.customIconUrl) {
                return <img 
                    src={attributes.customIconUrl} 
                    alt="Custom icon" 
                    style={{ width: '30px', height: '30px', objectFit: 'contain' }}
                />;
            }
            return iconOptions[attributes.selectedIcon] || iconOptions.star;
        };

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="container">
                        <div className="category-analysis__image">
                            <div className="category-analysis__image-wrapper">
                                {attributes.imageUrl && (
                                    <img 
                                        src={attributes.imageUrl} 
                                        alt={attributes.imageAlt || "Analysis chart"}
                                        title={attributes.imageTitle || ""} 
                                    />
                                )}
                            </div>
                        </div>
                        <div className="category-analysis__content">
                            <div className="category-analysis__title">
                                {attributes.showIcon && (
                                    <div className="category-analysis__icon">
                                        {renderIcon()}
                                    </div>
                                )}
                                {attributes.showTitle && (
                                    <RichText.Content
                                        tagName="h2"
                                        value={attributes.title}
                                    />
                                )}
                            </div>
                            {attributes.contentStyle === 'list' ? (
                                <ul className="category-analysis__list">
                                    {attributes.listItems.map((item, index) => (
                                        <li key={index} className="category-analysis__list-item">
                                            <RichText.Content
                                                tagName="div"
                                                className="category-analysis__list-item-content"
                                                value={item}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="category-analysis__paragraphs">
                                    {attributes.listItems.map((item, index) => (
                                        <RichText.Content
                                            key={index}
                                            tagName="p"
                                            className="category-analysis__paragraph-content"
                                            value={item}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});