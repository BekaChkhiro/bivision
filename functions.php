<?php

// Enable error reporting for debugging
if (!defined('WP_DEBUG')) {
    define('WP_DEBUG', true);
}
if (!defined('WP_DEBUG_DISPLAY')) {
    define('WP_DEBUG_DISPLAY', true);
}
if (!defined('WP_DEBUG_LOG')) {
    define('WP_DEBUG_LOG', true);
}
error_reporting(E_ALL);
ini_set('display_errors', 1);

add_action('wp_footer', function() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $posts = get_posts(array(
            'post_type' => 'post',
            'post_status' => 'publish',
            'numberposts' => -1
        ));
        echo '<!-- Debug: Found ' . count($posts) . ' published posts -->';
        
        if (count($posts) === 0) {
            // Create a test post if no posts exist
            wp_insert_post(array(
                'post_title' => 'Test Post',
                'post_content' => 'This is a test post.',
                'post_status' => 'publish',
                'post_author' => 1,
                'post_type' => 'post'
            ));
            echo '<!-- Debug: Created a test post -->';
        }
    }
});

// Include necessary files
require_once get_template_directory() . '/inc/blocks.php';
require_once get_template_directory() . '/inc/lead-form-handler.php';
// Lead popup (new version only)
require_once get_template_directory() . '/inc/lead-popup-new.php';
// Custom post types
require_once get_template_directory() . '/inc/custom-post-types.php';
// Testimonial fields for posts
require_once get_template_directory() . '/inc/testimonial-fields.php';
// Product rendering
require_once get_template_directory() . '/inc/product-render.php';
// Mobile menu custom styling
require_once get_template_directory() . '/inc/mobile-menu-walker.php';
// Product template and default blocks
require_once get_template_directory() . '/inc/product-template.php';
// Template loader for products
require_once get_template_directory() . '/inc/template-loader.php';
// Admin documentation page
require_once get_template_directory() . '/inc/admin-documentation.php';

// Add popup override script to ensure old popup functionality is disabled
function bevision_add_popup_overrides() {
    wp_enqueue_script(
        'bevision-popup-overrides',
        get_template_directory_uri() . '/assets/js/popup-overrides.js',
        array('jquery'),
        time() . rand(1000, 9999),
        true
    );
}
add_action('wp_enqueue_scripts', 'bevision_add_popup_overrides', 999);
require_once get_template_directory() . '/inc/menu-rendering.php';

// Add cache clearing functionality
function bevision_clear_all_caches() {
    // Clear WordPress transients
    global $wpdb;
    $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '%_transient_%'");
    
    // Clear any plugin caches if they exist
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }
    
    // Clear LiteSpeed Cache if installed
    if (class_exists('\\LiteSpeed\\Purge')) {
        do_action('litespeed_purge_all');
    }
    
    // Generate new version for CSS/JS files to force browser reload
    update_option('bevision_assets_version', time());
    
    // Redirect back to referring page
    wp_redirect(wp_get_referer());
    exit;
}

// Register our custom cache clearing endpoint
function bevision_register_cache_clear_endpoint() {
    add_rewrite_endpoint('bevision-clear-cache', EP_ALL);
    
    // Flush rewrite rules once to make sure our endpoint works
    if (get_option('bevision_flush_rewrite_needed', 'yes') === 'yes') {
        flush_rewrite_rules();
        update_option('bevision_flush_rewrite_needed', 'no');
    }
}
add_action('init', 'bevision_register_cache_clear_endpoint');

function bevision_handle_cache_clear_endpoint() {
    global $wp_query;
    
    if (isset($wp_query->query_vars['bevision-clear-cache'])) {
        // Only allow admin users
        if (current_user_can('manage_options')) {
            bevision_clear_all_caches();
        } else {
            wp_die('You do not have permission to clear cache.', 'Error', array('response' => 403));
        }
    }
}
add_action('template_redirect', 'bevision_handle_cache_clear_endpoint');

