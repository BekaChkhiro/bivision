<?php
/**
 * Add testimonial fields to regular posts
 */

// Register testimonial meta fields with REST API
function bevision_register_testimonial_meta() {
    register_meta('post', '_bevision_is_testimonial', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    register_meta('post', '_bevision_testimonial_company_logo', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    register_meta('post', '_bevision_testimonial_content', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    register_meta('post', '_bevision_testimonial_author_image', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    register_meta('post', '_bevision_testimonial_author_name', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
    
    register_meta('post', '_bevision_testimonial_author_position', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
}
add_action('init', 'bevision_register_testimonial_meta');

// Add meta box for testimonial fields
function bevision_add_testimonial_meta_boxes() {
    add_meta_box(
        'bevision_testimonial_fields',
        __('Testimonial Fields', 'bevision'),
        'bevision_testimonial_fields_callback',
        'post',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'bevision_add_testimonial_meta_boxes');

// Callback function for testimonial fields meta box
function bevision_testimonial_fields_callback($post) {
    // Add nonce for security
    wp_nonce_field('bevision_testimonial_save', 'bevision_testimonial_nonce');
    
    // Get saved meta values
    $is_testimonial = get_post_meta($post->ID, '_bevision_is_testimonial', true);
    $company_logo = get_post_meta($post->ID, '_bevision_testimonial_company_logo', true);
    $content = get_post_meta($post->ID, '_bevision_testimonial_content', true);
    $author_image = get_post_meta($post->ID, '_bevision_testimonial_author_image', true);
    $author_name = get_post_meta($post->ID, '_bevision_testimonial_author_name', true);
    $author_position = get_post_meta($post->ID, '_bevision_testimonial_author_position', true);
    
    // Output fields
    ?>
    <style>
        .testimonial-field-row {
            margin-bottom: 15px;
        }
        .testimonial-field-row label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        .testimonial-image-preview {
            max-width: 150px;
            max-height: 150px;
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 5px;
            display: block;
        }
        .testimonial-image-preview.hidden {
            display: none;
        }
    </style>
    
    <div class="testimonial-field-row">
        <label>
            <input type="checkbox" name="bevision_is_testimonial" value="1" <?php checked($is_testimonial, '1'); ?> />
            <?php _e('Use this post as a testimonial', 'bevision'); ?>
        </label>
    </div>
    
    <div class="testimonial-field-row">
        <label for="bevision_testimonial_company_logo"><?php _e('Company Logo', 'bevision'); ?></label>
        <input type="text" id="bevision_testimonial_company_logo" name="bevision_testimonial_company_logo" value="<?php echo esc_attr($company_logo); ?>" class="regular-text" />
        <button type="button" class="button bevision-upload-image" data-target="#bevision_testimonial_company_logo" data-preview="#bevision_company_logo_preview"><?php _e('Upload Image', 'bevision'); ?></button>
        <img id="bevision_company_logo_preview" src="<?php echo esc_url($company_logo); ?>" class="testimonial-image-preview <?php echo empty($company_logo) ? 'hidden' : ''; ?>" />
    </div>
    
    <div class="testimonial-field-row">
        <label for="bevision_testimonial_author_image"><?php _e('Author Image', 'bevision'); ?></label>
        <input type="text" id="bevision_testimonial_author_image" name="bevision_testimonial_author_image" value="<?php echo esc_attr($author_image); ?>" class="regular-text" />
        <button type="button" class="button bevision-upload-image" data-target="#bevision_testimonial_author_image" data-preview="#bevision_author_image_preview"><?php _e('Upload Image', 'bevision'); ?></button>
        <img id="bevision_author_image_preview" src="<?php echo esc_url($author_image); ?>" class="testimonial-image-preview <?php echo empty($author_image) ? 'hidden' : ''; ?>" />
    </div>
    
    <div class="testimonial-field-row">
        <label for="bevision_testimonial_author_name"><?php _e('Author Name', 'bevision'); ?></label>
        <input type="text" id="bevision_testimonial_author_name" name="bevision_testimonial_author_name" value="<?php echo esc_attr($author_name); ?>" class="regular-text" />
    </div>
    
    <div class="testimonial-field-row">
        <label for="bevision_testimonial_content"><?php _e('Testimonial Content', 'bevision'); ?></label>
        <?php 
        wp_editor(
            wp_kses_post($content),
            'bevision_testimonial_content',
            array(
                'media_buttons' => false,
                'textarea_name' => 'bevision_testimonial_content',
                'textarea_rows' => 5,
                'teeny' => true
            )
        );
        ?>
        <p class="description"><?php _e('Enter the testimonial text here. This will appear in the testimonial carousel.', 'bevision'); ?></p>
    </div>
    
    <div class="testimonial-field-row">
        <label for="bevision_testimonial_author_position"><?php _e('Author Position', 'bevision'); ?></label>
        <input type="text" id="bevision_testimonial_author_position" name="bevision_testimonial_author_position" value="<?php echo esc_attr($author_position); ?>" class="regular-text" />
    </div>
    
    <script>
    jQuery(document).ready(function($) {
        $('.bevision-upload-image').click(function(e) {
            e.preventDefault();
            
            var button = $(this);
            var targetInput = button.data('target');
            var targetPreview = button.data('preview');
            
            var frame = wp.media({
                title: '<?php _e('Select or Upload Image', 'bevision'); ?>',
                button: {
                    text: '<?php _e('Use this image', 'bevision'); ?>'
                },
                multiple: false
            });
            
            frame.on('select', function() {
                var attachment = frame.state().get('selection').first().toJSON();
                $(targetInput).val(attachment.url);
                $(targetPreview).attr('src', attachment.url).removeClass('hidden');
            });
            
            frame.open();
        });
    });
    </script>
    <?php
}

// Save testimonial meta data
function bevision_save_testimonial_meta($post_id) {
    // Check if nonce is set
    if (!isset($_POST['bevision_testimonial_nonce'])) {
        return;
    }
    
    // Verify nonce
    if (!wp_verify_nonce($_POST['bevision_testimonial_nonce'], 'bevision_testimonial_save')) {
        return;
    }
    
    // If autosave, do nothing
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    // Check permissions
    if ('post' === $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }
    
    // Save is_testimonial checkbox
    $is_testimonial = isset($_POST['bevision_is_testimonial']) ? '1' : '0';
    update_post_meta($post_id, '_bevision_is_testimonial', $is_testimonial);
    
    // Save testimonial fields
    if (isset($_POST['bevision_testimonial_company_logo'])) {
        update_post_meta($post_id, '_bevision_testimonial_company_logo', sanitize_text_field($_POST['bevision_testimonial_company_logo']));
    }
    
    if (isset($_POST['bevision_testimonial_author_image'])) {
        update_post_meta($post_id, '_bevision_testimonial_author_image', sanitize_text_field($_POST['bevision_testimonial_author_image']));
    }
    
    if (isset($_POST['bevision_testimonial_author_name'])) {
        update_post_meta($post_id, '_bevision_testimonial_author_name', sanitize_text_field($_POST['bevision_testimonial_author_name']));
    }
    
    if (isset($_POST['bevision_testimonial_content'])) {
        // Allow HTML content in testimonials
        update_post_meta($post_id, '_bevision_testimonial_content', wp_kses_post($_POST['bevision_testimonial_content']));
    }
    
    if (isset($_POST['bevision_testimonial_author_position'])) {
        update_post_meta($post_id, '_bevision_testimonial_author_position', sanitize_text_field($_POST['bevision_testimonial_author_position']));
    }
}
add_action('save_post', 'bevision_save_testimonial_meta');

// Filter testimonial content to ensure proper styling
function bevision_format_testimonial_content($content) {
    if (empty($content)) {
        return $content;
    }
    
    // Wrap content with proper styling div
    $styled_content = '<div class="testimonial-content-styled" style="color: #221A4C; font-size: 16px; line-height: 1.6; margin: 0; font-weight: 400; margin-bottom: 40px;">' . $content . '</div>';
    
    return $styled_content;
}

// Apply formatting when displaying testimonial content
function bevision_get_formatted_testimonial_content($post_id) {
    $content = get_post_meta($post_id, '_bevision_testimonial_content', true);
    return bevision_format_testimonial_content($content);
}

// Enqueue CSS to ensure testimonial styling persists
function bevision_enqueue_testimonial_styles() {
    wp_add_inline_style('wp-block-library', '
        .testimonial-content-styled,
        .testimonial-content-styled p,
        .wp-block-bevision-client-testimonials .content,
        .wp-block-bevision-client-testimonials .testimonial-card .content {
            color: #221A4C !important;
            font-size: 16px !important;
            line-height: 1.6 !important;
            margin: 0 !important;
            font-weight: 400 !important;
            margin-bottom: 40px !important;
        }
        
        .testimonial-content-styled p {
            margin-bottom: 0 !important;
        }
    ');
}
add_action('wp_enqueue_scripts', 'bevision_enqueue_testimonial_styles');
add_action('admin_enqueue_scripts', 'bevision_enqueue_testimonial_styles');
