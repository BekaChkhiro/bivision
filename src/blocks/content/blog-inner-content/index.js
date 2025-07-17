import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPicker, RangeControl, TextControl, TextareaControl } from '@wordpress/components';
import { styles } from './styles';
import './frontend.css';

registerBlockType('bevision/blog-inner-content', {
    title: 'Blog Inner Content',
    icon: 'text-page',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            default: 'Introduction text, describing problem, Full width'
        },
        content: {
            type: 'array',
            default: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            ]
        },
        titleColor: {
            type: 'string',
            default: '#323377'
        },
        textColor: {
            type: 'string',
            default: '#221A4C'
        },
        titleFontSize: {
            type: 'number',
            default: 24
        },
        contentFontSize: {
            type: 'number',
            default: 16
        },
        authorName: {
            type: 'string',
            source: 'html',
            selector: '.author-name',
            default: ''
        },
        authorTitle: {
            type: 'string',
            source: 'html',
            selector: '.author-title',
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
            title, content, titleColor, textColor, 
            titleFontSize, contentFontSize,
            authorName, authorTitle, authorImage,
            authorNameColor, authorTitleColor,
            authorNameFontSize, authorTitleFontSize
        } = attributes;

        // Helper to update content paragraphs
        const updateContent = (value, idx) => {
            const updated = [...content];
            updated[idx] = value;
            setAttributes({ content: updated });
        };

        // Helper to add a new paragraph
        const addParagraph = () => {
            setAttributes({ content: [...content, ''] });
        };

        // Helper to remove a paragraph
        const removeParagraph = (idx) => {
            const updated = [...content];
            updated.splice(idx, 1);
            setAttributes({ content: updated });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Content Settings" initialOpen={true}>
                        <TextControl
                            label="Title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                            help="Edit the main title text"
                        />
                        
                        <div style={{ marginTop: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Content Paragraphs</label>
                            {content.map((paragraph, index) => (
                                <div key={index} style={{ marginBottom: '10px' }}>
                                    <TextareaControl
                                        label={`Paragraph ${index + 1}`}
                                        value={paragraph}
                                        onChange={(value) => updateContent(value, index)}
                                        rows={3}
                                        help={`Edit content paragraph ${index + 1}`}
                                    />
                                    {content.length > 1 && (
                                        <Button
                                            isDestructive
                                            isSmall
                                            onClick={() => removeParagraph(index)}
                                            style={{ marginTop: '5px' }}
                                        >
                                            Remove Paragraph {index + 1}
                                        </Button>
                                    )}
                                </div>
                            ))}
                            
                            <div style={{ marginTop: '10px' }}>
                                <Button
                                    onClick={addParagraph}
                                    variant="secondary"
                                    style={{ fontSize: '12px', padding: '4px 8px' }}
                                >
                                    Add Paragraph
                                </Button>
                            </div>
                        </div>
                    </PanelBody>
                    
                    <PanelBody title="Author Settings" initialOpen={false}>
                        <TextControl
                            label="Author Name"
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}
                            help="Enter the author's name"
                        />
                        
                        <TextControl
                            label="Author Title/Position"
                            value={authorTitle}
                            onChange={(value) => setAttributes({ authorTitle: value })}
                            help="Enter the author's position or title"
                        />
                        
                        <div style={{ marginTop: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Author Photo</label>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => {
                                        setAttributes({
                                            authorImage: {
                                                url: media.url,
                                                alt: media.alt,
                                                id: media.id
                                            }
                                        });
                                    }}
                                    allowedTypes={['image']}
                                    value={authorImage?.id}
                                    render={({ open }) => (
                                        <div>
                                            <Button 
                                                onClick={open}
                                                className={authorImage?.url ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                                            >
                                                {authorImage?.url ? 'Change Author Photo' : 'Select Author Photo'}
                                            </Button>
                                            {authorImage?.url && (
                                                <Button 
                                                    onClick={() => {
                                                        setAttributes({
                                                            authorImage: {
                                                                url: '',
                                                                alt: '',
                                                                id: null
                                                            }
                                                        });
                                                    }}
                                                    isDestructive
                                                    style={{ marginLeft: '10px' }}
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
                    </PanelBody>
                    
                    <PanelBody title="Style Settings" initialOpen={false}>
                        <p><strong>Title Color</strong></p>
                        <ColorPicker
                            color={titleColor}
                            onChangeComplete={(color) => setAttributes({ titleColor: color.hex })}
                            disableAlpha
                        />
                        

                        
                        <p><strong>Text Color</strong></p>
                        <ColorPicker
                            color={textColor}
                            onChangeComplete={(color) => setAttributes({ textColor: color.hex })}
                            disableAlpha
                        />

                        <RangeControl
                            label="Title Font Size"
                            value={titleFontSize}
                            onChange={(value) => setAttributes({ titleFontSize: value })}
                            min={18}
                            max={60}
                        />
                        


                        <RangeControl
                            label="Content Font Size"
                            value={contentFontSize}
                            onChange={(value) => setAttributes({ contentFontSize: value })}
                            min={12}
                            max={24}
                        />
                        
                        <p><strong>Author Name Color</strong></p>
                        <ColorPicker
                            color={authorNameColor}
                            onChangeComplete={(color) => setAttributes({ authorNameColor: color.hex })}
                            disableAlpha
                        />
                        
                        <p><strong>Author Title Color</strong></p>
                        <ColorPicker
                            color={authorTitleColor}
                            onChangeComplete={(color) => setAttributes({ authorTitleColor: color.hex })}
                            disableAlpha
                        />
                        
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
                </InspectorControls>

                <div {...blockProps} style={styles.container()}>
                    <RichText
                        tagName="h2"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Enter title..."
                        style={{
                            ...styles.title(),
                            color: titleColor,
                            fontSize: `${titleFontSize}px`
                        }}
                    />
                    

                    
                    <div style={styles.content()}>
                        {content.map((paragraph, index) => (
                            <div key={index} style={{ position: 'relative', marginBottom: '20px' }}>
                                <RichText
                                    tagName="p"
                                    value={paragraph}
                                    onChange={(value) => updateContent(value, index)}
                                    placeholder="Enter content paragraph..."
                                    style={{
                                        ...styles.paragraph(),
                                        color: textColor,
                                        fontSize: `${contentFontSize}px`
                                    }}
                                />
                                {content.length > 1 && (
                                    <Button
                                        isDestructive
                                        isSmall
                                        onClick={() => removeParagraph(index)}
                                        style={{ 
                                            position: 'absolute', 
                                            top: '0', 
                                            right: '0',
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            border: '1px solid #ddd',
                                            borderRadius: '50%',
                                            padding: '4px 6px',
                                            fontSize: '12px',
                                            lineHeight: '1',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}
                                        title={`Remove paragraph ${index + 1}`}
                                    >
                                        ✕
                                    </Button>
                                )}
                            </div>
                        ))}
                        
                        <Button
                            isPrimary
                            onClick={addParagraph}
                            style={{ marginBottom: '20px' }}
                        >
                            Add Paragraph
                        </Button>
                        
                        {/* Author section - inline editable */}
                        <div style={{ marginTop: '30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                {/* Author Image */}
                                <div style={{ position: 'relative' }}>
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => {
                                                setAttributes({
                                                    authorImage: {
                                                        url: media.url,
                                                        alt: media.alt,
                                                        id: media.id
                                                    }
                                                });
                                            }}
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
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const {
            title, content, titleColor, textColor, 
            titleFontSize, contentFontSize,
            authorName, authorTitle, authorImage,
            authorNameColor, authorTitleColor,
            authorNameFontSize, authorTitleFontSize
        } = attributes;

        return (
            <div className="wp-block-bevision-blog-inner-content">
                <h2 
                    className="blog-title"
                    style={{
                        color: titleColor,
                        fontSize: `${titleFontSize}px`
                    }}
                >
                    {title}
                </h2>
                


                <div className="blog-content">
                    {content.map((paragraph, index) => (
                        <p 
                            key={index}
                            className="blog-paragraph"
                            style={{
                                color: textColor,
                                fontSize: `${contentFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        ></p>
                    ))}
                </div>
                
                {/* Author section - simple inline display */}
                <div className="blog-author" style={{ marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {authorImage?.url && (
                            <img 
                                src={authorImage.url} 
                                alt={authorImage.alt} 
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
            </div>
        );
    }
});
