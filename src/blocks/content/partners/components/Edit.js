import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import PartnerLogo from './PartnerLogo';
import TitleSection from './TitleSection';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();

    const onSelectImage = (image) => {
        // Create an Image object to get actual dimensions
        const img = new Image();
        img.onload = () => {
            const isCorrectSize = img.width === 160 && img.height === 40;
            setAttributes({
                logos: [...attributes.logos, {
                    id: image.id,
                    url: image.url,
                    alt: image.alt || '',
                    className: "partner-logo",
                    width: img.width,
                    height: img.height,
                    isCorrectSize: isCorrectSize
                }]
            });
        };
        img.src = image.url;
    };

    const removeImage = (index) => {
        const newLogos = [...attributes.logos];
        newLogos.splice(index, 1);
        setAttributes({ logos: newLogos });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Title Link Settings">
                    <TextControl
                        label="Title Part 1 Link URL"
                        value={attributes.titlePart1Link}
                        onChange={(value) => setAttributes({ titlePart1Link: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div 
                    className="partners-section partners-block"
                    style={{ 
                        maxWidth: '1250px',
                        margin: '0 auto',
                        marginTop: '60px',
                        paddingTop: '60px'
                    }}
                >
                        <TitleSection 
                            titlePart1={attributes.titlePart1}
                            titlePart1Link={attributes.titlePart1Link}
                            titlePart2={attributes.titlePart2}
                            subtitle={attributes.subtitle}
                            setAttributes={setAttributes}
                        />
                        
                        {/* Logo Recommendation Notice */}
                        <div style={{
                            backgroundColor: '#f0f6ff',
                            border: '1px solid #3b82f6',
                            borderRadius: '8px',
                            padding: '16px',
                            margin: '20px 0',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                color: '#1d4ed8',
                                fontSize: '16px',
                                fontWeight: '600',
                                marginBottom: '8px'
                            }}>
                                📝 ლოგოს ზომის რეკომენდაცია
                            </div>
                            <p style={{
                                color: '#374151',
                                fontSize: '14px',
                                margin: '0',
                                lineHeight: '1.5'
                            }}>
                                ლოგოს რეკომენდირებული ზომა 160X40 ზე. ასევე ლოგოს ბექგრაუნდი უნდა იყოს გამჭირვალე ( transparent ).
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-5 mb-6">
                            {attributes.logos.map((logo, index) => (
                                <PartnerLogo 
                                    key={index}
                                    logo={logo}
                                    index={index}
                                    removeImage={removeImage}
                                    isEditor={true}
                                />
                            ))}
                            
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    allowedTypes={['image']}
                                    render={({ open }) => (
                                        <Button 
                                            onClick={open}
                                            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 w-[150px] h-[80px]"
                                        >
                                            Add Logo
                                        </Button>
                                    )}
                                />
                            </MediaUploadCheck>
                        </div>
                </div>
            </div>
        </>
    );
}