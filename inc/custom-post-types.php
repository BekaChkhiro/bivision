<?php
/**
 * Register custom post types for BeVision theme
 */

// Register product meta fields for REST API
function bevision_register_product_meta_rest() {
    // Register all meta fields as a single object
    register_rest_field('bevision_product', 'meta', array(
        'get_callback' => function($post) {
            return array(
                '_bevision_product_page_title' => get_post_meta($post['id'], '_bevision_product_page_title', true),
                '_bevision_product_subtitle' => get_post_meta($post['id'], '_bevision_product_subtitle', true),
                '_bevision_product_title' => get_post_meta($post['id'], '_bevision_product_title', true),
                '_bevision_product_features' => get_post_meta($post['id'], '_bevision_product_features', true),
                '_bevision_product_description' => get_post_meta($post['id'], '_bevision_product_description', true)
            );
        },
        'schema' => array(
            'description' => 'Product meta fields',
            'type' => 'object',
        )
    ));
}
add_action('rest_api_init', 'bevision_register_product_meta_rest');

// Register Product Custom Post Type
function bevision_register_product_post_type() {
    $labels = array(
        'name'                  => _x( 'Products', 'Post type general name', 'bevision' ),
        'singular_name'         => _x( 'Product', 'Post type singular name', 'bevision' ),
        'menu_name'             => _x( 'Products', 'Admin Menu text', 'bevision' ),
        'name_admin_bar'        => _x( 'Product', 'Add New on Toolbar', 'bevision' ),
        'add_new'               => __( 'Add New', 'bevision' ),
        'add_new_item'          => __( 'Add New Product', 'bevision' ),
        'new_item'              => __( 'New Product', 'bevision' ),
        'edit_item'             => __( 'Edit Product', 'bevision' ),
        'view_item'             => __( 'View Product', 'bevision' ),
        'all_items'             => __( 'All Products', 'bevision' ),
        'search_items'          => __( 'Search Products', 'bevision' ),
        'parent_item_colon'     => __( 'Parent Products:', 'bevision' ),
        'not_found'             => __( 'No products found.', 'bevision' ),
        'not_found_in_trash'    => __( 'No products found in Trash.', 'bevision' ),
        'featured_image'        => __( 'Product Image', 'bevision' ),
        'set_featured_image'    => __( 'Set product image', 'bevision' ),
        'remove_featured_image' => __( 'Remove product image', 'bevision' ),
        'use_featured_image'    => __( 'Use as product image', 'bevision' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'product' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-products',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'page-attributes' ),
        'show_in_rest'       => true, // Enable Gutenberg editor
        'template_lock'      => false,
        'map_meta_cap'       => true
    );

    register_post_type( 'bevision_product', $args );
}
add_action( 'init', 'bevision_register_product_post_type' );

// Register custom taxonomy for product categories
function bevision_register_product_category_taxonomy() {
    $labels = array(
        'name'              => _x( 'Product Categories', 'taxonomy general name', 'bevision' ),
        'singular_name'     => _x( 'Product Category', 'taxonomy singular name', 'bevision' ),
        'search_items'      => __( 'Search Product Categories', 'bevision' ),
        'all_items'         => __( 'All Product Categories', 'bevision' ),
        'parent_item'       => __( 'Parent Product Category', 'bevision' ),
        'parent_item_colon' => __( 'Parent Product Category:', 'bevision' ),
        'edit_item'         => __( 'Edit Product Category', 'bevision' ),
        'update_item'       => __( 'Update Product Category', 'bevision' ),
        'add_new_item'      => __( 'Add New Product Category', 'bevision' ),
        'new_item_name'     => __( 'New Product Category Name', 'bevision' ),
        'menu_name'         => __( 'Categories', 'bevision' ),
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'product-category' ),
        'show_in_rest'      => true,
    );

    register_taxonomy( 'product_category', array( 'bevision_product' ), $args );
}
add_action( 'init', 'bevision_register_product_category_taxonomy' );

