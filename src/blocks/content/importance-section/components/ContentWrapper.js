import { IconButton } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import AccordionItem from './AccordionItem';
import ImageSection from './ImageSection';

const ContentWrapper = ({ 
    accordionItems,
    activeAccordion,
    imageUrl,
    imageId,
    isEditing = false,
    onToggleAccordion,
    onAddAccordionItem,
    onUpdateAccordionItem,
    onSelectAccordionImage,
    onRemoveAccordionImage,
    onMoveAccordionItem,
    onRemoveAccordionItem,
    onSelectMainImage,
    onRemoveMainImage,
    getCurrentImage
}) => {
    return (
        <div className="importance-section__content-wrapper">
            <div className="importance-section__content">
                {isEditing && (
                    <div className="importance-section__accordion-controls">
                        <IconButton
                            icon={plus}
                            label="Add New Accordion Item"
                            onClick={onAddAccordionItem}
                            className="add-accordion-button"
                        >
                            Add New Accordion
                        </IconButton>
                    </div>
                )}
                
                {accordionItems.map((item, index) => (
                    <AccordionItem
                        key={index}
                        item={item}
                        index={index}
                        isActive={index === activeAccordion}
                        isEditing={isEditing}
                        accordionItems={accordionItems}
                        onToggle={onToggleAccordion}
                        onUpdateItem={onUpdateAccordionItem}
                        onSelectImage={onSelectAccordionImage}
                        onRemoveImage={onRemoveAccordionImage}
                        onMoveItem={onMoveAccordionItem}
                        onRemoveItem={onRemoveAccordionItem}
                    />
                ))}
            </div>
            
            <ImageSection
                imageUrl={imageUrl}
                imageId={imageId}
                accordionItems={accordionItems}
                activeAccordion={activeAccordion}
                isEditing={isEditing}
                onSelectImage={onSelectMainImage}
                onRemoveImage={onRemoveMainImage}
                getCurrentImage={getCurrentImage}
            />
        </div>
    );
};

export default ContentWrapper;