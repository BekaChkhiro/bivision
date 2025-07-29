import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import styles from './styles';
import TestimonialHeader from './TestimonialHeader';
import TestimonialCarousel from './TestimonialCarousel';
import TestimonialControls from './TestimonialControls';
import TestimonialSidebar from './TestimonialSidebar';
import TestimonialLoader from './TestimonialLoader';

const Edit = ({ attributes, setAttributes }) => {
    const { title, subtitle, testimonials, orderBy, selectedTestimonials } = attributes;
    const [sliderKey, setSliderKey] = useState(1);
    const [isLoadingFromPosts, setIsLoadingFromPosts] = useState(false);
    const [loadError, setLoadError] = useState(null);
    
    // Function to get filtered and sorted testimonials
    const getFilteredAndSortedTestimonials = () => {
        // Create a filtered copy of testimonials based on selection
        let filteredTestimonials = [];
        
        // If no selection or empty selection, return empty array
        if (!selectedTestimonials || selectedTestimonials.length === 0) {
            return [];
        }
        
        // Get only the selected testimonials
        filteredTestimonials = selectedTestimonials.map(index => testimonials[index]).filter(Boolean);
        
        // Sort based on orderBy value
        if (orderBy === 'name') {
            filteredTestimonials.sort((a, b) => 
                (a.authorName || '').localeCompare(b.authorName || '')
            );
        } else if (orderBy === 'position') {
            filteredTestimonials.sort((a, b) => 
                (a.authorPosition || '').localeCompare(b.authorPosition || '')
            );
        }
        // 'custom' order just uses the array as is
        
        return filteredTestimonials;
    };

    // Automatically load testimonials from posts on first render
    useEffect(() => {
        fetchTestimonialsFromPosts();
    }, []);

    useEffect(() => {
        // Force re-render of slider when testimonials change
        setSliderKey(prev => prev + 1);
    }, [testimonials.length, testimonials]);
    
    // Function to fetch testimonials directly from posts
    const fetchTestimonialsFromPosts = async () => {
        setIsLoadingFromPosts(true);
        setLoadError(null);
        
        try {
            // Get all posts with meta data included
            const testimonialData = await apiFetch({
                path: '/wp/v2/posts?per_page=100&_fields=id,title,content,meta',
            });
            
            // Filter posts that have the testimonial meta set to '1'
            const filteredTestimonials = testimonialData.filter(post => {
                return post.meta && post.meta._bevision_is_testimonial === '1';
            });
            
            // Map to our testimonial format
            const formattedTestimonials = filteredTestimonials.map(post => ({
                companyLogo: post.meta._bevision_testimonial_company_logo || '',
                // Make sure content is properly formatted as HTML
                content: post.meta._bevision_testimonial_content || '',
                authorName: post.meta._bevision_testimonial_author_name || post.title.rendered || '',
                authorPosition: post.meta._bevision_testimonial_author_position || '',
                authorImage: post.meta._bevision_testimonial_author_image || '',
            }));
            
            // If we have testimonials from posts, update the block testimonials
            if (formattedTestimonials.length > 0) {
                // Update testimonials and also update the selected testimonials to include all
                const newIndices = formattedTestimonials.map((_, index) => index);
                setAttributes({ 
                    testimonials: formattedTestimonials,
                    selectedTestimonials: newIndices
                });
                console.log('Loaded ' + formattedTestimonials.length + ' testimonials from posts');
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setLoadError(__('Failed to load testimonials automatically.', 'bevision'));
        } finally {
            setIsLoadingFromPosts(false);
        }
    };

    const onChangeTitle = (newTitle) => {
        setAttributes({ title: newTitle });
    };

    const onChangeSubtitle = (newSubtitle) => {
        setAttributes({ subtitle: newSubtitle });
    };

    const addTestimonial = () => {
        const newTestimonials = [...testimonials, {
            companyLogo: '',
            content: '',
            authorName: '',
            authorPosition: '',
            authorImage: ''
        }];
        setAttributes({ testimonials: newTestimonials });
    };

    const removeTestimonial = (index) => {
        const newTestimonials = testimonials.filter((_, i) => i !== index);
        setAttributes({ testimonials: newTestimonials });
    };

    const updateTestimonial = (index, key, value) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = {
            ...newTestimonials[index],
            [key]: value
        };
        setAttributes({ testimonials: newTestimonials });
    };

    const duplicateTestimonial = (index) => {
        const testimonialToDuplicate = testimonials[index];
        const duplicatedTestimonial = { ...testimonialToDuplicate };
        const newTestimonials = [...testimonials];
        newTestimonials.splice(index + 1, 0, duplicatedTestimonial);
        setAttributes({ testimonials: newTestimonials });
    };
    
    const updateTestimonials = (newTestimonials) => {
        if (newTestimonials && newTestimonials.length > 0) {
            setAttributes({ testimonials: newTestimonials });
        }
    };

    const moveTestimonialUp = (index) => {
        if (index === 0) return; // Can't move up if it's the first item
        const newTestimonials = [...testimonials];
        const temp = newTestimonials[index];
        newTestimonials[index] = newTestimonials[index - 1];
        newTestimonials[index - 1] = temp;
        setAttributes({ testimonials: newTestimonials });
    };

    const moveTestimonialDown = (index) => {
        if (index === testimonials.length - 1) return; // Can't move down if it's the last item
        const newTestimonials = [...testimonials];
        const temp = newTestimonials[index];
        newTestimonials[index] = newTestimonials[index + 1];
        newTestimonials[index + 1] = temp;
        setAttributes({ testimonials: newTestimonials });
    };

    return (
        <div style={styles.clientTestimonials}>
            <TestimonialSidebar
                testimonials={testimonials}
                updateTestimonial={updateTestimonial}
                addTestimonial={addTestimonial}
                removeTestimonial={removeTestimonial}
                setAttributes={setAttributes}
                attributes={attributes}
            />
            <TestimonialHeader 
                subtitle={subtitle}
                title={title}
                onChangeSubtitle={onChangeSubtitle}
                onChangeTitle={onChangeTitle}
            />
            <div className="carousel-wrapper" style={styles.carouselWrapper}>
                <TestimonialCarousel 
                    testimonials={getFilteredAndSortedTestimonials()}
                    updateTestimonial={updateTestimonial}
                    removeTestimonial={removeTestimonial}
                    duplicateTestimonial={duplicateTestimonial}
                />
            </div>
            <TestimonialControls 
                addTestimonial={addTestimonial}
            />
            <div style={styles.testimonialLoaderContainer}>
                <TestimonialLoader updateTestimonials={updateTestimonials} />
                {loadError && <p style={styles.error}>{loadError}</p>}
            </div>
        </div>
    );
};

export default Edit;
