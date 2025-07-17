import { Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

export default function PartnerLogo({ logo, index, removeImage, isEditor = false }) {
    const [imageDimensions, setImageDimensions] = useState(null);
    const [isCorrectSize, setIsCorrectSize] = useState(true);

    useEffect(() => {
        if (isEditor && logo.url) {
            // If we already have size info from the logo object, use it
            if (logo.width && logo.height) {
                setImageDimensions({ width: logo.width, height: logo.height });
                setIsCorrectSize(logo.isCorrectSize);
            } else {
                // Otherwise, load the image to get dimensions
                const img = new Image();
                img.onload = () => {
                    const dimensions = { width: img.width, height: img.height };
                    const correctSize = img.width === 160 && img.height === 40;
                    setImageDimensions(dimensions);
                    setIsCorrectSize(correctSize);
                };
                img.src = logo.url;
            }
        }
    }, [logo.url, logo.width, logo.height, logo.isCorrectSize, isEditor]);

    if (isEditor) {
        return (
            <div className="partner-logo-container relative" style={{
                width: '170px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px'
            }}>
                <img 
                    className="partner-logo min-h-[50px] md:min-h-[60px] h-auto w-auto object-contain grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
                    src={logo.url} 
                    alt={logo.alt}
                />
                
                {/* Warning icon for incorrect size */}
                {imageDimensions && !isCorrectSize && (
                    <div 
                        className="absolute top-1 left-1 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                        title={`Image size: ${imageDimensions.width}x${imageDimensions.height}. Recommended: 160x40`}
                        style={{
                            backgroundColor: '#f59e0b',
                            fontSize: '12px',
                            cursor: 'help'
                        }}
                    >
                        ⚠
                    </div>
                )}
                
                <Button 
                    className="remove-logo-button absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => removeImage(index)}
                >
                    ×
                </Button>
            </div>
        );
    } else {
        return (
            <div className="partner-logo-container" style={{
                width: '150px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                margin: '0 10px',
                textAlign: 'center'
            }}>
                <img 
                    className="partner-logo min-h-[50px] md:min-h-[60px] h-auto w-auto object-contain grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
                    src={logo.url} 
                    alt={logo.alt}
                />
            </div>
        );
    }
}