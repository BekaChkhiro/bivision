import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, SelectControl } from '@wordpress/components';
import './frontend.css';
import './frontend.js';

const styles = {
    section: {
        backgroundColor: '#221A4C', // Dark purple background from the image
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1250px',
        margin: '0 auto',
        borderRadius: '20px',
        marginBottom: '60px',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '60px',
        zIndex: '2',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            padding: '60px 30px',
            textAlign: 'center',
            gap: '30px'
        }
    },
    textContainer: {
        '@media (max-width: 768px)': {
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    heading: {
        color: '#2FCA02', // Green color for "CONTACT US"
        fontSize: '18px',
        fontWeight: '600',
        margin: '0px 0px 5px',
        textTransform: 'uppercase',
        '@media (max-width: 768px)': {
            fontSize: '16px',
            marginBottom: '10px'
        }
    },
    title: {
        color: '#FFFFFF', // White color for main text
        fontSize: '40px',
        fontWeight: '600',
        margin: '0px',
        lineHeight: '1.2',
        '@media (max-width: 768px)': {
            fontSize: '32px',
            marginBottom: '30px',
            textAlign: 'center'
        }
    },
    button: {
        backgroundColor: '#2FCA02', // Green button
        color: '#FFFFFF', // White text
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: 'bold',
        borderRadius: '8px',
        textDecoration: 'none',
        display: 'inline-block',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s ease',
        '@media (max-width: 768px)': {
            width: '100%',
            maxWidth: '300px',
            textAlign: 'center',
            padding: '15px 40px'
        }
    },
    backgroundDots: {
        position: 'absolute',
        right: '-20px',
        top: '0',
        height: '100%',
        width: '25%',
        opacity: '0.3',
        zIndex: '1',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (max-width: 768px)': {
            width: '40%',
            right: '-10px'
        }
    },
    backgroundCircle: {
        position: 'absolute',
        left: '-2%',
        top: '60%',
        transform: 'translateY(-50%)',
        width: '300px',
        height: '300px',
        opacity: '0.3',
        zIndex: '1',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '@media (max-width: 768px)': {
            width: '200px',
            height: '200px',
            top: '80%'
        }
    }
};

