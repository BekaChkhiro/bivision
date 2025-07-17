import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, Spinner, Placeholder, CheckboxControl, ToggleControl, Icon } from '@wordpress/components';
import { chevronUp, chevronDown } from '@wordpress/icons';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import TabNavigation from '../products/components/TabNavigation';
import TabContent from '../products/components/TabContent';
import Section from '../../../components/Section';

const styles = {
    productsSection: {
        margin: '0px 0px 60px',
        padding: '70px 0 60px 0', // Vertical padding only
        color: '#333',
        position: 'relative',
        overflow: 'hidden'
    },
    glowEffect: {
        position: 'absolute',
        top: '50%',
        right: '-20%',
        width: '60%',
        height: '60%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1
    },
    sectionTitle: {
        color: 'var(--Purple, #6653C6)',
        textAlign: 'center',
        fontSize: '14px!important',
        fontStyle: 'normal',
        fontWeight: 750,
        lineHeight: 'normal',
        margin: '0px 0px 5px'
    },
    sectionSubtitle: {
        color: 'var(--Dark-Blue, #221A4C)',
        textAlign: 'center',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0px 0px 30px'
    },
    loadingState: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: '#f9f9f9',
        border: '1px solid #e2e4e7',
        borderRadius: '8px'
    }
};

// Custom function to enforce bullet size to 18px and diagnose styling issues
function enforceProductsFeatureStyles() {
    // Execute after a slight delay to ensure DOM is ready
    setTimeout(() => {
        // Target list items and their first child spans (checkmarks)
        const lists = document.querySelectorAll('.products-feature-list, ul.products-features-list');
        
        lists.forEach(list => {
            const items = list.querySelectorAll('li');
            
            items.forEach(item => {
                // Force item text size
                item.style.fontSize = '18px';
                
                // Find the checkmark/icon span (it's usually the first span or element)
                const spans = item.querySelectorAll('span');
                if (spans.length > 0) {
                    // Force the first span to be 18px
                    spans[0].style.fontSize = '18px';
                    spans[0].style.display = 'inline-block';
                    
                    // Log diagnostic info to console
                    console.log('Found icon:', spans[0]);
                    console.log('Current computed font-size:', window.getComputedStyle(spans[0]).fontSize);
                }
                
                // Also apply directly to the checkmark class if it exists
                const checkmarks = item.querySelectorAll('[style*="checkmark"]');
                if (checkmarks.length > 0) {
                    checkmarks[0].style.fontSize = '18px !important';
                }
            });
        });
    }, 500);
}

// Add the function to window load event
if (typeof window !== 'undefined') {
    window.addEventListener('load', enforceProductsFeatureStyles);
    // Also run on DOM ready for editor
    document.addEventListener('DOMContentLoaded', enforceProductsFeatureStyles);
}

// This function will inject a custom style directly into the page when the block loads
function injectCustomStyles() {
    if (typeof document === 'undefined') return; // Server-side rendering guard
    
    // Create style element if it doesn't exist yet
    let styleEl = document.getElementById('bevision-products-cpt-custom-styles');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'bevision-products-cpt-custom-styles';
        document.head.appendChild(styleEl);
        
        // Add super high specificity rules with !important to force override any other styles
        styleEl.innerHTML = `
            /* Set tab titles to 20px */
            body .wp-block-bevision-products-cpt .products-tabs-navigation button,
            body .wp-block-bevision-products-cpt .products-tab-button,
            body .wp-block-bevision-products-cpt .tab-button-text,
            body .products-tab-button,
            body .tab-button-text,
            body .products-tabs-navigation .nav-tab {
                font-size: 20px !important;
                line-height: 1.2 !important;
                font-weight: 600 !important;
            }

            /* Force 18px size on all bullet points and icons */
            body .wp-block-bevision-products-cpt .products-feature-icon,
            body .wp-block-bevision-products-cpt li span:first-child,
            body .wp-block-bevision-products-cpt li:before,
            body .wp-block-bevision-products-cpt .products-feature-list span:first-child,
            body .wp-block-bevision-products-cpt .products-tab-content li:before,
            body .wp-block-bevision-products-cpt .products-tab-content li svg,
            body .wp-block-bevision-products-cpt .products-feature-item span:first-of-type {
                font-size: 18px !important;
                line-height: 1.2 !important;
            }
            
            /* Force 18px size on all feature text items */
            body .wp-block-bevision-products-cpt .products-feature-item,
            body .wp-block-bevision-products-cpt .products-feature-text,
            body .wp-block-bevision-products-cpt .products-tab-content li {
                font-size: 18px !important;
                line-height: 1.2 !important;
                font-weight: 400 !important;
            }
        `;
    }
}

