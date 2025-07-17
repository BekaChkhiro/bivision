import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, ToolbarGroup, ToolbarButton, Spinner, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { chevronUp, chevronDown } from '@wordpress/icons';

// Import CSS for both frontend and editor
import './frontend.css';
import './editor.css';

// Register the Product Cards block
registerBlockType('bevision/product-cards', {
    title: 'Product Cards',
    icon: 'grid-view',
    category: 'widgets',
    attributes: {
        title: {
            type: 'string',
            default: 'პროდუქტები'
        },
        description: {
            type: 'string',
            default: 'ჩვენი პროდუქტების კოლექცია'
        },
        numberOfProducts: {
            type: 'number',
            default: 3
        },
        orderBy: {
            type: 'string',
            default: 'date'
        },
        order: {
            type: 'string',
            default: 'desc'
        },
        manualOrder: {
            type: 'boolean',
            default: false
        },
        customOrderIds: {
            type: 'array',
            default: []
        }
    },
    
    edit: ({ attributes, setAttributes }) => {
        const { title, description, numberOfProducts, orderBy, order, manualOrder, customOrderIds } = attributes;
        const [isLoading, setIsLoading] = useState(true);
        const [products, setProducts] = useState([]);

        const blockProps = useBlockProps({
            className: 'product-cards-wrapper'
        });

        // Use useSelect to fetch products from the REST API
        const retrievedProducts = useSelect((select) => {
            const query = { 
                per_page: manualOrder ? 100 : numberOfProducts, // Get more products when using manual order
                _embed: true,
                orderby: orderBy,
                order: order 
            };
            const productsData = select('core').getEntityRecords('postType', 'bevision_product', query);
            return productsData;
        }, [numberOfProducts, orderBy, order, manualOrder]);

        // When retrievedProducts change, update the products state
        useEffect(() => {
            if (retrievedProducts) {
                setIsLoading(false);
                
                if (manualOrder && customOrderIds.length > 0) {
                    // Create a map of all products for quick lookup
                    const productsMap = {};
                    retrievedProducts.forEach(product => {
                        productsMap[product.id] = product;
                    });
                    
                    // Filter products based on customOrderIds and maintain that order
                    const orderedProducts = customOrderIds
                        .map(id => productsMap[id])
                        .filter(product => !!product); // Remove any null entries (products that might have been deleted)
                    
                    // Add any new products that aren't in customOrderIds yet
                    const existingIds = new Set(customOrderIds);
                    const newProducts = retrievedProducts.filter(product => !existingIds.has(product.id));
                    
                    // Combine ordered products with new products
                    setProducts([...orderedProducts, ...newProducts].slice(0, numberOfProducts));
                } else {
                    // Update customOrderIds if not already set
                    if (retrievedProducts.length > 0 && customOrderIds.length === 0) {
                        setAttributes({ 
                            customOrderIds: retrievedProducts.map(product => product.id) 
                        });
                    }
                    setProducts(retrievedProducts);
                }
            }
        }, [retrievedProducts, manualOrder, customOrderIds, numberOfProducts, setAttributes]);

        // Load additional product data like meta fields
        useEffect(() => {
            const fetchProductMeta = async () => {
                if (!products || products.length === 0) return;
                
                // Clone the products array so we can modify it
                const productsWithMeta = [...products];
                
                // Process each product to add meta data
                for (let i = 0; i < productsWithMeta.length; i++) {
                    const product = productsWithMeta[i];
                    try {
                        // Fetch featured media if available
                        if (product._embedded && product._embedded['wp:featuredmedia']) {
                            const media = product._embedded['wp:featuredmedia'][0];
                            product.featuredImage = {
                                url: media.source_url,
                                alt: media.alt_text || product.title.rendered
                            };
                        }
                    } catch (error) {
                        console.error('Error processing product data:', error);
                    }
                }
                
                setProducts(productsWithMeta);
            };
            
            fetchProductMeta();
        }, [products]);

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Section Settings')}>
                        <TextControl
                            label={__('Title')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextControl
                            label={__('Description')}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                        />
                        <SelectControl
                            label={__('Number of Products')}
                            value={numberOfProducts}
                            options={[
                                { label: '3', value: 3 },
                                { label: '6', value: 6 },
                                { label: '9', value: 9 },
                                { label: '12', value: 12 },
                            ]}
                            onChange={(value) => setAttributes({ numberOfProducts: parseInt(value) })}
                        />
                        <SelectControl
                            label={__('Order By')}
                            value={orderBy}
                            options={[
                                { label: __('Date'), value: 'date' },
                                { label: __('Title'), value: 'title' },
                                { label: __('Menu Order'), value: 'menu_order' },
                                { label: __('Random'), value: 'rand' },
                                { label: __('ID'), value: 'id' }
                            ]}
                            onChange={(value) => setAttributes({ orderBy: value })}
                        />
                        <SelectControl
                            label={__('Order')}
                            value={order}
                            options={[
                                { label: __('Descending'), value: 'desc' },
                                { label: __('Ascending'), value: 'asc' }
                            ]}
                            onChange={(value) => setAttributes({ order: value })}
                        />
                        <ToggleControl
                            label={__('Enable Manual Ordering')}
                            checked={manualOrder}
                            onChange={(value) => setAttributes({ manualOrder: value })}
                            help={manualOrder ? __('Use the up/down arrows to reorder products') : __('Enable to manually order products')}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <div className="product-cards-container">
                        {/* Header Section */}
                        <div className="product-cards-header">
                            <h2 className="product-cards-title">{title}</h2>
                            <p className="product-cards-description">{description}</p>
                        </div>
                        
                        {/* Cards Container */}
                        <div className="product-cards-grid">
                            {isLoading ? (
                                <div className="loading-spinner-container">
                                    <Spinner />
                                    <p>ჩატვირთვა...</p>
                                </div>
                            ) : products && products.length > 0 ? (
                                products.map(product => {
                                    const productTitle = product.meta?._bevision_product_title || product.title.rendered;
                                    const subtitle = product.meta?._bevision_product_subtitle || '';
                                    const productDescription = product.meta?._bevision_product_description || '';
                                    // Prioritize description field, then subtitle, then excerpt
                                    const displayDescription = productDescription || subtitle || product.excerpt?.rendered || '';
                                    const imageUrl = product.featuredImage?.url || '';
                                    const imageAlt = product.featuredImage?.alt || productTitle;
                                    const productLink = product.link;
                                    
                                    return (
                                        <div key={product.id} className="product-card-wrapper">
                                            {manualOrder && (
                                                <div className="product-order-controls">
                                                    <Button
                                                        icon={chevronUp}
                                                        label={__('Move Up')}
                                                        onClick={() => {
                                                            const currentIndex = customOrderIds.indexOf(product.id);
                                                            if (currentIndex > 0) {
                                                                const newCustomOrderIds = [...customOrderIds];
                                                                // Swap with previous item
                                                                [newCustomOrderIds[currentIndex], newCustomOrderIds[currentIndex - 1]] = 
                                                                [newCustomOrderIds[currentIndex - 1], newCustomOrderIds[currentIndex]];
                                                                setAttributes({ customOrderIds: newCustomOrderIds });
                                                            }
                                                        }}
                                                        disabled={customOrderIds.indexOf(product.id) <= 0}
                                                        className="product-order-button"
                                                    />
                                                    <Button
                                                        icon={chevronDown}
                                                        label={__('Move Down')}
                                                        onClick={() => {
                                                            const currentIndex = customOrderIds.indexOf(product.id);
                                                            if (currentIndex < customOrderIds.length - 1) {
                                                                const newCustomOrderIds = [...customOrderIds];
                                                                // Swap with next item
                                                                [newCustomOrderIds[currentIndex], newCustomOrderIds[currentIndex + 1]] = 
                                                                [newCustomOrderIds[currentIndex + 1], newCustomOrderIds[currentIndex]];
                                                                setAttributes({ customOrderIds: newCustomOrderIds });
                                                            }
                                                        }}
                                                        disabled={customOrderIds.indexOf(product.id) >= customOrderIds.length - 1}
                                                        className="product-order-button"
                                                    />
                                                </div>
                                            )}
                                            <div className={`product-card ${productLink ? 'has-link' : ''}`}>
                                                <div className="product-card-image-container">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={imageAlt}
                                                            className="product-card-image"
                                                        />
                                                    ) : (
                                                        <div className="product-card-placeholder">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="product-card-content">
                                                    <h3 className="product-card-title">{productTitle}</h3>
                                                    <p className="product-card-description">{displayDescription}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="no-products-message">
                                    <p>პროდუქტები ვერ მოიძებნა. გთხოვთ, დაამატოთ პროდუქტები bevision_product ტიპში.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    
    save: ({ attributes }) => {
        // This is a dynamic block, so we're returning null for the save method
        // The content will be rendered by PHP on the frontend
        return null;
    }
});

