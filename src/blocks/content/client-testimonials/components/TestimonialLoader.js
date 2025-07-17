import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Spinner, Button } from '@wordpress/components';
import styles from './styles';

const TestimonialLoader = ({ updateTestimonials }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [testimonialPosts, setTestimonialPosts] = useState([]);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState('');

    const fetchTestimonials = async () => {
        setIsLoading(true);
        setError(null);
        setDebug('Fetching posts...');
        
        try {
            // Get all posts with meta data included
            const testimonialData = await apiFetch({
                path: '/wp/v2/posts?per_page=100&_fields=id,title,content,meta',
            });

            setDebug(`Found ${testimonialData.length} total posts`);
            
            // Filter posts that have the testimonial meta set to '1'
            const filteredTestimonials = testimonialData.filter(post => {
                return post.meta && post.meta._bevision_is_testimonial === '1';
            });
            
            setDebug(`Found ${filteredTestimonials.length} testimonial posts`);
            
            // Map to our testimonial format
            const formattedTestimonials = filteredTestimonials.map(post => ({
                companyLogo: post.meta._bevision_testimonial_company_logo || '',
                // Make sure content is properly formatted as HTML
                content: post.meta._bevision_testimonial_content || '',
                authorName: post.meta._bevision_testimonial_author_name || post.title.rendered || '',
                authorPosition: post.meta._bevision_testimonial_author_position || '',
                authorImage: post.meta._bevision_testimonial_author_image || '',
            }));
                
            setTestimonialPosts(formattedTestimonials);
            
            // If we have testimonials from posts, update the block testimonials
            if (formattedTestimonials.length > 0) {
                updateTestimonials(formattedTestimonials);
                setDebug(`Updated testimonials with ${formattedTestimonials.length} items`);
            } else {
                setDebug('No testimonial posts found to use');
            }
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError(__('Failed to load testimonials. Please try again.', 'bevision'));
            setDebug(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    if (isLoading) {
        return (
            <div style={styles.loaderContainer}>
                <Spinner />
                <p>{__('Loading testimonials from posts...', 'bevision')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.error}>
                <p>{error}</p>
                <Button variant="secondary" onClick={fetchTestimonials}>
                    {__('Try Again', 'bevision')}
                </Button>
                <p><small>{debug}</small></p>
            </div>
        );
    }

    if (testimonialPosts.length === 0) {
        return (
            <div style={styles.noTestimonials}>
                <p>{__('No testimonial posts found. Create posts and mark them as testimonials in the editor.', 'bevision')}</p>
                <Button variant="secondary" onClick={fetchTestimonials}>
                    {__('Check Again', 'bevision')}
                </Button>
                <p><small>{debug}</small></p>
            </div>
        );
    }

    // If we get here, testimonials were loaded and the parent component has been updated
    return (
        <div style={styles.testimonialsLoaded}>
            <p>{__('✓ Testimonials loaded from posts', 'bevision')} ({testimonialPosts.length})</p>
            <Button 
                onClick={fetchTestimonials} 
                variant="secondary"
            >
                {__('Refresh Testimonials', 'bevision')}
            </Button>
            <p><small>{debug}</small></p>
        </div>
    );
};

export default TestimonialLoader;
