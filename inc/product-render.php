<?php
/**
 * Server-side rendering for the Products CPT block
 */

// Register REST API fields for products
function bevision_register_product_rest_fields() {
    register_rest_field('bevision_product', '_bevision_product_subtitle', array(
        'get_callback' => function($object) {
            return get_post_meta($object['id'], '_bevision_product_subtitle', true);
        },
        'update_callback' => function($value, $object) {
            return update_post_meta($object['id'], '_bevision_product_subtitle', $value);
        },
        'schema' => array(
            'description' => 'Product subtitle field',
            'type' => 'string',
            'context' => array('view', 'edit')
        )
    ));

    register_rest_field('bevision_product', '_bevision_product_title', array(
        'get_callback' => function($object) {
            return get_post_meta($object['id'], '_bevision_product_title', true);
        },
        'update_callback' => function($value, $object) {
            return update_post_meta($object['id'], '_bevision_product_title', $value);
        },
        'schema' => array(
            'description' => 'Product display title field',
            'type' => 'string',
            'context' => array('view', 'edit')
        )
    ));

    register_rest_field('bevision_product', '_bevision_product_features', array(
        'get_callback' => function($object) {
            return get_post_meta($object['id'], '_bevision_product_features', true);
        },
        'update_callback' => function($value, $object) {
            return update_post_meta($object['id'], '_bevision_product_features', $value);
        },
        'schema' => array(
            'description' => 'Product features field',
            'type' => 'array',
            'context' => array('view', 'edit')
        )
    ));
}
add_action('rest_api_init', 'bevision_register_product_rest_fields');

/**
 * Render products block with dynamic content
 */
