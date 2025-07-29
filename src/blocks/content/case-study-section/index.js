import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TabPanel, TextControl, RangeControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './frontend.css';

registerBlockType('bevision/case-study-section', {
    title: 'Case Study Section',
    icon: 'analytics',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h1',
            default: 'Title text for the case study'
        },
        description: {
            type: 'string',
            source: 'html',
            selector: '.description',
            default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
        },
        backgroundColor: {
            type: 'string',
            default: '#F7F5FF'
        },
        titleColor: {
            type: 'string',
            default: '#2D2A5F'
        },
        descriptionColor: {
            type: 'string',
            default: '#8399AF'
        },
        titleFontSize: {
            type: 'number',
            default: 50
        },
        descriptionFontSize: {
            type: 'number',
            default: 18
        },
        backgroundImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        rightImage: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        },
        logo: {
            type: 'object',
            default: {
                url: '',
                alt: '',
                id: null
            }
        }
    },

    edit: function(props) {
        const { attributes, setAttributes } = props;
        const blockProps = useBlockProps();
        const { 
            title, description,
            backgroundColor, titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            backgroundImage, rightImage, logo
        } = attributes;

        // Media upload handlers
        const onSelectBackgroundImage = (media) => {
            setAttributes({
                backgroundImage: {
                    url: media.url,
                    alt: media.alt || '',
                    id: media.id
                }
            });
        };

        const onSelectRightImage = (media) => {
            setAttributes({
                rightImage: {
                    url: media.url,
                    alt: media.alt || '',
                    id: media.id
                }
            });
        };

        const removeBackgroundImage = () => {
            setAttributes({
                backgroundImage: {
                    url: '',
                    alt: '',
                    id: null
                }
            });
        };

        const removeRightImage = () => {
            setAttributes({
                rightImage: {
                    url: '',
                    alt: '',
                    id: null
                }
            });
        };

        const onSelectLogo = (media) => {
            setAttributes({
                logo: {
                    url: media.url,
                    alt: media.alt || '',
                    id: media.id
                }
            });
        };

        const removeLogo = () => {
            setAttributes({
                logo: {
                    url: '',
                    alt: '',
                    id: null
                }
            });
        };

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <TabPanel
                        className="bevision-tab-panel"
                        activeClass="is-active"
                        tabs={[
                            {
                                name: 'content',
                                title: 'კონტენტი',
                                className: 'tab-content'
                            },
                            {
                                name: 'style',
                                title: 'სტილი',
                                className: 'tab-style'
                            }
                        ]}
                    >
                        {(tab) => {
                            if (tab.name === 'content') {
                                return (
                                    <PanelBody>
                                        <TextControl
                                            label="სათაური"
                                            value={title}
                                            onChange={(value) => setAttributes({ title: value })}
                                        />
                                        <TextControl
                                            label="აღწერა"
                                            value={description}
                                            onChange={(value) => setAttributes({ description: value })}
                                        />
                                        <div style={{ marginTop: '20px' }}>
                                            <p>ფონის სურათი</p>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={onSelectBackgroundImage}
                                                    allowedTypes={['image']}
                                                    value={backgroundImage?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            {backgroundImage?.url ? (
                                                                <div>
                                                                    <img 
                                                                        src={backgroundImage.url} 
                                                                        alt={backgroundImage.alt || ''}
                                                                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }}
                                                                    />
                                                                    <Button 
                                                                        onClick={removeBackgroundImage} 
                                                                        isDestructive
                                                                    >
                                                                        წაშლა
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <Button 
                                                                    onClick={open}
                                                                    variant="secondary"
                                                                >
                                                                    ფონის სურათის არჩევა
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <p>მარჯვენა სურათი</p>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={onSelectRightImage}
                                                    allowedTypes={['image']}
                                                    value={rightImage?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            {rightImage?.url ? (
                                                                <div>
                                                                    <img 
                                                                        src={rightImage.url} 
                                                                        alt={rightImage.alt || ''}
                                                                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }}
                                                                    />
                                                                    <Button 
                                                                        onClick={removeRightImage} 
                                                                        isDestructive
                                                                    >
                                                                        წაშლა
                                                                    </Button>
                                                                </div>
                                                            ) : (
                                                                <Button 
                                                                    onClick={open}
                                                                    variant="secondary"
                                                                >
                                                                    სურათის არჩევა
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <p>ლოგო</p>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={onSelectLogo}
                                                    allowedTypes={['image']}
                                                    value={logo?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            {logo?.url ? (
                                                                <div>
                                                                    <img 
                                                                        src={logo.url} 
                                                                        alt={logo.alt || ''}
                                                                        style={{ maxWidth: '100%', height: 'auto', marginBottom: '8px' }}
                                                                    />
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                        <Button 
                                                                            onClick={open}
                                                                            variant="secondary"
                                                                        >
                                                                            შეცვლა
                                                                        </Button>
                                                                        <Button 
                                                                            onClick={removeLogo} 
                                                                            isDestructive
                                                                        >
                                                                            წაშლა
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Button 
                                                                    onClick={open}
                                                                    variant="secondary"
                                                                >
                                                                    ლოგოს არჩევა
                                                                </Button>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                    </PanelBody>
                                );
                            } else if (tab.name === 'style') {
                                return (
                                    <PanelBody>
                                        <p>ფონის ფერი</p>
                                        <ColorPalette
                                            value={backgroundColor}
                                            onChange={(value) => setAttributes({ backgroundColor: value })}
                                        />
                                        <p>სათაურის ფერი</p>
                                        <ColorPalette
                                            value={titleColor}
                                            onChange={(value) => setAttributes({ titleColor: value })}
                                        />
                                        <p>აღწერის ფერი</p>
                                        <ColorPalette
                                            value={descriptionColor}
                                            onChange={(value) => setAttributes({ descriptionColor: value })}
                                        />
                                        <RangeControl
                                            label="სათაურის ფონტის ზომა"
                                            value={titleFontSize}
                                            onChange={(value) => setAttributes({ titleFontSize: value })}
                                            min={16}
                                            max={72}
                                        />
                                        <RangeControl
                                            label="აღწერის ფონტის ზომა"
                                            value={descriptionFontSize}
                                            onChange={(value) => setAttributes({ descriptionFontSize: value })}
                                            min={12}
                                            max={36}
                                        />
                                    </PanelBody>
                                );
                            }
                            return null;
                        }}
                    </TabPanel>
                </InspectorControls>
                
                <div style={{
                    backgroundColor, 
                    backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : 'none', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    position: 'relative', 
                    overflow: 'hidden', 
                    maxWidth: '1250px', 
                    margin: '0 auto', 
                    borderRadius: '20px'
                }}>
                    <div className="case-study-content" style={{
                        margin: '0 auto',
                        padding: '60px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '43px',
                        borderRadius: '20px',
                        position: 'relative'
                    }}>
                        <div className="left-content" style={{
                            flex: '1',
                            maxWidth: '50%',
                            textAlign: 'left'
                        }}>
                            <RichText
                                tagName="h1"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder={__('Title text for the case study', 'bevision')}
                                style={{
                                    color: titleColor || '#221A4C',
                                    fontSize: `${titleFontSize}px`,
                                    fontWeight: '750',
                                    lineHeight: '50px',
                                    marginBottom: '40px',
                                    marginTop: '0px'
                                }}
                            />
                            <RichText
                                tagName="p"
                                className="description"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', 'bevision')}
                                style={{
                                    color: descriptionColor || '#8399AF',
                                    fontSize: `${descriptionFontSize}px`,
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    marginBottom: '0',
                                    maxWidth: '100%'
                                }}
                            />
                            {logo?.url && (
                                <div className="logo-container" style={{
                                    marginTop: '30px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}>
                                    <img 
                                        src={logo.url} 
                                        alt={logo.alt || 'Logo'} 
                                        style={{
                                            maxWidth: '150px',
                                            height: 'auto',
                                            objectFit: 'contain'
                                        }}
                                    />
                                    <div className="logo-controls" style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        display: 'flex',
                                        gap: '5px',
                                        opacity: '0',
                                        transition: 'opacity 0.2s'
                                    }}>
                                        <Button
                                            onClick={() => {
                                                // This will trigger the media upload
                                                document.querySelector('[aria-label="ლოგოს არჩევა"], [aria-label="შეცვლა"]')?.click();
                                            }}
                                            variant="secondary"
                                            isSmall
                                            style={{ 
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                color: '#333'
                                            }}
                                        >
                                            Replace
                                        </Button>
                                        <Button
                                            onClick={removeLogo}
                                            variant="secondary"
                                            isDestructive
                                            isSmall
                                            style={{ 
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                color: '#dc3545'
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="right-content" style={{
                            flex: '1',
                            maxWidth: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {rightImage?.url && (
                                <div>
                                    <img 
                                        src={rightImage.url} 
                                        alt={rightImage.alt || ''} 
                                        style={{
                                            maxWidth: '100%',
                                            height: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: '10px'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },

    save: function(props) {
        const { attributes } = props;
        const { 
            title, description,
            backgroundColor, titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            backgroundImage, rightImage, logo
        } = attributes;
        
        const blockProps = useBlockProps.save({
            className: 'wp-block-bevision-case-study-section',
            style: {
                backgroundColor,
                backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
                backgroundSize: backgroundImage?.url ? 'cover' : undefined,
                backgroundPosition: backgroundImage?.url ? 'center' : undefined
            }
        });
        
        return (
            <div {...blockProps}>
                <div className="case-study-content">
                    <div className="left-content">
                        <h1 
                            style={{
                                color: titleColor || '#221A4C',
                                fontSize: `${titleFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: title }}
                        ></h1>
                        <p 
                            className="description" 
                            style={{
                                color: descriptionColor || '#8399AF',
                                fontSize: `${descriptionFontSize}px`
                            }}
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></p>
                        {logo?.url && (
                            <div className="logo-container">
                                <img 
                                    src={logo.url} 
                                    alt={logo.alt || 'Logo'}
                                    className="case-study-logo"
                                />
                            </div>
                        )}
                    </div>
                    <div className="right-content">
                        {rightImage?.url && (
                            <div>
                                <img 
                                    src={rightImage.url} 
                                    alt={rightImage.alt || ''}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
});
