import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import styles from './styles';

const TestimonialHeader = ({ subtitle, title, onChangeSubtitle, onChangeTitle }) => {
    return (
        <>
            <RichText
                tagName="p"
                style={styles.subtitle}
                value={subtitle}
                onChange={onChangeSubtitle}
                placeholder={__('Enter subtitle', 'bevision')}
            />
            <RichText
                tagName="h2"
                style={styles.title}
                value={title}
                onChange={onChangeTitle}
                placeholder={__('Enter title', 'bevision')}
            />
        </>
    );
};

export default TestimonialHeader;
