import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, MediaUpload, MediaUploadCheck, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, TextControl, TextareaControl } from '@wordpress/components';
import './frontend.css';

// Editor-only styles
const editorStyle = `
    .dashboard-features__image .components-button {
        height: 200px;
        width: 100%;
        border: 2px dashed #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 10px;
    }
    
    .dashboard-features__image-container {
        position: relative;
        display: inline-block;
        width: 100%;
    }
    
    .dashboard-features__image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
        border-radius: 10px;
    }
    
    .dashboard-features__image-container:hover .dashboard-features__image-overlay {
        opacity: 1;
    }
    
    .dashboard-features__icon-container {
        position: relative;
        display: inline-block;
    }
    
    .dashboard-features__icon-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
        border-radius: 4px;
    }
    
    .dashboard-features__icon-container:hover .dashboard-features__icon-overlay {
        opacity: 1;
    }
`;

registerBlockType('bevision/dashboard-features', {
    title: 'Dashboard Features',
    icon: 'chart-line',
    category: 'bevision',
    attributes: {
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number'
        },
        iconUrl: {
            type: 'string',
            default: ''
        },
        iconId: {
            type: 'number'
        },
        title: {
            type: 'string',
            default: 'BiRetail: გაყიდვების მართვა და ანალიტიკა ციფრებით'
        },
        description: {
            type: 'string',
            default: 'მიიღე ყველა მნიშვნელოვანი ინფორმაცია ერთ პლატფორმაზე რეალურ დროში ავტომატურად განახლებული მონაცემებით, რაც დაგეხმარება უკეთესი გადაწყვეტილებების მიღებაში და გაყიდვების ოპტიმიზაციაში.'
        },
        showIcon: {
            type: 'boolean',
            default: true
        },
        showTitle: {
            type: 'boolean',
            default: true
        },
        showDescription: {
            type: 'boolean',
            default: true
        },
        listItems: {
            type: 'array',
            default: [
                {
                    title: 'Option 1',
                    description: 'Description for option 1'
                },
                {
                    title: 'Option 2', 
                    description: 'Description for option 2'
                },
                {
                    title: 'Option 3',
                    description: 'Description for option 3'
                }
            ]
        },
        reverseLayout: {
            type: 'boolean',
            default: false
        }
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({
            className: 'dashboard-features'
        });

        const onSelectImage = (media) => {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        };

        const onSelectIcon = (media) => {
            setAttributes({
                iconUrl: media.url,
                iconId: media.id
            });
        };

        const removeImage = () => {
            setAttributes({
                imageUrl: '',
                imageId: undefined
            });
        };

        const removeIcon = () => {
            setAttributes({
                iconUrl: '',
                iconId: undefined
            });
        };

        const updateListItem = (value, index, field) => {
            const newItems = [...attributes.listItems];
            newItems[index] = { ...newItems[index], [field]: value };
            setAttributes({ listItems: newItems });
        };

        const addListItem = () => {
            const newItems = [...attributes.listItems, { title: 'New option', description: 'Description for new option' }];
            setAttributes({ listItems: newItems });
        };

        const removeListItem = (index) => {
            const newItems = [...attributes.listItems];
            newItems.splice(index, 1);
            setAttributes({ listItems: newItems });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Visibility Settings:</h4>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                <Button
                                    variant={attributes.showTitle ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ showTitle: !attributes.showTitle })}
                                    style={{ flex: 1 }}
                                >
                                    {attributes.showTitle ? 'Hide Title' : 'Show Title'}
                                </Button>
                                <Button
                                    variant={attributes.showDescription ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ showDescription: !attributes.showDescription })}
                                    style={{ flex: 1 }}
                                >
                                    {attributes.showDescription ? 'Hide Description' : 'Show Description'}
                                </Button>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                <Button
                                    variant={attributes.showIcon ? "primary" : "secondary"}
                                    onClick={() => setAttributes({ showIcon: !attributes.showIcon })}
                                    style={{ width: '100%' }}
                                >
                                    {attributes.showIcon ? 'Hide Icon' : 'Show Icon'}
                                </Button>
                            </div>
                        </div>
                        {attributes.showTitle && (
                            <TextControl
                                label="Title"
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Enter title..."
                                help="The main title displayed in the dashboard features section"
                            />
                        )}
                        {attributes.showDescription && (
                            <TextareaControl
                                label="Description"
                                value={attributes.description}
                                onChange={(description) => setAttributes({ description })}
                                placeholder="Enter description..."
                                rows={4}
                                help="The description text that appears below the title"
                            />
                        )}
                    </PanelBody>
                    <PanelBody title="Image Settings" initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Main Dashboard Image:</h4>
                            {attributes.imageUrl ? (
                                <div>
                                    <img 
                                        src={attributes.imageUrl} 
                                        alt="Preview" 
                                        style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
                                    />
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={onSelectImage}
                                                allowedTypes={['image']}
                                                value={attributes.imageId}
                                                render={({ open }) => (
                                                    <Button 
                                                        onClick={open}
                                                        variant="secondary"
                                                        style={{ flex: 1 }}
                                                    >
                                                        Replace Image
                                                    </Button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                        <Button 
                                            onClick={removeImage}
                                            variant="secondary" 
                                            isDestructive
                                            style={{ flex: 1 }}
                                        >
                                            Remove Image
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ 
                                    border: '1px dashed #ccc', 
                                    padding: '20px', 
                                    textAlign: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <p style={{ margin: 0, color: '#666' }}>No image selected</p>
                                </div>
                            )}
                            {!attributes.imageUrl && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectImage}
                                        allowedTypes={['image']}
                                        value={attributes.imageId}
                                        render={({ open }) => (
                                            <Button 
                                                onClick={open}
                                                variant="primary"
                                                style={{ width: '100%' }}
                                            >
                                                Upload Dashboard Image
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            )}
                        </div>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 'bold' }}>Icon:</h4>
                            {attributes.iconUrl ? (
                                <div>
                                    <div style={{ 
                                        border: '1px solid #ddd', 
                                        borderRadius: '4px', 
                                        padding: '12px', 
                                        textAlign: 'center',
                                        marginBottom: '8px'
                                    }}>
                                        <img 
                                            src={attributes.iconUrl} 
                                            alt="Icon preview" 
                                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={onSelectIcon}
                                                allowedTypes={['image']}
                                                value={attributes.iconId}
                                                render={({ open }) => (
                                                    <Button 
                                                        onClick={open}
                                                        variant="secondary"
                                                        style={{ flex: 1 }}
                                                    >
                                                        Replace Icon
                                                    </Button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                        <Button 
                                            onClick={removeIcon}
                                            variant="secondary" 
                                            isDestructive
                                            style={{ flex: 1 }}
                                        >
                                            Remove Icon
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ 
                                    border: '1px dashed #ccc', 
                                    padding: '20px', 
                                    textAlign: 'center',
                                    marginBottom: '8px'
                                }}>
                                    <p style={{ margin: 0, color: '#666' }}>No icon selected</p>
                                </div>
                            )}
                            {!attributes.iconUrl && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectIcon}
                                        allowedTypes={['image']}
                                        value={attributes.iconId}
                                        render={({ open }) => (
                                            <Button 
                                                onClick={open}
                                                variant="primary"
                                                style={{ width: '100%' }}
                                            >
                                                Upload Icon
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            )}
                        </div>
                    </PanelBody>
                    <PanelBody
                        title="Layout Settings"
                        initialOpen={false}
                    >
                        <PanelRow>
                            <div style={{ width: '100%' }}>
                                <Button
                                    onClick={() => setAttributes({ reverseLayout: !attributes.reverseLayout })}
                                    variant={attributes.reverseLayout ? "primary" : "secondary"}
                                    style={{ width: '100%' }}
                                >
                                    {attributes.reverseLayout ? 'Image First, Content Second' : 'Content First, Image Second'}
                                </Button>
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', marginBottom: '0' }}>
                                    Click to swap the positions of content and image sections
                                </p>
                            </div>
                        </PanelRow>
                    </PanelBody>
                    <PanelBody
                        title="Feature List Items"
                        initialOpen={false}
                    >
                        {attributes.listItems.map((item, index) => (
                            <PanelRow key={index}>
                                <div style={{ width: '100%', marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                        <strong>Feature Item {index + 1}</strong>
                                        <Button
                                            onClick={() => removeListItem(index)}
                                            variant="link"
                                            isDestructive
                                            isSmall
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    <TextControl
                                        label="Title"
                                        value={item.title}
                                        onChange={(value) => updateListItem(value, index, 'title')}
                                        style={{ marginBottom: '10px' }}
                                    />
                                    <TextareaControl
                                        label="Description"
                                        value={item.description}
                                        onChange={(value) => updateListItem(value, index, 'description')}
                                        rows={3}
                                    />
                                </div>
                            </PanelRow>
                        ))}
                        <PanelRow>
                            <Button
                                onClick={addListItem}
                                variant="secondary"
                                icon="plus"
                                style={{ width: '100%' }}
                            >
                                Add Feature Item
                            </Button>
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
                <style>{editorStyle}</style>
                <div {...blockProps}>
                    <div className="container" style={{ flexDirection: attributes.reverseLayout ? 'row-reverse' : 'row' }}>
                        <div className="dashboard-features__content">
                            <div className="dashboard-features__icon">
                                {attributes.showIcon && (
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={onSelectIcon}
                                            allowedTypes={['image']}
                                            value={attributes.iconId}
                                            render={({ open }) => (
                                                attributes.iconUrl ? (
                                                    <div className="dashboard-features__icon-container">
                                                        <img
                                                            src={attributes.iconUrl}
                                                            alt="Icon"
                                                            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                                                        />
                                                        <div className="dashboard-features__icon-overlay">
                                                            <Button
                                                                onClick={open}
                                                                variant="primary"
                                                                size="small"
                                                                style={{ backgroundColor: '#6C5CE7' }}
                                                            >
                                                                Replace
                                                            </Button>
                                                            <Button
                                                                onClick={removeIcon}
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
                                                        Upload Icon
                                                    </Button>
                                                )
                                            )}
                                        />
                                    </MediaUploadCheck>
                                )}
                                {attributes.showTitle && (
                                    <RichText
                                        tagName="h2"
                                        className="dashboard-features__title"
                                        value={attributes.title}
                                        onChange={(title) => setAttributes({ title })}
                                        placeholder="Enter title..."
                                    />
                                )}
                            </div>
                            {attributes.showDescription && (
                                <RichText
                                    tagName="div"
                                    className="dashboard-features__description"
                                    value={attributes.description}
                                    onChange={(description) => setAttributes({ description })}
                                    placeholder="Enter description..."
                                />
                            )}
                            <ul className="dashboard-features__list">
                                {attributes.listItems.map((item, index) => (
                                    <li key={index} className="dashboard-features__list-item">
                                        <div style={{ marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <RichText
                                                    tagName="div"
                                                    className="list-item-title"
                                                    value={item.title}
                                                    onChange={(text) => updateListItem(text, index, 'title')}
                                                    placeholder="Enter list item title..."
                                                    style={{ fontWeight: '600', flex: 1 }}
                                                />
                                                <Button
                                                    isDestructive
                                                    onClick={() => removeListItem(index)}
                                                    style={{ marginLeft: '10px' }}
                                                >
                                                    ✕
                                                </Button>
                                            </div>
                                            <RichText
                                                tagName="div"
                                                className="list-item-description"
                                                value={item.description}
                                                onChange={(text) => updateListItem(text, index, 'description')}
                                                placeholder="Enter description..."
                                                style={{ fontSize: '14px', color: '#666', marginLeft: '0' }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Button
                                isPrimary
                                onClick={addListItem}
                                style={{ marginBottom: '20px' }}
                            >
                                Add List Item
                            </Button>
                        </div>
                        <div className="dashboard-features__image">
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    value={attributes.imageId}
                                    render={({ open }) => (
                                        attributes.imageUrl ? (
                                            <div className="dashboard-features__image-container">
                                                <img
                                                    src={attributes.imageUrl}
                                                    alt="Dashboard preview"
                                                    style={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                                                />
                                                <div className="dashboard-features__image-overlay">
                                                    <Button
                                                        onClick={open}
                                                        variant="primary"
                                                        size="small"
                                                        style={{ backgroundColor: '#6C5CE7' }}
                                                    >
                                                        Replace
                                                    </Button>
                                                    <Button
                                                        onClick={removeImage}
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
                                                Upload Dashboard Image
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
            className: 'dashboard-features'
        });

        return (
            <>
                <div {...blockProps}>
                    <div className="container" style={{ flexDirection: attributes.reverseLayout ? 'row-reverse' : 'row' }}>
                        <div className="dashboard-features__content">
                            <div className="dashboard-features__icon">
                                {attributes.showIcon && attributes.iconUrl && (
                                    <img src={attributes.iconUrl} alt="" />
                                )}
                                {attributes.showTitle && (
                                    <RichText.Content
                                        tagName="h2"
                                        className="dashboard-features__title"
                                        value={attributes.title}
                                    />
                                )}
                            </div>
                            {attributes.showDescription && (
                                <RichText.Content
                                    tagName="div"
                                    className="dashboard-features__description"
                                    value={attributes.description}
                                />
                            )}
                            <ul className="dashboard-features__list">
                                {attributes.listItems.map((item, index) => (
                                    <li key={index} className="dashboard-features__list-item">
                                        <RichText.Content
                                            tagName="div"
                                            className="list-item-title"
                                            value={item.title}
                                        />
                                        <RichText.Content
                                            tagName="div"
                                            className="list-item-description"
                                            value={item.description}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="dashboard-features__image">
                            {attributes.imageUrl && (
                                <img src={attributes.imageUrl} alt="Dashboard preview" />
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
});