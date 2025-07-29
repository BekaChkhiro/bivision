import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, InnerBlocks, InspectorControls, PanelColorSettings, URLInputButton, URLInput } from '@wordpress/block-editor';
import { Button, PanelBody, RangeControl, TextControl, ToggleControl, SelectControl } from '@wordpress/components';

const AnalyticsHeroEdit = ({ attributes, setAttributes }) => {
    const { 
        subtitle, mainTitle, title, description, imageUrl, imageId, dashboardImages,
        mobileButtonText, mobileButtonUrl, startGradientColor, endGradientColor,
        containerPadding, containerRadius, mobileLayout, dashboardLayout, maxDashboardImages
    } = attributes;

    const customBlockStyle = `
        .analytics-hero__container {
            margin: 60px auto 70px;
            padding: ${containerPadding}px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 60px;
            border-radius: ${containerRadius}px;
            background: linear-gradient(97deg, ${startGradientColor} 3.08%, ${endGradientColor} 96.79%);
        }

        @media (max-width: 768px) {
            .analytics-hero__container {
                flex-direction: ${mobileLayout};
                text-align: ${mobileLayout === 'column' ? 'left' : 'center'};
            }
        }

        .analytics-hero__dashboard-caption {
            display: block;
            padding: 5px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    `;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Content Settings', 'bevision')} initialOpen={true}>
                    <TextControl
                        label={__('Subtitle', 'bevision')}
                        value={subtitle}
                        onChange={(value) => setAttributes({ subtitle: value })}
                    />
                    <TextControl
                        label={__('Main Title', 'bevision')}
                        value={mainTitle}
                        onChange={(value) => setAttributes({ mainTitle: value })}
                    />
                    <TextControl
                        label={__('Title', 'bevision')}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                </PanelBody>
                
                <PanelBody title={__('Layout Settings', 'bevision')} initialOpen={false}>
                    <RangeControl
                        label={__('Container Padding', 'bevision')}
                        value={containerPadding}
                        onChange={(value) => setAttributes({ containerPadding: value })}
                        min={0}
                        max={100}
                    />
                    <RangeControl
                        label={__('Container Border Radius', 'bevision')}
                        value={containerRadius}
                        onChange={(value) => setAttributes({ containerRadius: value })}
                        min={0}
                        max={50}
                    />
                    <SelectControl
                        label={__('Mobile Layout', 'bevision')}
                        value={mobileLayout}
                        options={[
                            { label: __('Column (Content top, Image bottom)', 'bevision'), value: 'column' },
                            { label: __('Column Reverse (Image top, Content bottom)', 'bevision'), value: 'column-reverse' },
                        ]}
                        onChange={(value) => setAttributes({ mobileLayout: value })}
                    />
                    <SelectControl
                        label={__('Dashboard Images Layout', 'bevision')}
                        value={dashboardLayout}
                        options={[
                            { label: __('Grid (3 columns)', 'bevision'), value: 'grid' },
                            { label: __('List (1 column)', 'bevision'), value: 'list' },
                            { label: __('Slider', 'bevision'), value: 'slider' },
                        ]}
                        onChange={(value) => setAttributes({ dashboardLayout: value })}
                    />
                    <RangeControl
                        label={__('Max Dashboard Images', 'bevision')}
                        value={maxDashboardImages}
                        onChange={(value) => setAttributes({ maxDashboardImages: value })}
                        min={1}
                        max={12}
                    />
                </PanelBody>

                <PanelColorSettings
                    title={__('Color Settings', 'bevision')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: startGradientColor,
                            onChange: (color) => setAttributes({ startGradientColor: color }),
                            label: __('Start Gradient Color', 'bevision'),
                        },
                        {
                            value: endGradientColor,
                            onChange: (color) => setAttributes({ endGradientColor: color }),
                            label: __('End Gradient Color', 'bevision'),
                        },
                    ]}
                />

                <PanelBody title={__('Mobile Button Settings', 'bevision')} initialOpen={false}>
                    <TextControl
                        label={__('Mobile Button Text', 'bevision')}
                        value={mobileButtonText}
                        onChange={(value) => setAttributes({ mobileButtonText: value })}
                    />
                    <URLInputButton
                        label={__('Mobile Button URL', 'bevision')}
                        url={mobileButtonUrl}
                        onChange={(url) => setAttributes({ mobileButtonUrl: url })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="analytics-hero" style={{ padding: '0px' }}>
                <style>{customBlockStyle}</style>
                <div className="analytics-hero__container">
                    <div className="analytics-hero__content">
                        <RichText
                            tagName="h3"
                            className="analytics-hero__subtitle"
                            value={subtitle}
                            onChange={(subtitle) => setAttributes({ subtitle })}
                            placeholder={__('Subtitle', 'bevision')}
                        />
                        <RichText
                            tagName="h1"
                            className="analytics-hero__main-title"
                            value={mainTitle}
                            onChange={(mainTitle) => setAttributes({ mainTitle })}
                            placeholder={__('Main Title', 'bevision')}
                        />
                        <RichText
                            tagName="h2"
                            className="analytics-hero__title"
                            value={title}
                            onChange={(title) => setAttributes({ title })}
                            placeholder={__('Title', 'bevision')}
                        />
                        <RichText
                            tagName="p"
                            className="analytics-hero__description"
                            value={description}
                            onChange={(description) => setAttributes({ description })}
                            placeholder={__('Enter description...', 'bevision')}
                        />
                        <div className="analytics-hero__cta">
                            <InnerBlocks
                                template={[
                                    ['core/button', { 
                                        text: 'Start exploring',
                                        className: 'analytics-hero__button wp-element-button',
                                        backgroundColor: 'transparent',
                                        style: {
                                            spacing: {
                                                padding: {
                                                    top: "10px",
                                                    bottom: "10px",
                                                    left: "40px",
                                                    right: "40px"
                                                }
                                            }
                                        }
                                    }]
                                ]}
                                templateLock={false}
                                allowedBlocks={['core/button', 'core/buttons']}
                            />
                        </div>
                    </div>
                    <div className="analytics-hero__image">
                        {/* Desktop image */}
                        <div className="analytics-hero__desktop-image">
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id
                                    });
                                }}
                                type="image"
                                value={imageId}
                                render={({ open }) => (
                                    imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            onClick={open}
                                            style={{ cursor: 'pointer' }}
                                            alt={__('Hero image', 'bevision')}
                                        />
                                    ) : (
                                        <Button
                                            className="analytics-hero__image-button"
                                            onClick={open}
                                        >
                                            {__('Upload Desktop Image', 'bevision')}
                                        </Button>
                                    )
                                )}
                            />
                        </div>
                        
                        {/* Dashboard images */}
                        <div className="analytics-hero__mobile-dashboards">
                            <h4 className="analytics-hero__dashboard-title">{__(`Dashboard Images (up to ${maxDashboardImages})`, 'bevision')}</h4>
                            <div className={`analytics-hero__dashboard-grid analytics-hero__dashboard-${dashboardLayout}`}>
                                {dashboardImages.map((image, index) => (
                                    <div key={index} className="analytics-hero__dashboard-item">
                                        <img 
                                            src={image.url} 
                                            alt={image.alt || __('Dashboard', 'bevision')} 
                                        />
                                        {image.caption && (
                                            <span className="analytics-hero__dashboard-caption">
                                                {image.caption}
                                            </span>
                                        )}
                                        <Button 
                                            isSmall 
                                            className="analytics-hero__dashboard-remove" 
                                            onClick={() => {
                                                const newImages = [...dashboardImages];
                                                newImages.splice(index, 1);
                                                setAttributes({ dashboardImages: newImages });
                                            }}
                                        >
                                            {__('Remove', 'bevision')}
                                        </Button>
                                        <Button 
                                            isSmall 
                                            className="analytics-hero__dashboard-edit" 
                                            onClick={() => {
                                                // Add editing capability here
                                                const caption = prompt(__('Enter image caption', 'bevision'), image.caption || '');
                                                if (caption !== null) {
                                                    const newImages = [...dashboardImages];
                                                    newImages[index] = {
                                                        ...newImages[index],
                                                        caption
                                                    };
                                                    setAttributes({ dashboardImages: newImages });
                                                }
                                            }}
                                        >
                                            {__('Edit Caption', 'bevision')}
                                        </Button>
                                    </div>
                                ))}
                                
                                {dashboardImages.length < maxDashboardImages && (
                                    <MediaUpload
                                        onSelect={(media) => {
                                            const newImage = {
                                                id: media.id,
                                                url: media.url,
                                                alt: media.alt || '',
                                                caption: media.caption || ''
                                            };
                                            setAttributes({
                                                dashboardImages: [...dashboardImages, newImage]
                                            });
                                        }}
                                        type="image"
                                        render={({ open }) => (
                                            <Button 
                                                className="analytics-hero__dashboard-add" 
                                                onClick={open}
                                            >
                                                {__('+ Add Dashboard Image', 'bevision')}
                                            </Button>
                                        )}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mobile button preview */}
                <div className="mobile-button-container" style={{ display: 'block', margin: '20px 0' }}>
                    <h4>{__('Mobile Button Preview:', 'bevision')}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <TextControl
                            value={mobileButtonText}
                            onChange={(value) => setAttributes({ mobileButtonText: value })}
                            placeholder={__('Button Text', 'bevision')}
                        />
                        <URLInput
                            value={mobileButtonUrl}
                            onChange={(value) => setAttributes({ mobileButtonUrl: value })}
                            placeholder={__('Button URL', 'bevision')}
                        />
                    </div>
                    <a href="#" className="mobile-start-exploring">
                        {mobileButtonText || __('Start exploring', 'bevision')}
                    </a>
                </div>
            </div>
        </>
    );
};

export default AnalyticsHeroEdit;