// Add the button to the admin bar
function bevision_add_clear_cache_button($admin_bar) {
    if (current_user_can('manage_options')) {
        $admin_bar->add_menu(array(
            'id'    => 'bevision-clear-cache',
            'title' => 'გაასუფთავე ქეში',
            'href'  => site_url('bevision-clear-cache'),
            'meta'  => array(
                'title' => 'გაასუფთავე ყველა ქეში სტილების და პოპაპის დასანახად',
                'class' => 'bevision-clear-cache-button'
            )
        ));
    }
}
add_action('admin_bar_menu', 'bevision_add_clear_cache_button', 100);

// Basic theme setup
function bevision_setup() {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-fields');
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_editor_style('build/index.css');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'bevision'),
        'mobile' => __('Mobile Menu', 'bevision'),
    ));

    // Flush rewrite rules to ensure REST API works
    flush_rewrite_rules();
}
add_action('after_setup_theme', 'bevision_setup');




// Initialize REST API
function bevision_rest_api_init() {
    // Register post fields
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function($object) {
            if ($object['featured_media']) {
                $img = wp_get_attachment_image_src($object['featured_media'], 'medium');
                return $img[0];
            }
            return null;
        }
    ));

    // Add CORS headers for REST API
    add_action('rest_api_init', function() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', function($value) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');
            return $value;
        });
    });
}
add_action('rest_api_init', 'bevision_rest_api_init');

// Fix potential REST API issues
function bevision_fix_rest_api_issues() {
    // Remove any filters that might interfere with the REST API
    remove_filter('rest_authentication_errors', 'wp_authenticate_cookie', 100);
    
    // Ensure proper REST base URL
    add_filter('rest_url_prefix', function($prefix) {
        return 'wp-json';
    });
}
add_action('init', 'bevision_fix_rest_api_issues');

// Modify post queries to ensure public visibility
add_action('pre_get_posts', function($query) {
    if (!is_admin() && $query->is_main_query()) {
        $query->set('post_status', 'publish');
    }
});

// Posts block render callback
function bevision_render_posts_tab($attributes) {
    // Enqueue frontend script with direct AJAX support
    wp_enqueue_script(
        'bevision-posts-tab',
        get_template_directory_uri() . '/src/blocks/content/posts-tab/frontend.js',
        array('jquery'),
        filemtime(get_template_directory() . '/src/blocks/content/posts-tab/frontend.js'),
        true
    );

    // Localize script with AJAX URL instead of REST API
    wp_localize_script('bevision-posts-tab', 'bevisionSettings', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'action' => 'get_posts',
        'nonce' => wp_create_nonce('bevision_posts_nonce'),
        'themeUrl' => get_template_directory_uri(),
        'debug' => defined('WP_DEBUG') && WP_DEBUG
    ));

    $wrapper_attributes = get_block_wrapper_attributes();
    $categories = isset($attributes['categories']) ? wp_json_encode($attributes['categories']) : '[]';
    $current_tab = isset($attributes['currentTab']) ? esc_attr($attributes['currentTab']) : 'all';

    return sprintf(
        '<div %1$s>
            <div class="blog-posts-filter" 
                data-posts-per-page="%2$s"
                data-max-posts="%3$s"
                data-categories=\'%4$s\'
                data-current-tab="%5$s"
            >
                <div class="posts-tabs-container"></div>
                <div class="posts-grid-container"></div>
                <div class="loading-indicator" style="display: none">
                    პოსტების ჩატვირთვა...
                </div>
                <div class="load-more-container">
                    <button class="load-more-button">მეტის ნახვა</button>
                </div>
            </div>
        </div>',
        $wrapper_attributes,
        isset($attributes['postsPerPage']) ? esc_attr($attributes['postsPerPage']) : '4',
        isset($attributes['maxPosts']) ? esc_attr($attributes['maxPosts']) : '12',
        $categories,
        $current_tab
    );
}

