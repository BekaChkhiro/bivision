import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, TextControl, TextareaControl, ToggleControl, IconButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { arrowUp, arrowDown, trash } from '@wordpress/icons';

const blockStyle = `
    .cross-sell-basket {
        padding: 0;
        
    }

    .cross-sell-basket .container {
        max-width: 1250px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4rem;
    }

    .cross-sell-basket__header {
        text-align: center;
        margin: 60px 0px 60px;
    }

    .cross-sell-basket__subtitle {
        color: #2FCA02;
        text-align: center;
        font-size: 18px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0px 0px 5px;
    }

    .cross-sell-basket__main-title {
        color: #221A4C;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        margin: 0px;
    }

    .cross-sell-basket__content {
        flex: 0 0 50%;
    }

    .cross-sell-basket__icon {
        display: flex;
        align-items: center;
        color: #24b47e;
    }
    
    .cross-sell-basket__icon svg {
        width: 30px;
        height: 30px;
        margin-top: 5px;
        margin-right: 15px;
    }

    .cross-sell-basket__title {
        font-size: 24px;
        font-weight: 700;
        margin: 0px 0px 19px;
        display: flex;
        align-items: start;
    }

    .cross-sell-basket__title h2 {
        color: #221A4C;
        margin: 0px 0px -4px;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;   
     }        

    .cross-sell-basket__paragraph {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-weight: 400;
        line-height: 1.5;
        margin-bottom: 1.5rem;
    }

    /* Accordion Styles */
    .accordion-item {
        margin-bottom: 24px;
        border: none;
        background: transparent;
        padding-left: 20px;
        position: relative;
    }

    .accordion-item.active::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--Green, #2FCA02);
        border-radius: 2px;
    }
    
    .accordion-item-controls {
        position: absolute;
        right: 10px;
        top: 0;
        display: flex;
        gap: 5px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    .accordion-item:hover .accordion-item-controls {
        opacity: 1;
    }
    
    .move-accordion-button {
        padding: 4px !important;
        min-width: 24px;
        height: 24px;
        border-radius: 3px;
        color: #221A4C !important;
        border: 1px solid #e2e4e7 !important;
        background: #fff !important;
    }
    
    .move-accordion-button:hover:not(:disabled) {
        background: #f3f4f5 !important;
        box-shadow: inset 0 0 0 1px #e2e4e7;
    }
    
    .move-accordion-button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
    
    .remove-accordion-button {
        padding: 4px !important;
        min-width: 24px;
        height: 24px;
        border-radius: 3px;
        color: #dc3545 !important;
        border: 1px solid #dc3545 !important;
        background: #fff !important;
    }
    
    .remove-accordion-button:hover:not(:disabled) {
        background: #dc3545 !important;
        color: #fff !important;
        box-shadow: inset 0 0 0 1px #dc3545;
    }
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--Green, #2FCA02);
        border-radius: 2px;
    }

    .accordion-header {
        padding: 0;
        background: transparent;
        cursor: pointer;
        display: block;
    }

    .accordion-title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        transition: color 0.3s ease;
    }

    .accordion-item.active .accordion-title {
        color: var(--Green, #2FCA02);
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }

    .accordion-content {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, opacity 0.3s ease-out, margin 0.3s ease-out;
        opacity: 0;
        margin-top: 0;
    }

    .accordion-item.active .accordion-content {
        max-height: 1000px;
        opacity: 1;
        margin-top: 10px;
    }

    .accordion-content p {
        color: var(--Grey, #8399AF);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0 0 10px 0;
    }

    .cross-sell-basket__image {
        display: flex;
        align-items: center;
        justify-content: end;

}
    .cross-sell-basket__image img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    .cross-sell-basket__image .upload-image-button {
        height: 300px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }
    
    .cross-sell-basket__image .image-container {
        position: relative;
        width: 100%;
    }
    
    .cross-sell-basket__image .image-container:hover .image-controls {
        opacity: 1;
    }
    
    .cross-sell-basket__image .image-controls {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s;
        border-radius: 10px;
    }
    
    .cross-sell-basket__image .image-edit-button {
        margin-bottom: 10px;
    }
    
    .cross-sell-basket__image .image-edit-button,
    .cross-sell-basket__image .image-remove-button {
        width: 150px;
    }
    
    @media (max-width: 768px) {
        .cross-sell-basket {
            padding: 0 20px;
        }

        .cross-sell-basket .container {
            flex-direction: column;
            gap: 40px;
            padding: 0;
        }
        

        
        .cross-sell-basket__content,
        .cross-sell-basket__image {
            width: 100%;
            flex: none;
            padding: 0 !important;
            box-sizing: border-box !important;
        }
        
    
        .cross-sell-basket__header {
            margin: 20px 0px 40px  0px;
        }
        
        .cross-sell-basket__subtitle {   
            font-size: 20px;
    }
        .cross-sell-basket__main-title {
            font-size: 28px;
        }
        
        .cross-sell-basket__title {
            font-size: 24px;
            margin-bottom: 19px;
        }
        
        .cross-sell-basket__title h2 {
            font-size: 22px;
        }
        
        .cross-sell-basket__paragraph {
            font-size: 16px;
            margin-right: 40px !important;
        }
        
        .cross-sell-basket__icon svg {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }

        .accordion-title {
            font-size: 20px;
            margin-bottom: 10px;
        }

        .accordion-item.active .accordion-title {
            font-size: 20px;
        }

        .accordion-item {
            margin-bottom: 16px;
            padding-left: 15px;
        }
    }
`;