// Run the function on document load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', injectCustomStyles);
    // Also run it immediately in case it's already loaded
    injectCustomStyles();
}

registerBlockType('bevision/products-cpt', {
    title: 'Products from CPT',
    icon: 'grid-view',
    category: 'design',
    // Register frontend style
    style: 'file:./frontend.css',
    attributes: {
        sectionTitle: {
            type: 'string',
            default: 'PRODUCTS'
        },
        sectionSubtitle: {
            type: 'string',
            default: 'What we offer'
        },
        activeTab: {
            type: 'string',
            default: ''
        },
        defaultTabId: {
            type: 'string',
            default: ''
        },
        selectedProductIds: {
            type: 'array',
            default: []
        },
        showAllProducts: {
            type: 'boolean',
            default: true
        },
        staticImage: {
            type: 'string',
            default: ''
        },
        useStaticImage: {
            type: 'boolean',
            default: true
        },
        manualOrder: {
            type: 'boolean',
            default: false
        },
        customOrderIds: {
            type: 'array',
            default: []
        },
        primaryButtonText: {
            type: 'string',
            default: 'გაიგე მეტი'
        },
        secondaryButtonText: {
            type: 'string',
            default: 'მოითხოვე დემო'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { sectionTitle, sectionSubtitle, activeTab, defaultTabId, selectedProductIds, showAllProducts, manualOrder, customOrderIds, primaryButtonText, secondaryButtonText } = attributes;
        const [products, setProducts] = useState([]);
        const [allProducts, setAllProducts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        // Fetch products from WordPress REST API
        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    setLoading(true);
                    const fetchedProducts = await apiFetch({
                        path: '/wp/v2/bevision_product?_embed&per_page=100&orderby=menu_order&order=desc',
                    });

                    // Set custom order IDs if not already set
                    if (customOrderIds.length === 0) {
                        setAttributes({ 
                            customOrderIds: fetchedProducts.map(product => product.id) 
                        });
                    }

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

                        // Get the product meta data
                        const subtitle = product.meta && product.meta._bevision_product_subtitle 
                            ? product.meta._bevision_product_subtitle 
                            : '';
                        
                        const title = product.meta && product.meta._bevision_product_title 
                            ? product.meta._bevision_product_title 
                            : product.title.rendered;
                        
                        // Get features and ensure it's always an array
                        let features = [];
                        if (product.meta && product.meta._bevision_product_features) {
                            // Check if it's already an array
                            if (Array.isArray(product.meta._bevision_product_features)) {
                                features = product.meta._bevision_product_features;
                            } 
                            // Sometimes WP REST API returns string for serialized arrays
                            else if (typeof product.meta._bevision_product_features === 'string') {
                                try {
                                    // Try to parse it if it's a JSON string
                                    const parsed = JSON.parse(product.meta._bevision_product_features);
                                    features = Array.isArray(parsed) ? parsed : [product.meta._bevision_product_features];
                                } catch (e) {
                                    // If not JSON, just use as a single feature
                                    features = [product.meta._bevision_product_features];
                                }
                            } else {
                                // Fallback - convert to string and use as a single feature
                                features = [String(product.meta._bevision_product_features)];
                            }
                        }

                        // Create product object
                        return {
                            id: `product-${product.id}`,
                            postId: product.id,
                            name: product.title.rendered,
                            subtitle: subtitle,
                            title: title,
                            features: features,
                            image: attributes.useStaticImage && attributes.staticImage ? attributes.staticImage : imageUrl
                        };
                    });

                    let sortedProducts = [];
                    
                    // Apply manual ordering if enabled and we have custom order IDs
                    if (manualOrder && customOrderIds.length > 0) {
                        // Create a map for quick lookup
                        const productsMap = {};
                        transformedProducts.forEach(product => {
                            productsMap[product.postId] = product;
                        });
                        
                        // Order products according to customOrderIds
                        const orderedProducts = customOrderIds
                            .map(id => productsMap[id])
                            .filter(product => !!product); // Remove any null entries
                        
                        // Add any new products that aren't in customOrderIds
                        const existingIds = new Set(customOrderIds);
                        const newProducts = transformedProducts.filter(product => !existingIds.has(product.postId));
                        
                        // Combine the ordered products with any new ones
                        sortedProducts = [...orderedProducts, ...newProducts];
                    } else {
                        // Sort products by menu_order if available to match front-end order
                        sortedProducts = transformedProducts.sort((a, b) => {
                            // Find original items to get menu_order
                            const productA = fetchedProducts.find(p => p.id === a.postId);
                            const productB = fetchedProducts.find(p => p.id === b.postId);
                            
                            // Use menu_order for sorting if available
                            const orderA = productA && productA.menu_order ? productA.menu_order : 0;
                            const orderB = productB && productB.menu_order ? productB.menu_order : 0;
                            
                            // Use reverse order (desc) to match the front-end order
                            return orderB - orderA;
                        });
                    }
                    
                    // Store all products for selection interface
                    setAllProducts(sortedProducts);
                    
                    // Filter products based on selection if showAllProducts is false
                    const filteredProducts = showAllProducts 
                        ? sortedProducts 
                        : sortedProducts.filter(product => 
                            selectedProductIds.includes(product.postId));
                    
                    setProducts(filteredProducts);
                    
                    // Set default active tab if needed
                    if (filteredProducts.length > 0) {
                        // If we have a saved activeTab but it doesn't exist in current products, reset it
                        const tabExists = filteredProducts.some(product => product.id === activeTab);
                        
                        // Set first tab as active if no tab is selected or if selected tab doesn't exist
                        if (!activeTab || !tabExists) {
                            setAttributes({ activeTab: filteredProducts[0].id });
                            // Initialize default tab if it's not set
                            if (!defaultTabId) {
                                setAttributes({ defaultTabId: filteredProducts[0].id });
                            }
                        }
                    }
                    
                    setLoading(false);
                } catch (err) {
                    console.error('Error fetching products:', err);
                    setError(err.message);
                    setLoading(false);
                }
            };

            fetchProducts();
        }, [showAllProducts, selectedProductIds, manualOrder, customOrderIds]);

        // Add a default product if none are available
        useEffect(() => {
            if (!loading && products.length === 0 && !error) {
                const defaultProduct = {
                    id: 'default-product',
                    name: 'Default Product',
                    subtitle: 'Product',
                    title: 'No products found',
                    features: [
                        'Please add products using the Products custom post type',
                        'Each product will appear as a tab in this block',
                        'Add features, images, and more through the admin'
                    ],
                    image: ''
                };
                
                setProducts([defaultProduct]);
                setAttributes({ activeTab: defaultProduct.id });
                setAttributes({ defaultTabId: defaultProduct.id });
            }
        }, [loading, products, error]);

        const handleTabChange = (tabId) => {
            setAttributes({ activeTab: tabId });
        };

        const handleImageSelect = (url) => {
            // If using static image, update the static image attribute
            if (attributes.useStaticImage) {
                setAttributes({ staticImage: url });
                return;
            }
            
            // Otherwise update the image URL for the active tab
            const updatedProducts = products.map(product => {
                if (product.id === activeTab) {
                    return { ...product, image: url };
                }
                return product;
            });
            setProducts(updatedProducts);
        };

        const handleImageRemove = () => {
            // If using static image, clear the static image attribute
            if (attributes.useStaticImage) {
                setAttributes({ staticImage: '' });
                return;
            }
            
            // Otherwise remove the image for the active tab
            const updatedProducts = products.map(product => {
                if (product.id === activeTab) {
                    return { ...product, image: '' };
                }
                return product;
            });
            setProducts(updatedProducts);
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={true}>
                        {products.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>Default Tab:</p>
                                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e2e4e7', padding: '8px' }}>
                                    {products.map(product => (
                                        <CheckboxControl
                                            key={product.id}
                                            label={product.name}
                                            checked={defaultTabId === product.id}
                                            onChange={(isChecked) => {
                                                if (isChecked) {
                                                    setAttributes({ defaultTabId: product.id });
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <TextControl
                            label="Section Title"
                            value={sectionTitle}
                            onChange={(value) => setAttributes({ sectionTitle: value })}
                        />
                        <TextControl
                            label="Section Subtitle"
                            value={sectionSubtitle}
                            onChange={(value) => setAttributes({ sectionSubtitle: value })}
                        />
                        <ToggleControl
                            label="Show All Products"
                            checked={showAllProducts}
                            onChange={(value) => {
                                setAttributes({ showAllProducts: value });
                                // Reset selection if toggling to show all
                                if (value) {
                                    setAttributes({ selectedProductIds: [] });
                                }
                            }}
                            help={showAllProducts ? 'Showing all published products' : 'Only showing selected products'}
                        />
                        
                        {/* Product Selection Interface */}
                        {!showAllProducts && (
                            <div style={{ marginTop: '16px' }}>
                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>Select Products to Display:</p>
                                {allProducts.length > 0 ? (
                                    <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e2e4e7', padding: '8px' }}>
                                        {allProducts.map(product => (
                                            <CheckboxControl
                                                key={product.postId}
                                                label={product.name}
                                                checked={selectedProductIds.includes(product.postId)}
                                                onChange={(isChecked) => {
                                                    const newSelectedIds = isChecked
                                                        ? [...selectedProductIds, product.postId]
                                                        : selectedProductIds.filter(id => id !== product.postId);
                                                    
                                                    setAttributes({ selectedProductIds: newSelectedIds });
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                        )}
                    </PanelBody>
                    
                    <PanelBody title="Image Settings" initialOpen={true}>
                        <ToggleControl
                            label="Use Static Image"
                            checked={attributes.useStaticImage}
                            onChange={(value) => setAttributes({ useStaticImage: value })}
                            help={attributes.useStaticImage ? 'Using a static image for all tabs' : 'Using each product\'s featured image'}
                        />
                        
                        <PanelBody title="Tab Order Settings" initialOpen={true}>
                            <ToggleControl
                                label="Enable Manual Tab Ordering"
                                checked={manualOrder}
                                onChange={(value) => setAttributes({ manualOrder: value })}
                                help={manualOrder ? 'Use the up/down arrows to reorder tabs' : 'Enable to manually order tabs'}
                            />
                            
                            {manualOrder && products.length > 0 && (
                                <div style={{ marginTop: '16px' }}>
                                    <p style={{ marginBottom: '8px', fontWeight: '500' }}>Reorder Tabs:</p>
                                    <div style={{ 
                                        maxHeight: '300px', 
                                        overflowY: 'auto', 
                                        border: '1px solid #e2e4e7', 
                                        padding: '8px' 
                                    }}>
                                        {products.map((product, index) => (
                                            <div 
                                                key={product.postId}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '8px',
                                                    borderBottom: index < products.length - 1 ? '1px solid #eee' : 'none'
                                                }}
                                            >
                                                <span>{product.name}</span>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <Button
                                                        icon={chevronUp}
                                                        label="Move Up"
                                                        isSmall
                                                        onClick={() => {
                                                            const currentIndex = customOrderIds.indexOf(product.postId);
                                                            if (currentIndex > 0) {
                                                                const newCustomOrderIds = [...customOrderIds];
                                                                // Swap with previous item
                                                                [newCustomOrderIds[currentIndex], newCustomOrderIds[currentIndex - 1]] = 
                                                                [newCustomOrderIds[currentIndex - 1], newCustomOrderIds[currentIndex]];
                                                                setAttributes({ customOrderIds: newCustomOrderIds });
                                                            }
                                                        }}
                                                        disabled={customOrderIds.indexOf(product.postId) <= 0}
                                                    />
                                                    <Button
                                                        icon={chevronDown}
                                                        label="Move Down"
                                                        isSmall
                                                        onClick={() => {
                                                            const currentIndex = customOrderIds.indexOf(product.postId);
                                                            if (currentIndex < customOrderIds.length - 1) {
                                                                const newCustomOrderIds = [...customOrderIds];
                                                                // Swap with next item
                                                                [newCustomOrderIds[currentIndex], newCustomOrderIds[currentIndex + 1]] = 
                                                                [newCustomOrderIds[currentIndex + 1], newCustomOrderIds[currentIndex]];
                                                                setAttributes({ customOrderIds: newCustomOrderIds });
                                                            }
                                                        }}
                                                        disabled={customOrderIds.indexOf(product.postId) >= customOrderIds.length - 1}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </PanelBody>
                        
                        {attributes.useStaticImage && (
                            <div style={{ marginTop: '16px' }}>
                                <p style={{ marginBottom: '8px', fontWeight: '500' }}>Static Image:</p>
                                <MediaUploadCheck>
                                    <div style={{ marginBottom: '16px' }}>
                                        {attributes.staticImage ? (
                                            <div style={{ position: 'relative' }}>
                                                <img 
                                                    src={attributes.staticImage} 
                                                    alt="Static product image"
                                                    style={{ 
                                                        width: '100%', 
                                                        height: 'auto', 
                                                        maxHeight: '200px', 
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }}
                                                />
                                                <div style={{ 
                                                    display: 'flex', 
                                                    gap: '8px', 
                                                    marginTop: '8px' 
                                                }}>
                                                    <MediaUpload
                                                        onSelect={(media) => setAttributes({ staticImage: media.url })}
                                                        allowedTypes={['image']}
                                                        value={attributes.staticImage}
                                                        render={({ open }) => (
                                                            <Button 
                                                                onClick={open}
                                                                isSecondary
                                                            >
                                                                Replace Image
                                                            </Button>
                                                        )}
                                                    />
                                                    <Button 
                                                        isDestructive
                                                        onClick={() => setAttributes({ staticImage: '' })}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <MediaUpload
                                                onSelect={(media) => setAttributes({ staticImage: media.url })}
                                                allowedTypes={['image']}
                                                value={attributes.staticImage}
                                                render={({ open }) => (
                                                    <Button 
                                                        onClick={open}
                                                        isPrimary
                                                    >
                                                        Upload Static Image
                                                    </Button>
                                                )}
                                            />
                                        )}
                                    </div>
                                </MediaUploadCheck>
                            </div>
                        )}
                    </PanelBody>
                    
                    <PanelBody title="Button Settings" initialOpen={true}>
                        <TextControl
                            label="Primary Button Text (Learn More)"
                            value={primaryButtonText}
                            onChange={(value) => setAttributes({ primaryButtonText: value })}
                        />
                        <TextControl
                            label="Secondary Button Text (Request Demo)"
                            value={secondaryButtonText}
                            onChange={(value) => setAttributes({ secondaryButtonText: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <Section 
                        paddingDesktop="70px 20px 60px 20px"
                        paddingLaptop="70px 20px 60px 20px"
                        paddingTablet="50px 20px 40px 20px"
                        paddingMobile="40px 15px 30px 15px"
                        style={{
                            margin: '0 0 60px',
                            color: '#333',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={styles.glowEffect}></div>
                        <h2 
                            style={styles.sectionTitle}
                            className="products-section-title"
                        >
                            {sectionTitle}
                        </h2>
                        <h3 
                            style={styles.sectionSubtitle}
                            className="products-section-subtitle"
                        >
                            {sectionSubtitle}
                        </h3>

                        {loading ? (
                            <div style={styles.loadingState}>
                                <Spinner />
                                <p>Loading products...</p>
                            </div>
                        ) : error ? (
                            <Placeholder
                                icon="warning"
                                label="Error loading products"
                                instructions={`There was an error loading the products: ${error}`}
                            >
                                <Button 
                                    isPrimary
                                    onClick={() => window.location.reload()}
                                >
                                    Reload Page
                                </Button>
                            </Placeholder>
                        ) : (
                            <>
                                {products.length > 0 && (
                                    <>
                                        <TabNavigation
                                            tabs={products}
                                            activeTab={activeTab}
                                            onTabChange={handleTabChange}
                                        />

                                        <div className="products-tabs-content">
                                            {products.map((product) => (
                                                <div 
                                                    key={product.id}
                                                    style={{ display: activeTab === product.id ? 'block' : 'none' }}
                                                    data-tab-content={product.id}
                                                    className="products-tab-content"
                                                >
                                                    <TabContent 
                                                        tab={product}
                                                        primaryButtonText={primaryButtonText}
                                                        secondaryButtonText={secondaryButtonText}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </Section>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { sectionTitle, sectionSubtitle, showAllProducts, selectedProductIds, primaryButtonText, secondaryButtonText } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps} data-section-title={sectionTitle} data-section-subtitle={sectionSubtitle}>
                <Section 
                    paddingDesktop="70px 20px 60px 20px"
                    paddingLaptop="70px 20px 60px 20px"
                    paddingTablet="50px 20px 40px 20px"
                    paddingMobile="40px 15px 30px 15px"
                    style={{
                        margin: '0 0 60px',
                        color: '#333',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={styles.glowEffect}></div>
                    <h2 className="products-section-title" style={styles.sectionTitle}>
                        {sectionTitle || 'PRODUCTS'}
                    </h2>
                    <h3 className="products-section-subtitle" style={styles.sectionSubtitle}>
                        {sectionSubtitle || 'What we offer'}
                    </h3>
                    
                    {/* Server-side rendered content will be inserted here */}
                    <div 
                        className="products-tabs-dynamic" 
                        data-products-block
                        data-show-all-products={showAllProducts ? 'true' : 'false'}
                        data-selected-product-ids={JSON.stringify(selectedProductIds)}
                        data-primary-button-text={primaryButtonText}
                        data-secondary-button-text={secondaryButtonText}
                    ></div>

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                document.addEventListener('DOMContentLoaded', function() {
                                    // Products will be loaded dynamically from the server
                                    // This script handles tab switching on the frontend
                                    function initializeProductTabs() {
                                        const tabsNav = document.querySelector('.products-tabs-nav');
                                        if (!tabsNav) return;

                                        const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                        const tabContents = document.querySelectorAll('.products-tab-content'); 

                                        // Mobile style adjustments
                                        const handleMobileLayout = () => {
                                            if (window.innerWidth <= 767) {
                                                // First, ensure entire document isn't overflowing
                                                document.body.style.overflowX = 'hidden';
                                                document.documentElement.style.overflowX = 'hidden';
                                                document.documentElement.style.width = '100%';
                                                
                                                // Apply mobile-friendly tab navigation
                                                tabsNav.style.overflowX = 'auto';
                                                tabsNav.style.scrollSnapType = 'x mandatory';
                                                tabsNav.style.webkitOverflowScrolling = 'touch';
                                                tabsNav.style.display = 'flex';
                                                tabsNav.style.flexWrap = 'nowrap';
                                                tabsNav.style.paddingBottom = '10px';
                                                tabsNav.style.maxWidth = '100%';
                                                tabsNav.style.width = '100%';
                                                
                                                const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                                tabItems.forEach(item => {
                                                    item.style.flex = '0 0 auto';
                                                    item.style.minWidth = '120px';
                                                    item.style.fontSize = '14px';
                                                    item.style.padding = '8px 12px';
                                                    item.style.textAlign = 'center';
                                                    item.style.scrollSnapAlign = 'start';
                                                    item.style.whiteSpace = 'nowrap';
                                                });
                                                
                                                // Apply mobile-friendly tab content layout
                                                const gridContainers = document.querySelectorAll('.products-grid');
                                                gridContainers.forEach(grid => {
                                                    grid.style.display = 'grid';
                                                    grid.style.gridTemplateColumns = '1fr';
                                                    grid.style.gap = '30px';
                                                    grid.style.width = '100%';
                                                    grid.style.maxWidth = '100%';
                                                    grid.style.boxSizing = 'border-box';
                                                    grid.style.overflow = 'hidden';
                                                });
                                                
                                                // IMPROVED MOBILE FIX: Control containers properly
                                                function optimizeContainers() {
                                                    // Get the products section containers
                                                    const productsSections = document.querySelectorAll('.products-section');
                                                    productsSections.forEach(section => {
                                                        section.style.width = '100%';
                                                        section.style.maxWidth = '100%';
                                                        section.style.overflowX = 'hidden';
                                                        section.style.boxSizing = 'border-box';
                                                    });
                                                    
                                                    // Control all product containers
                                                    const productContainers = document.querySelectorAll('.product-container');
                                                    productContainers.forEach(container => {
                                                        container.style.width = '100%';
                                                        container.style.maxWidth = '100%';
                                                        container.style.boxSizing = 'border-box';
                                                        container.style.overflowX = 'hidden';
                                                        container.style.paddingLeft = '15px';
                                                        container.style.paddingRight = '15px';
                                                    });
                                                    
                                                    // Handle any images to prevent overflow
                                                    const images = document.querySelectorAll('.products-section img');
                                                    images.forEach(img => {
                                                        img.style.maxWidth = '100%';
                                                        img.style.height = 'auto';
                                                    });
                                                    
                                                    // Fix any horizontal scrolling issues in nested content
                                                    const contentElements = document.querySelectorAll('.products-content');
                                                    contentElements.forEach(element => {
                                                        element.style.maxWidth = '100%';
                                                        element.style.width = '100%';
                                                        element.style.boxSizing = 'border-box';
                                                        element.style.wordBreak = 'break-word';
                                                        element.style.overflowWrap = 'break-word';
                                                    });
                                                }
                                                
                                                // Run container optimizations
                                                optimizeContainers();
                                                setTimeout(optimizeContainers, 300); // Run again after a short delay
                                                
                                                // Style buttons for mobile
                                                const buttonGroups = document.querySelectorAll('.products-button-group');
                                                buttonGroups.forEach(group => {
                                                    group.style.flexDirection = 'column';
                                                    group.style.width = '100%';
                                                    group.style.gap = '12px';
                                                    group.style.maxWidth = '100%';
                                                    
                                                    const buttons = group.querySelectorAll('.products-button');
                                                    buttons.forEach(button => {
                                                        button.style.width = '100%';
                                                        button.style.padding = '12px 20px';
                                                        button.style.fontSize = '15px';
                                                        button.style.boxSizing = 'border-box';
                                                        button.style.maxWidth = '100%';
                                                    });
                                                });
                                                
                                                // Make sure features lists stay within bounds
                                                const featureLists = document.querySelectorAll('.products-features-list, .products-feature-list');
                                                featureLists.forEach(list => {
                                                    list.style.width = '100%';
                                                    list.style.maxWidth = '100%';
                                                    list.style.paddingLeft = '20px';
                                                    list.style.boxSizing = 'border-box';
                                                });
                                                
                                                // Force icon sizes to 18px
                                                const icons = document.querySelectorAll('.products-feature-icon');
                                                icons.forEach(icon => {
                                                    icon.style.fontSize = '18px';
                                                });
                                                
                                                // Force feature text sizes to 18px
                                                const featureItems = document.querySelectorAll('.products-feature-item');
                                                featureItems.forEach(item => {
                                                    item.style.fontSize = '18px';
                                                });
                                            }
                                            } else {
                                                // Reset to desktop layout
                                                tabsNav.style.overflowX = 'visible';
                                                tabsNav.style.scrollSnapType = 'none';
                                                tabsNav.style.display = 'flex';
                                                tabsNav.style.flexWrap = 'wrap';
                                                tabsNav.style.paddingBottom = '0';
                                                
                                                const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                                tabItems.forEach(item => {
                                                    item.style.flex = 'initial';
                                                    item.style.minWidth = 'initial';
                                                    item.style.fontSize = '24px';
                                                    item.style.padding = '12px 24px';
                                                });
                                                
                                                // Reset grid layout
                                                const gridContainers = document.querySelectorAll('.products-grid');
                                                gridContainers.forEach(grid => {
                                                    grid.style.gridTemplateColumns = '55% 45%';
                                                    grid.style.gap = '48px';
                                                });
                                                
                                                // Reset button styles
                                                const buttonGroups = document.querySelectorAll('.products-button-group');
                                                buttonGroups.forEach(group => {
                                                    group.style.flexDirection = 'row';
                                                    group.style.width = 'auto';
                                                    group.style.gap = '16px';
                                                    
                                                    const buttons = group.querySelectorAll('.products-button');
                                                    buttons.forEach(button => {
                                                        button.style.width = 'auto';
                                                        button.style.padding = '15px 40px';
                                                        button.style.fontSize = '18px';
                                                    });
                                                });
                                            }
                                        };
                                        
                                        // Call it on load and resize
                                        handleMobileLayout();
                                        window.addEventListener('resize', handleMobileLayout);

                                        // Handle tab activation
                                        function setActiveTab(tabId) {
                                            tabItems.forEach(item => {
                                                if (item.dataset.tab === tabId) {
                                                    item.style.color = '#6653C6';
                                                    item.style.background = '#ecf0f8';
                                                    item.style.borderRadius = '5px';
                                                } else {
                                                    item.style.color = '#221A4C';
                                                    item.style.background = '#fff';
                                                    item.style.borderRadius = '5px';
                                                }
                                            });

                                            tabContents.forEach(content => {
                                                if (content.dataset.tabContent === tabId) {
                                                    content.style.display = 'block';
                                                } else {
                                                    content.style.display = 'none';
                                                }
                                            });
                                        }

                                        // Add click event to tabs
                                        tabItems.forEach(tab => {
                                            tab.addEventListener('click', () => {
                                                const tabId = tab.dataset.tab;
                                                setActiveTab(tabId);
                                            });
                                        });

                                        // Set the default tab as active
                                        if (tabItems.length > 0) {
                                            // Check if we have a default tab ID from attributes
                                            const defaultTab = '${attributes.defaultTabId ? attributes.defaultTabId : ''}';
                                            
                                            // Check if the default tab exists in current tabs
                                            let tabToActivate = '';
                                            if (defaultTab) {
                                                // Find if the default tab exists in the current tabs
                                                const defaultTabExists = Array.from(tabItems).some(tab => tab.dataset.tab === defaultTab);
                                                if (defaultTabExists) {
                                                    tabToActivate = defaultTab;
                                                }
                                            }
                                            
                                            // If no default tab is set or it doesn't exist, use the first tab
                                            if (!tabToActivate && tabItems.length > 0) {
                                                tabToActivate = tabItems[0].dataset.tab;
                                            }
                                            
                                            setActiveTab(tabToActivate);
                                        }
                                    }

                                    // Initialize when DOM is loaded
                                    initializeProductTabs();
                                });
                                `
                            }}
                        />
                </Section>
            </div>
        );
    }
});
