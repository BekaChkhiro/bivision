import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, URLInputButton } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

const blockStyle = `
    /* Mobile start exploring button */
    .mobile-start-exploring {
        display: flex;
         align-items: center;
    justify-content: center;
        width: 100%;
        padding: 15px 40px;
        height: 50px;
        background-color: #2FCA02;
        color: white;
        border-radius: 10px;
        text-decoration: none;
        font-size: 16px;
        font-weight: bold;
        margin-top: 0; /* Removed margin */
        box-shadow: 0 4px 8px rgba(47, 202, 2, 0.15);
        transition: background-color 0.3s;
       
    }
    
    /* Hide on desktop, show on mobile */
    .mobile-button-container {
        display: none;
        margin-top: 0; /* Removed margin */
        padding: 0 20px;
    }
    
    @media (max-width: 768px) {
        .mobile-button-container {
            display: block;
            margin-top: 0; /* Removed margin */
            width: 100%;
        }

        .mobile-start-exploring {
         padding: 0;
        }
    }

    .analytics-hero__container {
        margin: 60px 0 70px;
        padding: 60px !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 20px;
        overflow: hidden;
        background: linear-gradient(97deg, rgba(47, 202, 2, 0.10) 3.08%, rgba(102, 83, 198, 0.10) 96.79%);
        max-width: 100%!important;
        box-sizing: border-box;
        margin-left: auto;
        margin-right: auto;
    }

    .analytics-hero__content {
        flex: 0 0 50%;
    }

    .analytics-hero__subtitle {
        color: var(--Malina, #2FCA02);
        font-size: 18px;
        font-style: normal;
        font-family: 'medium';
        font-weight: 750;
        line-height: normal;
        margin: 0 0 10px;
    }
    
    .analytics-hero__main-title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 40px;
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0 0 20px; 
    }

    .analytics-hero__title {
        color: var(--Dark-Blue, #221A4C);
        font-size: 40px;
        font-family: 'medium';
        font-style: normal;
        font-weight: 750;
        line-height: normal;
        margin: 0 0 20px;
    }

    .analytics-hero__description {
        color: var(--Grey, #8399AF);
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 0 0 57px;
    }

    /* Desktop CTA button */
    .analytics-hero__content .wp-block-button,
    .analytics-hero__cta .wp-block-button {
        margin-bottom: 0;
        display: inline-block;
        width: auto;
    }
    
    .analytics-hero__button .wp-element-button,
    .analytics-hero__content .wp-element-button {
        background-color: #2FCA02 !important;
        color: #fff !important;
        padding: 0px 40px !important;
        font-family: 'bold';
        font-size: 16px !important;
        font-style: normal !important;
        font-weight: 700 !important;
        line-height: normal !important;
        border: none !important;
        border-radius: 10px !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 50px !important;
        text-decoration: none !important;
        width: auto !important;
        min-width: auto !important;
    }
    
    /* Hide mobile CTA on desktop */
    .analytics-hero__cta-mobile {
        display: none;
    }
    
    /* Mobile button styles */
    .analytics-hero__mobile-button {
        display: none;
        width: 100%;
        padding: 15px 40px;
        height: 50px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        background: var(--Malina, #2FCA02);
        color: white;
        text-decoration: none;
        border: none;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        margin-top: 0; /* Removed margin */
    }
    
    /* Make sure inner blocks content is visible */
    .analytics-hero__cta-mobile .wp-block-button {
        display: block;
        width: 100%;
    }

    .analytics-hero__button.wp-element-button:hover {
        transform: translateY(-2px);
        background: #29b502 !important;
        color: white !important;
    }

    .analytics-hero__image {
        flex: 0 0 40%;
    }

    .analytics-hero__image img {
        width: 100%;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .analytics-hero__image-button {
        width: 100%;
        height: 300px;
        background: rgba(255, 255, 255, 0.1);
        border: 2px dashed rgba(255, 255, 255, 0.3);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .analytics-hero__image-button:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
    }
    
    .analytics-hero__image-controls {
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    .analytics-hero__image-container:hover .analytics-hero__image-controls {
        opacity: 1;
    }
    
    .analytics-hero__image-controls .components-button {
        padding: 4px 8px !important;
        font-size: 12px !important;
        line-height: 1.2 !important;
        min-height: auto !important;
        border-radius: 3px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    }
    
    /* Dashboard admin UI styles */
    .analytics-hero__mobile-dashboards {
        margin-top: 30px;
        border-top: 1px solid #e0e0e0;
        padding-top: 20px;
    }
    
    .analytics-hero__dashboard-title {
        margin-bottom: 15px;
        font-size: 16px;
        color: #333;
    }
    
    .analytics-hero__dashboard-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    
    .analytics-hero__dashboard-item {
        position: relative;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
    }
    
    .analytics-hero__dashboard-item img {
        width: 100%;
        height: auto;
        display: block;
    }
    
    .analytics-hero__dashboard-remove {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(255, 0, 0, 0.7) !important;
        color: white !important;
        border: none !important;
        border-radius: 3px !important;
        padding: 2px 8px !important;
        font-size: 11px !important;
    }
    
    .analytics-hero__dashboard-add {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8f8f8 !important;
        border: 1px dashed #ccc !important;
        color: #555 !important;
        font-size: 14px !important;
    }
    
    /* Frontend mobile dashboard grid */
    .analytics-hero__mobile-dashboard-grid {
        display: none;
    }
    
    /* Hide the desktop CTA in mobile view */
    .analytics-hero__cta {
        display: block;
    }

    .analytics-hero__container {
        max-width: 1250px!important;
    }

    @media (max-width: 768px) {
        .analytics-hero {
            padding: 60px 20px;
            width: auto!important;
        }

        
        
        .analytics-hero__container {
            flex-direction: column;
            text-align: left;
            padding: 20px !important;
            margin: 0px auto; /* Changed to auto for centering */
            border-radius: 20px; /* Added border-radius as requested */
            gap: 0px;
            background: linear-gradient(97deg, rgba(47, 202, 2, 0.10) 3.08%, rgba(102, 83, 198, 0.10) 96.79%);
            position: relative; /* For absolute positioning of mobile CTA */
            width: 100%;
            max-width: 100%!important;
            box-sizing: border-box;
        }

        .analytics-hero__content {
            flex: 0 0 100%;
            padding: 0;
        }

        .analytics-hero__subtitle {
            font-size: 20px !important;
            margin-bottom: 8px;
            display: block;
        }

        .analytics-hero__title {
            font-size: 28px !important;
            line-height: 1.2;
            margin-bottom: 20px;
            color: #221A4C;
            font-weight: 750;
        }

        .analytics-hero__description {
            font-family: 'roman';
            font-size: 16px;
           line-height: normal;
            margin-bottom: 40px;
            color: #8399AF;
            font-weight: 400;
        }

        /* Style the image container for mobile */
        .analytics-hero__image {
            flex: 0 0 100%;
            padding: 0;
            margin-top: 0px;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Style the image display for mobile */
        .analytics-hero__desktop-img {
            width: 100%;
            height: auto;
            margin: 0 0 20px;
            border-radius: 10px;
            display: block;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        /* Hide the mobile dashboard grid since we're using main image */
        .analytics-hero__mobile-dashboard-grid {
            display: none;
        }
        
        /* Hide the desktop CTA in mobile view */
        .analytics-hero__cta {
            display: none;
        }


        
        .analytics-hero__cta-mobile .wp-block-button {
            width: 100%;
        }
        
        .analytics-hero__cta-mobile .wp-element-button {
            width: 100%;
            display: block;
            padding: 15px 40px !important;
            height: 50px;
            text-align: center;
            border-radius: 10px !important;
            background: var(--Malina, #2FCA02) !important;
            color: white !important;
            font-size: 16px !important;
            font-weight: bold !important;
            text-transform: none !important;
            box-shadow: 0 4px 10px rgba(47, 202, 2, 0.2) !important;
        }
    }
`;

