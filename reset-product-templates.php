<?php
/**
 * A utility script to reset all product templates to default
 * This will remove all custom template assignments from bevision_product posts
 */

// Load WordPress
require_once( dirname( __FILE__ ) . '/../../../wp-load.php' );

// Only allow running from CLI or admin
if (!is_admin() && !defined('WP_CLI')) {
    die('This script must be run from the WordPress admin or CLI');
}

// Find all bevision_product posts
$args = array(
    'post_type' => 'bevision_product',
    'post_status' => 'any',
    'posts_per_page' => -1,
);

$products = get_posts($args);
$count = 0;

echo "Found " . count($products) . " products to update.\n";

// Loop through all products and reset their template
foreach ($products as $product) {
    // Get current template
    $current_template = get_post_meta($product->ID, '_wp_page_template', true);
    
    if (!empty($current_template) && $current_template !== 'default') {
        // Delete the template assignment
        delete_post_meta($product->ID, '_wp_page_template');
        
        // Log the change
        echo "Reset template for product #{$product->ID}: {$product->post_title} (was: {$current_template})\n";
        $count++;
    }
}

echo "Completed. Reset {$count} products to use default template.\n";
