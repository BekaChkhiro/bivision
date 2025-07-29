import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title, content, imageUrl, imageAlt, isImageFirst, authorName, authorTitle, authorImage, authorNameColor, authorTitleColor, authorNameFontSize, authorTitleFontSize } = attributes;
  
  // Using the same class name as in the CSS
  return (
    <div className={`text-with-image-block ${isImageFirst ? 'image-first' : 'text-first'}`}>
      {isImageFirst ? (
        <>
          {/* Image Column First */}
          <div className="image-column">
            <div className="image-container">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageAlt || ''}
                  className="image"
                />
              )}
            </div>
          </div>
          
          {/* Text Column Second */}
          <div className="text-column">
            {title && (
              <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />
            )}
            {content && (
              <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
            )}
            
            {/* Author section - simple inline display */}
            {(authorName || authorTitle || authorImage?.url) && (
              <div className="text-author" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {authorImage?.url && (
                    <img 
                      src={authorImage.url} 
                      alt={authorImage.alt} 
                      className="author-image"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }} 
                    />
                  )}
                  <div>
                    {authorName && (
                      <RichText.Content
                        tagName="div"
                        className="author-name"
                        value={authorName}
                        style={{ 
                          fontWeight: 'bold', 
                          color: authorNameColor,
                          fontSize: `${authorNameFontSize}px`,
                          marginBottom: '5px'
                        }}
                      />
                    )}
                    {authorTitle && (
                      <RichText.Content
                        tagName="div"
                        className="author-title"
                        value={authorTitle}
                        style={{ 
                          fontSize: `${authorTitleFontSize}px`, 
                          color: authorTitleColor
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Text Column First */}
          <div className="text-column">
            {title && (
              <h2 className="title" dangerouslySetInnerHTML={{ __html: title }} />
            )}
            {content && (
              <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
            )}
            
            {/* Author section - simple inline display */}
            {(authorName || authorTitle || authorImage?.url) && (
              <div className="text-author" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {authorImage?.url && (
                    <img 
                      src={authorImage.url} 
                      alt={authorImage.alt} 
                      className="author-image"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }} 
                    />
                  )}
                  <div>
                    {authorName && (
                      <RichText.Content
                        tagName="div"
                        className="author-name"
                        value={authorName}
                        style={{ 
                          fontWeight: 'bold', 
                          color: authorNameColor,
                          fontSize: `${authorNameFontSize}px`,
                          marginBottom: '5px'
                        }}
                      />
                    )}
                    {authorTitle && (
                      <RichText.Content
                        tagName="div"
                        className="author-title"
                        value={authorTitle}
                        style={{ 
                          fontSize: `${authorTitleFontSize}px`, 
                          color: authorTitleColor
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Image Column Second */}
          <div className="image-column">
            <div className="image-container">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={imageAlt || ''}
                  className="image"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
