document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing posts tab...', new Date().toISOString());
    
    // Helper function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
    
    // Helper function to update URL parameters without reloading the page
    function updateUrlParameter(key, value) {
        // Get current URL and parameters
        const baseUrl = window.location.href.split('?')[0];
        let params = new URLSearchParams(window.location.search);
        
        // Update or add the parameter
        if (value === 'all' || value === '') {
            params.delete(key); // Remove parameter if it's the default value
        } else {
            params.set(key, value);
        }
        
        // Construct new URL
        const newUrl = params.toString() ? baseUrl + '?' + params.toString() : baseUrl;
        
        // Update browser history without reloading the page
        window.history.pushState({ path: newUrl }, '', newUrl);
    }
    
    // Get URL category parameter (slug) early
    const urlCategoryParam = getUrlParameter('category');
    console.log('URL category parameter detected on page load:', urlCategoryParam);
    
    const filterBlocks = document.querySelectorAll('.blog-posts-filter');
    console.log('Found filter blocks:', filterBlocks.length);
    
    filterBlocks.forEach(block => {
        const postsContainer = block.querySelector('.posts-grid-container');
        const tabsContainer = block.querySelector('.posts-tabs-container');
        const loadMoreButton = block.querySelector('.load-more-button');
        const loadingIndicator = block.querySelector('.loading-indicator');
        
        if (!postsContainer || !tabsContainer || !loadMoreButton || !loadingIndicator) {
            console.error('Required elements not found');
            return;
        }

        // Get configuration from data attributes
        const postsPerPage = parseInt(block.dataset.postsPerPage) || 4;
        const maxPosts = parseInt(block.dataset.maxPosts) || 12;
        
        // Get text labels from data attributes with defaults
        const allCategoriesLabel = block.dataset.allCategoriesLabel || 'ყველა';
        const loadMoreLabel = block.dataset.loadMoreLabel || 'მეტის ნახვა';
        const loadingLabel = block.dataset.loadingLabel || 'პოსტების ჩატვირთვა...';
        const noPostsFoundLabel = block.dataset.noPostsLabel || 'პოსტები ვერ მოიძებნა';
        const errorLabel = block.dataset.errorLabel || 'პოსტების ჩატვირთვა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.';
        
        let categories = [];
        try {
            categories = JSON.parse(block.dataset.categories || '[]');
            console.log('Loaded categories:', categories);
        } catch (e) {
            console.error('Error parsing categories:', e);
            // If there was an error parsing categories, try to fetch them
            fetchCategories();
        }
        
        // Use URL parameter we detected at the beginning
        // We'll determine the category ID from the slug after categories are loaded
        let currentCategory = block.dataset.currentTab || 'all';
        let selectedCategorySlug = urlCategoryParam || 'all';
        
        console.log('Starting with category:', currentCategory, 'Selected slug:', selectedCategorySlug);
        let currentPage = 1;
        let isLoading = false;
        let hasMore = true;

        // Fetch categories from API if needed
        function fetchCategories() {
            console.log('Fetching categories from API...');
            return fetch('/wp-json/wp/v2/categories?per_page=100')
                .then(response => response.json())
                .then(result => {
                    console.log('Raw categories from API:', result);
                    
                    categories = [
                        { id: 'all', name: allCategoriesLabel, slug: 'all' },
                        ...result.map(cat => ({
                            id: cat.id.toString(),
                            name: cat.name,
                            slug: cat.slug
                        }))
                    ];
                    console.log('Processed categories:', categories);
                    console.log('Available slugs:', categories.map(c => c.slug).join(', '));
                    
                    // If we have a category slug in the URL, find the matching category ID
                    if (selectedCategorySlug && selectedCategorySlug !== 'all') {
                        console.log('Looking for match for slug:', selectedCategorySlug);
                        
                        // Try to find an exact match first
                        let matchingCategory = categories.find(cat => cat.slug === selectedCategorySlug);
                        
                        // If no exact match, try case-insensitive match
                        if (!matchingCategory) {
                            matchingCategory = categories.find(cat => 
                                cat.slug.toLowerCase() === selectedCategorySlug.toLowerCase());
                        }
                        
                        // If still no match, try to see if it's part of a slug
                        if (!matchingCategory) {
                            matchingCategory = categories.find(cat => 
                                cat.slug.toLowerCase().includes(selectedCategorySlug.toLowerCase()) || 
                                selectedCategorySlug.toLowerCase().includes(cat.slug.toLowerCase()));
                        }
                        
                        console.log('Matching category found:', matchingCategory);
                        
                        if (matchingCategory) {
                            currentCategory = matchingCategory.id;
                            console.log('Setting current category to:', currentCategory, 'for slug:', selectedCategorySlug);
                        } else {
                            console.log('No matching category found for slug:', selectedCategorySlug);
                        }
                    } else if (selectedCategorySlug === 'all') {
                        currentCategory = 'all';
                        console.log('Setting to ALL category');
                    }
                    
                    return categories;
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    categories = [{ id: 'all', name: allCategoriesLabel, slug: 'all' }];
                    initializeTabs();
                });
        }
        
        // Initialize tabs
        function initializeTabs() {
            console.log('Initializing tabs...');
            tabsContainer.innerHTML = '';

            if (categories && categories.length > 0) {
                categories.forEach(category => {
                    const tab = document.createElement('button');
                    tab.className = 'post-tab-item' + (category.id === currentCategory ? ' active' : '');
                    tab.dataset.categoryId = category.id;
                    tab.textContent = category.name;
                    tab.style.cssText = `
                        padding: 12px 24px;
                        background: ${category.id === currentCategory ? '#6653C6' : '#f0f0f0'};
                        color: ${category.id === currentCategory ? '#ffffff' : '#333'};
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    `;
                    
                    tab.addEventListener('click', () => {
                        if (isLoading) return;
                        
                        const tabs = block.querySelectorAll('.post-tab-item');
                        tabs.forEach(t => {
                            t.classList.remove('active');
                            t.style.background = '#f0f0f0';
                            t.style.color = '#333';
                        });
                        tab.classList.add('active');
                        tab.style.background = '#6653C6';
                        tab.style.color = '#ffffff';
                        
                        currentCategory = category.id;
                        currentPage = 1;
                        
                        // Update URL parameter with category slug instead of ID
                        updateUrlParameter('category', category.slug);
                        
                        loadPosts(true);
                    });
                    
                    tabsContainer.appendChild(tab);
                });
            }
        }

        // Load posts
        function loadPosts(resetContainer = false) {
            if (isLoading) return;
            
            // Find the category object by ID
            const categoryObj = categories.find(cat => cat.id === currentCategory) || categories[0];
            const categorySlug = categoryObj ? categoryObj.slug : (categories[0]?.slug || 'all');
            
            console.log('Loading posts:', {
                category: currentCategory,
                categorySlug: categorySlug,
                page: currentPage,
                perPage: postsPerPage
            });
            
            // Show the currently active tab
            const tabs = block.querySelectorAll('.post-tab-item');
            tabs.forEach(tab => {
                const categoryId = tab.dataset.categoryId;
                if (categoryId === currentCategory) {
                    // Style as active
                    tab.classList.add('active');
                    tab.style.background = '#6653C6';
                    tab.style.color = '#ffffff';
                } else {
                    // Style as inactive
                    tab.classList.remove('active');
                    tab.style.background = '#f0f0f0';
                    tab.style.color = '#333';
                }
            });
            
            isLoading = true;
            loadingIndicator.style.display = 'block';
            loadingIndicator.textContent = loadingLabel;
            loadMoreButton.style.display = 'none';

            if (resetContainer) {
                postsContainer.innerHTML = '';
            }

            const formData = new FormData();
            formData.append('action', 'get_posts');
            
            console.log('Current category when loading posts:', currentCategory);
            
            if (currentCategory !== 'all') {
                formData.append('category', currentCategory);
                console.log('Adding category filter:', currentCategory);
            } else {
                console.log('Loading all categories (no filter)');
            }
            
            formData.append('page', currentPage);
            formData.append('per_page', postsPerPage);

            fetch(window.bevisionSettings.ajaxUrl, {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            })

            .then(response => response.json())
            .then(response => {
                console.log('Received response:', response);
                
                if (!response.success) {
                    throw new Error(response.data?.message || 'Failed to load posts');
                }
                
                // Double check which category we're filtering by
                console.log('Filtering posts for category:', currentCategory);
                
                const { posts, total, max_pages } = response.data;
                
                if (posts && posts.length > 0) {
                    posts.forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.className = 'post-card';
                        postElement.style.cssText = `
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
                            transition: all 0.3s ease;
                            background: #fff;
                        `;
                        
                        postElement.innerHTML = `
                            <a href="${post.link}" style="text-decoration: none; color: inherit;">
                                <div style="width: 100%; height: 200px; overflow: hidden;">
                                    <img 
                                        src="${post.featured_image_url || `${window.bevisionSettings.themeUrl}/assets/images/post-placeholder.jpg`}"
                                        alt="${post.title.rendered}"
                                        style="width: 100%; height: 100%; object-fit: cover;"
                                        loading="lazy"
                                    />
                                </div>
                                <div style="padding: 20px;">
                                    ${post.categories && post.categories[0] ? `
                                        <span style="
                                            color: #6653C6;
                                            font-size: 14px;
                                            font-weight: 600;
                                            margin-bottom: 8px;
                                            display: block;
                                        ">
                                            ${post.categories[0].name}
                                        </span>
                                    ` : ''}
                                    <h3 style="
                                        font-size: 18px;
                                        font-weight: 700;
                                        margin: 0;
                                        color: #333;
                                        line-height: 1.4;
                                    ">${post.title.rendered}</h3>
                                </div>
                            </a>
                        `;
                        
                        postsContainer.appendChild(postElement);
                    });

                    hasMore = currentPage < max_pages && posts.length === postsPerPage && 
                             (currentPage * postsPerPage) < Math.min(total, maxPosts);
                } else {
                    if (resetContainer) {
                        postsContainer.innerHTML = `<div style="text-align: center; padding: 40px;">${noPostsFoundLabel}</div>`;
                    }
                    hasMore = false;
                }
                
                loadMoreButton.style.display = hasMore ? 'block' : 'none';
            })
            .catch(error => {
                console.error('Error loading posts:', error);
                if (resetContainer) {
                    postsContainer.innerHTML = `
                        <div style="text-align: center; padding: 40px; color: #ff4444;">
                            ${errorLabel}<br>
                            <small>${error.message}</small>
                        </div>
                    `;
                }
            })
            .finally(() => {
                isLoading = false;
                loadingIndicator.style.display = 'none';
            });
        }

        // Add event listener for load more button
        loadMoreButton.addEventListener('click', () => {
            if (!isLoading && hasMore) {
                currentPage++;
                loadPosts(false);
            }
        });

        // Initialize layout
        postsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        `;
        
        // Add container styles for tabs
        tabsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 40px;
        `;
        
        loadMoreButton.style.cssText = `
            padding: 12px 30px;
            background: #6653C6;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        loadMoreButton.textContent = loadMoreLabel;

        // Set tab container styles once - remove duplicate styling
        if (!tabsContainer.style.cssText) {
            tabsContainer.style.cssText = `
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 40px;
            `;
        }
        
        // Start loading - always fetch fresh categories from the server
        console.log('Starting category and post loading process');
        
        // We'll use Promise to ensure proper sequencing
        const loadingPromise = fetchCategories()
            .then(() => {
                console.log('Categories loaded, initializing tabs...');
                initializeTabs();
                console.log('Tabs initialized, loading posts with category:', currentCategory);
                loadPosts(true);
            })
            .catch(error => {
                console.error('Error during initialization:', error);
            });
            
        console.log('Loading sequence initiated');
    });
});