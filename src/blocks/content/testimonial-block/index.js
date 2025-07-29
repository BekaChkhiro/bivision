import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TabPanel, TextControl, TextareaControl, RangeControl, Button, ToggleControl } from '@wordpress/components';

import './frontend.css';

registerBlockType('bevision/testimonial-block', {
    title: 'Testimonial Block',
    icon: 'format-quote',
    category: 'design',    attributes: {
        introTitle: {
            type: 'string',
            source: 'html',
            selector: '.intro-title',
            default: 'Introduction text, describing problem'
        },
        introParagraphs: {
            type: 'array',
            source: 'query',
            selector: '.intro-paragraph',
            query: {
                content: {
                    type: 'string',
                    source: 'html'
                }
            },
            default: [
                { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
                { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
            ]
        },
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
        },        quoteColor: {
            type: 'string',
            default: '#221A4C'
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
            default: 16
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
            default: 10
        },
        authorImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        layoutReversed: {
            type: 'boolean',
            default: false
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const {
            introTitle, introParagraphs,
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage, layoutReversed
        } = attributes;

        // Helper to update paragraphs
        const updateParagraph = (value, idx) => {
            const updated = [...introParagraphs];
            updated[idx] = { content: value };
            setAttributes({ introParagraphs: updated });
        };        // Helper to render introduction content
        const renderIntroductionContent = () => (
            <div style={{ flex: 1.2, color: '#2e2367', paddingRight: layoutReversed ? '0' : '24px', paddingLeft: layoutReversed ? '24px' : '0' }}>                <RichText
                    tagName="h2"
                    className="intro-title"
                    value={introTitle}
                    onChange={value => setAttributes({ introTitle: value })}
                    style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1rem' }}
                    placeholder="Introduction text, describing problem"
                    allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/line-break']}
                />
                {introParagraphs.map((p, idx) => (
                    <RichText
                        key={idx}
                        tagName="p"
                        className="intro-paragraph"                        value={p.content || p}
                        onChange={value => updateParagraph(value, idx)}
                        style={{ marginBottom: '1rem', fontSize: '1rem', color: '#2e2367' }}
                        placeholder={`Paragraph ${idx + 1}`}
                        allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/line-break']}
                    />
                ))}
            </div>
        );

        // Helper to render testimonial content
        const renderTestimonialContent = () => (
            <div style={{ flex: 1, background: '#f8f6ff', border: '2px solid #7e6eea', borderRadius: '18px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>                <RichText
                    tagName="blockquote"
                    className="quote-text"
                    value={quote}
                    onChange={(value) => setAttributes({ quote: value })}                    style={{ fontSize: '1.1rem', color: '#2e2367', marginBottom: '2rem', fontStyle: 'italic' }}
                    placeholder="Enter testimonial quote..."
                    allowedFormats={['core/bold', 'core/italic', 'core/link', 'core/line-break']}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                                            width: 56, 
                                            height: 56, 
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
                    <div>                        <RichText
                            tagName="div"
                            className="author-name"
                            value={authorName}
                            onChange={(value) => setAttributes({ authorName: value })}                            style={{ fontWeight: 'bold', color: '#2e2367' }}
                            placeholder="Author name..."
                            allowedFormats={['core/bold', 'core/italic', 'core/line-break']}
                        />
                        <RichText
                            tagName="div"
                            className="author-title"
                            value={authorTitle}
                            onChange={(value) => setAttributes({ authorTitle: value })}
                            style={{ fontSize: '0.95rem', color: '#7e6eea' }}
                            placeholder="Author title..."
                            allowedFormats={['core/bold', 'core/italic', 'core/line-break']}
                        />
                    </div>
                </div>
            </div>
        );

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <TabPanel
                        className="bevision-tab-panel"
                        activeClass="is-active"
                        tabs={[
                            { name: 'content', title: 'კონტენტი', className: 'tab-content' },
                            { name: 'style', title: 'სტილი', className: 'tab-style' }
                        ]}
                    >
                        {(tab) => {
                            if (tab.name === 'content') {
                                return (
                                    <PanelBody>
                                        <h3 style={{ marginBottom: '15px', color: '#2e2367' }}>განლაგება</h3>
                                        <Button
                                            variant={layoutReversed ? "primary" : "secondary"}
                                            onClick={() => setAttributes({ layoutReversed: !layoutReversed })}
                                            style={{ width: '100%', marginBottom: '10px' }}
                                        >
                                            {layoutReversed ? '🔄 ტესტიმონიალი მარცხნივ' : '🔄 ტესტიმონიალი მარჯვნივ'}
                                        </Button>
                                        <ToggleControl
                                            label="შეცვალე განლაგება"
                                            help={layoutReversed ? 'ტესტიმონიალი მარცხენა მხარეს' : 'ტესტიმონიალი მარჯვენა მხარეს'}
                                            checked={layoutReversed}
                                            onChange={(value) => setAttributes({ layoutReversed: value })}
                                        />
                                        <div style={{ 
                                            padding: '10px', 
                                            backgroundColor: '#f0f0f0', 
                                            borderRadius: '4px', 
                                            marginBottom: '20px',
                                            fontSize: '12px',
                                            color: '#666'
                                        }}>
                                            ამჟამად: {layoutReversed ? 'ტესტიმონიალი მარცხენა მხარეს, შესავალი მარჯვენა მხარეს' : 'შესავალი მარცხენა მხარეს, ტესტიმონიალი მარჯვენა მხარეს'}
                                        </div>
                                        
                                        <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />
                                        <h3 style={{ marginBottom: '15px', color: '#2e2367' }}>შესავალი კონტენტი</h3>
                                        <TextControl
                                            label="შესავალი სათაური"
                                            value={introTitle}
                                            onChange={(value) => setAttributes({ introTitle: value })}
                                            help="მთავარი სათაური"
                                        />
                                        <TextareaControl
                                            label="შესავალი ტექსტი"
                                            value={introParagraphs.map(p => p.content || p).join('\n\n')}
                                            onChange={(value) => {
                                                const paragraphs = value.split('\n\n').filter(p => p.trim() !== '').map(content => ({ content }));
                                                setAttributes({ introParagraphs: paragraphs });
                                            }}
                                            rows={8}
                                            help="ტექსტი. გამოყავით პარაგრაფები ორი ახალი ხაზით"
                                        />
                                        
                                        <hr style={{ margin: '20px 0', borderColor: '#ddd' }} />
                                        <h3 style={{ marginBottom: '15px', color: '#2e2367' }}>ტესტიმონიალი</h3>
                                        <TextareaControl
                                            label="ციტატა"
                                            value={quote}
                                            onChange={(value) => setAttributes({ quote: value })}
                                            rows={4}
                                            help="ტესტიმონიალის ტექსტი"
                                        />
                                        <TextControl
                                            label="ავტორის სახელი"
                                            value={authorName}
                                            onChange={(value) => setAttributes({ authorName: value })}
                                        />
                                        <TextControl
                                            label="ავტორის პოზიცია"
                                            value={authorTitle}
                                            onChange={(value) => setAttributes({ authorTitle: value })}
                                        />
                                        <div className="editor-post-featured-image">
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
                                                                {authorImage?.url ? 'შეცვალე ავტორის ფოტო' : 'აირჩიე ავტორის ფოტო'}
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
                                                                >
                                                                    წაშალე ავტორის ფოტო
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
                                );
                            } else if (tab.name === 'style') {
                                return (
                                    <PanelBody>
                                        <div>
                                            <p>ფონის ფერი</p>
                                            <ColorPalette
                                                value={backgroundColor}
                                                onChange={(color) => setAttributes({ backgroundColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ციტატის ფერი</p>
                                            <ColorPalette
                                                value={quoteColor}
                                                onChange={(color) => setAttributes({ quoteColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ავტორის სახელის ფერი</p>
                                            <ColorPalette
                                                value={authorNameColor}
                                                onChange={(color) => setAttributes({ authorNameColor: color })}
                                            />
                                        </div>
                                        <div>
                                            <p>ავტორის პოზიციის ფერი</p>
                                            <ColorPalette
                                                value={authorTitleColor}
                                                onChange={(color) => setAttributes({ authorTitleColor: color })}
                                            />
                                        </div>
                                        <RangeControl
                                            label="ციტატის ზომა"
                                            value={quoteFontSize}
                                            onChange={(value) => setAttributes({ quoteFontSize: value })}
                                            min={12}
                                            max={24}
                                        />
                                        <RangeControl
                                            label="ავტორის სახელის ზომა"
                                            value={authorNameFontSize}
                                            onChange={(value) => setAttributes({ authorNameFontSize: value })}
                                            min={12}
                                            max={24}
                                        />
                                        <RangeControl
                                            label="ავტორის პოზიციის ზომა"
                                            value={authorTitleFontSize}
                                            onChange={(value) => setAttributes({ authorTitleFontSize: value })}
                                            min={10}
                                            max={20}
                                        />
                                        <RangeControl
                                            label="ბორდერის რადიუსი"
                                            value={borderRadius}
                                            onChange={(value) => setAttributes({ borderRadius: value })}
                                            min={0}
                                            max={32}
                                        />
                                    </PanelBody>
                                );
                            }
                        }}
                    </TabPanel>
                </InspectorControls>
                
                <div style={{ 
                    display: 'flex', 
                    gap: '40px', 
                    alignItems: 'stretch', 
                    background: 'transparent', 
                    padding: '40px 0', 
                    maxWidth: '1250px', 
                    margin: '0 auto',
                    flexDirection: layoutReversed ? 'row-reverse' : 'row'
                }}>
                    {renderIntroductionContent()}
                    {renderTestimonialContent()}
                </div>
            </div>
        );
    },
    save: ({ attributes }) => {
        const {
            introTitle, introParagraphs,
            quote, authorName, authorTitle,
            backgroundColor, quoteColor, authorNameColor, authorTitleColor,
            quoteFontSize, authorNameFontSize, authorTitleFontSize,
            borderRadius, authorImage, layoutReversed
        } = attributes;          return (
            <div className={`bevision-testimonial-block ${layoutReversed ? 'layout-reversed' : ''}`}>
                <div className="bevision-testimonial-block__intro">
                    <RichText.Content
                        tagName="h2"
                        className="intro-title"
                        value={introTitle}
                        style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}
                    />
                    {introParagraphs && introParagraphs.map((p, idx) => (
                        <RichText.Content
                            key={idx}
                            tagName="p"
                            className="intro-paragraph"
                            value={p.content || p}
                            style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#2e2367', lineHeight: '1.5' }}
                        />
                    ))}
                </div>
                <div className="bevision-testimonial-block__testimonial">
                    <RichText.Content
                        tagName="blockquote"
                        className="quote-text"
                        value={quote}
                    />
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: authorImage?.url ? 'row' : 'column', 
                        alignItems: authorImage?.url ? 'center' : 'center',
                        gap: authorImage?.url ? '10px' : '0'
                    }}>
                        {authorImage?.url && (
                            <img src={authorImage.url} alt={authorImage.alt} />
                        )}
                        <div style={{ textAlign: authorImage?.url ? 'start' : 'center' }}>
                            <RichText.Content
                                tagName="div"
                                className="author-name"
                                value={authorName}
                            />
                            <RichText.Content
                                tagName="div"
                                className="author-title"
                                value={authorTitle}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