// Add custom meta boxes for product fields
function bevision_add_product_meta_boxes() {
    add_meta_box(
        'bevision_product_details',
        __( 'Product Details', 'bevision' ),
        'bevision_product_details_callback',
        'bevision_product',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'bevision_add_product_meta_boxes' );

// Meta box callback function
function bevision_product_details_callback( $post ) {
    wp_nonce_field( 'bevision_product_details_nonce', 'bevision_product_details_nonce' );

    // Get the saved meta values
    $page_title = get_post_meta( $post->ID, '_bevision_product_page_title', true );
    $subtitle = get_post_meta( $post->ID, '_bevision_product_subtitle', true );
    $title = get_post_meta( $post->ID, '_bevision_product_title', true );
    $description = get_post_meta( $post->ID, '_bevision_product_description', true );
    $features = get_post_meta( $post->ID, '_bevision_product_features', true );
    
    if (!is_array($features)) {
        $features = array('');
    }
    
    ?>
    <style>
        .bevision-meta-field {
            margin-bottom: 15px;
        }
        .bevision-meta-field label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .bevision-meta-field input[type="text"] {
            width: 100%;
        }
        .bevision-features-list {
            margin-bottom: 15px;
        }
        .bevision-feature-item {
            display: flex;
            margin-bottom: 10px;
            align-items: center;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 8px;
            transition: background-color 0.3s ease;
            position: relative;
        }
        .bevision-feature-item.ui-sortable-helper {
            background-color: #f0f6fc;
            box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            border: 1px solid #2271b1;
        }
        .bevision-feature-item input {
            flex-grow: 1;
            border: 1px solid #ddd;
            padding: 6px 8px;
            border-radius: 3px;
        }
        .bevision-feature-item button {
            margin-left: 5px;
        }
        .feature-handle {
            cursor: move;
            padding: 0 10px;
            color: #666;
            margin-right: 5px;
        }
        .feature-handle .dashicons {
            font-size: 20px;
            width: 20px;
            height: 20px;
        }
        .feature-handle:hover {
            color: #2271b1;
        }
        .feature-order-buttons {
            display: flex;
            flex-direction: column;
            margin-left: 5px;
        }
        .feature-order-buttons button {
            padding: 0;
            width: 28px;
            height: 19px;
            margin: 1px;
            line-height: 0;
        }
        .feature-order-buttons .dashicons {
            font-size: 16px;
            width: 16px;
            height: 16px;
        }
        .ui-sortable-placeholder {
            visibility: visible !important;
            background-color: #e6f2fa;
            border: 1px dashed #2271b1;
            height: 43px;
            margin-bottom: 10px;
        }
        .bevision-add-feature {
            margin-top: 15px;
        }
        .updated-item {
            background-color: #eaf7ff !important;
            border-color: #2271b1 !important;
            transition: background-color 1s ease;
        }
    </style>

    <div class="bevision-meta-field">
        <p style="color: #2271b1; font-weight: bold; padding: 10px; background: #f0f6fc; border-left: 4px solid #2271b1;">
            <?php _e( 'ამ ველით შეგიძლიათ მართოთ პროდუქტის ძირითადი სათაური. შენახვისას ავტომატურად განახლდება WordPress-ის სათაურის ველიც.', 'bevision' ); ?>
        </p>
        <label for="bevision_product_page_title"><?php _e( 'პროდუქტის სათაური', 'bevision' ); ?></label>
        <input type="text" id="bevision_product_page_title" name="bevision_product_page_title" value="<?php echo esc_attr( $page_title ); ?>">
        <p class="description"><?php _e( 'შეიყვანეთ პროდუქტის სახელი. ეს სათაური გამოჩნდება როგორც WordPress-ის ჩვეულებრივი სათაური, ისე პროდუქტის გვერდზე.', 'bevision' ); ?></p>
    </div>

    <div class="bevision-meta-field">
        <label for="bevision_product_subtitle"><?php _e( 'Subtitle', 'bevision' ); ?></label>
        <input type="text" id="bevision_product_subtitle" name="bevision_product_subtitle" value="<?php echo esc_attr( $subtitle ); ?>">
    </div>

    <div class="bevision-meta-field">
        <label for="bevision_product_title"><?php _e( 'Display Title', 'bevision' ); ?></label>
        <input type="text" id="bevision_product_title" name="bevision_product_title" value="<?php echo esc_attr( $title ); ?>">
        <p class="description"><?php _e( 'This is the title displayed in the product tabs. If left empty, the post title will be used.', 'bevision' ); ?></p>
    </div>

    <div class="bevision-meta-field">
        <label for="bevision_product_description"><?php _e( 'Description', 'bevision' ); ?></label>
        <textarea id="bevision_product_description" name="bevision_product_description" rows="4" style="width: 100%;"><?php echo esc_textarea( $description ); ?></textarea>
        <p class="description"><?php _e( 'Enter a short description for this product. This will be displayed in the product card.', 'bevision' ); ?></p>
    </div>

    <div class="bevision-meta-field">
        <label><?php _e( 'Features', 'bevision' ); ?></label>
        <div class="bevision-features-list">
            <?php foreach ( $features as $index => $feature ) : ?>
                <div class="bevision-feature-item">
                    <span class="feature-handle" title="<?php _e( 'Drag to reorder', 'bevision' ); ?>"><span class="dashicons dashicons-menu"></span></span>
                    <input type="text" name="bevision_product_features[]" value="<?php echo esc_attr( $feature ); ?>">
                    <div class="feature-order-buttons">
                        <button type="button" class="button move-up" title="<?php _e( 'Move Up', 'bevision' ); ?>"><span class="dashicons dashicons-arrow-up-alt"></span></button>
                        <button type="button" class="button move-down" title="<?php _e( 'Move Down', 'bevision' ); ?>"><span class="dashicons dashicons-arrow-down-alt"></span></button>
                    </div>
                    <button type="button" class="button button-secondary remove-feature"><?php _e( 'Remove', 'bevision' ); ?></button>
                </div>
            <?php endforeach; ?>
        </div>
        <button type="button" class="button button-secondary bevision-add-feature"><?php _e( 'Add Feature', 'bevision' ); ?></button>
    </div>

    <script>
        jQuery(document).ready(function($) {
            // Initialize sortable for drag-and-drop reordering
            $('.bevision-features-list').sortable({
                handle: '.feature-handle',
                axis: 'y',
                opacity: 0.8,
                placeholder: 'ui-sortable-placeholder',
                forcePlaceholderSize: true,
                update: function(event, ui) {
                    // Add visual feedback
                    ui.item.addClass('updated-item');
                    setTimeout(function() {
                        $('.bevision-feature-item').removeClass('updated-item');
                    }, 1000);
                }
            });

            // Add new feature
            $('.bevision-add-feature').on('click', function() {
                var newFeature = $('<div class="bevision-feature-item">' +
                    '<span class="feature-handle" title="<?php _e( 'Drag to reorder', 'bevision' ); ?>"><span class="dashicons dashicons-menu"></span></span>' +
                    '<input type="text" name="bevision_product_features[]" value="">' +
                    '<div class="feature-order-buttons">' +
                    '<button type="button" class="button move-up" title="<?php _e( 'Move Up', 'bevision' ); ?>"><span class="dashicons dashicons-arrow-up-alt"></span></button>' +
                    '<button type="button" class="button move-down" title="<?php _e( 'Move Down', 'bevision' ); ?>"><span class="dashicons dashicons-arrow-down-alt"></span></button>' +
                    '</div>' +
                    '<button type="button" class="button button-secondary remove-feature"><?php _e( 'Remove', 'bevision' ); ?></button>' +
                    '</div>');
                $('.bevision-features-list').append(newFeature);
                
                // Focus on the newly added input
                newFeature.find('input').focus();
                
                // Scroll to the new feature
                $('html, body').animate({
                    scrollTop: newFeature.offset().top - 100
                }, 300);
            });

            // Remove feature
            $(document).on('click', '.remove-feature', function() {
                var item = $(this).parent('.bevision-feature-item');
                
                // Fade out and remove
                item.fadeOut(300, function() {
                    item.remove();
                });
            });
            
            // Move feature up
            $(document).on('click', '.move-up', function() {
                var currentItem = $(this).closest('.bevision-feature-item');
                var prevItem = currentItem.prev('.bevision-feature-item');
                
                if (prevItem.length) {
                    // Add visual feedback
                    currentItem.addClass('updated-item');
                    
                    // Move item
                    currentItem.insertBefore(prevItem);
                    
                    // Remove visual feedback after a delay
                    setTimeout(function() {
                        currentItem.removeClass('updated-item');
                    }, 1000);
                }
            });
            
            // Move feature down
            $(document).on('click', '.move-down', function() {
                var currentItem = $(this).closest('.bevision-feature-item');
                var nextItem = currentItem.next('.bevision-feature-item');
                
                if (nextItem.length) {
                    // Add visual feedback
                    currentItem.addClass('updated-item');
                    
                    // Move item
                    currentItem.insertAfter(nextItem);
                    
                    // Remove visual feedback after a delay
                    setTimeout(function() {
                        currentItem.removeClass('updated-item');
                    }, 1000);
                }
            });
        });
    </script>
    <?php
}

// Save meta box data
function bevision_save_product_meta( $post_id ) {
    // Check if nonce is set
    if ( ! isset( $_POST['bevision_product_details_nonce'] ) ) {
        return;
    }

    // Verify that the nonce is valid
    if ( ! wp_verify_nonce( $_POST['bevision_product_details_nonce'], 'bevision_product_details_nonce' ) ) {
        return;
    }

    // If this is an autosave, don't save
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    // Check the user's permissions
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // Save page title and update post title if present
    if ( isset( $_POST['bevision_product_page_title'] ) && !empty( $_POST['bevision_product_page_title'] ) ) {
        $page_title = sanitize_text_field( $_POST['bevision_product_page_title'] );
        update_post_meta( $post_id, '_bevision_product_page_title', $page_title );
        
        // Update the actual WordPress post title
        wp_update_post( array(
            'ID' => $post_id,
            'post_title' => $page_title
        ));
    }
    
    // Save subtitle
    if ( isset( $_POST['bevision_product_subtitle'] ) ) {
        update_post_meta( $post_id, '_bevision_product_subtitle', sanitize_text_field( $_POST['bevision_product_subtitle'] ) );
    }

    // Save title
    if ( isset( $_POST['bevision_product_title'] ) ) {
        update_post_meta( $post_id, '_bevision_product_title', sanitize_text_field( $_POST['bevision_product_title'] ) );
    }
    
    // Save description
    if ( isset( $_POST['bevision_product_description'] ) ) {
        update_post_meta( $post_id, '_bevision_product_description', sanitize_textarea_field( $_POST['bevision_product_description'] ) );
    }

    // Save features
    if ( isset( $_POST['bevision_product_features'] ) ) {
        $features = array_map( 'sanitize_text_field', $_POST['bevision_product_features'] );
        // Remove empty features
        $features = array_filter($features, function($feature) {
            return !empty(trim($feature));
        });
        // Reset array keys to ensure we have a clean sequential array
        $features = array_values($features);
        update_post_meta( $post_id, '_bevision_product_features', $features );
    }
}
add_action( 'save_post_bevision_product', 'bevision_save_product_meta' );

/**
 * Filter to support custom templates for products
 */
function bevision_product_template( $template ) {
    global $post, $wp_query;
    
    // Only for single product pages
    if ( is_singular('bevision_product') ) {
        // Add debugging information (will appear in HTML comments)
        error_log('BeVision Debug: Viewing product ID ' . $post->ID);
        
        // Check if template attribute exists
        $template_slug = get_page_template_slug($post->ID);
        error_log('BeVision Debug: Template slug from get_page_template_slug: ' . ($template_slug ? $template_slug : 'none'));
        
        // Also try direct meta value
        $meta_template = get_post_meta($post->ID, '_wp_page_template', true);
        error_log('BeVision Debug: Template from post meta: ' . ($meta_template ? $meta_template : 'none'));
        
        // First try to use the template specifically set for this post
        if (!empty($template_slug) && $template_slug !== 'default') {
            $template_path = locate_template($template_slug);
            if (!empty($template_path) && file_exists($template_path)) {
                error_log('BeVision Debug: Using template: ' . $template_path);
                return $template_path;
            }
        }
        
        // Alternative approach using direct meta value
        if (!empty($meta_template) && $meta_template !== 'default') {
            $direct_path = get_template_directory() . '/' . $meta_template;
            if (file_exists($direct_path)) {
                error_log('BeVision Debug: Using direct template path: ' . $direct_path);
                return $direct_path;
            }
        }
        
        // Fallback to single-bevision_product.php
        $fallback = get_template_directory() . '/single-bevision_product.php';
        if (file_exists($fallback)) {
            error_log('BeVision Debug: Using fallback template: ' . $fallback);
            return $fallback;
        }
        
        error_log('BeVision Debug: No custom template found, using default: ' . $template);
    }
    
    return $template;
}
add_filter( 'template_include', 'bevision_product_template', 99 );

/**
 * Make page templates available to the custom post type
 */
function bevision_add_product_templates($post_templates, $wp_theme, $post, $post_type) {
    // Only add these templates to our custom post type
    if ($post_type !== 'bevision_product') {
        return $post_templates;
    }
    
    // Add our custom templates
    $post_templates['template-product.php'] = 'Product Template';
    $post_templates['template-product-fullwidth.php'] = 'Product Full Width';
    $post_templates['template-product-sidebar.php'] = 'Product With Sidebar';
    
    return $post_templates;
}
add_filter('theme_bevision_product_templates', 'bevision_add_product_templates', 10, 4);

/**
 * Fix page templates not appearing for custom post types
 */
function bevision_register_product_templates() {
    if (!class_exists('PageTemplater')) {
        /**
         * PageTemplater Class
         */
        class PageTemplater {
            /**
             * The array of templates that this plugin tracks.
             */
            protected $templates;

            /**
             * Initializes the plugin by setting filters and administration functions.
             */
            public function __construct() {
                $this->templates = array();

                // Add a filter to the theme page templates to assign our custom templates to the post type
                add_filter('theme_page_templates', array($this, 'add_new_template'));
                add_filter('theme_bevision_product_templates', array($this, 'add_new_template'));

                // Add a filter to the save post to inject out template into the page cache
                add_filter('wp_insert_post_data', array($this, 'register_project_templates'));

                // Add a filter to the template include to determine if the page has our template assigned and return it's path
                add_filter('template_include', array($this, 'view_project_template'), 99);

                // Add templates to this array.
                $this->templates = array(
                    'template-product.php' => 'Product Template',
                    'template-product-fullwidth.php' => 'Product Full Width',
                    'template-product-sidebar.php' => 'Product With Sidebar',
                );
            }

            /**
             * Adds our template to the page dropdown
             */
            public function add_new_template($posts_templates) {
                $posts_templates = array_merge($posts_templates, $this->templates);
                return $posts_templates;
            }

            /**
             * Adds our template to the pages cache in order to trick WordPress
             * into thinking the template file exists where it doesn't really exist.
             */
            public function register_project_templates($atts) {
                // Create the key used for the themes cache
                $cache_key = 'page_templates-' . md5(get_theme_root() . '/' . get_stylesheet());

                // Retrieve the cache list.
                $templates = wp_get_theme()->get_page_templates();
                if (empty($templates)) {
                    $templates = array();
                }

                // Remove the old cache
                wp_cache_delete($cache_key, 'themes');

                // Add our templates to the list
                $templates = array_merge($templates, $this->templates);

                // Add the modified cache to allow WordPress to pick it up for listing available templates
                wp_cache_add($cache_key, $templates, 'themes', 1800);

                return $atts;
            }

            /**
             * Checks if the template is assigned to the page
             */
            public function view_project_template($template) {
                global $post;
                
                if (!is_singular('bevision_product')) {
                    return $template;
                }
                
                if (!isset($post)) {
                    return $template;
                }
                
                $page_template = get_post_meta($post->ID, '_wp_page_template', true);
                
                if (!isset($this->templates[$page_template])) {
                    return $template;
                }
                
                $file = get_template_directory() . '/' . $page_template;
                
                // Just to be safe, check if the file exists
                if (file_exists($file)) {
                    return $file;
                }
                
                // Return the default template if we can't find the one we want
                return $template;
            }
        }
        
        // Instantiate the class
        new PageTemplater();
    }
}

// Hook into the 'init' action early
add_action('init', 'bevision_register_product_templates', 5);
