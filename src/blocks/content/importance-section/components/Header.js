import { RichText } from '@wordpress/block-editor';

const Header = ({ subtitle, title, onSubtitleChange, onTitleChange, isEditing = false }) => {
    return (
        <div className="importance-section__header">
            {isEditing ? (
                <>
                    <RichText
                        tagName="div"
                        className="importance-section__subtitle"
                        value={subtitle}
                        onChange={onSubtitleChange}
                        placeholder="Enter subtitle"
                    />
                    <RichText
                        tagName="h2"
                        className="importance-section__title"
                        value={title}
                        onChange={onTitleChange}
                        placeholder="Enter title"
                    />
                </>
            ) : (
                <>
                    <div className="importance-section__subtitle">
                        {subtitle}
                    </div>
                    <h2 className="importance-section__title">
                        {title}
                    </h2>
                </>
            )}
        </div>
    );
};

export default Header;