// AJAX posts endpoint
function bevision_ajax_get_posts() {
    $current_page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $posts_per_page = isset($_POST['per_page']) ? intval($_POST['per_page']) : 4;
    $category = isset($_POST['category']) ? sanitize_text_field($_POST['category']) : 'all';

    $args = array(
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page,
        'paged' => $current_page,
        'orderby' => 'date',
        'order' => 'DESC'
    );

    if ($category && $category !== 'all') {
        $args['cat'] = $category;
    }

    $query = new WP_Query($args);
    $posts = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            
            // Get featured image
            $featured_image = get_the_post_thumbnail_url(null, 'medium');
            if (!$featured_image) {
                $featured_image = get_theme_file_uri('assets/images/post-placeholder.jpg');
            }

            // Get categories
            $post_categories = array();
            $categories = get_the_category();
            if (!empty($categories)) {
                foreach ($categories as $cat) {
                    $post_categories[] = array(
                        'id' => $cat->term_id,
                        'name' => $cat->name,
                        'slug' => $cat->slug
                    );
                }
            }

            $posts[] = array(
                'id' => get_the_ID(),
                'title' => array(
                    'rendered' => get_the_title()
                ),
                'link' => get_permalink(),
                'featured_image_url' => $featured_image,
                'categories' => $post_categories,
                'excerpt' => array(
                    'rendered' => get_the_excerpt()
                ),
                'date' => get_the_date('c')
            );
        }
        wp_reset_postdata();
    }

    wp_send_json_success(array(
        'posts' => $posts,
        'total' => $query->found_posts,
        'max_pages' => $query->max_num_pages
    ));
}

// Function to check if user is on mobile device
function bevision_is_mobile() {
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    return (bool) preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $user_agent) || preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr($user_agent, 0, 4));
}

// Add a variable to be used in JavaScript
function bevision_add_mobile_detection() {
    echo '<script>var isMobileDevice = ' . (bevision_is_mobile() ? 'true' : 'false') . ';</script>';
}
add_action('wp_head', 'bevision_add_mobile_detection');

// Register AJAX endpoints
add_action('wp_ajax_get_posts', 'bevision_ajax_get_posts');
add_action('wp_ajax_nopriv_get_posts', 'bevision_ajax_get_posts');

// Ensure posts scripts are properly enqueued
function bevision_enqueue_posts_scripts() {
    wp_enqueue_script(
        'bevision-posts-tab',
        get_theme_file_uri('/src/blocks/content/posts-tab/frontend.js'),
        array('jquery'),
        filemtime(get_theme_file_path('/src/blocks/content/posts-tab/frontend.js')),
        true
    );
    
    wp_localize_script('bevision-posts-tab', 'bevisionSettings', array(
        'themeUrl' => get_theme_file_uri(),
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bevision_posts_nonce'),
        'debug' => defined('WP_DEBUG') && WP_DEBUG
    ));
}
add_action('wp_enqueue_scripts', 'bevision_enqueue_posts_scripts');

// Register assets
function bevision_enqueue_block_editor_assets() {
    $asset_file = include(get_template_directory() . '/build/index.asset.php');
    
    wp_enqueue_script(
        'bevision-blocks',
        get_template_directory_uri() . '/build/index.js',
        $asset_file['dependencies'],
        $asset_file['version']
    );

    wp_enqueue_style(
        'bevision-blocks',
        get_template_directory_uri() . '/build/index.css',
        array(),
        $asset_file['version']
    );
}
add_action('enqueue_block_editor_assets', 'bevision_enqueue_block_editor_assets');

