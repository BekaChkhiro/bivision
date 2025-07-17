import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl, MediaUpload } from '@wordpress/components';

/**
 * Inspector Component for block settings
 * 
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Set attributes function
 * @returns {JSX.Element} Inspector controls component
 */
const Inspector = ({ attributes, setAttributes }) => {
    const onSelectBackgroundImage = (media) => {
        setAttributes({
            backgroundMediaId: media.id,
            backgroundMediaUrl: media.url
        });
    };

    const onSelectBackgroundImage2 = (media) => {
        setAttributes({
            backgroundMediaId2: media.id,
            backgroundMediaUrl2: media.url
        });
    };

    return (
        <InspectorControls>
            <PanelBody title={__('Background Settings', 'bevision')}>
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{__('Top Left Background', 'bevision')}</p>
                    <MediaUpload
                        onSelect={onSelectBackgroundImage}
                        allowedTypes={['image']}
                        value={attributes.backgroundMediaId}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className="editor-post-featured-image__toggle"
                                style={{ width: '100%', marginBottom: '1rem' }}
                            >
                                {!attributes.backgroundMediaUrl ? 
                                    __('Upload Background Image', 'bevision') : 
                                    __('Replace Background Image', 'bevision')
                                }
                            </Button>
                        )}
                    />
                    {attributes.backgroundMediaUrl && (
                        <Button
                            onClick={() => setAttributes({
                                backgroundMediaId: undefined,
                                backgroundMediaUrl: undefined
                            })}
                            isDestructive
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            {__('Remove Background Image', 'bevision')}
                        </Button>
                    )}
                    <RangeControl
                        label={__('Background Size', 'bevision')}
                        value={attributes.backgroundSize}
                        onChange={(value) => setAttributes({ backgroundSize: value })}
                        min={20}
                        max={100}
                        step={5}
                    />
                </div>

                <div>
                    <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>{__('Bottom Right Background', 'bevision')}</p>
                    <MediaUpload
                        onSelect={onSelectBackgroundImage2}
                        allowedTypes={['image']}
                        value={attributes.backgroundMediaId2}
                        render={({ open }) => (
                            <Button
                                onClick={open}
                                className="editor-post-featured-image__toggle"
                                style={{ width: '100%', marginBottom: '1rem' }}
                            >
                                {!attributes.backgroundMediaUrl2 ? 
                                    __('Upload Bottom Right Image', 'bevision') : 
                                    __('Replace Bottom Right Image', 'bevision')
                                }
                            </Button>
                        )}
                    />
                    {attributes.backgroundMediaUrl2 && (
                        <Button
                            onClick={() => setAttributes({
                                backgroundMediaId2: undefined,
                                backgroundMediaUrl2: undefined
                            })}
                            isDestructive
                            style={{ width: '100%', marginBottom: '1rem' }}
                        >
                            {__('Remove Bottom Right Image', 'bevision')}
                        </Button>
                    )}
                    <RangeControl
                        label={__('Background Size', 'bevision')}
                        value={attributes.backgroundSize2}
                        onChange={(value) => setAttributes({ backgroundSize2: value })}
                        min={20}
                        max={100}
                        step={5}
                    />
                    <RangeControl
                        label={__('Background Opacity', 'bevision')}
                        value={attributes.backgroundOpacity2}
                        onChange={(value) => setAttributes({ backgroundOpacity2: value })}
                        min={0}
                        max={100}
                        step={5}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
