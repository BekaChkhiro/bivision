import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TabPanel, TextControl, RangeControl, Button } from '@wordpress/components';
import { styles } from './styles';

registerBlockType('bevision/blog-hero-section', {
    title: 'Case Study Section',
    icon: 'analytics',
    category: 'design',
    attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: 'h1',
            default: 'Title text fo the case study'
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
            default: 48
        },
        descriptionFontSize: {
            type: 'number',
            default: 16
        },
        // Analytics card values
        topCardValue: {
            type: 'string',
            default: '25.350 $'
        },
        middleCardValue: {
            type: 'string',
            default: '75 %'
        },
        bottomCardValue: {
            type: 'string',
            default: '45%'
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
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { 
            title, description,
            backgroundColor, titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            topCardValue, middleCardValue, bottomCardValue,
            backgroundImage, rightImage
        } = attributes;

        return (
            <>
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
                                        <TextControl
                                            label="ზედა ბარათის მნიშვნელობა"
                                            value={topCardValue}
                                            onChange={(value) => setAttributes({ topCardValue: value })}
                                        />
                                        <TextControl
                                            label="შუა ბარათის მნიშვნელობა"
                                            value={middleCardValue}
                                            onChange={(value) => setAttributes({ middleCardValue: value })}
                                        />
                                        <TextControl
                                            label="ქვედა ბარათის მნიშვნელობა"
                                            value={bottomCardValue}
                                            onChange={(value) => setAttributes({ bottomCardValue: value })}
                                        />
                                        <div style={{ marginTop: '20px' }}>
                                            <p>ფონის სურათი</p>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        setAttributes({
                                                            backgroundImage: {
                                                                url: media.url,
                                                                alt: media.alt || '',
                                                                id: media.id,
                                                            },
                                                        });
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={backgroundImage?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            {!backgroundImage?.url ? (
                                                                <Button 
                                                                    onClick={open}
                                                                    className="components-button is-primary"
                                                                >
                                                                    სურათის არჩევა
                                                                </Button>
                                                            ) : (
                                                                <div>
                                                                    <img 
                                                                        src={backgroundImage.url} 
                                                                        alt={backgroundImage.alt} 
                                                                        style={{ maxWidth: '100%', marginBottom: '10px' }} 
                                                                    />
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <Button 
                                                                            onClick={open}
                                                                            className="components-button is-secondary"
                                                                        >
                                                                            სურათის შეცვლა
                                                                        </Button>
                                                                        <Button 
                                                                            onClick={() => {
                                                                                setAttributes({
                                                                                    backgroundImage: {
                                                                                        url: '',
                                                                                        alt: '',
                                                                                        id: null,
                                                                                    },
                                                                                });
                                                                            }}
                                                                            className="components-button is-link is-destructive"
                                                                        >
                                                                            წაშლა
                                                                        </Button>
                                                                    </div>
                                                                </div>
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
                                                    onSelect={(media) => {
                                                        setAttributes({
                                                            rightImage: {
                                                                url: media.url,
                                                                alt: media.alt || '',
                                                                id: media.id,
                                                            },
                                                        });
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={rightImage?.id}
                                                    render={({ open }) => (
                                                        <div>
                                                            {!rightImage?.url ? (
                                                                <Button 
                                                                    onClick={open}
                                                                    className="components-button is-primary"
                                                                >
                                                                    სურათის არჩევა
                                                                </Button>
                                                            ) : (
                                                                <div>
                                                                    <img 
                                                                        src={rightImage.url} 
                                                                        alt={rightImage.alt} 
                                                                        style={{ maxWidth: '100%', marginBottom: '10px' }} 
                                                                    />
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                        <Button 
                                                                            onClick={open}
                                                                            className="components-button is-secondary"
                                                                        >
                                                                            სურათის შეცვლა
                                                                        </Button>
                                                                        <Button 
                                                                            onClick={() => {
                                                                                setAttributes({
                                                                                    rightImage: {
                                                                                        url: '',
                                                                                        alt: '',
                                                                                        id: null,
                                                                                    },
                                                                                });
                                                                            }}
                                                                            className="components-button is-link is-destructive"
                                                                        >
                                                                            წაშლა
                                                                        </Button>
                                                                    </div>
                                                                </div>
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
                                    <>
                                        <PanelBody title="ფერები" initialOpen={true}>
                                            <div>
                                                <p>ფონის ფერი</p>
                                                <ColorPalette
                                                    value={backgroundColor}
                                                    onChange={(color) => setAttributes({ backgroundColor: color })}
                                                />
                                            </div>
                                            <div>
                                                <p>სათაურის ფერი</p>
                                                <ColorPalette
                                                    value={titleColor}
                                                    onChange={(color) => setAttributes({ titleColor: color })}
                                                />
                                            </div>
                                            <div>
                                                <p>აღწერის ფერი</p>
                                                <ColorPalette
                                                    value={descriptionColor}
                                                    onChange={(color) => setAttributes({ descriptionColor: color })}
                                                />
                                            </div>
                                        </PanelBody>
                                        <PanelBody title="ტექსტის ზომები" initialOpen={false}>
                                            <RangeControl
                                                label="სათაურის ტექსტის ზომა"
                                                value={titleFontSize}
                                                onChange={(value) => setAttributes({ titleFontSize: value })}
                                                min={24}
                                                max={72}
                                            />
                                            <RangeControl
                                                label="აღწერის ტექსტის ზომა"
                                                value={descriptionFontSize}
                                                onChange={(value) => setAttributes({ descriptionFontSize: value })}
                                                min={14}
                                                max={24}
                                            />
                                        </PanelBody>
                                    </>
                                );
                            }
                        }}
                    </TabPanel>
                </InspectorControls>
                <div {...blockProps} style={{...styles.container(), backgroundColor, backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="case-study-content" style={styles.heroContent()}>
                        <div className="left-content" style={styles.leftContent()}>
                            <RichText
                                tagName="h1"
                                value={title}
                                onChange={(content) => setAttributes({ title: content })}
                                placeholder="Title text fo the case study"
                                style={styles.title()}
                                allowedFormats={['core/bold', 'core/italic']}
                            />
                            <RichText
                                tagName="p"
                                className="description"
                                value={description}
                                onChange={(content) => setAttributes({ description: content })}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
                                style={styles.description()}
                            />
                        </div>
                        <div className="right-content" style={styles.rightContent()}>
                            {rightImage?.url ? (
                                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <img 
                                        src={rightImage.url} 
                                        alt={rightImage.alt} 
                                        style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px'}} 
                                    />
                                </div>
                            ) : (
                                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '10px'}}>
                                    <p style={{color: '#666', fontStyle: 'italic'}}>აირჩიეთ სურათი მარჯვენა მხარისთვის</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const { 
            title, description,
            backgroundColor, titleColor, descriptionColor,
            titleFontSize, descriptionFontSize,
            topCardValue, middleCardValue, bottomCardValue,
            backgroundImage, rightImage
        } = attributes;
        
        return (
            <div style={{...styles.container(), backgroundColor, backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="case-study-content" style={styles.heroContent()}>
                    <div className="left-content" style={styles.leftContent()}>
                        <h1 
                            style={styles.title()}
                            dangerouslySetInnerHTML={{ __html: title }}
                        ></h1>
                        <p className="description" style={styles.description()}>
                            {description}
                        </p>
                    </div>
                    <div className="right-content" style={styles.rightContent()}>
                        {rightImage?.url && (
                            <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img 
                                    src={rightImage.url} 
                                    alt={rightImage.alt} 
                                    style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '10px'}} 
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
});