// Frontend assets
function bevision_enqueue_assets() {
    // Get the assets version or create one if it doesn't exist
    $assets_version = get_option('bevision_assets_version', time());
    
    // Main theme styles and scripts with cache busting
    wp_enqueue_style(
        'bevision-styles',
        get_template_directory_uri() . '/build/index.css',
        array(),
        $assets_version
    );
    
    wp_enqueue_script(
        'bevision-script',
        get_template_directory_uri() . '/build/index.js',
        array('jquery'),
        $assets_version,
        true
    );
    
    // Localize the script with site data
    wp_localize_script('bevision-script', 'bevisionData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bevision-nonce')
    ));
    
    // Lead Popup CSS - not needed anymore since we're using the build files
    // wp_enqueue_style(
    //     'bevision-lead-popup-style',
    //     get_template_directory_uri() . '/assets/css/lead-popup.css',
    //     array(),
    //     filemtime(get_template_directory() . '/assets/css/lead-popup.css')
    // );
    
    // Lead Popup Script
    wp_enqueue_script(
        'bevision-lead-popup',
        get_template_directory_uri() . '/assets/js/lead-popup.js',
        array('jquery'),
        $assets_version,
        true
    );
    
    // Localize script for lead popup
    wp_localize_script('bevision-lead-popup', 'bevisionLeadPopup', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bevision_lead_form')
    ));
    
    // Language dropdown styles
    wp_enqueue_style(
        'bevision-language-dropdown',
        get_template_directory_uri() . '/assets/css/language-dropdown.css',
        array(),
        $assets_version
    );
    
    // Add inline CSS for language dropdown to ensure hover functionality works
    wp_add_inline_style('bevision-language-dropdown', '
        .language-selector:hover .language-dropdown,
        .language-selector-mobile:hover .language-dropdown,
        .hover-dropdown:hover .language-dropdown {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 9999 !important;
        }
        .language-dropdown {
            position: absolute !important;
            top: 100% !important;
            left: 0 !important;
            background-color: white !important;
            border: 1px solid #eaeaea !important;
            border-radius: 4px !important;
            min-width: 60px !important;
            margin-top: 5px !important;
        }
        .language-selector,
        .language-selector-mobile {
            position: relative !important;
            z-index: 9999 !important;
        }
    ');
    
    // Mobile menu and submenu script
    wp_enqueue_script(
        'mobile-menu-js',
        get_template_directory_uri() . '/assets/js/mobile-menu-new.js',
        array('jquery'),
        $assets_version,
        true
    );
    
    // Language dropdown script
    wp_enqueue_script(
        'language-dropdown-js',
        get_template_directory_uri() . '/assets/js/language-dropdown.js',
        array('jquery'),
        $assets_version,
        true
    );
    
    // Client Testimonials Carousel Script
    wp_enqueue_script(
        'bevision-testimonial-carousel',
        get_template_directory_uri() . '/src/blocks/content/client-testimonials/carousel-script.js',
        array('jquery'),
        $assets_version,
        true
    );
    
    // Mobile testimonial card fix - CSS
    wp_enqueue_style(
        'bevision-testimonial-mobile-fix',
        get_template_directory_uri() . '/assets/css/testimonial-mobile-fix.css',
        array(),
        time() // Force no caching
    );
    
    // Mobile testimonial card fix - JS
    wp_enqueue_script(
        'bevision-testimonial-mobile-fix',
        get_template_directory_uri() . '/assets/js/testimonial-mobile-fix.js',
        array('jquery'),
        time(), // Force no caching
        true
    );
    
    // Add cache-busting styles for admin bar button
    if (is_admin_bar_showing() && current_user_can('manage_options')) {
        wp_add_inline_style('bevision-styles', '
            #wp-admin-bar-bevision-clear-cache > a {
                background-color: #6c5ce7 !important;
                color: white !important;
                font-weight: bold !important;
            }
            #wp-admin-bar-bevision-clear-cache > a:hover {
                background-color: #5d4ed6 !important;
            }
        ');
    }
}
add_action('wp_enqueue_scripts', 'bevision_enqueue_assets');

// REST API debugging and initialization
add_action('rest_api_init', function() {
    // Enable raw error display for REST API
    if (defined('REST_REQUEST') && REST_REQUEST) {
        ini_set('display_errors', 1);
        error_reporting(E_ALL);
    }

    // Add basic GET endpoint for testing
    register_rest_route('bevision/v1', '/test', array(
        'methods' => 'GET',
        'callback' => function() {
            return array('status' => 'ok');
        },
        'permission_callback' => function() {
            return true;
        }
    ));
}, 0);