registerBlockType('bevision/cross-sell-basket', {
    title: 'Cross-sell Basket',
    icon: 'cart',
    category: 'bevision',
    attributes: {
        subtitle: {
            type: 'string',
            default: 'HOW IT WORKS'
        },
        mainTitle: {
            type: 'string',
            default: 'Why BiRetail?'
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'Cross-sell basket'
        },
        showIcon: {
            type: 'boolean',
            default: true
        },
        showTitle: {
            type: 'boolean',
            default: true
        },
        accordionItems: {
            type: 'array',
            default: [
                {
                    title: 'Enhanced Customer Experience',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                {
                    title: 'Increased Revenue',
                    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                    title: 'Smart Recommendations',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                }
            ]
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'cross-sell-basket'
        });

        const [activeAccordion, setActiveAccordion] = useState(0);

        const toggleAccordion = (index) => {
            setActiveAccordion(activeAccordion === index ? -1 : index);
        };

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        };

        const removeImage = () => {
            setAttributes({
                imageUrl: '',
                imageId: null
            });
        };

        const updateAccordionItem = (index, field, value) => {
            const newItems = [...attributes.accordionItems];
            newItems[index] = { ...newItems[index], [field]: value };
            setAttributes({ accordionItems: newItems });
        };

        const addAccordionItem = () => {
            const newItems = [...attributes.accordionItems];
            newItems.push({
                title: 'New Accordion Item',
                content: 'Enter content here...'
            });
            setAttributes({ accordionItems: newItems });
        };

        const removeAccordionItem = (index) => {
            // Prevent removing if only one item left
            if (attributes.accordionItems.length <= 1) {
                return;
            }
            
            const newItems = attributes.accordionItems.filter((_, i) => i !== index);
            setAttributes({ accordionItems: newItems });
            // Reset active accordion if we removed the active one
            if (index === activeAccordion) {
                setActiveAccordion(index > 0 ? index - 1 : 0);
            } else if (index < activeAccordion) {
                setActiveAccordion(activeAccordion - 1);
            }
        };

        const moveAccordionItem = (index, direction) => {
            // Don't do anything if trying to move the first item up or the last item down
            if ((index === 0 && direction === 'up') || 
                (index === attributes.accordionItems.length - 1 && direction === 'down')) {
                return;
            }
            
            const newItems = [...attributes.accordionItems];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            
            // Swap the items
            [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
            
            setAttributes({ accordionItems: newItems });
            
            // Update active accordion to follow the moved item
            if (activeAccordion === index) {
                setActiveAccordion(targetIndex);
            } else if (activeAccordion === targetIndex) {
                setActiveAccordion(index);
            }
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody
                        title="Content Settings"
                        initialOpen={true}
                    >
                        <PanelRow>
                            <ToggleControl
                                label="Show Icon"
                                checked={attributes.showIcon}
                                onChange={(showIcon) => setAttributes({ showIcon })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label="Show Title"
                                checked={attributes.showTitle}
                                onChange={(showTitle) => setAttributes({ showTitle })}
                            />
                        </PanelRow>
                    </PanelBody>

                    <PanelBody
                        title="Image Settings"
                        initialOpen={false}
                    >
                        <PanelRow>
                            <div style={{ width: '100%' }}>
                                <p><strong>Section Image</strong></p>
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectImage}
                                        allowedTypes={['image']}
                                        value={attributes.imageId}
                                        render={({ open }) => (
                                            <>
                                                {attributes.imageUrl ? (
                                                    <div className="inspector-image-container" style={{ marginBottom: '10px' }}>
                                                        <img 
                                                            src={attributes.imageUrl} 
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
                                                                onClick={removeImage}
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
                    </PanelBody>

                    <PanelBody
                        title="Accordion Items"
                        initialOpen={false}
                    >
                        {attributes.accordionItems.map((item, index) => (
                            <PanelRow key={index}>
                                <div style={{ width: '100%', marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <strong>Accordion Item {index + 1}</strong>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <Button
                                                onClick={() => moveAccordionItem(index, 'up')}
                                                variant="secondary"
                                                isSmall
                                                disabled={index === 0}
                                                style={{ padding: '4px 8px' }}
                                            >
                                                ↑
                                            </Button>
                                            <Button
                                                onClick={() => moveAccordionItem(index, 'down')}
                                                variant="secondary"
                                                isSmall
                                                disabled={index === attributes.accordionItems.length - 1}
                                                style={{ padding: '4px 8px' }}
                                            >
                                                ↓
                                            </Button>
                                            <Button
                                                onClick={() => removeAccordionItem(index)}
                                                variant="link"
                                                isDestructive
                                                isSmall
                                                disabled={attributes.accordionItems.length <= 1}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                    <TextControl
                                        label="Title"
                                        value={item.title}
                                        onChange={(value) => updateAccordionItem(index, 'title', value)}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextareaControl
                                        label="Content"
                                        value={item.content}
                                        onChange={(value) => updateAccordionItem(index, 'content', value)}
                                        rows={3}
                                    />
                                </div>
                            </PanelRow>
                        ))}
                        <PanelRow>
                            <Button
                                onClick={addAccordionItem}
                                variant="secondary"
                                icon="plus"
                                style={{ width: '100%' }}
                            >
                                Add Accordion Item
                            </Button>
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="cross-sell-basket__header">
                        <RichText
                            tagName="div"
                            className="cross-sell-basket__subtitle"
                            value={attributes.subtitle}
                            onChange={(subtitle) => setAttributes({ subtitle })}
                            placeholder="Enter subtitle"
                        />
                        <RichText
                            tagName="h2"
                            className="cross-sell-basket__main-title"
                            value={attributes.mainTitle}
                            onChange={(mainTitle) => setAttributes({ mainTitle })}
                            placeholder="Enter main title"
                        />
                    </div>
                    <div className="container">
                        <div className="cross-sell-basket__content">
                            <div className="cross-sell-basket__title">
                                {attributes.showIcon && (
                                    <div className="cross-sell-basket__icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5L20 1H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M1 5H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
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
                            {attributes.accordionItems.map((item, index) => (
                                <div key={index} className={`accordion-item ${index === activeAccordion ? 'active' : ''}`}>
                                    <div className="accordion-item-controls">
                                        <IconButton
                                            icon={arrowUp}
                                            label="Move Up"
                                            onClick={() => moveAccordionItem(index, 'up')}
                                            className="move-accordion-button"
                                            disabled={index === 0}
                                        />
                                        <IconButton
                                            icon={arrowDown}
                                            label="Move Down"
                                            onClick={() => moveAccordionItem(index, 'down')}
                                            className="move-accordion-button"
                                            disabled={index === attributes.accordionItems.length - 1}
                                        />
                                        <IconButton
                                            icon={trash}
                                            label="Remove Accordion Item"
                                            onClick={() => removeAccordionItem(index)}
                                            className="remove-accordion-button"
                                            disabled={attributes.accordionItems.length <= 1}
                                        />
                                    </div>
                                    <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                                        <RichText
                                            tagName="div"
                                            className="accordion-title"
                                            value={item.title}
                                            onChange={(value) => updateAccordionItem(index, 'title', value)}
                                            placeholder="Enter title"
                                        />
                                    </div>
                                    <div className="accordion-content">
                                        <RichText
                                            tagName="p"
                                            value={item.content}
                                            onChange={(value) => updateAccordionItem(index, 'content', value)}
                                            placeholder="Enter content"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cross-sell-basket__image">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        <>
                                            {attributes.imageUrl ? (
                                                <div className="image-container" style={{ position: 'relative' }}>
                                                    <img
                                                        src={attributes.imageUrl}
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
                                                            onClick={removeImage}
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
                    </div>
                </div>
            </>
        );
    },
    save: function Save({ attributes }) {
        const blockProps = useBlockProps.save({
            className: 'cross-sell-basket'
        });

        return (
            <>
                <style>{blockStyle}</style>
                <div {...blockProps}>
                    <div className="cross-sell-basket__header">
                        <div className="cross-sell-basket__subtitle">
                            {attributes.subtitle}
                        </div>
                        <h2 className="cross-sell-basket__main-title">
                            {attributes.mainTitle}
                        </h2>
                    </div>
                    <div className="container">
                        <div className="cross-sell-basket__content">
                            <div className="cross-sell-basket__title">
                                {attributes.showIcon && (
                                    <div className="cross-sell-basket__icon">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H21C21.5304 21 22.0391 20.7893 22.4142 20.4142C22.7893 20.0391 23 19.5304 23 19V5L20 1H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M1 5H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}
                                {attributes.showTitle && (
                                    <h2>{attributes.title}</h2>
                                )}
                            </div>
                            {attributes.accordionItems.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <div className="accordion-header">
                                        <div className="accordion-title">
                                            {item.title}
                                        </div>
                                    </div>
                                    <div className="accordion-content">
                                        <RichText.Content
                                            tagName="p"
                                            value={item.content}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cross-sell-basket__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="Cross-sell basket" />
                            )}
                        </div>
                    </div>
                </div>
                <script>
                    {`
                    document.addEventListener('DOMContentLoaded', function() {
                        const accordions = document.querySelectorAll('.cross-sell-basket .accordion-header');
                        
                        // Set first accordion as active by default
                        const firstAccordion = document.querySelector('.cross-sell-basket .accordion-item');
                        if (firstAccordion) {
                            firstAccordion.classList.add('active');
                        }
                        
                        accordions.forEach((accordion, index) => {
                            accordion.addEventListener('click', function() {
                                const parent = this.parentElement;
                                const wasActive = parent.classList.contains('active');
                                
                                // Close all accordions
                                document.querySelectorAll('.cross-sell-basket .accordion-item').forEach(item => {
                                    item.classList.remove('active');
                                });
                                
                                // If the clicked accordion wasn't active, open it
                                if (!wasActive) {
                                    parent.classList.add('active');
                                }
                            });
                        });
                    });
                    `}
                </script>
            </>
        );
    }
});