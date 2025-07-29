import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import Header from './Header';
import ContentWrapper from './ContentWrapper';
import Inspector from './Inspector';
import Section from '../../../../components/Section';
import { blockStyle } from '../styles';

const Edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps({
        className: 'importance-section'
    });

    const [activeAccordion, setActiveAccordion] = useState(0);

    // Migrate accordion items to include image properties if they don't exist
    const migratedAccordionItems = attributes.accordionItems.map(item => ({
        ...item,
        imageUrl: item.imageUrl || '',
        imageId: item.imageId || undefined
    }));

    // Update attributes if migration is needed
    if (JSON.stringify(migratedAccordionItems) !== JSON.stringify(attributes.accordionItems)) {
        setAttributes({ accordionItems: migratedAccordionItems });
    }

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? -1 : index);
    };
    
    const addAccordionItem = () => {
        const newAccordionItems = [...attributes.accordionItems, {
            title: 'New Accordion Item',
            content: 'Enter content here...',
            imageUrl: '',
            imageId: undefined
        }];
        setAttributes({ accordionItems: newAccordionItems });
        // Set the newly added accordion as active
        setActiveAccordion(newAccordionItems.length - 1);
    };
    
    const moveAccordionItem = (index, direction) => {
        // Don't do anything if trying to move the first item up or the last item down
        if ((index === 0 && direction === 'up') || 
            (index === attributes.accordionItems.length - 1 && direction === 'down')) {
            return;
        }
        
        const newItems = [...attributes.accordionItems];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
        // Swap the items
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        
        setAttributes({ accordionItems: newItems });
        
        // Update active accordion to follow the moved item
        if (activeAccordion === index) {
            setActiveAccordion(targetIndex);
        } else if (activeAccordion === targetIndex) {
            setActiveAccordion(index);
        }
    };
    
    const removeAccordionItem = (index) => {
        // Prevent removing the last accordion item
        if (attributes.accordionItems.length <= 1) {
            return;
        }
        
        const newItems = attributes.accordionItems.filter((_, i) => i !== index);
        setAttributes({ accordionItems: newItems });
        
        // Adjust active accordion if necessary
        if (activeAccordion === index) {
            // If we removed the active item, activate the previous one (or first if we removed index 0)
            setActiveAccordion(index > 0 ? index - 1 : 0);
        } else if (activeAccordion > index) {
            // If we removed an item before the active one, shift the active index down
            setActiveAccordion(activeAccordion - 1);
        }
    };

    const onSelectImage = (media) => {
        if (media && media.url) {
            setAttributes({
                imageUrl: media.url,
                imageId: media.id
            });
        }
    };
    
    const removeImage = () => {
        setAttributes({
            imageUrl: '',
            imageId: undefined
        });
    };

    const updateAccordionItem = (index, field, value) => {
        const newItems = [...attributes.accordionItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setAttributes({ accordionItems: newItems });
    };

    const onSelectAccordionImage = (media, index) => {
        if (media && media.url) {
            const newItems = [...attributes.accordionItems];
            newItems[index] = { 
                ...newItems[index], 
                imageUrl: media.url,
                imageId: media.id 
            };
            setAttributes({ accordionItems: newItems });
        }
    };

    const removeAccordionImage = (index) => {
        const newItems = [...attributes.accordionItems];
        newItems[index] = { 
            ...newItems[index], 
            imageUrl: '',
            imageId: undefined 
        };
        setAttributes({ accordionItems: newItems });
    };

    const getCurrentImage = () => {
        const currentItems = migratedAccordionItems;
        if (activeAccordion >= 0 && currentItems[activeAccordion]?.imageUrl) {
            return currentItems[activeAccordion].imageUrl;
        }
        return attributes.imageUrl;
    };

    return (
        <>
            <Inspector
                imageUrl={attributes.imageUrl}
                imageId={attributes.imageId}
                accordionItems={migratedAccordionItems}
                onSelectImage={onSelectImage}
                onRemoveImage={removeImage}
                onSelectAccordionImage={onSelectAccordionImage}
                onRemoveAccordionImage={removeAccordionImage}
            />
            <style>{blockStyle}</style>
            <Section 
                {...blockProps}
                className={`importance-section ${blockProps.className || ''}`}
                paddingDesktop="60px 20px"
                paddingLaptop="60px 20px"
                paddingTablet="60px 20px"
                paddingMobile="60px 20px"
                style={{
                    backgroundColor: '#f5fcf1',
                    borderRadius: '20px',
                    padding: '60px',
                    maxWidth: '1250px',
                    ...blockProps.style
                }}
            >
                <Header
                    subtitle={attributes.subtitle}
                    title={attributes.title}
                    onSubtitleChange={(subtitle) => setAttributes({ subtitle })}
                    onTitleChange={(title) => setAttributes({ title })}
                    isEditing={true}
                />
                <ContentWrapper
                    accordionItems={migratedAccordionItems}
                    activeAccordion={activeAccordion}
                    imageUrl={attributes.imageUrl}
                    imageId={attributes.imageId}
                    isEditing={true}
                    onToggleAccordion={toggleAccordion}
                    onAddAccordionItem={addAccordionItem}
                    onUpdateAccordionItem={updateAccordionItem}
                    onSelectAccordionImage={onSelectAccordionImage}
                    onRemoveAccordionImage={removeAccordionImage}
                    onMoveAccordionItem={moveAccordionItem}
                    onRemoveAccordionItem={removeAccordionItem}
                    onSelectMainImage={onSelectImage}
                    onRemoveMainImage={removeImage}
                    getCurrentImage={getCurrentImage}
                />
            </Section>
        </>
    );
};

export default Edit;