// Add direct posts endpoint for testing
add_action('rest_api_init', function() {
    register_rest_route('bevision/v1', '/posts', array(
        'methods' => 'GET',
        'callback' => function() {
            $args = array(
                'post_type' => 'post',
                'post_status' => 'publish',
                'posts_per_page' => 4
            );
            
            $query = new WP_Query($args);
            $posts = array();
            
            if ($query->have_posts()) {
                while ($query->have_posts()) {
                    $query->the_post();
                    $posts[] = array(
                        'id' => get_the_ID(),
                        'title' => get_the_title(),
                        'link' => get_permalink()
                    );
                }
                wp_reset_postdata();
            }
            
            return $posts;
        },
        'permission_callback' => function() {
            return true;
        }
    ));
});

// Add direct AJAX test endpoint
function bevision_test_endpoint() {
    wp_send_json_success(array('status' => 'ok'));
}
add_action('wp_ajax_test_endpoint', 'bevision_test_endpoint');
add_action('wp_ajax_nopriv_test_endpoint', 'bevision_test_endpoint');

// Post Duplication functionality
function bevision_duplicate_post_as_draft() {
    // Check if post ID is provided and user has proper permissions
    if (empty($_GET['post']) || !current_user_can('edit_posts')) {
        wp_die('No post to duplicate has been provided or you do not have permission.');
    }

    // Nonce verification for security
    if (!isset($_GET['duplicate_nonce']) || !wp_verify_nonce($_GET['duplicate_nonce'], basename(__FILE__))) {
        wp_die('Security check failed');
    }

    // Get the original post id
    $post_id = absint($_GET['post']);
    
    // Get the original post data
    $post = get_post($post_id);
    
    // If post data exists, create the duplicate
    if ($post) {
        // Create new post data array
        $args = array(
            'comment_status' => $post->comment_status,
            'ping_status'    => $post->ping_status,
            'post_author'    => get_current_user_id(),
            'post_content'   => $post->post_content,
            'post_excerpt'   => $post->post_excerpt,
            'post_name'      => $post->post_name,
            'post_parent'    => $post->post_parent,
            'post_password'  => $post->post_password,
            'post_status'    => 'draft', // Always set as draft initially
            'post_title'     => $post->post_title . ' (Copy)',
            'post_type'      => $post->post_type,
            'to_ping'        => $post->to_ping,
            'menu_order'     => $post->menu_order
        );
        
        // Create the new post
        $new_post_id = wp_insert_post($args);
        
        // Get all current post terms and set them to the new post
        $taxonomies = get_object_taxonomies($post->post_type);
        if ($taxonomies) {
            foreach ($taxonomies as $taxonomy) {
                $post_terms = wp_get_object_terms($post_id, $taxonomy, array('fields' => 'slugs'));
                wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
            }
        }
        
        // Duplicate all post meta
        $post_meta = get_post_meta($post_id);
        if ($post_meta) {
            foreach ($post_meta as $meta_key => $meta_values) {
                foreach ($meta_values as $meta_value) {
                    add_post_meta($new_post_id, $meta_key, $meta_value);
                }
            }
        }
        
        // If the post has a featured image, duplicate it
        if (has_post_thumbnail($post_id)) {
            $thumbnail_id = get_post_thumbnail_id($post_id);
            set_post_thumbnail($new_post_id, $thumbnail_id);
        }
        
        // Redirect to the edit screen for the new draft post
        wp_redirect(admin_url('post.php?action=edit&post=' . $new_post_id));
        exit;
    } else {
        wp_die('Post creation failed, could not find original post: ' . $post_id);
    }
}
add_action('admin_action_bevision_duplicate_post_as_draft', 'bevision_duplicate_post_as_draft');

// Add the duplicate link to post actions
function bevision_duplicate_post_link($actions, $post) {
    if (current_user_can('edit_posts')) {
        $actions['duplicate'] = '<a href="' . 
            wp_nonce_url(
                admin_url('admin.php?action=bevision_duplicate_post_as_draft&post=' . $post->ID),
                basename(__FILE__),
                'duplicate_nonce'
            ) . '" title="Duplicate this item" rel="permalink">Duplicate</a>';
    }
    return $actions;
}
add_filter('post_row_actions', 'bevision_duplicate_post_link', 10, 2);
add_filter('page_row_actions', 'bevision_duplicate_post_link', 10, 2);

/**
 * Enable description field in WordPress menu editor
 */
