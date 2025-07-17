<?php
/**
 * Product template and default blocks functionality
 *
 * @package BeVision
 */

/**
 * Set default template for product post type
 */
function bevision_set_product_template($template) {
    global $post;

    // Check if we're on a single product page
    if (is_singular('bevision_product')) {
        // Removed automatic block loading
        // The content will be whatever the user sets in the editor
        
        // Look for product template in theme
        $product_template = locate_template(array('templates/template-product.php'));
        
        if ($product_template) {
            return $product_template;
        }
    }

    return $template;
}
add_filter('template_include', 'bevision_set_product_template');

/**
 * Add default blocks to a newly created product
 */
function bevision_add_default_blocks_to_product($post_id) {
    // Make sure it's a product
    if (get_post_type($post_id) !== 'bevision_product') {
        return;
    }
    
    // Get post content
    $post = get_post($post_id);
    
    // Only add default blocks if content is empty
    if (!empty($post->post_content)) {
        return;
    }
    
    // Create the default blocks structure
    $blocks = array(
        array(
            'blockName' => 'bevision/product-hero',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/dashboard-features',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/category-analysis',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/cross-sell-basket',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/products-cpt',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/client-testimonials',
            'attrs' => array(),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        ),
        array(
            'blockName' => 'bevision/contact-us',
            'attrs' => array(
                'title' => 'დაგვიკავშირდით',
                'subtitle' => 'გაქვთ კითხვები? მოგვწერეთ და გიპასუხებთ',
                'nameLabel' => 'სახელი და გვარი',
                'emailLabel' => 'ელ-ფოსტა',
                'phoneLabel' => 'ტელეფონი',
                'messageLabel' => 'შეტყობინება',
                'buttonText' => 'გაგზავნა',
                'backgroundColor' => '#f5f5f5',
                'imageUrl' => get_template_directory_uri() . '/src/images/contact-image.jpg',
                'imagePosition' => 'right'
            ),
            'innerBlocks' => array(),
            'innerHTML' => '',
            'innerContent' => array('')
        )
    );
    
    // Serialize the blocks to HTML
    $content = serialize_blocks($blocks);
    
    // Update the post with the new content
    wp_update_post(array(
        'ID' => $post_id,
        'post_content' => $content
    ));
}

/**
 * Hook that was previously used to add default blocks when a product is published
 * Now it only assigns a template if needed
 */
function bevision_check_product_for_default_blocks($post_id, $post, $update) {
    // Check if this is a new product
    if ($post->post_type !== 'bevision_product') {
        return;
    }
    
    // Skip auto-saves and revisions
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }
    
    // Removed automatic block adding functionality
    // Products will now start with empty content by default
    
    // We removed the template assignment since we deleted the template files
    // Let WordPress use the default single-bevision_product.php template
}
add_action('wp_insert_post', 'bevision_check_product_for_default_blocks', 10, 3);

/**
 * This function previously assigned templates to products.
 * It has been disabled since we now use the default WordPress template system.
 * We're keeping the function declaration but making it empty to prevent errors in case it's called elsewhere.
 */
function bevision_assign_template_to_existing_products() {
    // Function disabled
    // We now use standard WordPress templating with single-bevision_product.php
    return;
}

// Removed the actions that would run this function
// Let WordPress handle templates normally
