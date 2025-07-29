<?php
if (!defined('ABSPATH')) exit;

class Bivision_Theme_Settings {
    private $options;

    public function __construct() {
        add_action('admin_menu', array($this, 'add_theme_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_custom_font'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_editor_custom_font'));
        add_filter('upload_mimes', array($this, 'add_custom_font_mimes'));
    }

    public function add_custom_font_mimes($mime_types) {
        $mime_types['ttf'] = 'application/x-font-ttf';
        $mime_types['otf'] = 'application/x-font-opentype';
        $mime_types['woff'] = 'application/font-woff';
        $mime_types['woff2'] = 'application/font-woff2';
        return $mime_types;
    }

    public function add_theme_settings_page() {
        add_menu_page(
            'Bivision Settings',
            'Bivision Settings',
            'manage_options',
            'Bivision-settings',
            array($this, 'create_settings_page'),
            'dashicons-admin-customizer',
            60
        );
    }

    public function register_settings() {
        register_setting('Bivision_settings', 'Bivision_custom_font', array(
            'type' => 'string',
            'sanitize_callback' => array($this, 'handle_font_upload'),
            'default' => ''
        ));
    }

    public function handle_font_upload($option) {
        if (!empty($_FILES['custom_font']['name'])) {
            if (!function_exists('wp_handle_upload')) {
                require_once(ABSPATH . 'wp-admin/includes/file.php');
            }

            $uploaded_file = $_FILES['custom_font'];
            
            // Verify file type
            $allowed_types = array('ttf', 'otf', 'woff', 'woff2');
            $file_ext = strtolower(pathinfo($uploaded_file['name'], PATHINFO_EXTENSION));
            
            if (!in_array($file_ext, $allowed_types)) {
                add_settings_error(
                    'Bivision_settings',
                    'invalid_font_type',
                    'Invalid font file type. Please upload .ttf, .otf, .woff, or .woff2 files only.',
                    'error'
                );
                return get_option('Bivision_custom_font');
            }

            $upload_overrides = array(
                'test_form' => false,
                'mimes' => array(
                    'ttf' => 'application/x-font-ttf',
                    'otf' => 'application/x-font-opentype',
                    'woff' => 'application/font-woff',
                    'woff2' => 'application/font-woff2'
                )
            );

            $movefile = wp_handle_upload($uploaded_file, $upload_overrides);

            if ($movefile && !isset($movefile['error'])) {
                // Delete old font file if exists
                $old_font = get_option('Bivision_custom_font');
                if ($old_font && isset($old_font['file']) && file_exists($old_font['file'])) {
                    unlink($old_font['file']);
                }
                
                // Add font name to the saved data
                $movefile['font_name'] = pathinfo($uploaded_file['name'], PATHINFO_FILENAME);
                return $movefile;
            } else {
                add_settings_error(
                    'Bivision_settings',
                    'font_upload_error',
                    'Error uploading font file: ' . $movefile['error'],
                    'error'
                );
            }
        }
        return get_option('Bivision_custom_font');
    }

    public function create_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <div class="wrap Bivision-settings-wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            
            <?php settings_errors(); ?>
            
            <div class="Bivision-font-preview">
                <?php
                $current_font = get_option('Bivision_custom_font');
                if ($current_font && isset($current_font['url'])) {
                    $font_name = isset($current_font['font_name']) ? $current_font['font_name'] : basename($current_font['url']);
                    ?>
                    <div class="active-font-info">
                        <h3>აქტიური ფონტი:</h3>
                        <div class="font-preview-box">
                            <p class="font-name"><?php echo esc_html($font_name); ?></p>
                            <p class="font-preview-text">აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ</p>
                            <p class="font-preview-text">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                            <p class="font-preview-text">abcdefghijklmnopqrstuvwxyz</p>
                            <p class="font-preview-text">0123456789</p>
                        </div>
                    </div>
                    <?php
                }
                ?>
            </div>

            <form method="post" action="options.php" enctype="multipart/form-data">
                <?php
                settings_fields('Bivision_settings');
                do_settings_sections('Bivision-settings');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">ფონტის ატვირთვა</th>
                        <td>
                            <input type="file" name="custom_font" accept=".ttf,.otf,.woff,.woff2" />
                            <p class="description">დასაშვები ფორმატები: .ttf, .otf, .woff, ან .woff2</p>
                        </td>
                    </tr>
                </table>
                <?php submit_button('შენახვა'); ?>
            </form>
        </div>
        <?php
    }

    public function enqueue_admin_scripts($hook) {
        if ($hook != 'toplevel_page_Bivision-settings') {
            return;
        }
        wp_enqueue_style('Bivision-admin-styles', get_template_directory_uri() . '/assets/css/admin.css');
        
        // Add custom font to admin page for preview
        $this->enqueue_custom_font();
    }

    public function enqueue_custom_font() {
        $custom_font = get_option('Bivision_custom_font');
        if ($custom_font && isset($custom_font['url'])) {
            $font_url = $custom_font['url'];
            $font_family = 'BivisionCustomFont';
            
            wp_enqueue_style('Bivision-custom-font', get_template_directory_uri() . '/assets/css/custom-font.css');
            
            $custom_css = "
                @font-face {
                    font-family: '{$font_family}';
                    src: url('{$font_url}') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
                
                body,
                .wp-block,
                .wp-block p,
                .wp-block h1,
                .wp-block h2,
                .wp-block h3,
                .wp-block h4,
                .wp-block h5,
                .wp-block h6,
                .wp-block-button__link,
                input,
                textarea,
                select,
                button {
                }
            ";
            wp_add_inline_style('Bivision-custom-font', $custom_css);
        }
    }

    public function enqueue_editor_custom_font() {
        $custom_font = get_option('Bivision_custom_font');
        if ($custom_font && isset($custom_font['url'])) {
            $font_url = $custom_font['url'];
            $font_family = 'BivisionCustomFont';
            
            // Add editor styles
            add_editor_style('assets/css/custom-font.css');
            
            $custom_css = "
                @font-face {
                    font-family: '{$font_family}';
                    src: url('{$font_url}') format('woff2');
                    font-weight: normal;
                    font-style: normal;
                    font-display: swap;
                }
                
                .editor-styles-wrapper,
                .editor-styles-wrapper .wp-block,
                .editor-styles-wrapper p,
                .editor-styles-wrapper h1,
                .editor-styles-wrapper h2,
                .editor-styles-wrapper h3,
                .editor-styles-wrapper h4,
                .editor-styles-wrapper h5,
                .editor-styles-wrapper h6,
                .editor-styles-wrapper .wp-block-button__link {
                }
            ";
            
            wp_add_inline_style('wp-edit-blocks', $custom_css);
        }
    }
}

// Initialize the settings
new Bivision_Theme_Settings();