function bevision_show_menu_description_field() {
    ?>  
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            // Check for menu screen
            if ($('body').hasClass('nav-menus-php')) {
                // Force the description field to show
                $('.field-description').show();
                
                // Also try to make it visible via screen options if necessary
                $('.hide-column-tog').each(function() {
                    if ($(this).val() === 'description') {
                        $(this).prop('checked', true);
                    }
                });
            }
        });
    </script>  
    <?php
}
add_action('admin_footer', 'bevision_show_menu_description_field');

// Automatically set product description as menu item description when adding or updating menu items
function bevision_set_product_menu_description($menu_id, $menu_item_db_id, $menu_item_args) {
    // Check if this menu item is a bevision_product
    if (isset($menu_item_args['menu-item-object']) && $menu_item_args['menu-item-object'] === 'bevision_product') {
        // Get the product ID
        $product_id = $menu_item_args['menu-item-object-id'];
        
        // Get product description from custom meta field
        $description = get_post_meta($product_id, '_bevision_product_description', true);
        
        // If no custom description, try to get excerpt
        if (empty($description)) {
            $product = get_post($product_id);
            $description = $product->post_excerpt;
            
            // If no excerpt, try to get the content and trim it
            if (empty($description)) {
                $description = wp_trim_words($product->post_content, 20, '...');
            }
        }
        
        // If we have a description, update the menu item description
        if (!empty($description)) {
            update_post_meta($menu_item_db_id, '_menu_item_description', $description);
        }
    }
}
add_action('wp_update_nav_menu_item', 'bevision_set_product_menu_description', 10, 3);

// Update all product menu item descriptions in the admin navigation menu page
function bevision_update_all_product_menu_descriptions() {
    // Check if we're on the nav-menus.php admin page
    $screen = get_current_screen();
    if (!is_object($screen) || $screen->base !== 'nav-menus') {
        return;
    }
    
    // Get all menu locations
    $locations = get_nav_menu_locations();
    foreach ($locations as $location => $menu_id) {
        if ($menu_id <= 0) continue;
        
        // Get all items in this menu
        $menu_items = wp_get_nav_menu_items($menu_id);
        if (!$menu_items) continue;
        
        foreach ($menu_items as $menu_item) {
            // Check if this is a product
            if ($menu_item->object === 'bevision_product') {
                $product_id = $menu_item->object_id;
                
                // Get product description from custom meta field
                $description = get_post_meta($product_id, '_bevision_product_description', true);
                
                // If no custom description, try to get excerpt
                if (empty($description)) {
                    $product = get_post($product_id);
                    if ($product) {
                        $description = $product->post_excerpt;
                        
                        // If no excerpt, try to get the content and trim it
                        if (empty($description)) {
                            $description = wp_trim_words($product->post_content, 20, '...');
                        }
                    }
                }
                
                // If we have a description, update the menu item description
                if (!empty($description)) {
                    update_post_meta($menu_item->ID, '_menu_item_description', $description);
                }
            }
        }
    }
}
add_action('admin_init', 'bevision_update_all_product_menu_descriptions');

// Add JavaScript to make menu description field visible in admin
function bevision_enqueue_menu_admin_script() {
    $screen = get_current_screen();
    if (is_object($screen) && $screen->base === 'nav-menus') {
        echo "<script type='text/javascript'>
            jQuery(document).ready(function($) {
                // Make description field visible for all menu items
                $('.field-description').css('display', 'block');
                
                // Run when new items are added to the menu
                $('body').on('DOMNodeInserted', '.menu-item', function() {
                    setTimeout(function() {
                        $('.field-description').css('display', 'block');
                    }, 200);
                });
                
                // Show descriptions for all menu items
                $('.hide-column-tog').prop('checked', true).trigger('change');
            });
        </script>";
    }
}
add_action('admin_footer', 'bevision_enqueue_menu_admin_script');

// Force show description field in Screen Options
function bevision_force_nav_menu_description() {
    $user = wp_get_current_user();
    update_user_meta($user->ID, 'managenav-menuscolumnshidden', array());
}
add_action('admin_init', 'bevision_force_nav_menu_description');