function bevision_render_products_cpt_block($attributes, $content) {
    // Debug info - log block attributes
    error_log('Products Block Attributes: ' . print_r($attributes, true));
    
    // Get block attributes directly with fallbacks
    $section_title = isset($attributes['sectionTitle']) ? $attributes['sectionTitle'] : 'PRODUCTS';
    $section_subtitle = isset($attributes['sectionSubtitle']) ? $attributes['sectionSubtitle'] : 'What we offer';
    $default_active_tab = !empty($attributes['activeTab']) ? $attributes['activeTab'] : '';
    
    // Get button text attributes
    $primary_button_text = !empty($attributes['primaryButtonText']) ? $attributes['primaryButtonText'] : 'გაიგე მეტი';
    $secondary_button_text = !empty($attributes['secondaryButtonText']) ? $attributes['secondaryButtonText'] : 'მოითხოვე დემო';
    
    // Get product filtering options
    $show_all_products = isset($attributes['showAllProducts']) ? (bool)$attributes['showAllProducts'] : true;
    $selected_product_ids = isset($attributes['selectedProductIds']) && is_array($attributes['selectedProductIds']) ? $attributes['selectedProductIds'] : [];
    
    // Check if we're on a single product page and get the current product ID
    $current_product_id = 0;
    if (is_singular('bevision_product')) {
        $current_product_id = get_the_ID();
    }
    
    // Get ordering options
    $manual_order = isset($attributes['manualOrder']) ? (bool)$attributes['manualOrder'] : false;
    $custom_order_ids = isset($attributes['customOrderIds']) && is_array($attributes['customOrderIds']) ? $attributes['customOrderIds'] : [];
    
    // Get image settings
    $use_static_image = isset($attributes['useStaticImage']) ? (bool)$attributes['useStaticImage'] : true;
    $static_image = isset($attributes['staticImage']) ? $attributes['staticImage'] : '';

    // Initialize products variable
    $products = array();
    $first_product_id = '';
    
    // Handle manual ordering if enabled and we have custom order IDs
    if ($manual_order && !empty($custom_order_ids)) {
        $ordered_products_data = array();
        
        // Get each product by ID in the specified order
        foreach ($custom_order_ids as $product_id) {
            // Skip if we're not showing all products and this product isn't in the selected list
            if (!$show_all_products && !in_array($product_id, $selected_product_ids)) {
                continue;
            }
            
            // Skip current product if we're on a single product page
            if ($current_product_id > 0 && $product_id == $current_product_id) {
                continue;
            }
            
            // Get the product
            $product = get_post($product_id);
            if ($product && $product->post_status === 'publish' && $product->post_type === 'bevision_product') {
                $ordered_products_data[] = $product;
            }
        }
        
        // If not showing all products, filter the ordered products to show only selected ones
        if (!$show_all_products && !empty($selected_product_ids)) {
            // We already filtered above, so just process the products
            foreach ($ordered_products_data as $product) {
                setup_postdata($product);
                
                $product_id = $product->ID;
                
                // Rest of product processing (same as the non-manual ordering case)
                // Get product meta
                $subtitle = get_post_meta($product_id, '_bevision_product_subtitle', true);
                $title = get_post_meta($product_id, '_bevision_product_title', true);
                if (empty($title)) {
                    $title = get_the_title($product_id);
                }
                
                $features = get_post_meta($product_id, '_bevision_product_features', true);
                if (empty($features) || !is_array($features)) {
                    $features = array();
                }
                
                // Use static image if enabled, otherwise use product's featured image
                $product_image = '';
                if ($use_static_image && !empty($static_image)) {
                    $product_image = $static_image;
                } else {
                    $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product_id), 'full')[0] ?? '';
                }
                
                // Set tab ID
                $tab_id = 'product-' . $product_id;
                if (empty($first_product_id)) {
                    $first_product_id = $tab_id;
                }
                
                // Store product data
                $products[] = array(
                    'id' => $tab_id,
                    'postId' => $product_id,
                    'name' => get_the_title($product_id),
                    'subtitle' => $subtitle,
                    'title' => $title,
                    'features' => $features,
                    'image' => $product_image,
                    'excerpt' => get_the_excerpt($product_id),
                    'link' => get_permalink($product_id)
                );
            }
            wp_reset_postdata();
        } else {
            // We're showing all products, just process them in order
            foreach ($ordered_products_data as $product) {
                setup_postdata($product);
                
                $product_id = $product->ID;
                
                // Get product meta
                $subtitle = get_post_meta($product_id, '_bevision_product_subtitle', true);
                $title = get_post_meta($product_id, '_bevision_product_title', true);
                if (empty($title)) {
                    $title = get_the_title($product_id);
                }
                
                $features = get_post_meta($product_id, '_bevision_product_features', true);
                if (empty($features) || !is_array($features)) {
                    $features = array();
                }
                
                // Use static image if enabled, otherwise use product's featured image
                $product_image = '';
                if ($use_static_image && !empty($static_image)) {
                    $product_image = $static_image;
                } else {
                    $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product_id), 'full')[0] ?? '';
                }
                
                // Set tab ID
                $tab_id = 'product-' . $product_id;
                if (empty($first_product_id)) {
                    $first_product_id = $tab_id;
                }
                
                // Store product data
                $products[] = array(
                    'id' => $tab_id,
                    'postId' => $product_id,
                    'name' => get_the_title($product_id),
                    'subtitle' => $subtitle,
                    'title' => $title,
                    'features' => $features,
                    'image' => $product_image,
                    'excerpt' => get_the_excerpt($product_id),
                    'link' => get_permalink($product_id)
                );
            }
            wp_reset_postdata();
        }
    } else {
        // Standard query without manual ordering
        $args = array(
            'post_type' => 'bevision_product',
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        );
        
        // Filter by selected product IDs if not showing all products
        if (!$show_all_products && !empty($selected_product_ids)) {
            $args['post__in'] = $selected_product_ids;
        }
        
        // Exclude current product if we're on a single product page
        if ($current_product_id > 0) {
            $args['post__not_in'] = array($current_product_id);
        }
        
        $products_query = new WP_Query($args);
    }
    
    // Format products data if not using manual ordering
    if (!$manual_order && $products_query->have_posts()) {
        while ($products_query->have_posts()) {
            $products_query->the_post();
            $product_id = get_the_ID();
            
            // Get product meta
            $subtitle = get_post_meta($product_id, '_bevision_product_subtitle', true);
            $title = get_post_meta($product_id, '_bevision_product_title', true);
            if (empty($title)) {
                $title = get_the_title();
            }
            
            $features = get_post_meta($product_id, '_bevision_product_features', true);
            if (empty($features) || !is_array($features)) {
                $features = array();
            }
            
            // Use static image if enabled, otherwise use product's featured image
            $product_image = '';
            if ($use_static_image && !empty($static_image)) {
                $product_image = $static_image;
            } else {
                $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product_id), 'full')[0] ?? '';
            }
            
            // Set tab ID
            $tab_id = 'product-' . $product_id;
            if (empty($first_product_id)) {
                $first_product_id = $tab_id;
            }
            
            // Store product data
            $products[] = array(
                'id' => $tab_id,
                'postId' => $product_id,
                'name' => get_the_title(),
                'subtitle' => $subtitle,
                'title' => $title,
                'features' => $features,
                'image' => $product_image,
                'excerpt' => get_the_excerpt(),
                'link' => get_permalink()
            );
        }
        wp_reset_postdata();
    }
    
    // If no active tab specified, use the first product
    if (!empty($first_product_id)) {
        // Check if the specified active tab exists in our products
        $active_tab_exists = false;
        if (!empty($default_active_tab)) {
            foreach ($products as $product) {
                if ($product['id'] === $default_active_tab) {
                    $active_tab_exists = true;
                    break;
                }
            }
        }
        
        // If no active tab specified or the specified tab doesn't exist, use the first product
        if (empty($default_active_tab) || !$active_tab_exists) {
            $default_active_tab = $first_product_id;
        }
    }
    
    // If no products found, show default
    if (empty($products)) {
        $products[] = array(
            'id' => 'default-product',
            'name' => 'Default Product',
            'subtitle' => 'Product',
            'title' => 'No products found',
            'features' => array(
                'Please add products using the Products custom post type',
                'Each product will appear as a tab in this block',
                'Add features, images, and more through the admin'
            ),
            'image' => get_template_directory_uri() . '/src/images/default-product.png'
        );
        $default_active_tab = 'default-product';
    }

    // Start building output using Section component structure
    $output = '<section class="product-section" style="max-width: 1250px; margin: 0 auto; padding: 70px 0px 120px;  box-sizing: border-box; color: #333; position: relative; overflow: hidden; margin-bottom: 60px;">';
    $output .= '<style>
        /* Font family assignments for products block */
        .products-section-title,
        .products-section-subtitle {
            font-family: \'medium\' !important;
        }
        
        .products-tab-item {
            font-family: \'bold\' !important;
        }
        
        .products-subtitle,
        .products-title {
            font-family: \'medium\' !important;
        }
        
        .products-feature-item {
            font-family: \'roman\' !important;
        }
        .products-content-right {
            margin-left: 20px !important;
        }
        .products-button-group,
        .products-button-primary,
        .products-button-secondary {
            font-family: \'bold\' !important;
        }
        
        .products-tabs-nav {
            gap: 50px;
        }

        @media (max-width: 1250px) {
            .product-section {
                padding: 70px 20px 60px 20px !important;
            }
        }
        @media (max-width: 1024px) {
            .product-section {
                padding: 50px 20px 40px 20px !important;
            }
        }
        @media (max-width: 768px) {
            .products-section-title {
                font-size: 12px !important;
            }

            .products-section-subtitle {
                font-size: 26px !important;
                margin-bottom: 40px !important;
                }

            .product-section {
                padding: 60px 20px !important;
            }
            .products-grid {
                grid-template-columns: 1fr !important;
            }
            .products-content-right {
                display: none !important;
            }
            .products-mobile-image {
                display: block !important;
                width: 100% !important;
                height: 200px !important;
            }
            .products-tabs-nav {
                flex-wrap: wrap !important;
                justify-content: center !important;
                padding: 0 !important;
                gap: 20px !important;
                margin-bottom: 20px !important;
            }
            .products-tab-item {
                font-size: 16px !important;
                font-weight: 700 !important;
                color: #221A4C !important;
                background: transparent !important;
                padding: 0 !important;
                margin-right: 0 !important;
                border-radius: 0 !important;
                position: relative !important;
                height: 20px !important;
                line-height: 20px !important;
                display: flex !important;
                align-items: center !important;
            }
            /* ტაბის აქტიური მდგომარეობა იმართება JavaScript-ით */
            .products-tab-item:after {
                display: none !important;
            }
        }
    </style>';
    $output .= '<div style="position: absolute; top: 50%; right: -20%; width: 60%; height: 60%; transform: translateY(-50%); pointer-events: none; z-index: 1;" class="glow-effect"></div>';
    $output .= '<div style="position: relative; z-index: 2;">';
    
    // Section header - Use direct attribute values from block
    $output .= '<h2 class="products-section-title" style="color: #6653C6; text-align: center; font-size: 14px; font-style: normal; font-weight: 750; line-height: normal; margin: 0px 0px 5px;">' . esc_html($section_title) . '</h2>';
    $output .= '<h3 class="products-section-subtitle" style="color: var(--Dark-Blue, #221A4C); text-align: center; font-size: 30px; font-style: normal; font-weight: 750; line-height: normal; margin: 0px 0px 60px;">' . esc_html($section_subtitle) . '</h3>';
    
    // Build tabs navigation
    $output .= '<ul class="products-tabs-nav" style="display: flex; justify-content: center; list-style: none; padding: 0; margin-bottom: 30px;">';
    foreach ($products as $product) {
        $active_class = ($default_active_tab === $product['id']) ? ' active' : '';
        $active_style = ($default_active_tab === $product['id']) 
            ? 'color: #6653C6; background: #ecf0f8; border-radius: 5px;' 
            : 'color: #221A4C; background: #fff; border-radius: 5px;';
        
        $output .= '<li class="products-tab-item' . $active_class . '" data-tab="' . esc_attr($product['id']) . '" style="font-size: 20px; cursor: pointer; height: 40px; transition: all 0.3s ease; display: flex; align-items: center; padding: 0px 15px; font-weight: 700; ' . $active_style . '">';
        $output .= esc_html($product['name']);
        $output .= '</li>';
    }
    $output .= '</ul>';
    
    // Build tabs content
    $output .= '<div class="products-tabs-content">';
    foreach ($products as $product) {
        $display = ($default_active_tab === $product['id']) ? 'block' : 'none';
        
        $output .= '<div class="products-tab-content" data-tab-content="' . esc_attr($product['id']) . '" style="display: ' . $display . ';">';
        
        // Content grid with left and right columns
        $output .= '<div class="products-grid" style="display: grid; grid-template-columns: 55% 45%; align-items: center;">';
        
        // Left column with product info
        $output .= '<div class="products-content-left" style="padding: 0;">';
        $output .= '<p class="products-subtitle" style="color: #7B61FF; font-size: 18px; font-weight: 750; margin: 0px 0px 5px;">' . esc_html($product['subtitle']) . '</p>';
        $output .= '<h4 class="products-title" style="color: #333; font-size: 24px; font-weight: 750; margin: 0px 0px 20px;">' . esc_html($product['title']) . '</h4>';
        // Add product image after title for mobile view
        $output .= '<div class="products-mobile-image" style="display: none; margin-bottom: 20px; width: 100%;">';
        if (!empty($product['image'])) {
            $output .= '<img src="' . esc_url($product['image']) . '" alt="' . esc_attr($product['title']) . '" style="width: 100%; height: 200px; border-radius: 10px; object-fit: cover;" />';
        }
        $output .= '</div>';
        
        // Features list
        if (!empty($product['features'])) {
            $output .= '<ul class="products-feature-list" style="list-style: none; padding: 0; margin-bottom: 32px;">';
            foreach ($product['features'] as $feature) {
                $output .= '<li class="products-feature-item" style="position: relative; padding-left: 28px; margin-bottom: 19px; color: #333; font-size: 18px; font-weight: 400;">';
                $output .= '<img src="' . get_template_directory_uri() . '/assets/images/service-checked-icon.svg" alt="✓" style="position: absolute; top: 3px; left: 0; width: 15px; height: 9px;" />';
                $output .= '<span>' . esc_html($feature) . '</span>';
                $output .= '</li>';
            }
            $output .= '</ul>';
        }
        
        // Add buttons - Learn More and Book a Call
        if ($product['id'] !== 'default-product') {
            $output .= '<div class="products-button-group" style="display: flex; gap: 16px; margin-top: 32px;">';
            
            // Learn More button (links to product page)
            if (!empty($product['link'])) {
                $output .= '<a href="' . esc_url($product['link']) . '" class="products-button products-button-primary" style="background-color: #6653C6; color: #fff; padding: 0px 40px; font-size: 16px; font-style: normal; font-weight: 700; line-height: normal; border: none; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: flex; align-items: center; justify-content: center; height: 50px;">' . esc_html($primary_button_text) . '</a>';
            }
            
            // Book a Call button (opens popup)
            $output .= '<button class="products-button products-button-secondary open-lead-popup" style="background-color: #2FCA02; color: #fff; padding: 0px 40px; font-size: 16px; font-style: normal; font-weight:750; line-height: normal; border: none; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; height: 50px;">' . esc_html($secondary_button_text) . '</button>';
            
            $output .= '</div>';
        }
        
        $output .= '</div>'; // End left column
        
        // Right column with product image
        $output .= '<div class="products-content-right" style="height: 300px; background-size: cover; background-position: center; border-radius: 12px; overflow: hidden;">';
        if (!empty($product['image'])) {
            $output .= '<img class="products-image" src="' . esc_url($product['image']) . '" alt="' . esc_attr($product['name']) . '" />';
        }
        $output .= '</div>'; // End right column
        
        $output .= '</div>'; // End grid
        $output .= '</div>'; // End tab content
    }
    $output .= '</div>'; // End tabs content
    
    // Add JavaScript for tab interaction
    $output .= '<script>
    document.addEventListener("DOMContentLoaded", function() {
        // Get all tab elements
        const tabItems = document.querySelectorAll(".products-tab-item");
        const tabContents = document.querySelectorAll(".products-tab-content");
        
        // Mobile style adjustments
        const ensureFirstFourTabsInRow = () => {
            if (window.innerWidth <= 767) {
                const tabsNav = document.querySelector(".products-tabs-nav");
                if (!tabsNav) return;
                
                const tabItems = tabsNav.querySelectorAll(".products-tab-item");
                // Force first 4 items to have exact 25% - 6px width
                for (let i = 0; i < Math.min(4, tabItems.length); i++) {
                    tabItems[i].style.flex = "0 0 calc(25% - 6px)";
                }
            }
        };
        
        // Call it on load and resize
        ensureFirstFourTabsInRow();
        window.addEventListener("resize", ensureFirstFourTabsInRow);
        
        // Add CSS for mobile responsiveness
        const style = document.createElement("style");
        style.innerHTML = `
            .products-tab-item:hover { color: #6653C6 !important; background: #ecf0f8 !important; }
            
            @media screen and (max-width: 767px) {
                .products-tab-item.active {
                    background: transparent !important;
                }
            }
            
            @media screen and (max-width: 767px) {
                .products-tabs-nav { 
                    display: flex; 
                    flex-wrap: wrap; 
                    justify-content: space-between; 
                    padding: 0 10px 10px; 
                    margin-bottom: 20px !important; 
                    width: 100%; 
                }
                .products-tab-item { 
                    flex: 0 0 auto; 
                    width: calc(25% - 8px); 
                    white-space: nowrap; 
                    font-size: 20px !important; 
                    padding: 8px 5px !important; 
                    font-weight: 700 !important;
                    margin: 0 0 8px; 
                    text-align: center; 
                    overflow: hidden; 
                    text-overflow: ellipsis; 
                }
                .products-tab-item:nth-child(-n+4) { 
                    margin-bottom: 8px; 
                }
                .products-grid { 
                    display: flex !important; 
                    flex-direction: column !important; 
                    gap: 20px !important; 
                    padding: 0; 
                }
                .products-content-left { 
                    width: 100% !important; 
                    order: 2; 
                    border-radius: 20px !important;
                }
                .products-content-right { 
                    width: 100% !important; 
                    order: 1; 
                    margin-bottom: 0; 
                    height: 180px !important; 
                    border-radius: 12px !important; 
                }
                .products-image {
                    width: 92% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    object-position: center !important;
                }
                .products-subtitle { 
                    font-size: 12px !important; 
                    font-weight: 750 !important; 
                    text-align: center !important;
                }
                .products-title { 
                    font-size: 20px !important; 
                    font-weight: 750 !important; 
                    margin-bottom: 20px !important; 
                    text-align: center !important;
                }
                .products-feature-list { 
                    margin-bottom: 20px; 
                }
                .products-feature-list li { 
                    font-size: 20px !important; 
                    margin-bottom: 8px !important; 
                    line-height: 1.4 !important; 
                    padding-left: 24px !important; 
                    background-position: 0 4px !important; 
                }
                .products-button-group { 
                    display: flex; 
                    flex-direction: row !important; 
                    gap: 20px !important; 
                    justify-content: center;
                    margin-bottom: 0px; 
                    margin-top: 0px !important; 
                }
                .products-button { 
                    flex: 1; 
                    font-size: 16px !important; 
                    font-style: normal !important;
                    font-weight: 700 !important; 
                    line-height: normal !important;
                    text-align: center; 
                    border-radius: 10px !important; 
                    white-space: normal !important;
                    padding: 0 10px !important;
                    height: 50px !important;
                }
                .products-section { 
                    padding: 60px 0 !important; 
                    margin: 0 !important; 
                }
                .products-section > div { 
                    padding: 0 20px !important; 
                }
                .products-section h2 { 
                    font-size: 20px !important; 
                }
                .products-section h3 { 
                    font-size: 28px !important; 
                    margin-bottom: 20px !important;
                    text-align: center; 
                }
                .products-content-left {
                    padding: 20px !important;
                    background: white !important;
                    box-shadow: 0px 10px 60px 0px rgba(102, 83, 198, 0.15) !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                    overflow-x: hidden !important;
                }
                .products-feature-item,
                .products-feature-list .products-feature-item {
                    font-size: 14px !important;
                }
                .products-feature-item * {
                    font-size: 14px !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Function to set active tab
        function setActiveTab(tabId) {
            tabItems.forEach(item => {
                if (item.dataset.tab === tabId) {
                    item.style.color = "#6653C6";
                    item.style.background = "#ecf0f8";
                    item.style.borderRadius = "5px";
                    item.classList.add("active");
                } else {
                    item.style.color = "#221A4C";
                    item.style.background = "#fff";
                    item.style.borderRadius = "5px";
                    item.classList.remove("active");
                }
            });

            tabContents.forEach(content => {
                if (content.dataset.tabContent === tabId) {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            });
        }

        // Add click event to tabs
        tabItems.forEach(tab => {
            tab.addEventListener("click", () => {
                const tabId = tab.dataset.tab;
                setActiveTab(tabId);
            });
        });
    });
    </script>';
    
    $output .= '</div>'; // End inner container
    $output .= '</section>'; // End section wrapper
    
    return $output;
}

/**
 * Register Products CPT block
 */
function bevision_register_products_cpt_block() {
    register_block_type('bevision/products-cpt', array(
        'api_version' => 2,
        'editor_script' => 'bevision-editor-script',
        'style' => 'bevision-style',
        'render_callback' => 'bevision_render_products_cpt_block',
        'attributes' => array(
            'sectionTitle' => array(
                'type' => 'string',
                'default' => 'PRODUCTS'
            ),
            'sectionSubtitle' => array(
                'type' => 'string',
                'default' => 'What we offer'
            ),
            'activeTab' => array(
                'type' => 'string',
                'default' => ''
            ),
            'defaultTabId' => array(
                'type' => 'string',
                'default' => ''
            ),
            'selectedProductIds' => array(
                'type' => 'array',
                'default' => array()
            ),
            'showAllProducts' => array(
                'type' => 'boolean',
                'default' => true
            ),
            'staticImage' => array(
                'type' => 'string',
                'default' => ''
            ),
            'useStaticImage' => array(
                'type' => 'boolean',
                'default' => true
            ),
            'manualOrder' => array(
                'type' => 'boolean',
                'default' => false
            ),
            'customOrderIds' => array(
                'type' => 'array',
                'default' => array()
            )
        )
    ));
}
add_action('init', 'bevision_register_products_cpt_block');
