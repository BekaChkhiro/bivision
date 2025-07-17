<?php
function bevision_register_blocks() {
    if (!function_exists('register_block_type')) {
        return;
    }

    // Layout blocks
    register_block_type(get_template_directory() . '/src/blocks/layout/footer');
    register_block_type(get_template_directory() . '/src/blocks/layout/hero-section');
    register_block_type(get_template_directory() . '/src/blocks/layout/header-section');
    
    // Content blocks
    register_block_type(get_template_directory() . '/src/blocks/content/products');
    register_block_type(get_template_directory() . '/src/blocks/content/products-cpt');
    register_block_type(get_template_directory() . '/src/blocks/content/importance-section');
    register_block_type(get_template_directory() . '/src/blocks/content/why-bivision');
    register_block_type(get_template_directory() . '/src/blocks/content/partners');
    register_block_type(get_template_directory() . '/src/blocks/content/analytics-hero');
    register_block_type(get_template_directory() . '/src/blocks/content/client-testimonials');
    register_block_type(get_template_directory() . '/src/blocks/content/product-hero');
    register_block_type(get_template_directory() . '/src/blocks/content/dashboard-features');
    register_block_type(get_template_directory() . '/src/blocks/content/category-analysis');
    register_block_type(get_template_directory() . '/src/blocks/content/cross-sell-basket');
    register_block_type(get_template_directory() . '/src/blocks/content/lead-popup');
    
    // Register posts tab block with additional settings
    register_block_type('bevision/posts-tab', array(
        'render_callback' => 'bevision_render_posts_tab',
        'supports' => array(
            'align' => true,
            'html' => false
        ),
        'attributes' => array(
            'categories' => array(
                'type' => 'array',
                'default' => array()
            ),
            'currentTab' => array(
                'type' => 'string',
                'default' => 'all'
            ),
            'postsPerPage' => array(
                'type' => 'number',
                'default' => 4
            ),
            'maxPosts' => array(
                'type' => 'number',
                'default' => 12
            )
        )
    ));
    
    // Product blocks
    register_block_type('bevision/product-cards', array(
        'render_callback' => 'bevision_render_product_cards',
        'attributes' => array(
            'title' => array(
                'type' => 'string',
                'default' => 'პროდუქტები'
            ),
            'description' => array(
                'type' => 'string',
                'default' => 'ჩვენი პროდუქტების კოლექცია'
            ),
            'numberOfProducts' => array(
                'type' => 'number',
                'default' => 3
            ),
            'orderBy' => array(
                'type' => 'string',
                'default' => 'date'
            ),
            'order' => array(
                'type' => 'string',
                'default' => 'desc'
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

// Register blocks on init
add_action('init', 'bevision_register_blocks');

// Add post visibility support
add_action('init', function() {
    add_post_type_support('post', 'custom-fields');
    add_post_type_support('post', 'excerpt');
    add_post_type_support('post', 'thumbnail');
});

/**
 * Render the Product Cards block with products from bevision_product CPT
 */
function bevision_render_product_cards($attributes) {
    // Get block attributes
    $title = !empty($attributes['title']) ? $attributes['title'] : 'პროდუქტები';
    $description = !empty($attributes['description']) ? $attributes['description'] : 'ჩვენი პროდუქტების კოლექცია';
    $number_of_products = !empty($attributes['numberOfProducts']) ? intval($attributes['numberOfProducts']) : 3;
    $manual_order = isset($attributes['manualOrder']) ? $attributes['manualOrder'] : false;
    $custom_order_ids = isset($attributes['customOrderIds']) ? $attributes['customOrderIds'] : array();
    $order_by = !empty($attributes['orderBy']) ? $attributes['orderBy'] : 'date';
    $order = !empty($attributes['order']) ? $attributes['order'] : 'DESC';
    
    // Initialize products variable
    $products = array();
    
    // Handle manual ordering if enabled and we have custom order IDs
    if ($manual_order && !empty($custom_order_ids)) {
        // First, get all products according to custom order
        $ordered_products = array();
        
        // Get each product by ID in the order specified
        foreach ($custom_order_ids as $product_id) {
            $product = get_post($product_id);
            if ($product && $product->post_status === 'publish' && $product->post_type === 'bevision_product') {
                $ordered_products[] = $product;
            }
        }
        
        // Trim to the number of products requested
        $products = array_slice($ordered_products, 0, $number_of_products);
        
        // If we still need more products (e.g., if some were deleted), get additional ones
        if (count($products) < $number_of_products) {
            $existing_ids = array_map(function($p) { return $p->ID; }, $products);
            
            $args = array(
                'post_type' => 'bevision_product',
                'post_status' => 'publish',
                'posts_per_page' => $number_of_products - count($products),
                'orderby' => $order_by,
                'order' => $order,
                'post__not_in' => $existing_ids
            );
            
            $additional_products = get_posts($args);
            $products = array_merge($products, $additional_products);
        }
    } else {
        // Standard query without manual ordering
        $args = array(
            'post_type' => 'bevision_product',
            'post_status' => 'publish',
            'posts_per_page' => $number_of_products,
            'orderby' => $order_by,
            'order' => $order
        );
        
        $products = get_posts($args);
    }
    
    // Start building the output HTML
    $output = '<div class="product-cards-wrapper">';
    $output .= '<div class="product-cards-container">';
    
    // Header section
    $output .= '<div class="product-cards-header">';
    $output .= '<h2 class="product-cards-title">' . esc_html($title) . '</h2>';
    $output .= '<p class="product-cards-description">' . esc_html($description) . '</p>';
    $output .= '</div>';
    
    // Cards grid
    $output .= '<div class="product-cards-grid">';
    
    if (!empty($products)) {
        foreach ($products as $product) {
            // Get product meta data
            $product_title = get_post_meta($product->ID, '_bevision_product_title', true) ?: $product->post_title;
            $product_subtitle = get_post_meta($product->ID, '_bevision_product_subtitle', true) ?: '';
            $product_description = get_post_meta($product->ID, '_bevision_product_description', true) ?: '';
            
            // Set description text for the card - prioritize custom description field
            $description = !empty($product_description) ? $product_description : 
                          (!empty($product_subtitle) ? $product_subtitle : get_the_excerpt($product));
            
            $link = get_permalink($product);
            
            // Get featured image
            $image_url = '';
            $image_alt = $product_title;
            if (has_post_thumbnail($product)) {
                $thumbnail_id = get_post_thumbnail_id($product);
                $thumbnail = wp_get_attachment_image_src($thumbnail_id, 'medium');
                if ($thumbnail) {
                    $image_url = $thumbnail[0];
                    $image_alt_text = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                    if ($image_alt_text) {
                        $image_alt = $image_alt_text;
                    }
                }
            }
            
            // Build individual product card
            $output .= '<div class="product-card-wrapper">';
            if ($link) {
                $output .= '<a href="' . esc_url($link) . '" class="product-card-link">';
            }
            $output .= '<div class="product-card' . ($link ? ' has-link' : '') . '">';
            
            // Image container
            $output .= '<div class="product-card-image-container">';
            if ($image_url) {
                $output .= '<img src="' . esc_url($image_url) . '" alt="' . esc_attr($image_alt) . '" class="product-card-image">';
            } else {
                $output .= '<div class="product-card-placeholder">No Image</div>';
            }
            $output .= '</div>';
            
            // Content
            $output .= '<div class="product-card-content">';
            $output .= '<h3 class="product-card-title">' . esc_html($product_title) . '</h3>';
            $output .= '<p class="product-card-description">' . wp_kses_post($description) . '</p>';
            $output .= '</div>';
            
            $output .= '</div>';
            if ($link) {
                $output .= '</a>';
            }
            $output .= '</div>';
        }
    } else {
        $output .= '<div class="no-products-message"><p>პროდუქტები ვერ მოიძებნა. გთხოვთ, დაამატოთ პროდუქტები bevision_product ტიპში.</p></div>';
    }
    
    $output .= '</div>'; // Close product-cards-grid
    $output .= '</div>'; // Close product-cards-container
    $output .= '</div>'; // Close product-cards-wrapper
    
    return $output;
}