registerBlockType('bevision/contact-us', {
    title: 'Contact Us',
    icon: 'phone',
    category: 'bevision',
    attributes: {
        heading: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-heading',
            default: 'CONTACT US'
        },
        title: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-title',
            default: 'Request a call or send us a message'
        },
        buttonText: {
            type: 'string',
            source: 'html',
            selector: '.contact-us-button',
            default: 'Contact us'
        },
        buttonActionType: {
            type: 'string',
            default: 'popup'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        backgroundDotsUrl: {
            type: 'string',
            default: ''
        },
        backgroundCircleUrl: {
            type: 'string',
            default: ''
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        
        const dotsStyle = {
            ...styles.backgroundDots,
            backgroundImage: attributes.backgroundDotsUrl ? `url(${attributes.backgroundDotsUrl})` : 'radial-gradient(circle, #6653C6 2px, transparent 2px)',
            backgroundSize: attributes.backgroundDotsUrl ? 'cover' : '20px 20px'
        };

        const circleStyle = {
            ...styles.backgroundCircle,
            backgroundImage: attributes.backgroundCircleUrl ? `url(${attributes.backgroundCircleUrl})` : 'none',
            backgroundColor: attributes.backgroundCircleUrl ? 'transparent' : 'rgba(102, 83, 198, 0.3)',
            borderRadius: attributes.backgroundCircleUrl ? '0' : '50%'
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Button Settings">
                        <SelectControl
                            label="Button Action Type"
                            value={attributes.buttonActionType}
                            options={[
                                { label: 'Open Popup', value: 'popup' },
                                { label: 'Custom URL', value: 'url' }
                            ]}
                            onChange={(buttonActionType) => setAttributes({ buttonActionType })}
                        />
                        {attributes.buttonActionType === 'url' && (
                            <TextControl
                                label="Button URL"
                                value={attributes.buttonUrl}
                                onChange={(buttonUrl) => setAttributes({ buttonUrl })}
                                help="Enter the URL for the contact button"
                            />
                        )}
                    </PanelBody>
                    <PanelBody title="Background Settings">
                        <div style={{ marginBottom: '1rem' }}>
                            <p><strong>Background Dots Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ backgroundDotsUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundDotsUrl}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ display: 'block', marginBottom: '8px' }}
                                        >
                                            {attributes.backgroundDotsUrl ? 'Change Dots Background' : 'Upload Dots Background'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.backgroundDotsUrl && (
                                <Button 
                                    onClick={() => setAttributes({ backgroundDotsUrl: '' })}
                                    variant="link"
                                    isDestructive
                                >
                                    Remove Dots Background
                                </Button>
                            )}
                        </div>
                        <div>
                            <p><strong>Background Circle Image</strong></p>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={(media) => setAttributes({ backgroundCircleUrl: media.url })}
                                    allowedTypes={['image']}
                                    value={attributes.backgroundCircleUrl}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            variant="secondary"
                                            style={{ display: 'block', marginBottom: '8px' }}
                                        >
                                            {attributes.backgroundCircleUrl ? 'Change Circle Background' : 'Upload Circle Background'}
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                            {attributes.backgroundCircleUrl && (
                                <Button 
                                    onClick={() => setAttributes({ backgroundCircleUrl: '' })}
                                    variant="link"
                                    isDestructive
                                >
                                    Remove Circle Background
                                </Button>
                            )}
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} style={styles.section}>
                    <div style={dotsStyle}></div>
                    <div style={circleStyle}></div>
                    <div style={styles.container}>
                        <div style={styles.textContainer}>
                            <RichText
                                tagName="h3"
                                className="contact-us-heading"
                                style={styles.heading}
                                value={attributes.heading}
                                onChange={(heading) => setAttributes({ heading })}
                                placeholder="CONTACT US"
                            />
                            <RichText
                                tagName="h2"
                                className="contact-us-title"
                                style={styles.title}
                                value={attributes.title}
                                onChange={(title) => setAttributes({ title })}
                                placeholder="Request a call or send us a message"
                            />
                        </div>
                        <RichText
                            tagName="span"
                            className="contact-us-button"
                            style={styles.button}
                            value={attributes.buttonText}
                            onChange={(buttonText) => setAttributes({ buttonText })}
                            placeholder="Contact us"
                        />
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
        
        // Build the background image styles
        const dotsBackgroundImage = attributes.backgroundDotsUrl ? 
            `url(${attributes.backgroundDotsUrl})` : 
            'radial-gradient(circle, #6653C6 2px, transparent 2px)';
        
        const circleBackgroundImage = attributes.backgroundCircleUrl ? 
            `url(${attributes.backgroundCircleUrl})` : 
            'none';
        
        const circleBorderRadius = attributes.backgroundCircleUrl ? '0' : '50%';
        const circleBackgroundColor = attributes.backgroundCircleUrl ? 'transparent' : 'rgba(102, 83, 198, 0.3)';

        // Define background image paths
        const contactUsBg = '/wp-content/themes/BeVision/assets/images/contact-us-bg.png';
        const contactUsBgMobile = '/wp-content/themes/BeVision/assets/images/contact-us-bg-mobile.png';
        
        return (
            <div {...blockProps} 
                className="contact-us-block"
                style={{
                    backgroundImage: `url(${contactUsBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#221A4C'
                }}
                data-mobile-bg={contactUsBgMobile}
            >
                <div className="contact-container">
                    <div className="text-container">
                        <RichText.Content
                            tagName="h3"
                            className="contact-us-heading"
                            value={attributes.heading}
                        />
                        <RichText.Content
                            tagName="h2"
                            className="contact-us-title"
                            value={attributes.title}
                        />
                    </div>
                    {attributes.buttonActionType === 'popup' ? (
                        <a 
                            href="javascript:void(0)"
                            className="contact-button"
                            onClick="openPopup('bevision-new-popup')"
                        >
                            <RichText.Content
                                tagName="span"
                                className="contact-us-button"
                                value={attributes.buttonText}
                            />
                        </a>
                    ) : (
                        <a 
                            href={attributes.buttonUrl}
                            className="contact-button"
                        >
                            <RichText.Content
                                tagName="span"
                                className="contact-us-button"
                                value={attributes.buttonText}
                            />
                        </a>
                    )}
                </div>
            </div>
        );
    },
});