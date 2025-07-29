import { __ } from '@wordpress/i18n';
import { 
    PanelBody, 
    Button, 
    TextControl, 
    TextareaControl,
    Panel,
    SelectControl,
    CheckboxControl,
    ToggleControl
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { MediaUpload } from '@wordpress/block-editor';

const TestimonialSidebar = ({ 
    testimonials, 
    updateTestimonial, 
    addTestimonial, 
    removeTestimonial,
    setAttributes,
    attributes
}) => {
    const { orderBy, selectedTestimonials } = attributes;
    const [expandedTestimonial, setExpandedTestimonial] = useState(null);
    
    // Initialize selectedTestimonials if it doesn't exist
    if (!attributes.selectedTestimonials) {
        // By default, all testimonials are selected
        const initialSelection = testimonials.map((_, index) => index);
        setAttributes({ selectedTestimonials: initialSelection });
    }
    
    const handleReorder = (oldIndex, newIndex) => {
        if (oldIndex === newIndex) return;
        
        const newTestimonials = [...testimonials];
        const movedItem = newTestimonials[oldIndex];
        
        // Remove from old position
        newTestimonials.splice(oldIndex, 1);
        
        // Add to new position
        newTestimonials.splice(newIndex, 0, movedItem);
        
        setAttributes({ testimonials: newTestimonials });
    };

    return (
        <InspectorControls>
            <Panel>
                <PanelBody
                    title={__('Testimonial Selection', 'bevision')}
                    initialOpen={true}
                >
                    <ToggleControl
                        label={__('Select All Testimonials', 'bevision')}
                        checked={selectedTestimonials && selectedTestimonials.length === testimonials.length}
                        onChange={(isChecked) => {
                            if (isChecked) {
                                // Select all testimonials
                                setAttributes({
                                    selectedTestimonials: testimonials.map((_, index) => index)
                                });
                            } else {
                                // Deselect all testimonials
                                setAttributes({ selectedTestimonials: [] });
                            }
                        }}
                    />
                    
                    <p style={{ marginBottom: '10px', fontWeight: 'bold', marginTop: '15px' }}>
                        {__('Individual Selection:', 'bevision')}
                    </p>
                    
                    {testimonials.map((testimonial, index) => (
                        <CheckboxControl
                            key={index}
                            label={`${testimonial.authorName || __('Testimonial', 'bevision')} #${index + 1}`}
                            checked={selectedTestimonials && selectedTestimonials.includes(index)}
                            onChange={(isChecked) => {
                                const newSelection = [...(selectedTestimonials || [])];
                                
                                if (isChecked) {
                                    // Add to selection if not already included
                                    if (!newSelection.includes(index)) {
                                        newSelection.push(index);
                                    }
                                } else {
                                    // Remove from selection
                                    const position = newSelection.indexOf(index);
                                    if (position !== -1) {
                                        newSelection.splice(position, 1);
                                    }
                                }
                                
                                setAttributes({ selectedTestimonials: newSelection });
                            }}
                        />
                    ))}
                </PanelBody>
                
                <PanelBody
                    title={__('Testimonial Order', 'bevision')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__('Order Testimonials By', 'bevision')}
                        value={orderBy}
                        options={[
                            { label: __('Custom Order (Manual Arrangement)', 'bevision'), value: 'custom' },
                            { label: __('Author Name', 'bevision'), value: 'name' },
                            { label: __('Author Position', 'bevision'), value: 'position' }
                        ]}
                        onChange={(value) => setAttributes({ orderBy: value })}
                    />
                    
                    {orderBy === 'custom' && (
                        <>
                            <p style={{ marginBottom: '10px', marginTop: '15px', fontWeight: 'bold' }}>
                                {__('Rearrange Testimonials:', 'bevision')}
                            </p>
                            <div style={{ 
                                border: '1px solid #e2e4e7', 
                                borderRadius: '4px',
                                padding: '10px',
                                backgroundColor: '#f8f9fa'
                            }}>
                                {selectedTestimonials && selectedTestimonials.length > 0 ? (
                                    <ul style={{ margin: 0, padding: 0 }}>
                                        {selectedTestimonials.map((testIndex, orderIndex) => {
                                            const testimonial = testimonials[testIndex];
                                            if (!testimonial) return null;
                                            
                                            return (
                                                <li key={orderIndex} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '8px',
                                                    marginBottom: '8px',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '4px'
                                                }}>
                                                    <span>
                                                        <strong>{orderIndex + 1}.</strong> {testimonial.authorName || __('Unnamed', 'bevision')}
                                                    </span>
                                                    <div>
                                                        {orderIndex > 0 && (
                                                            <Button
                                                                onClick={() => {
                                                                    const newOrder = [...selectedTestimonials];
                                                                    [newOrder[orderIndex], newOrder[orderIndex - 1]] = 
                                                                    [newOrder[orderIndex - 1], newOrder[orderIndex]];
                                                                    setAttributes({ selectedTestimonials: newOrder });
                                                                }}
                                                                isSecondary
                                                                icon="arrow-up-alt2"
                                                                iconSize={16}
                                                                style={{ padding: '2px 5px', minHeight: '30px' }}
                                                                label={__('Move up', 'bevision')}
                                                            />
                                                        )}
                                                        {orderIndex < selectedTestimonials.length - 1 && (
                                                            <Button
                                                                onClick={() => {
                                                                    const newOrder = [...selectedTestimonials];
                                                                    [newOrder[orderIndex], newOrder[orderIndex + 1]] = 
                                                                    [newOrder[orderIndex + 1], newOrder[orderIndex]];
                                                                    setAttributes({ selectedTestimonials: newOrder });
                                                                }}
                                                                isSecondary
                                                                icon="arrow-down-alt2"
                                                                iconSize={16}
                                                                style={{ padding: '2px 5px', minHeight: '30px', marginLeft: '5px' }}
                                                                label={__('Move down', 'bevision')}
                                                            />
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <p>{__('No testimonials selected. Please select testimonials from the Testimonial Selection panel.', 'bevision')}</p>
                                )}
                            </div>
                        </>
                    )}
                </PanelBody>
                
                <PanelBody 
                    title={__('Testimonials Management', 'bevision')}
                    initialOpen={true}
                >
                    <div className="testimonials-list">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="testimonial-item"
                                style={{
                                    marginBottom: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    padding: '10px'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '10px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <strong style={{ marginRight: '10px' }}>
                                            {__('Testimonial', 'bevision')} #{index + 1} - {testimonial.authorName || __('Unnamed', 'bevision')}
                                        </strong>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {orderBy === 'custom' && (
                                            <>
                                                {index > 0 && (
                                                    <Button
                                                        onClick={() => handleReorder(index, index - 1)}
                                                        isSecondary
                                                        icon="arrow-up-alt2"
                                                        iconSize={16}
                                                        style={{ marginRight: '5px', padding: '2px 5px', minHeight: '30px' }}
                                                    />
                                                )}
                                                {index < testimonials.length - 1 && (
                                                    <Button
                                                        onClick={() => handleReorder(index, index + 1)}
                                                        isSecondary
                                                        icon="arrow-down-alt2"
                                                        iconSize={16}
                                                        style={{ marginRight: '5px', padding: '2px 5px', minHeight: '30px' }}
                                                    />
                                                )}
                                            </>
                                        )}
                                        <Button
                                            onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
                                            isLink
                                        >
                                            {expandedTestimonial === index ? __('Collapse', 'bevision') : __('Expand', 'bevision')}
                                        </Button>
                                    </div>
                                </div>

                                {expandedTestimonial === index && (
                                    <div className="testimonial-fields">
                                        <MediaUpload
                                            onSelect={(media) => updateTestimonial(index, 'companyLogo', media.url)}
                                            type="image"
                                            value={testimonial.companyLogo}
                                            render={({ open }) => (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <strong>{__('Company Logo', 'bevision')}</strong>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                        {testimonial.companyLogo ? (
                                                            <img 
                                                                src={testimonial.companyLogo} 
                                                                alt={__('Company Logo', 'bevision')} 
                                                                style={{ width: '80px', marginRight: '10px' }}
                                                            />
                                                        ) : (
                                                            <div style={{ 
                                                                width: '80px', 
                                                                height: '40px', 
                                                                backgroundColor: '#f0f0f0', 
                                                                marginRight: '10px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '10px',
                                                                color: '#888'
                                                            }}>
                                                                {__('No Logo', 'bevision')}
                                                            </div>
                                                        )}
                                                        <Button 
                                                            onClick={open}
                                                            isPrimary
                                                        >
                                                            {testimonial.companyLogo ? __('Replace', 'bevision') : __('Select', 'bevision')}
                                                        </Button>
                                                        {testimonial.companyLogo && (
                                                            <Button 
                                                                onClick={() => updateTestimonial(index, 'companyLogo', '')}
                                                                isDestructive
                                                                style={{ marginLeft: '5px' }}
                                                            >
                                                                {__('Remove', 'bevision')}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        <TextareaControl
                                            label={__('Testimonial Content', 'bevision')}
                                            value={testimonial.content}
                                            onChange={(value) => updateTestimonial(index, 'content', value)}
                                            style={{ marginBottom: '10px' }}
                                        />

                                        <MediaUpload
                                            onSelect={(media) => updateTestimonial(index, 'authorImage', media.url)}
                                            type="image"
                                            value={testimonial.authorImage}
                                            render={({ open }) => (
                                                <div style={{ marginBottom: '10px' }}>
                                                    <strong>{__('Author Image', 'bevision')}</strong>
                                                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                                        {testimonial.authorImage ? (
                                                            <img 
                                                                src={testimonial.authorImage} 
                                                                alt={__('Author Image', 'bevision')} 
                                                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            <div style={{ 
                                                                width: '50px', 
                                                                height: '50px', 
                                                                borderRadius: '50%',
                                                                backgroundColor: '#f0f0f0', 
                                                                marginRight: '10px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '10px',
                                                                color: '#888'
                                                            }}>
                                                                {__('No Image', 'bevision')}
                                                            </div>
                                                        )}
                                                        <Button 
                                                            onClick={open}
                                                            isPrimary
                                                        >
                                                            {testimonial.authorImage ? __('Replace', 'bevision') : __('Select', 'bevision')}
                                                        </Button>
                                                        {testimonial.authorImage && (
                                                            <Button 
                                                                onClick={() => updateTestimonial(index, 'authorImage', '')}
                                                                isDestructive
                                                                style={{ marginLeft: '5px' }}
                                                            >
                                                                {__('Remove', 'bevision')}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        />

                                        <TextControl
                                            label={__('Author Name', 'bevision')}
                                            value={testimonial.authorName}
                                            onChange={(value) => updateTestimonial(index, 'authorName', value)}
                                            style={{ marginBottom: '10px' }}
                                        />

                                        <TextControl
                                            label={__('Author Position', 'bevision')}
                                            value={testimonial.authorPosition}
                                            onChange={(value) => updateTestimonial(index, 'authorPosition', value)}
                                            style={{ marginBottom: '10px' }}
                                        />

                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'flex-end',
                                            marginTop: '15px'
                                        }}>
                                            <Button
                                                onClick={() => removeTestimonial(index)}
                                                isDestructive
                                            >
                                                {__('Delete Testimonial', 'bevision')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={addTestimonial}
                        isPrimary
                        style={{ marginTop: '10px', width: '100%' }}
                    >
                        {__('Add New Testimonial', 'bevision')}
                    </Button>
                </PanelBody>
            </Panel>
        </InspectorControls>
    );
};

export default TestimonialSidebar;
