<?php
/**
 * New Lead Popup Implementation
 * Organized into separate files for better maintainability
 *
 * @package BeVision
 */

// Don't allow direct access to this file
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Function to enqueue the lead popup styles and scripts
 */
function bevision_enqueue_lead_popup_assets() {
    // Don't enqueue in admin or login page
    if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php') {
        return;
    }

    // Enqueue CSS file
    wp_enqueue_style(
        'bevision-lead-popup-styles',
        get_template_directory_uri() . '/inc/lead-popup/assets/lead-popup-styles.css',
        array(),
        filemtime(get_template_directory() . '/inc/lead-popup/assets/lead-popup-styles.css')
    );

    // Enqueue JS file
    wp_enqueue_script(
        'bevision-lead-popup-scripts',
        get_template_directory_uri() . '/inc/lead-popup/assets/lead-popup-scripts.js',
        array('jquery'),
        filemtime(get_template_directory() . '/inc/lead-popup/assets/lead-popup-scripts.js'),
        true
    );

    // Localize the script with data
    wp_localize_script('bevision-lead-popup-scripts', 'bevisionLeadPopup', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bevision_lead_form')
    ));
}
add_action('wp_enqueue_scripts', 'bevision_enqueue_lead_popup_assets');

/**
 * Function to render the lead popup
 */
function bevision_render_modular_lead_popup() {
    // Don't show popup in admin or login page
    if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php') {
        return;
    }
    
    // Include the template file
    include_once get_template_directory() . '/inc/lead-popup/templates/lead-popup-template.php';
}

/**
 * Add the popup to the footer
 */
function bevision_add_modular_lead_popup_to_footer() {
    bevision_render_modular_lead_popup();
}
add_action('wp_footer', 'bevision_add_modular_lead_popup_to_footer', 999);

/**
 * AJAX handler for lead form submission
 * Add this if you need to handle form submission via AJAX
 */
function bevision_handle_lead_form() {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'bevision_lead_form')) {
        wp_send_json_error('Invalid security token');
    }

    // Process form data
    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $company = isset($_POST['company']) ? sanitize_text_field($_POST['company']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';

    // Add your lead processing logic here
    // For example, send email, save to database, etc.

    // Return success response
    wp_send_json_success('Form submitted successfully');
}
add_action('wp_ajax_bevision_lead_form', 'bevision_handle_lead_form');
add_action('wp_ajax_nopriv_bevision_lead_form', 'bevision_handle_lead_form');