registerBlockType('bevision/analytics-hero', {
    title: __('Analytics Hero', 'bevision'),
    description: __('Analytics Hero section with dashboard mockups', 'bevision'),
    category: 'bevision',
    icon: 'chart-line',
    supports: {
        className: false
    },
    attributes: {
        subtitle: {
            type: 'string',
            default: ''
        },
        mainTitle: {
            type: 'string',
            default: ''
        },
        title: {
            type: 'string',
            default: ''
        },
        description: {
            type: 'string',
            default: ''
        },
        imageUrl: {
            type: 'string',
            default: ''
        },
        imageId: {
            type: 'number',
            default: 0
        },
        buttonUrl: {
            type: 'string',
            default: ''
        },
        buttonText: {
            type: 'string',
            default: 'Start exploring'
        },
        dashboardImages: {
            type: 'array',
            default: []
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { subtitle, mainTitle, title, description, imageUrl, imageId, buttonUrl, buttonText, dashboardImages } = attributes;

        return (
            <div>
                <style>{blockStyle}</style>
                <div 
                    className="analytics-hero__container"
                    style={{
                        padding: '60px',
                        '@media (max-width: 1024px)': {
                            padding: '40px'
                        },
                        '@media (max-width: 768px)': {
                            padding: '20px'
                        }
                    }}
                >
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
                            <div className="analytics-hero__button-wrapper" style={{display: 'inline-block', width: 'auto'}}>
                                <a 
                                    href="#" 
                                    onClick={(e) => e.preventDefault()}
                                    className="analytics-hero__button wp-element-button"
                                    style={{display: 'inline-flex', width: 'auto'}}
                                >
                                    {buttonText}
                                </a>
                            </div>
                            <div className="analytics-hero__button-url-control">
                                <TextControl
                                    label={__('Button URL', 'bevision')}
                                    value={buttonUrl}
                                    onChange={(buttonUrl) => setAttributes({ buttonUrl })}
                                    placeholder={__('Enter URL for button', 'bevision')}
                                />
                                <TextControl
                                    label={__('Button Text', 'bevision')}
                                    value={buttonText}
                                    onChange={(buttonText) => setAttributes({ buttonText })}
                                    placeholder={__('Enter button text', 'bevision')}
                                />
                            </div>
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
                                value={attributes.imageId}
                                render={({ open }) => (
                                    imageUrl ? (
                                        <div className="analytics-hero__image-container" style={{ position: 'relative' }}>
                                            <img
                                                src={imageUrl}
                                                onClick={open}
                                                style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
                                                alt={__('Hero image', 'bevision')}
                                            />
                                            <div className="analytics-hero__image-controls" style={{ 
                                                position: 'absolute', 
                                                top: '10px', 
                                                right: '10px', 
                                                display: 'flex', 
                                                gap: '5px' 
                                            }}>
                                                <Button
                                                    onClick={open}
                                                    variant="secondary"
                                                    isSmall
                                                    style={{ 
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#333'
                                                    }}
                                                >
                                                    {__('Replace', 'bevision')}
                                                </Button>
                                                <Button
                                                    onClick={() => setAttributes({ imageUrl: '', imageId: 0 })}
                                                    variant="secondary"
                                                    isDestructive
                                                    isSmall
                                                    style={{ 
                                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                        color: '#dc3545'
                                                    }}
                                                >
                                                    {__('Remove', 'bevision')}
                                                </Button>
                                            </div>
                                        </div>
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
                        
                        {/* Mobile dashboard images */}
                        <div className="analytics-hero__mobile-dashboards">
                            <h4 className="analytics-hero__dashboard-title">{__('Mobile Dashboard Images (up to 6)', 'bevision')}</h4>
                            <div className="analytics-hero__dashboard-grid">
                                {dashboardImages.map((image, index) => (
                                    <div key={index} className="analytics-hero__dashboard-item">
                                        <img 
                                            src={image.url} 
                                            alt={__('Dashboard', 'bevision')} 
                                        />
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
                                    </div>
                                ))}
                                
                                {dashboardImages.length < 6 && (
                                    <MediaUpload
                                        onSelect={(media) => {
                                            const newImage = {
                                                id: media.id,
                                                url: media.url
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
            </div>
        );
    },
    save: ({ attributes }) => {
        const { subtitle, mainTitle, title, description, imageUrl, buttonUrl, buttonText, dashboardImages } = attributes;

        return (
            <div>
                <style>{blockStyle}</style>
                <div 
                    className="analytics-hero__container"
                    style={{
                        padding: '60px',
                        '@media (max-width: 1024px)': {
                            padding: '40px'
                        },
                        '@media (max-width: 768px)': {
                            padding: '20px'
                        }
                    }}
                >
                    <div className="analytics-hero__content">
                        <RichText.Content
                            tagName="h3"
                            className="analytics-hero__subtitle"
                            value={subtitle}
                        />
                        <RichText.Content
                            tagName="h1"
                            className="analytics-hero__main-title"
                            value={mainTitle}
                        />
                        <RichText.Content
                            tagName="h2"
                            className="analytics-hero__title"
                            value={title}
                        />
                        <RichText.Content
                            tagName="p"
                            className="analytics-hero__description"
                            value={description}
                        />
                        <div className="analytics-hero__cta">
                            <div className="analytics-hero__button-wrapper" style={{display: 'inline-block', width: 'auto'}}>
                                <a 
                                    href={buttonUrl || '#'} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="analytics-hero__button wp-element-button"
                                    style={{display: 'inline-flex', width: 'auto'}}
                                >
                                    {buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="analytics-hero__image">
                        {/* Desktop image */}
                        {imageUrl && (
                            <img
                                className="analytics-hero__desktop-img"
                                src={imageUrl}
                                alt={__('Hero image', 'bevision')}
                            />
                        )}
                        
                        {/* Mobile dashboard images */}
                        {dashboardImages && dashboardImages.length > 0 && (
                            <div className="analytics-hero__mobile-dashboard-grid">
                                {dashboardImages.map((image, index) => (
                                    <div key={index} className="analytics-hero__dashboard-item">
                                        <img 
                                            src={image.url} 
                                            alt={__('Dashboard', 'bevision')} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Mobile-only button for smaller screens */}
                    <div className="mobile-button-container">
                        <a 
                            href={buttonUrl || '#'} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mobile-start-exploring"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});
