import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, Button, RangeControl, TextControl, TabPanel } from '@wordpress/components';
import './frontend.css';

registerBlockType('bevision/lead-popup', {
    title: 'Lead Popup',
    icon: 'feedback',
    category: 'design',
    attributes: {
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        borderColor: {
            type: 'string',
            default: '#e0e0e0'
        },
        buttonColor: {
            type: 'string',
            default: '#6c5ce7'
        },
        buttonTextColor: {
            type: 'string',
            default: '#ffffff'
        },
        textColor: {
            type: 'string',
            default: '#333333'
        },
        title: {
            type: 'string',
            default: 'Request a demo'
        },
        subtitle: {
            type: 'string',
            default: 'Please enter your name and number, we will contact you shortly'
        },
        nameLabel: {
            type: 'string',
            default: 'Your name'
        },
        emailLabel: {
            type: 'string',
            default: 'Email'
        },
        phoneLabel: {
            type: 'string',
            default: 'Phone number'
        },
        companyLabel: {
            type: 'string',
            default: 'Company'
        },
        buttonText: {
            type: 'string',
            default: 'Request'
        },
        cancelText: {
            type: 'string',
            default: 'Cancel'
        },
        successMessage: {
            type: 'string',
            default: 'Thank you for your submission! We will contact you shortly.'
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'bevision-lead-popup',
            style: {
                backgroundColor: attributes.backgroundColor,
                color: attributes.textColor,
                borderColor: attributes.borderColor
            }
        });

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
                                    <>
                                        <PanelBody title="Popup Text" initialOpen={true}>
                                            <TextControl
                                                label="Popup Title"
                                                value={attributes.title}
                                                onChange={(value) => setAttributes({ title: value })}
                                            />
                                            <TextControl
                                                label="Popup Subtitle"
                                                value={attributes.subtitle}
                                                onChange={(value) => setAttributes({ subtitle: value })}
                                            />
                                            <TextControl
                                                label="Name Field Label"
                                                value={attributes.nameLabel}
                                                onChange={(value) => setAttributes({ nameLabel: value })}
                                            />
                                            <TextControl
                                                label="Email Field Label"
                                                value={attributes.emailLabel}
                                                onChange={(value) => setAttributes({ emailLabel: value })}
                                            />
                                            <TextControl
                                                label="Phone Field Label"
                                                value={attributes.phoneLabel}
                                                onChange={(value) => setAttributes({ phoneLabel: value })}
                                            />
                                            <TextControl
                                                label="Company Field Label"
                                                value={attributes.companyLabel}
                                                onChange={(value) => setAttributes({ companyLabel: value })}
                                            />

                                            <TextControl
                                                label="Button Text"
                                                value={attributes.buttonText}
                                                onChange={(value) => setAttributes({ buttonText: value })}
                                            />
                                            <TextControl
                                                label="Cancel Button Text"
                                                value={attributes.cancelText}
                                                onChange={(value) => setAttributes({ cancelText: value })}
                                            />
                                            <TextControl
                                                label="Success Message"
                                                value={attributes.successMessage}
                                                onChange={(value) => setAttributes({ successMessage: value })}
                                            />
                                        </PanelBody>
                                    </>
                                );
                            } else if (tab.name === 'style') {
                                return (
                                    <>
                                        <PanelBody title="Color Settings" initialOpen={true}>
                                            <div className="components-base-control">
                                                <label className="components-base-control__label">Background Color</label>
                                                <ColorPalette
                                                    value={attributes.backgroundColor}
                                                    onChange={(color) => setAttributes({ backgroundColor: color })}
                                                />
                                            </div>
                                            <div className="components-base-control">
                                                <label className="components-base-control__label">Border Color</label>
                                                <ColorPalette
                                                    value={attributes.borderColor}
                                                    onChange={(color) => setAttributes({ borderColor: color })}
                                                />
                                            </div>
                                            <div className="components-base-control">
                                                <label className="components-base-control__label">Text Color</label>
                                                <ColorPalette
                                                    value={attributes.textColor}
                                                    onChange={(color) => setAttributes({ textColor: color })}
                                                />
                                            </div>
                                            <div className="components-base-control">
                                                <label className="components-base-control__label">Button Color</label>
                                                <ColorPalette
                                                    value={attributes.buttonColor}
                                                    onChange={(color) => setAttributes({ buttonColor: color })}
                                                />
                                            </div>
                                            <div className="components-base-control">
                                                <label className="components-base-control__label">Button Text Color</label>
                                                <ColorPalette
                                                    value={attributes.buttonTextColor}
                                                    onChange={(color) => setAttributes({ buttonTextColor: color })}
                                                />
                                            </div>
                                        </PanelBody>
                                    </>
                                );
                            }
                        }}
                    </TabPanel>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="popup-preview">
                        <h2 className="popup-title">{attributes.title}</h2>
                        <p className="popup-subtitle">{attributes.subtitle}</p>
                        
                        <div className="popup-form">
                            <div className="form-group">
                                <input type="text" placeholder={attributes.nameLabel} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder={attributes.companyLabel} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="tel" placeholder={attributes.phoneLabel} readOnly />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder={attributes.emailLabel} readOnly />
                            </div>
                            <div className="form-buttons">
                                <button 
                                    className="submit-button"
                                    style={{
                                        backgroundColor: attributes.buttonColor,
                                        color: attributes.buttonTextColor
                                    }}
                                >
                                    {attributes.buttonText}
                                </button>
                                <button className="cancel-button">
                                    {attributes.cancelText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'bevision-lead-popup-container',
        });

        return (
            <div {...blockProps}>
                <div 
                    id="bevision-lead-popup" 
                    className="bevision-lead-popup" 
                    style={{
                        backgroundColor: attributes.backgroundColor,
                        color: attributes.textColor,
                        borderColor: attributes.borderColor,
                        display: 'none'
                    }}
                >
                    <button className="popup-close">&times;</button>
                    <div className="popup-content">
                        <h2 className="popup-title">{attributes.title}</h2>
                        <p className="popup-subtitle">{attributes.subtitle}</p>
                        
                        <form id="lead-form" className="popup-form">
                            <input type="hidden" id="lead_form_nonce" name="lead_form_nonce" value="" />
                            <div className="form-group">
                                <input type="text" id="name" name="name" placeholder={attributes.nameLabel} required />
                            </div>
                            <div className="form-group">
                                <input type="text" id="company" name="company" placeholder={attributes.companyLabel} required />
                            </div>
                            <div className="form-group">
                                <input type="tel" id="phone" name="phone" placeholder={attributes.phoneLabel} required />
                            </div>
                            <div className="form-group">
                                <input type="email" id="email" name="email" placeholder={attributes.emailLabel} required />
                            </div>
                            <div className="form-buttons">
                                <button 
                                    type="submit"
                                    className="submit-button"
                                    style={{
                                        backgroundColor: attributes.buttonColor,
                                        color: attributes.buttonTextColor
                                    }}
                                >
                                    {attributes.buttonText}
                                </button>
                                <button 
                                    type="button"
                                    className="cancel-button"
                                >
                                    {attributes.cancelText}
                                </button>
                            </div>
                        </form>
                        <div id="success-message" className="success-message" style={{ display: 'none' }}>
                            {attributes.successMessage}
                        </div>
                    </div>
                </div>
                <div id="popup-overlay" className="popup-overlay" style={{ display: 'none' }}></div>
            </div>
        );
    }
});
