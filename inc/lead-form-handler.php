<?php
/**
 * Lead Form Handler
 * Processes form submissions from the lead popup
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Process lead form submission
 */
function bevision_process_lead_form() {
    // Verify nonce for security
    if (!isset($_POST['lead_form_nonce']) || !wp_verify_nonce($_POST['lead_form_nonce'], 'bevision_lead_form')) {
        wp_send_json_error(array(
            'message' => 'Security check failed.'
        ));
        exit;
    }

    // Get form data
    $name = isset($_POST['name']) ? sanitize_text_field($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitize_text_field($_POST['phone']) : '';
    $company = isset($_POST['company']) ? sanitize_text_field($_POST['company']) : '';
    $message = isset($_POST['message']) ? sanitize_textarea_field($_POST['message']) : '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone)) {
        wp_send_json_error(array(
            'message' => 'Please fill in all required fields.'
        ));
        exit;
    }

    // Validate email format
    if (!is_email($email)) {
        wp_send_json_error(array(
            'message' => 'Please enter a valid email address.'
        ));
        exit;
    }

    // Create post array
    $lead_data = array(
        'post_title'    => 'Lead from ' . $name,
        'post_content'  => $message,
        'post_status'   => 'private',
        'post_type'     => 'lead',
        'meta_input'    => array(
            'lead_name'     => $name,
            'lead_email'    => $email,
            'lead_phone'    => $phone,
            'lead_company'  => $company,
            'lead_date'     => current_time('mysql')
        )
    );

    // Insert the lead into the database
    $lead_id = wp_insert_post($lead_data);

    if ($lead_id) {
        // Optional: Send email notification
        $admin_email = get_option('admin_email');
        $subject = 'New Lead Request from ' . $name;
        
        $body = "A new lead request has been submitted:\n\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Phone: $phone\n";
        $body .= "Company: $company\n\n";
        $body .= "Message:\n$message\n\n";
        
        wp_mail($admin_email, $subject, $body);
        
        wp_send_json_success(array(
            'message' => 'Your request has been submitted successfully!'
        ));
    } else {
        wp_send_json_error(array(
            'message' => 'There was an error saving your request. Please try again.'
        ));
    }
    
    exit;
}
add_action('wp_ajax_bevision_submit_lead', 'bevision_process_lead_form');
add_action('wp_ajax_nopriv_bevision_submit_lead', 'bevision_process_lead_form');

/**
 * Register Lead custom post type
 */
function bevision_register_lead_post_type() {
    $labels = array(
        'name'                  => 'Leads',
        'singular_name'         => 'Lead',
        'menu_name'             => 'Leads',
        'all_items'             => 'All Leads',
        'view_item'             => 'View Lead',
        'edit_item'             => 'Edit Lead',
        'search_items'          => 'Search Leads',
        'not_found'             => 'No leads found',
        'not_found_in_trash'    => 'No leads found in trash'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 30,
        'menu_icon'          => 'dashicons-businessman',
        'supports'           => array('title', 'editor')
    );

    register_post_type('lead', $args);
}
add_action('init', 'bevision_register_lead_post_type');
