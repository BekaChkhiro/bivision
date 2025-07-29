<?php
/**
 * Font Manager for Bivision Theme
 */

class Bivision_Fonts {
    private static $instance = null;
    private $fonts = [];
    private $fonts_dir;
    private $fonts_url;

    private function __construct() {
        $this->fonts_dir = get_template_directory() . '/assets/fonts';
        $this->fonts_url = get_template_directory_uri() . '/assets/fonts';
        $this->load_fonts();
    }

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function load_fonts() {
        if (!is_dir($this->fonts_dir)) {
            return;
        }

        $files = scandir($this->fonts_dir);
        foreach ($files as $file) {
            if (in_array($file, ['.', '..'])) continue;
            
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if (in_array($ext, ['ttf', 'otf', 'woff', 'woff2'])) {
                $name = pathinfo($file, PATHINFO_FILENAME);
                $this->fonts[$name] = [
                    'file' => $file,
                    'url' => $this->fonts_url . '/' . $file,
                    'type' => $ext
                ];
            }
        }
    }

    public function register_fonts() {
        if (empty($this->fonts)) {
            return;
        }

        $css = '';
        foreach ($this->fonts as $name => $font) {
            $format = $this->get_format($font['type']);
            $css .= "@font-face {
                font-family: '{$name}';
                src: url('{$font['url']}') format('{$format}');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }\n";
        }

        if ($css) {
            wp_register_style('Bivision-custom-fonts', false);
            wp_enqueue_style('Bivision-custom-fonts');
            wp_add_inline_style('Bivision-custom-fonts', $css);
        }

        add_filter('wp_theme_json_data_theme', [$this, 'add_fonts_to_theme_json']);
    }

    private function get_format($type) {
        $formats = [
            'ttf' => 'truetype',
            'otf' => 'opentype',
            'woff' => 'woff',
            'woff2' => 'woff2'
        ];
        return isset($formats[$type]) ? $formats[$type] : 'truetype';
    }

    public function add_fonts_to_theme_json($theme_json) {
        if (empty($this->fonts)) {
            return $theme_json;
        }

        $data = $theme_json->get_data();
        
        if (!isset($data['settings']['typography']['fontFamilies'])) {
            $data['settings']['typography']['fontFamilies'] = [];
        }

        foreach ($this->fonts as $name => $font) {
            $data['settings']['typography']['fontFamilies'][] = [
                'name' => $name,
                'slug' => sanitize_title($name),
                'fontFamily' => "'{$name}', sans-serif"
            ];
        }

        return class_exists('WP_Theme_JSON_Data') 
            ? new WP_Theme_JSON_Data($data) 
            : $theme_json;
    }

    public function add_font_upload_page() {
        add_theme_page(
            'Upload Fonts',
            'Upload Fonts',
            'manage_options',
            'Bivision-fonts',
            [$this, 'render_font_upload_page']
        );
    }

    public function render_font_upload_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        // Handle font upload
        if (isset($_FILES['font_file'])) {
            $this->handle_font_upload();
        }

        // Handle font deletion
        if (isset($_POST['delete_font']) && isset($_POST['font_name'])) {
            $this->delete_font($_POST['font_name']);
        }

        ?>
        <div class="wrap">
            <h1>Upload Fonts</h1>
            
            <div class="font-upload-form">
                <h2>Upload New Font</h2>
                <form method="post" enctype="multipart/form-data">
                    <?php wp_nonce_field('Bivision_font_upload', 'font_upload_nonce'); ?>
                    <input type="file" name="font_file" accept=".ttf,.otf,.woff,.woff2" required>
                    <p class="description">Accepted formats: TTF, OTF, WOFF, WOFF2</p>
                    <button type="submit" class="button button-primary">Upload Font</button>
                </form>
            </div>

            <div class="font-list">
                <h2>Installed Fonts</h2>
                <?php $this->render_font_list(); ?>
            </div>
        </div>
        <style>
            .font-upload-form {
                margin: 20px 0;
                padding: 20px;
                background: #fff;
                border: 1px solid #ccc;
            }
            .font-list {
                margin-top: 30px;
            }
            .font-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                background: #fff;
                border: 1px solid #ccc;
                margin-bottom: 10px;
            }
            .font-preview {
                font-size: 18px;
            }
        </style>
        <?php
    }

    private function render_font_list() {
        if (empty($this->fonts)) {
            echo '<p>No custom fonts uploaded yet.</p>';
            return;
        }

        foreach ($this->fonts as $name => $font) {
            ?>
            <div class="font-item">
                <div class="font-info">
                    <strong><?php echo esc_html($name); ?></strong>
                    <span class="font-preview">
                        The quick brown fox jumps over the lazy dog
                    </span>
                </div>
                <form method="post" style="display: inline;">
                    <?php wp_nonce_field('Bivision_font_delete', 'font_delete_nonce'); ?>
                    <input type="hidden" name="font_name" value="<?php echo esc_attr($name); ?>">
                    <button type="submit" name="delete_font" class="button button-link-delete">
                        Delete
                    </button>
                </form>
            </div>
            <?php
        }
    }

    private function handle_font_upload() {
        if (!isset($_FILES['font_file']) || !isset($_POST['font_upload_nonce'])) {
            return;
        }

        if (!wp_verify_nonce($_POST['font_upload_nonce'], 'Bivision_font_upload')) {
            wp_die('Invalid nonce');
        }

        $file = $_FILES['font_file'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

        if (!in_array($ext, ['ttf', 'otf', 'woff', 'woff2'])) {
            add_settings_error(
                'Bivision_fonts',
                'invalid_font',
                'Invalid font format. Please upload TTF, OTF, WOFF, or WOFF2 files.',
                'error'
            );
            return;
        }

        if (!is_dir($this->fonts_dir)) {
            wp_mkdir_p($this->fonts_dir);
        }

        $filename = wp_unique_filename($this->fonts_dir, $file['name']);
        $new_file = $this->fonts_dir . '/' . $filename;

        if (move_uploaded_file($file['tmp_name'], $new_file)) {
            $this->load_fonts(); // Reload fonts
            add_settings_error(
                'Bivision_fonts',
                'font_uploaded',
                'Font uploaded successfully.',
                'success'
            );
        } else {
            add_settings_error(
                'Bivision_fonts',
                'upload_failed',
                'Failed to upload font.',
                'error'
            );
        }
    }

    private function delete_font($font_name) {
        if (!isset($_POST['font_delete_nonce']) || 
            !wp_verify_nonce($_POST['font_delete_nonce'], 'Bivision_font_delete')) {
            wp_die('Invalid nonce');
        }

        if (isset($this->fonts[$font_name])) {
            $file = $this->fonts_dir . '/' . $this->fonts[$font_name]['file'];
            if (file_exists($file) && unlink($file)) {
                unset($this->fonts[$font_name]);
                add_settings_error(
                    'Bivision_fonts',
                    'font_deleted',
                    'Font deleted successfully.',
                    'success'
                );
            }
        }
    }
}
