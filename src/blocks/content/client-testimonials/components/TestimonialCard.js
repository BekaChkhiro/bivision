import { __ } from '@wordpress/i18n';
import { RichText, MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import styles from './styles';

const TestimonialCard = ({ testimonial, index, updateTestimonial, removeTestimonial, duplicateTestimonial }) => {
    return (
        <div key={index} style={styles.testimonialCard}>
            <div style={styles.controls}>
                <button 
                    onClick={() => removeTestimonial(index)}
                    style={styles.actionButton}
                    title="Remove"
                >
                    ✕
                </button>
                <button 
                    onClick={() => duplicateTestimonial(index)}
                    style={styles.actionButton}
                    title="Duplicate"
                >
                    ⎘
                </button>
            </div>
            <div style={styles.logoContainer}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => updateTestimonial(index, 'companyLogo', media.url)}
                        type="image"
                        render={({ open }) => (
                            <Button onClick={open}>
                                {testimonial.companyLogo ? (
                                    <img src={testimonial.companyLogo} alt="" style={styles.companyLogo} />
                                ) : (
                                    'Upload Company Logo'
                                )}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            </div>
            <RichText
                tagName="p"
                style={styles.content}
                value={testimonial.content}
                onChange={(content) => updateTestimonial(index, 'content', content)}
                placeholder={__('Enter testimonial content', 'bevision')}
                allowedFormats={['core/bold', 'core/italic']}
            />
            <div style={styles.author}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => updateTestimonial(index, 'authorImage', media.url)}
                        type="image"
                        render={({ open }) => (
                            <Button onClick={open}>
                                {testimonial.authorImage ? (
                                    <img src={testimonial.authorImage} alt="" style={styles.authorImage} />
                                ) : (
                                    'Upload Author Image'
                                )}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                <div style={styles.authorInfo}>
                    <RichText
                        tagName="h4"
                        style={styles.authorName}
                        value={testimonial.authorName}
                        onChange={(name) => updateTestimonial(index, 'authorName', name)}
                        placeholder={__('Author Name', 'bevision')}
                    />
                    <RichText
                        tagName="p"
                        style={styles.authorPosition}
                        value={testimonial.authorPosition}
                        onChange={(position) => updateTestimonial(index, 'authorPosition', position)}
                        placeholder={__('Position', 'bevision')}
                    />
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
