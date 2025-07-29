import { useBlockProps, RichText, InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, Button, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import { registerCustomBlock } from '../../../utils/block-utils';
import './footer.css';

// SVG paths - using assets directory paths
const PhoneIcon = '/wp-content/themes/BeVision/assets/images/phone.svg';
const MailIcon = '/wp-content/themes/BeVision/assets/images/mail.svg';
const MapIcon = '/wp-content/themes/BeVision/assets/images/map.svg';
const FacebookIcon = '/wp-content/themes/BeVision/assets/images/facebook.svg';
const LinkedinIcon = '/wp-content/themes/BeVision/assets/images/linkedin.svg';

const settings = {
    title: 'Footer Section',
    icon: 'align-wide',
    attributes: {
        backgroundColor: {
            type: 'string',
            default: '#E6E8EC'
        },
        textColor: {
            type: 'string',
            default: '#666666'
        },
        iconColor: {
            type: 'string',
            default: '#6653C6'
        },
        logo: {
            type: 'string',
            default: ''
        },
        logoHeight: {
            type: 'number',
            default: 30
        },
        phone: {
            type: 'string',
            default: '(+995) 32 2 30 60 10'
        },
        email: {
            type: 'string',
            default: 'info@bivision.ge'
        },
        address: {
            type: 'string',
            default: '40 Juli shartava street, Tbilisi, Georgia (0160)'
        },
        facebookUrl: {
            type: 'string',
            default: 'https://www.facebook.com/bivision.ge/'
        },
        linkedinUrl: {
            type: 'string',
            default: 'https://www.linkedin.com/company/bivisionge'
        },
        showSocialIcons: {
            type: 'boolean',
            default: true
        },
        copyright: {
            type: 'string',
            default: 'BIVISION 2023'
        },
        privacyPolicy: {
            type: 'string',
            default: 'Privacy policy'
        },
        privacyPolicyUrl: {
            type: 'string',
            default: '/privacy-policy'
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const { backgroundColor, textColor, iconColor, logo, logoHeight, phone, email, address, facebookUrl, linkedinUrl, showSocialIcons, copyright, privacyPolicy, privacyPolicyUrl } = attributes;
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="General Settings" initialOpen={true}>
                        <div>
                            <p>Background Color</p>
                            <ColorPalette
                                value={backgroundColor}
                                onChange={(color) => setAttributes({ backgroundColor: color })}
                            />
                        </div>
                        <div>
                            <p>Text Color</p>
                            <ColorPalette
                                value={textColor}
                                onChange={(color) => setAttributes({ textColor: color })}
                            />
                        </div>
                        <div>
                            <p>Icon Color</p>
                            <ColorPalette
                                value={iconColor}
                                onChange={(color) => setAttributes({ iconColor: color })}
                            />
                        </div>
                        <RangeControl
                            label="Logo Height"
                            value={logoHeight}
                            onChange={(value) => setAttributes({ logoHeight: value })}
                            min={20}
                            max={100}
                        />
                        <MediaUpload
                            onSelect={(media) => setAttributes({ logo: media.url })}
                            type="image"
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {logo ? 'Change Logo' : 'Upload Logo'}
                                </Button>
                            )}
                        />
                    </PanelBody>
                    <PanelBody title="Contact Information" initialOpen={false}>
                        <TextControl
                            label="Phone Number"
                            value={phone}
                            onChange={(value) => setAttributes({ phone: value })}
                        />
                        <TextControl
                            label="Email"
                            value={email}
                            onChange={(value) => setAttributes({ email: value })}
                        />
                        <TextControl
                            label="Address"
                            value={address}
                            onChange={(value) => setAttributes({ address: value })}
                        />
                    </PanelBody>
                    <PanelBody title="Social Media" initialOpen={false}>
                        <TextControl
                            label="Facebook URL"
                            value={facebookUrl}
                            onChange={(value) => setAttributes({ facebookUrl: value })}
                        />
                        <TextControl
                            label="LinkedIn URL"
                            value={linkedinUrl}
                            onChange={(value) => setAttributes({ linkedinUrl: value })}
                        />
                        <ToggleControl
                            label="Show Social Icons"
                            checked={showSocialIcons}
                            onChange={(value) => setAttributes({ showSocialIcons: value })}
                        />
                    </PanelBody>
                    <PanelBody title="Footer Text" initialOpen={false}>
                        <TextControl
                            label="Copyright Text"
                            value={copyright}
                            onChange={(value) => setAttributes({ copyright: value })}
                        />
                        <TextControl
                            label="Privacy Policy Text"
                            value={privacyPolicy}
                            onChange={(value) => setAttributes({ privacyPolicy: value })}
                        />
                        <TextControl
                            label="Privacy Policy URL"
                            value={privacyPolicyUrl}
                            onChange={(value) => setAttributes({ privacyPolicyUrl: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <footer style={{ backgroundColor: backgroundColor, paddingTop: '0', paddingBottom: '0' }}>
                    <div className="footer-content" style={{ 
                        maxWidth: '1250px',
                        margin: '0 auto',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'nowrap',
                            gap: '30px'
                        }}>
                            {/* 1. Logo */}
                            <div className="footer-logo">
                                {logo && (
                                    <img 
                                        src={logo} 
                                        alt="B'VISION"
                                        style={{ height: logoHeight + 'px', width: 'auto' }}
                                    />
                                )}
                            </div>
                            
                            {/* 2. Desktop Contact Container (Phone & Email) */}
                            <div className="footer-contact-desktop">
                                {/* Phone contact */}
                                <div className="footer-contact-phone" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: textColor,
                                    gap: '8px'
                                }}>
                                    <img src={PhoneIcon} alt="Phone" style={{ minWidth: '14px', width: '18px', height: '18px', }} />
                                    <RichText
                                        tagName="span"
                                        value={phone}
                                        onChange={(value) => setAttributes({ phone: value })}
                                        style={{ color: textColor }}
                                    />
                                </div>
                                
                                {/* Email contact */}
                                <div className="footer-contact-email" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: textColor,
                                    gap: '8px'
                                }}>
                                    <img src={MailIcon} alt="Mail" style={{ minWidth: '14px', width: '16px', height: '12px' }} />
                                    <RichText
                                        tagName="span"
                                        value={email}
                                        onChange={(value) => setAttributes({ email: value })}
                                        style={{ color: textColor }}
                                    />
                                </div>
                            </div>
                            
                            {/* 4. Address */}
                            <div className="footer-address" style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <img src={MapIcon} alt="Map" style={{ minWidth: '14px', width: '15px', height: '18px' }} />
                                <RichText
                                    tagName="span"
                                    value={address}
                                    onChange={(value) => setAttributes({ address: value })}
                                    style={{ 
                                        color: textColor,
                                        lineHeight: '25px'
                                    }}
                                />
                            </div>
                            
                            {/* Mobile Contact Elements (Hidden on Desktop) */}
                            {/* Mobile Phone contact */}
                            <div className="footer-contact-phone-mobile" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <img src={PhoneIcon} alt="Phone" style={{ minWidth: '14px', width: '18px', height: '18px' }} />
                                <RichText
                                    tagName="span"
                                    value={phone}
                                    onChange={(value) => setAttributes({ phone: value })}
                                    style={{ color: textColor }}
                                />
                            </div>
                            
                            {/* Mobile Email contact */}
                            <div className="footer-contact-email-mobile" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '14px' }}>
                                    <path d="M13.1365 0.340332H1.88647C1.38936 0.340828 0.912752 0.525362 0.561237 0.853443C0.209721 1.18152 0.0120064 1.62636 0.0114746 2.09033V9.59033C0.0120064 10.0543 0.209721 10.4991 0.561237 10.8272C0.912752 11.1553 1.38936 11.3398 1.88647 11.3403H13.1365C13.6336 11.3398 14.1102 11.1553 14.4617 10.8272C14.8132 10.4991 15.0109 10.0543 15.0115 9.59033V2.09033C15.0109 1.62636 14.8132 1.18152 14.4617 0.853443C14.1102 0.525362 13.6336 0.340828 13.1365 0.340332ZM12.6617 3.23502L7.84027 6.73502C7.74625 6.80324 7.63056 6.84027 7.51147 6.84027C7.39239 6.84027 7.2767 6.80324 7.18268 6.73502L2.36125 3.23502C2.3046 3.19509 2.25702 3.14506 2.22127 3.08782C2.18553 3.03058 2.16232 2.96728 2.15301 2.9016C2.1437 2.83592 2.14846 2.76917 2.16703 2.70522C2.1856 2.64128 2.2176 2.58141 2.26117 2.52911C2.30474 2.4768 2.35902 2.4331 2.42084 2.40055C2.48267 2.36799 2.55081 2.34723 2.6213 2.33946C2.6918 2.33169 2.76324 2.33708 2.83149 2.35531C2.89974 2.37354 2.96342 2.40425 3.01884 2.44564L7.51147 5.70689L12.0041 2.44564C12.1164 2.36646 12.2577 2.33174 12.3972 2.34897C12.5368 2.36621 12.6635 2.43402 12.7499 2.53775C12.8363 2.64147 12.8755 2.77277 12.859 2.90326C12.8425 3.03374 12.7716 3.15292 12.6617 3.23502Z" fill={iconColor}/>
                                </svg>
                                <RichText
                                    tagName="span"
                                    value={email}
                                    onChange={(value) => setAttributes({ email: value })}
                                    style={{ color: textColor }}
                                />
                            </div>
                            
                            {/* 5. Social media icons */}
                            {showSocialIcons && (
                                <div className="footer-social" style={{ display: 'flex', gap: '12px' }}>
                                    {facebookUrl && (
                                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{ 
                                            width: '31px',
                                            height: '31px',
                                            opacity: 1,
                                            transition: 'opacity 0.3s'
                                        }}>
                                            <img src={FacebookIcon} alt="Facebook" style={{ width: '31px', height: '31px' }} />
                                        </a>
                                    )}
                                    {linkedinUrl && (
                                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ 
                                            width: '31px',
                                            height: '31px',
                                            opacity: 1,
                                            transition: 'opacity 0.3s'
                                        }}>
                                            <img src={LinkedinIcon} alt="LinkedIn" style={{ width: '31px', height: '31px' }} />
                                        </a>
                                    )}
                                </div>
                            )}
                            
                            {/* 6. Desktop Legal Container (Copyright & Privacy Policy) */}
                            <div className="footer-legal-desktop">
                                {/* Copyright */}
                                <div style={{ color: '#6653C6', fontSize: '14px' }}>
                                    © <RichText
                                        tagName="span"
                                        value={copyright}
                                        onChange={(value) => setAttributes({ copyright: value })}
                                        style={{ color: '#6653C6' }}
                                    />
                                </div>
                                
                                {/* Privacy Policy */}
                                <div style={{ color: '#6653C6', fontSize: '16px', fontWeight: '400' }}>
                                    <RichText
                                        tagName="span"
                                        value={privacyPolicy}
                                        onChange={(value) => setAttributes({ privacyPolicy: value })}
                                        style={{ color: '#6653C6' }}
                                    />
                                </div>
                            </div>
                            
                            {/* 7. Copyright (Mobile) */}
                            <div className="footer-copyright" style={{ color: '#6653C6', fontSize: '16px', fontWeight: '400' }}>
                                © <RichText
                                    tagName="span"
                                    value={copyright}
                                    onChange={(value) => setAttributes({ copyright: value })}
                                    style={{ color: '#6653C6' }}
                                />
                            </div>
                            
                            {/* 8. Privacy Policy (Mobile) */}
                            <div className="footer-privacy" style={{ color: '#6653C6', fontSize: '14px' }}>
                                <RichText
                                    tagName="span"
                                    value={privacyPolicy}
                                    onChange={(value) => setAttributes({ privacyPolicy: value })}
                                    style={{ color: '#6653C6' }}
                                />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    },
    save: ({ attributes }) => {
        const { backgroundColor, textColor, iconColor, logo, logoHeight, phone, email, address, facebookUrl, linkedinUrl, showSocialIcons, copyright, privacyPolicy, privacyPolicyUrl } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <footer style={{ backgroundColor: backgroundColor, paddingTop: '0', paddingBottom: '0' }}>
                    <div className="footer-content" style={{ 
                        maxWidth: '1250px',
                        margin: '0 auto',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'nowrap',
                            padding: '60px 0px',
                            gap: '30px'
                        }}>
                            {/* 1. Logo */}
                            <div className="footer-logo">
                                {logo && (
                                    <img 
                                        src={logo} 
                                        alt="B'VISION"
                                        style={{ height: logoHeight + 'px', width: 'auto' }}
                                    />
                                )}
                            </div>
                            
                            {/* 2. Desktop Contact Container (Phone & Email) */}
                            <div className="footer-contact-desktop">
                                {/* Phone contact */}
                                <div className="footer-contact-phone" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: textColor,
                                    gap: '8px'
                                }}>
                                    <img src={PhoneIcon} alt="Phone" style={{ minWidth: '14px', width: '18px', height: '18px' }} />
                                    <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: 'inherit', fontSize: '16px', fontWeight: '400' }}>
                                        <RichText.Content value={phone} />
                                    </a>
                                </div>
                                
                                {/* Email contact */}
                                <div className="footer-contact-email" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: textColor,
                                    gap: '8px'
                                }}>
                                    <img src={MailIcon} alt="Mail" style={{ minWidth: '14px', width: '16px', height: '12px' }} />
                                    <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit', fontSize: '16px', fontWeight: '400'}}>
                                        <RichText.Content value={email} />
                                    </a>
                                </div>
                            </div>
                            
                            {/* 3. Address */}
                            <div className="footer-address" style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <img src={MapIcon} alt="Map" style={{ minWidth: '14px', width: '15px', height: '18px' }} />
                                <a href="https://www.google.com/maps/search/?api=1&query=40+Juli+shartava+street+Tbilisi+Georgia" target="_blank" rel="noopener noreferrer" style={{ 
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                    lineHeight: '25px',
                                    fontSize: '16px',
                                    fontWeight: '400'
                                }}>
                                    <RichText.Content value={address} />
                                </a>
                            </div>
                            
                            {/* Mobile Contact Elements (Hidden on Desktop) */}
                            {/* Mobile Phone contact */}
                            <div className="footer-contact-phone-mobile" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <img src={PhoneIcon} alt="Phone" style={{ minWidth: '14px', width: '18px', height: '18px' }} />
                                <a href={`tel:${phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <RichText.Content value={phone} />
                                </a>
                            </div>
                            
                            {/* Mobile Email contact */}
                            <div className="footer-contact-email-mobile" style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: textColor,
                                gap: '8px'
                            }}>
                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ minWidth: '14px' }}>
                                    <path d="M13.1365 0.340332H1.88647C1.38936 0.340828 0.912752 0.525362 0.561237 0.853443C0.209721 1.18152 0.0120064 1.62636 0.0114746 2.09033V9.59033C0.0120064 10.0543 0.209721 10.4991 0.561237 10.8272C0.912752 11.1553 1.38936 11.3398 1.88647 11.3403H13.1365C13.6336 11.3398 14.1102 11.1553 14.4617 10.8272C14.8132 10.4991 15.0109 10.0543 15.0115 9.59033V2.09033C15.0109 1.62636 14.8132 1.18152 14.4617 0.853443C14.1102 0.525362 13.6336 0.340828 13.1365 0.340332ZM12.6617 3.23502L7.84027 6.73502C7.74625 6.80324 7.63056 6.84027 7.51147 6.84027C7.39239 6.84027 7.2767 6.80324 7.18268 6.73502L2.36125 3.23502C2.3046 3.19509 2.25702 3.14506 2.22127 3.08782C2.18553 3.03058 2.16232 2.96728 2.15301 2.9016C2.1437 2.83592 2.14846 2.76917 2.16703 2.70522C2.1856 2.64128 2.2176 2.58141 2.26117 2.52911C2.30474 2.4768 2.35902 2.4331 2.42084 2.40055C2.48267 2.36799 2.55081 2.34723 2.6213 2.33946C2.6918 2.33169 2.76324 2.33708 2.83149 2.35531C2.89974 2.37354 2.96342 2.40425 3.01884 2.44564L7.51147 5.70689L12.0041 2.44564C12.1164 2.36646 12.2577 2.33174 12.3972 2.34897C12.5368 2.36621 12.6635 2.43402 12.7499 2.53775C12.8363 2.64147 12.8755 2.77277 12.859 2.90326C12.8425 3.03374 12.7716 3.15292 12.6617 3.23502Z" fill={iconColor}/>
                                </svg>
                                <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <RichText.Content value={email} />
                                </a>
                            </div>
                            
                            {/* 5. Social media icons */}
                            {showSocialIcons && (
                                <div className="footer-social" style={{ display: 'flex', gap: '12px' }}>
                                    {facebookUrl && (
                                        <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{ 
                                            width: '31px',
                                            height: '31px',
                                            opacity: 1,
                                            transition: 'opacity 0.3s'
                                        }}>
                                            <img src={FacebookIcon} alt="Facebook" style={{ width: '31px', height: '31px' }} />
                                        </a>
                                    )}
                                    {linkedinUrl && (
                                        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ 
                                            width: '31px',
                                            height: '31px',
                                            opacity: 1,
                                            transition: 'opacity 0.3s'
                                        }}>
                                            <img src={LinkedinIcon} alt="LinkedIn" style={{ width: '31px', height: '31px' }} />
                                        </a>
                                    )}
                                </div>
                            )}
                            
                            {/* 6. Desktop Legal Container (Copyright & Privacy Policy) */}
                            <div className="footer-legal-desktop">
                                {/* Copyright */}
                                <div style={{ color: '#6653C6', fontSize: '14px' }}>
                                    © <RichText.Content value={copyright} />
                                </div>
                                
                                {/* Privacy Policy */}
                                <div style={{ color: '#6653C6', fontSize: '14px' }}>
                                    <a href={privacyPolicyUrl} style={{ 
                                        color: '#6653C6',
                                        textDecoration: 'none',
                                        fontSize: '14px'
                                    }}>
                                        <RichText.Content value={privacyPolicy} />
                                    </a>
                                </div>
                            </div>
                            
                            {/* 7. Copyright (Mobile) */}
                            <div className="footer-copyright" style={{ color: '#6653C6', fontSize: '14px' }}>
                                © <RichText.Content value={copyright} />
                            </div>
                            
                            {/* 8. Privacy Policy (Mobile) */}
                            <div className="footer-privacy" style={{ color: '#6653C6', fontSize: '14px' }}>
                                <a href={privacyPolicyUrl} style={{ 
                                    color: '#6653C6',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}>
                                    <RichText.Content value={privacyPolicy} />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
};

registerCustomBlock('footer-section', settings);
