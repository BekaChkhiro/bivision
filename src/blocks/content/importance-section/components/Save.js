import { useBlockProps } from '@wordpress/block-editor';
import Header from './Header';
import ContentWrapper from './ContentWrapper';
import Section from '../../../../components/Section';
import { blockStyle } from '../styles';

const Save = ({ attributes }) => {
    const blockProps = useBlockProps.save({
        className: 'importance-section'
    });

    return (
        <>
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
                    isEditing={false}
                />
                <ContentWrapper
                    accordionItems={attributes.accordionItems}
                    activeAccordion={0}
                    imageUrl={attributes.imageUrl}
                    imageId={attributes.imageId}
                    isEditing={false}
                />
            </Section>
            <script>
                {`
                document.addEventListener('DOMContentLoaded', function() {
                    const accordions = document.querySelectorAll('.accordion-header');
                    const mainImage = document.getElementById('importance-main-image');
                    const accordionItems = ${JSON.stringify(attributes.accordionItems)};
                    const defaultImage = '${attributes.imageUrl}';
                    
                    // Set first accordion as active by default
                    const firstAccordion = document.querySelector('.accordion-item');
                    if (firstAccordion) {
                        firstAccordion.classList.add('active');
                        // Set initial image
                        if (mainImage) {
                            const firstImage = accordionItems[0]?.imageUrl || defaultImage;
                            if (firstImage) {
                                mainImage.src = firstImage;
                                mainImage.style.display = 'block';
                            }
                        }
                    }
                    
                    accordions.forEach((accordion, index) => {
                        accordion.addEventListener('click', function() {
                            const parent = this.parentElement;
                            const wasActive = parent.classList.contains('active');
                            
                            // Close all accordions
                            document.querySelectorAll('.accordion-item').forEach(item => {
                                item.classList.remove('active');
                            });
                            
                            // If the clicked accordion wasn't active, open it
                            if (!wasActive) {
                                parent.classList.add('active');
                                
                                // Change image based on accordion item
                                if (mainImage) {
                                    const accordionImage = accordionItems[index]?.imageUrl;
                                    const imageToShow = accordionImage || defaultImage;
                                    
                                    if (imageToShow) {
                                        mainImage.src = imageToShow;
                                        mainImage.style.display = 'block';
                                    }
                                }
                            }
                        });
                    });
                });
                `}
            </script>
        </>
    );
};

export default Save;