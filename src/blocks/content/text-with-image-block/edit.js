import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, TextareaControl, ColorPicker, RangeControl } from '@wordpress/components';
import { styles } from './styles';
import { useState, useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
  const { title, content, imageUrl, imageId, imageAlt, isImageFirst, authorName, authorTitle, authorImage, authorNameColor, authorTitleColor, authorNameFontSize, authorTitleFontSize } = attributes;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const blockProps = useBlockProps({
    style: styles.container(isMobile),
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Content Settings" initialOpen={true}>
          <TextControl
            label={__('Title', 'bevision')}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            help={__('Edit the main title text', 'bevision')}
          />
          
          <TextareaControl
            label={__('Content', 'bevision')}
            value={content}
            onChange={(value) => setAttributes({ content: value })}
            rows={6}
            help={__('Edit the main content text', 'bevision')}
          />
        </PanelBody>
        
        <PanelBody title="Image Settings" initialOpen={false}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              {__('Main Image', 'bevision')}
            </label>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    imageId: media.id,
                    imageUrl: media.url,
                    imageAlt: media.alt || '',
                  });
                }}
                allowedTypes={['image']}
                value={imageId}
                render={({ open }) => (
                  <div>
                    {imageUrl ? (
                      <div style={{ position: 'relative', marginBottom: '10px' }}>
                        <img 
                          src={imageUrl} 
                          alt={imageAlt} 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '150px',
                            display: 'block',
                            borderRadius: '4px'
                          }} 
                        />
                        <Button
                          onClick={() => setAttributes({
                            imageId: null,
                            imageUrl: '',
                            imageAlt: ''
                          })}
                          className="button is-small"
                          style={{
                            position: 'absolute',
                            top: '5px',
                            right: '5px',
                            backgroundColor: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            padding: '4px 6px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            fontSize: '12px'
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div style={{ 
                        padding: '40px', 
                        border: '2px dashed #ddd', 
                        textAlign: 'center', 
                        marginBottom: '10px',
                        borderRadius: '4px',
                        backgroundColor: '#f9f9f9'
                      }}>
                        <span style={{ color: '#666' }}>
                          {__('No image selected', 'bevision')}
                        </span>
                      </div>
                    )}
                    <Button 
                      onClick={open}
                      className="button"
                      variant="secondary"
                      style={{ width: '100%' }}
                    >
                      {imageUrl ? __('Replace Image', 'bevision') : __('Select Image', 'bevision')}
                    </Button>
                  </div>
                )}
              />
            </MediaUploadCheck>
          </div>
          
          {imageUrl && (
            <TextControl
              label={__('Image Alt Text', 'bevision')}
              value={imageAlt}
              onChange={(value) => setAttributes({ imageAlt: value })}
              help={__('Describe the image for accessibility', 'bevision')}
            />
          )}
        </PanelBody>
        
        <PanelBody title="Author Settings" initialOpen={false}>
          <TextControl
            label={__('Author Name', 'bevision')}
            value={authorName}
            onChange={(value) => setAttributes({ authorName: value })}
            help={__('Enter the author\'s name', 'bevision')}
          />
          
          <TextControl
            label={__('Author Title/Workplace', 'bevision')}
            value={authorTitle}
            onChange={(value) => setAttributes({ authorTitle: value })}
            help={__('Enter the author\'s position or workplace', 'bevision')}
          />
          
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              {__('Author Photo', 'bevision')}
            </label>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={(media) => {
                  setAttributes({
                    authorImage: {
                      url: media.url,
                      alt: media.alt,
                      id: media.id
                    }
                  });
                }}
                allowedTypes={['image']}
                value={authorImage?.id}
                render={({ open }) => (
                  <div>
                    <Button 
                      onClick={open}
                      className={authorImage?.url ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                    >
                      {authorImage?.url ? __('Change Author Photo', 'bevision') : __('Select Author Photo', 'bevision')}
                    </Button>
                    {authorImage?.url && (
                      <Button 
                        onClick={() => {
                          setAttributes({
                            authorImage: {
                              url: '',
                              alt: '',
                              id: null
                            }
                          });
                        }}
                        isDestructive
                        style={{ marginLeft: '10px' }}
                      >
                        {__('Remove Photo', 'bevision')}
                      </Button>
                    )}
                  </div>
                )}
              />
            </MediaUploadCheck>
            {authorImage?.url && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={authorImage.url} 
                  alt={authorImage.alt} 
                  style={{ maxWidth: '100px', borderRadius: '50%' }} 
                />
              </div>
            )}
          </div>
        </PanelBody>
        
        <PanelBody title="Style Settings" initialOpen={false}>
          <p><strong>{__('Author Name Color', 'bevision')}</strong></p>
          <ColorPicker
            color={authorNameColor}
            onChangeComplete={(color) => setAttributes({ authorNameColor: color.hex })}
            disableAlpha
          />
          
          <p><strong>{__('Author Title Color', 'bevision')}</strong></p>
          <ColorPicker
            color={authorTitleColor}
            onChangeComplete={(color) => setAttributes({ authorTitleColor: color.hex })}
            disableAlpha
          />
          
          <RangeControl
            label={__('Author Name Font Size', 'bevision')}
            value={authorNameFontSize}
            onChange={(value) => setAttributes({ authorNameFontSize: value })}
            min={12}
            max={24}
          />
          
          <RangeControl
            label={__('Author Title Font Size', 'bevision')}
            value={authorTitleFontSize}
            onChange={(value) => setAttributes({ authorTitleFontSize: value })}
            min={10}
            max={20}
          />
        </PanelBody>
        
        <PanelBody title="Layout Settings" initialOpen={false}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              {__('Column Order', 'bevision')}
            </label>
            <Button
              isPrimary={!isImageFirst}
              isSecondary={isImageFirst}
              onClick={() => setAttributes({ isImageFirst: false })}
              style={{ marginRight: '10px', marginBottom: '10px' }}
            >
              {__('Text First', 'bevision')}
            </Button>
            <Button
              isPrimary={isImageFirst}
              isSecondary={!isImageFirst}
              onClick={() => setAttributes({ isImageFirst: true })}
              style={{ marginBottom: '10px' }}
            >
              {__('Image First', 'bevision')}
            </Button>
            <div style={{ marginTop: '10px' }}>
              <Button
                variant="secondary"
                onClick={() => setAttributes({ isImageFirst: !isImageFirst })}
                style={{ 
                  width: '100%',
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🔄 {__('Swap Columns', 'bevision')}
              </Button>
            </div>
            <p style={{ 
              fontSize: '12px', 
              color: '#666', 
              marginTop: '10px', 
              fontStyle: 'italic' 
            }}>
              {isImageFirst 
                ? __('Currently: Image on left, Text on right', 'bevision')
                : __('Currently: Text on left, Image on right', 'bevision')
              }
            </p>
          </div>
        </PanelBody>
      </InspectorControls>
      
      <div {...blockProps}>
        {/* Conditionally render columns based on isImageFirst */}
        {isImageFirst ? (
          <>
            {/* Image Column First */}
            <div style={styles.imageColumn(isMobile)}>
              <div style={styles.imageContainer(isMobile)}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={styles.image(isMobile)}
                  />
                ) : (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => {
                        setAttributes({
                          imageId: media.id,
                          imageUrl: media.url,
                          imageAlt: media.alt || '',
                        });
                      }}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div 
                          style={styles.imagePlaceholder(isMobile)}
                          onClick={open}
                        >
                          <Button 
                            isPrimary
                            onClick={open}
                          >
                            {__('Select Image', 'bevision')}
                          </Button>
                        </div>
                      )}
                    />
                  </MediaUploadCheck>
                )}
                
                {imageUrl && (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => {
                        setAttributes({
                          imageId: media.id,
                          imageUrl: media.url,
                          imageAlt: media.alt || '',
                        });
                      }}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <Button
                          onClick={open}
                          isPrimary
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            zIndex: 10,
                            padding: '6px 12px',
                            fontSize: '14px',
                          }}
                        >
                          {__('Replace Image', 'bevision')}
                        </Button>
                      )}
                    />
                  </MediaUploadCheck>
                )}
              </div>
            </div>
            
            {/* Text Column Second */}
            <div style={styles.textColumn(isMobile)}>
              <RichText
                tagName="h2"
                style={styles.title(isMobile)}
                value={title}
                onChange={(title) => setAttributes({ title })}
                placeholder={__('Add title...', 'bevision')}
              />
              <RichText
                tagName="div"
                style={styles.content(isMobile)}
                value={content}
                onChange={(content) => setAttributes({ content })}
                placeholder={__('Add content...', 'bevision')}
              />
              
              {/* Author section - inline editable */}
              <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* Author Image */}
                  <div style={{ position: 'relative' }}>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => {
                          setAttributes({
                            authorImage: {
                              url: media.url,
                              alt: media.alt,
                              id: media.id
                            }
                          });
                        }}
                        allowedTypes={['image']}
                        value={authorImage?.id}
                        render={({ open }) => (
                          <div 
                            onClick={open}
                            style={{ 
                              width: 60, 
                              height: 60, 
                              borderRadius: '50%', 
                              border: '2px dashed #ccc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              backgroundImage: authorImage?.url ? `url(${authorImage.url})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                              backgroundColor: authorImage?.url ? 'transparent' : '#f5f5f5'
                            }}
                          >
                            {!authorImage?.url && (
                              <span style={{ fontSize: '10px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                                Click to<br/>add photo
                              </span>
                            )}
                            {authorImage?.url && (
                              <div style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '10px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                open();
                              }}
                              title="Change photo">
                                ✎
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>
                  
                  {/* Author Info */}
                  <div>
                    <RichText
                      tagName="div"
                      className="author-name"
                      value={authorName}
                      onChange={(value) => setAttributes({ authorName: value })}
                      style={{ 
                        fontWeight: 'bold', 
                        color: authorNameColor,
                        fontSize: `${authorNameFontSize}px`,
                        marginBottom: '5px'
                      }}
                      placeholder={__('Author name...', 'bevision')}
                      allowedFormats={['core/bold', 'core/italic']}
                    />
                    <RichText
                      tagName="div"
                      className="author-title"
                      value={authorTitle}
                      onChange={(value) => setAttributes({ authorTitle: value })}
                      style={{ 
                        fontSize: `${authorTitleFontSize}px`, 
                        color: authorTitleColor
                      }}
                      placeholder={__('Author title...', 'bevision')}
                      allowedFormats={['core/bold', 'core/italic']}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Text Column First */}
            <div style={styles.textColumn(isMobile)}>
              <RichText
                tagName="h2"
                style={styles.title(isMobile)}
                value={title}
                onChange={(title) => setAttributes({ title })}
                placeholder={__('Add title...', 'bevision')}
              />
              <RichText
                tagName="div"
                style={styles.content(isMobile)}
                value={content}
                onChange={(content) => setAttributes({ content })}
                placeholder={__('Add content...', 'bevision')}
              />
              
              {/* Author section - inline editable */}
              <div style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {/* Author Image */}
                  <div style={{ position: 'relative' }}>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(media) => {
                          setAttributes({
                            authorImage: {
                              url: media.url,
                              alt: media.alt,
                              id: media.id
                            }
                          });
                        }}
                        allowedTypes={['image']}
                        value={authorImage?.id}
                        render={({ open }) => (
                          <div 
                            onClick={open}
                            style={{ 
                              width: 60, 
                              height: 60, 
                              borderRadius: '50%', 
                              border: '2px dashed #ccc',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              backgroundImage: authorImage?.url ? `url(${authorImage.url})` : 'none',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                              backgroundColor: authorImage?.url ? 'transparent' : '#f5f5f5'
                            }}
                          >
                            {!authorImage?.url && (
                              <span style={{ fontSize: '10px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                                Click to<br/>add photo
                              </span>
                            )}
                            {authorImage?.url && (
                              <div style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                fontSize: '10px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                open();
                              }}
                              title="Change photo">
                                ✎
                              </div>
                            )}
                          </div>
                        )}
                      />
                    </MediaUploadCheck>
                  </div>
                  
                  {/* Author Info */}
                  <div>
                    <RichText
                      tagName="div"
                      className="author-name"
                      value={authorName}
                      onChange={(value) => setAttributes({ authorName: value })}
                      style={{ 
                        fontWeight: 'bold', 
                        color: authorNameColor,
                        fontSize: `${authorNameFontSize}px`,
                        marginBottom: '5px'
                      }}
                      placeholder={__('Author name...', 'bevision')}
                      allowedFormats={['core/bold', 'core/italic']}
                    />
                    <RichText
                      tagName="div"
                      className="author-title"
                      value={authorTitle}
                      onChange={(value) => setAttributes({ authorTitle: value })}
                      style={{ 
                        fontSize: `${authorTitleFontSize}px`, 
                        color: authorTitleColor
                      }}
                      placeholder={__('Author title...', 'bevision')}
                      allowedFormats={['core/bold', 'core/italic']}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Column Second */}
            <div style={styles.imageColumn(isMobile)}>
              <div style={styles.imageContainer(isMobile)}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={styles.image(isMobile)}
                  />
                ) : (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => {
                        setAttributes({
                          imageId: media.id,
                          imageUrl: media.url,
                          imageAlt: media.alt || '',
                        });
                      }}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <div 
                          style={styles.imagePlaceholder(isMobile)}
                          onClick={open}
                        >
                          <Button 
                            isPrimary
                            onClick={open}
                          >
                            {__('Select Image', 'bevision')}
                          </Button>
                        </div>
                      )}
                    />
                  </MediaUploadCheck>
                )}
                
                {imageUrl && (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(media) => {
                        setAttributes({
                          imageId: media.id,
                          imageUrl: media.url,
                          imageAlt: media.alt || '',
                        });
                      }}
                      allowedTypes={['image']}
                      value={imageId}
                      render={({ open }) => (
                        <Button
                          onClick={open}
                          isPrimary
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            zIndex: 10,
                            padding: '6px 12px',
                            fontSize: '14px',
                          }}
                        >
                          {__('Replace Image', 'bevision')}
                        </Button>
                      )}
                    />
                  </MediaUploadCheck>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
