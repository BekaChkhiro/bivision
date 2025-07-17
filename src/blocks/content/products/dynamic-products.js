/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * Fetch products from the custom post type
 */
export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Fetch products from WordPress REST API
                const fetchedProducts = await apiFetch({
                    path: '/wp/v2/bevision_product?_embed&per_page=100',
                });

                // Transform the data to match our tabs format
                const transformedProducts = fetchedProducts.map(product => {
                    // Get featured image URL if available
                    let imageUrl = '';
                    if (product._embedded && 
                        product._embedded['wp:featuredmedia'] && 
                        product._embedded['wp:featuredmedia'][0] &&
                        product._embedded['wp:featuredmedia'][0].source_url) {
                        imageUrl = product._embedded['wp:featuredmedia'][0].source_url;
                    }

                    // Get custom fields
                    const subtitle = product.meta?._bevision_product_subtitle || '';
                    const title = product.meta?._bevision_product_title || product.title.rendered;
                    const features = product.meta?._bevision_product_features || [];

                    // Format data to match our tab structure
                    return {
                        id: `product-${product.id}`,
                        postId: product.id,
                        name: product.title.rendered,
                        subtitle: subtitle,
                        title: title,
                        features: features,
                        image: imageUrl,
                        excerpt: product.excerpt?.rendered || '',
                        link: product.link || ''
                    };
                });

                setProducts(transformedProducts);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

/**
 * Get REST API URL for products
 */
export const getProductsRestUrl = () => {
    return '/wp/v2/bevision_product';
};

/**
 * Register custom REST field for product meta
 */
export const registerProductRestFields = () => {
    const productFields = [
        '_bevision_product_subtitle',
        '_bevision_product_title',
        '_bevision_product_features'
    ];

    productFields.forEach(field => {
        register_rest_field('bevision_product', field, {
            get_callback: function(object) {
                return get_post_meta(object.id, field, true);
            },
            update_callback: function(value, object) {
                return update_post_meta(object.id, field, value);
            },
            schema: {
                description: `Product field: ${field}`,
                type: 'string',
                context: ['view', 'edit']
            }
        });
    });
};

/**
 * Default product to use when none are available
 */
export const getDefaultProduct = () => {
    return {
        id: 'default-product',
        name: 'Default Product',
        subtitle: 'Product',
        title: 'No products found',
        features: [
            'Please add products using the Products custom post type',
            'Each product will appear as a tab in this block',
            'Add features, images, and more through the admin'
        ],
        image: '/wp-content/themes/BeVision/src/images/default-product.png'
    };
};
