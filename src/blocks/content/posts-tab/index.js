import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RangeControl, SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const blockStyle = {
    postsSection: {
        padding: '40px 0',
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        maxWidth: '1250px',
        margin: '0 auto',
        padding: '0 15px',
    },
    tabsContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 0 40px',
        gap: '10px',
        flexWrap: 'wrap'
    },
    tab: {
        padding: '12px 24px',
        background: '#f0f0f0',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#333',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    activeTab: {
        background: '#6653C6',
        color: '#ffffff'
    },
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        marginBottom: '40px'
    },
    postCard: {
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        background: '#fff'
    },
    postImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    postContent: {
        padding: '20px'
    },
    postCategory: {
        color: '#6653C6',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        display: 'block'
    },
    postTitle: {
        fontSize: '18px',
        fontWeight: '700',
        marginTop: '0',
        marginBottom: '15px',
        color: '#333',
        lineHeight: '1.4'
    },
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px'
    },
    loadMoreButton: {
        padding: '12px 30px',
        background: '#6653C6',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    }
};

registerBlockType('bevision/blog-posts-filter', {
    title: 'Blog Posts Filter',
    icon: 'grid-view',
    category: 'design',
    attributes: {
        categories: {
            type: 'array',
            default: []
        },
        allCategories: {
            type: 'array',
            default: []
        },
        currentTab: {
            type: 'string',
            default: 'all'
        },
        postsPerPage: {
            type: 'number',
            default: 4
        },
        maxPosts: {
            type: 'number',
            default: 12
        },
        allCategoriesLabel: {
            type: 'string',
            default: 'All'
        },
        loadMoreLabel: {
            type: 'string',
            default: 'მეტის ნახვა'
        },
        loadingLabel: {
            type: 'string',
            default: 'პოსტების ჩატვირთვა...'
        },
        noPostsFoundLabel: {
            type: 'string',
            default: 'პოსტები ვერ მოიძებნა'
        },
        errorLabel: {
            type: 'string',
            default: 'პოსტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { categories, allCategories, currentTab, postsPerPage, maxPosts } = attributes;
        
        const [availableCategories, setAvailableCategories] = useState([]);
        const [posts, setPosts] = useState([]);
        const [loading, setLoading] = useState(true);
        const [loadingMore, setLoadingMore] = useState(false);
        const [page, setPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);

        // Fetch available categories
        useEffect(() => {
            apiFetch({ path: '/wp/v2/categories?per_page=100' }).then((result) => {
                const formattedCategories = result.map(cat => ({
                    id: cat.id.toString(),
                    name: cat.name,
                    slug: cat.slug
                }));
                
                const allCatsWithAll = [
                    { id: 'all', name: attributes.allCategoriesLabel || 'All', slug: 'all' },
                    ...formattedCategories
                ];
                
                setAvailableCategories(allCatsWithAll);
                
                // Save all categories to block attributes
                setAttributes({ allCategories: allCatsWithAll });
                
                // If no categories are selected yet, add all categories
                if (categories.length === 0) {
                    setAttributes({ 
                        categories: [
                            { id: 'all', name: 'All', slug: 'all' },
                            ...formattedCategories.slice(0, 4) // Add first 4 categories by default
                        ] 
                    });
                }
            });
        }, []);

        // Fetch posts based on the current tab
        useEffect(() => {
            if (currentTab) {
                setPosts([]);
                setLoading(true);
                setPage(1);
                setHasMore(true);
                fetchPosts();
            }
        }, [currentTab]);

        const fetchPosts = () => {
            let apiPath = `/wp/v2/posts?_embed&per_page=${postsPerPage}`;
            if (currentTab !== 'all') {
                apiPath += `&categories=${currentTab}`;
            }
            
            apiFetch({ path: apiPath }).then((result) => {
                setPosts(result);
                setLoading(false);
                setHasMore(result.length === postsPerPage);
            });
        };

        // Handler for loading more posts
        const loadMorePosts = () => {
            if (loadingMore || !hasMore) return;
            
            setLoadingMore(true);
            const nextPage = page + 1;
            
            let apiPath = `/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${nextPage}`;
            if (currentTab !== 'all') {
                apiPath += `&categories=${currentTab}`;
            }
            
            apiFetch({ path: apiPath }).then((result) => {
                if (result.length > 0) {
                    setPosts([...posts, ...result]);
                    setPage(nextPage);
                    setHasMore(result.length === postsPerPage && posts.length + result.length < maxPosts);
                } else {
                    setHasMore(false);
                }
                setLoadingMore(false);
            }).catch(error => {
                setHasMore(false);
                setLoadingMore(false);
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Categories Settings" initialOpen={true}>
                        <div style={{ marginBottom: '16px' }}>
                            <SelectControl
                                label="Add Category"
                                value=""
                                options={[
                                    { label: 'Select a category to add', value: '' },
                                    ...availableCategories
                                        .filter(cat => !categories.some(c => c.id === cat.id))
                                        .map(cat => ({ label: cat.name, value: cat.id }))
                                ]}
                                onChange={(categoryId) => {
                                    const categoryToAdd = availableCategories.find(cat => cat.id === categoryId);
                                    if (categoryToAdd && !categories.some(cat => cat.id === categoryId)) {
                                        setAttributes({ 
                                            categories: [...categories, categoryToAdd] 
                                        });
                                    }
                                }}
                            />
                        </div>
                        
                        <h3>Current Categories</h3>
                        <div style={{ marginBottom: '16px' }}>
                            {categories.map((category) => (
                                <div key={category.id} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '8px 12px',
                                    margin: '8px 0',
                                    background: '#f5f5f5',
                                    borderRadius: '4px'
                                }}>
                                    <span>{category.name}</span>
                                    <Button 
                                        isDestructive
                                        isSmall
                                        onClick={() => {
                                            if (categories.length <= 1) return; // Keep at least one category
                                            
                                            const newCategories = categories.filter(cat => cat.id !== category.id);
                                            setAttributes({ categories: newCategories });
                                            
                                            // If current tab is removed, switch to first available
                                            if (currentTab === category.id) {
                                                setAttributes({ currentTab: newCategories[0].id });
                                            }
                                        }}
                                        disabled={categories.length <= 1}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </PanelBody>
                    
                    <PanelBody title="Posts Settings" initialOpen={true}>
                        <div style={{ marginBottom: '15px' }}>
                            <SelectControl
                                label="Add Category"
                                value=""
                                options={[
                                    { label: 'Select a category to add', value: '' },
                                    ...availableCategories
                                            .filter(cat => !categories.some(c => c.id === cat.id))
                                            .map(cat => ({ label: cat.name, value: cat.id }))
                                ]}
                                onChange={(categoryId) => {
                                    const categoryToAdd = availableCategories.find(cat => cat.id === categoryId);
                                    if (categoryToAdd && !categories.some(cat => cat.id === categoryId)) {
                                        setAttributes({ 
                                            categories: [...categories, categoryToAdd] 
                                        });
                                    }
                                }}
                            />
                        </div>
                        
                        <div style={{ marginBottom: '15px' }}>
                            <h3>Selected Categories</h3>
                            {categories.map((category) => (
                                <div key={category.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                    <span>{category.name}</span>
                                    <Button 
                                        isDestructive
                                        isSmall
                                        onClick={() => {
                                            if (categories.length <= 1) return; // Keep at least one category
                                            
                                            const newCategories = categories.filter(cat => cat.id !== category.id);
                                            setAttributes({ categories: newCategories });
                                            
                                            // If current tab is removed, switch to first available
                                            if (currentTab === category.id) {
                                                setAttributes({ currentTab: newCategories[0].id });
                                            }
                                        }}
                                        disabled={categories.length <= 1}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        
                        <RangeControl
                            label="Posts Per Page"
                            value={postsPerPage}
                            onChange={(value) => setAttributes({ postsPerPage: value })}
                            min={1}
                            max={12}
                        />
                        
                        <RangeControl
                            label="Maximum Posts"
                            value={maxPosts}
                            onChange={(value) => setAttributes({ maxPosts: value })}
                            min={1}
                            max={100}
                        />
                    </PanelBody>
                    
                    <PanelBody title="Text Settings" initialOpen={false}>
                        <TextControl
                            label="'All Categories' Label"
                            value={attributes.allCategoriesLabel}
                            onChange={(value) => {
                                setAttributes({ allCategoriesLabel: value });
                                // Update available categories list with new label
                                const updatedCategories = [...availableCategories];
                                if (updatedCategories.length > 0 && updatedCategories[0].id === 'all') {
                                    updatedCategories[0].name = value;
                                    setAvailableCategories(updatedCategories);
                                }
                            }}
                        />
                        
                        <TextControl
                            label="'Load More' Button Text"
                            value={attributes.loadMoreLabel}
                            onChange={(value) => setAttributes({ loadMoreLabel: value })}
                        />
                        
                        <TextControl
                            label="Loading Text"
                            value={attributes.loadingLabel}
                            onChange={(value) => setAttributes({ loadingLabel: value })}
                        />
                        
                        <TextControl
                            label="No Posts Found Text"
                            value={attributes.noPostsFoundLabel}
                            onChange={(value) => setAttributes({ noPostsFoundLabel: value })}
                        />
                        
                        <TextControl
                            label="Error Message"
                            value={attributes.errorLabel}
                            onChange={(value) => setAttributes({ errorLabel: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div style={blockStyle.postsSection}>
                        <div style={blockStyle.container}>
                            {/* Category Tabs */}
                            <div style={blockStyle.tabsContainer}>
                                {availableCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        style={{
                                            ...blockStyle.tab,
                                            ...(cat.id === currentTab ? blockStyle.activeTab : {})
                                        }}
                                        onClick={() => setAttributes({ currentTab: cat.id })}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            
                            {/* Posts Grid */}
                            {loading ? (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>Loading posts...</div>
                            ) : (
                                <>
                                    <div style={blockStyle.postsGrid}>
                                        {posts.map((post) => (
                                            <div key={post.id} style={blockStyle.postCard}>
                                                {post._embedded && post._embedded['wp:featuredmedia'] && (
                                                    <img 
                                                        src={post._embedded['wp:featuredmedia'][0].source_url} 
                                                        alt={post.title.rendered}
                                                        style={blockStyle.postImage}
                                                    />
                                                )}
                                                <div style={blockStyle.postContent}>
                                                    {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                                                        <span style={blockStyle.postCategory}>
                                                            {post._embedded['wp:term'][0][0].name}
                                                        </span>
                                                    )}
                                                    <h3 style={blockStyle.postTitle} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Load More Button */}
                                    {hasMore && (
                                        <div style={blockStyle.loadMoreContainer}>
                                            <button 
                                                style={blockStyle.loadMoreButton}
                                                onClick={loadMorePosts}
                                                disabled={loadingMore}
                                            >
                                                {loadingMore ? attributes.loadingLabel : attributes.loadMoreLabel}
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { 
            postsPerPage, 
            maxPosts, 
            categories, 
            allCategories, 
            currentTab,
            allCategoriesLabel,
            loadMoreLabel,
            loadingLabel,
            noPostsFoundLabel,
            errorLabel
        } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div className="blog-posts-filter" 
                    data-posts-per-page={postsPerPage}
                    data-max-posts={maxPosts}
                    data-categories={JSON.stringify(allCategories)}
                    data-current-tab={currentTab}
                    data-all-categories-label={allCategoriesLabel}
                    data-load-more-label={loadMoreLabel}
                    data-loading-label={loadingLabel}
                    data-no-posts-label={noPostsFoundLabel}
                    data-error-label={errorLabel}
                >
                    <div className="posts-tabs-container">
                        {/* თაბები დინამიურად ჩაიტვირთება */}
                    </div>
                    
                    <div className="posts-grid-container">
                        {/* პოსტების grid კონტეინერი */}
                    </div>
                    
                    <div className="loading-indicator" style={{ display: 'none' }}>
                        პოსტების ჩატვირთვა...
                    </div>
                    
                    <div className="load-more-container">
                        <button className="load-more-button">მეტის ნახვა</button>
                    </div>
                </div>
            </div>
        );
    }
});