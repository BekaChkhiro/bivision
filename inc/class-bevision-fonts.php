<?php
/**
 * Font Manager for BeVision Theme
 */

class BeVision_Fonts {
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
            error_log('BeVision Fonts ERROR: Font directory does not exist: ' . $this->fonts_dir);
            return;
        }

        $files = scandir($this->fonts_dir);
        error_log('BeVision Fonts Debug: Found ' . count($files) . ' files in font directory');
        
        foreach ($files as $file) {
            if (in_array($file, ['.', '..'])) continue;
            
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            if (in_array($ext, ['ttf', 'otf', 'woff', 'woff2'])) {
                $name = pathinfo($file, PATHINFO_FILENAME);
                
                // Fix URL encoding for spaces and special characters in file names
                $url_file = rawurlencode($file);
                
                $this->fonts[$name] = [
                    'file' => $file,
                    'url' => $this->fonts_url . '/' . $url_file,
                    'type' => $ext
                ];
                
                error_log('BeVision Fonts Debug: Loaded font: ' . $name);
                error_log('BeVision Fonts Debug: File path: ' . $this->fonts_dir . '/' . $file);
                error_log('BeVision Fonts Debug: URL: ' . $this->fonts_url . '/' . $url_file);
            }
        }
    }

    public function register_fonts() {
        // Debug: Log current page information
        global $wp;
        $current_url = home_url(add_query_arg(array(), $wp->request));
        error_log('BeVision Fonts Debug: Registering fonts for URL: ' . $current_url);
        error_log('BeVision Fonts Debug: Page template: ' . get_page_template());
        
        // Debug: Force reload fonts
        $this->load_fonts();
        
        // Always output debug information for font loading issues
        error_log('BeVision Fonts Debug: Font directory: ' . $this->fonts_dir);
        error_log('BeVision Fonts Debug: Font URL base: ' . $this->fonts_url);
        error_log('BeVision Fonts Debug: Found fonts: ' . print_r($this->fonts, true));
        
        if (empty($this->fonts)) {
            // Debug output
            error_log('BeVision Fonts ERROR: No fonts found in ' . $this->fonts_dir);
            
            // Add hardcoded font declarations for the three main font styles as a fallback
            $css = $this->generate_hardcoded_font_css();
            
            if ($css) {
                $this->register_font_css($css, ['HelveticaNeue-Heavy', 'HelveticaNeue-Bold', 'HelveticaNeue-Roman']);
                error_log('BeVision Fonts Debug: Using hardcoded font declarations as fallback');
                return;
            }
            
            return;
        }

        // Add font declarations for the three main font styles
        $css = '';
        $registered_families = [];
        
        // Define the required font mappings
        $required_mappings = [
            'HelveticaNeue-Heavy' => false,
            'HelveticaNeue-Bold' => false,
            'HelveticaNeue-Roman' => false
        ];
        
        // First, process the actual font files
        foreach ($this->fonts as $name => $font) {
            $format = $this->get_format($font['type']);
            $family_name = $this->get_unique_font_family_name($name);
            $registered_families[] = $family_name;
            
            // Mark this font family as found
            if (isset($required_mappings[$family_name])) {
                $required_mappings[$family_name] = true;
            }
            
            // Check if the font file actually exists and is accessible
            $font_file_path = $this->fonts_dir . '/' . $font['file'];
            if (!file_exists($font_file_path)) {
                error_log('BeVision Fonts ERROR: Font file does not exist: ' . $font_file_path);
                continue;
            }
            
            // Get appropriate font-weight for this font
            $weight = $this->get_font_weight_from_name($name);
            
            // Add direct output to page for debugging
            $css .= "/* Font file: {$font['file']} mapped to {$family_name} with weight {$weight} */\n";
            $css .= "@font-face {
                font-family: '{$family_name}';
                src: url('{$font['url']}') format('{$format}');
                font-weight: {$weight};
                font-style: normal;
                font-display: swap;
            }\n";
            
            error_log('BeVision Fonts Debug: Registered font: ' . $family_name . ' from ' . $font['url'] . ' with weight ' . $weight);
        }
        
        // Check if we need to add hardcoded fallbacks for any missing required fonts
        $missing_fonts = array_filter($required_mappings, function($found) { return !$found; });
        
        if (!empty($missing_fonts)) {
            error_log('BeVision Fonts WARNING: Missing required fonts: ' . implode(', ', array_keys($missing_fonts)));
            $hardcoded_css = $this->generate_hardcoded_font_css(array_keys($missing_fonts));
            $css .= $hardcoded_css;
        }
        
        // Register the CSS
        $this->register_font_css($css, $registered_families);
    }
    
    private function register_font_css($css, $registered_families) {
        if ($css) {
            // Add direct output of CSS to page at the earliest possible point
            add_action('wp_head', function() use ($css) {
                echo "\n<!-- BeVision Fonts Output -->\n";
                echo "<style id='bevision-fonts'>\n";
                echo $css;
                echo "</style>\n";
            }, 1); // Highest priority (1) to ensure it loads as early as possible
            
            // Also register normally with WordPress
            wp_register_style('bevision-custom-fonts', false);
            wp_enqueue_style('bevision-custom-fonts');
            wp_add_inline_style('bevision-custom-fonts', $css);
            
            // Add to admin head as well to ensure fonts load in admin
            add_action('admin_head', function() use ($css) {
                echo "\n<!-- BeVision Fonts Admin Output -->\n";
                echo "<style id='bevision-fonts-admin'>\n";
                echo $css;
                echo "</style>\n";
            }, 1);
            
            // Force output for all pages including front page
            add_action('wp_print_styles', function() use ($css) {
                echo "\n<!-- BeVision Fonts Global Output -->\n";
                echo "<style id='bevision-fonts-global'>\n";
                echo $css;
                echo "</style>\n";
            }, 1); // Highest priority
            
            // Add to footer as well to catch any late-loading elements
            add_action('wp_footer', function() use ($css) {
                echo "\n<!-- BeVision Fonts Footer Output -->\n";
                echo "<style id='bevision-fonts-footer'>\n";
                echo $css;
                echo "</style>\n";
            }, 1);
            
            // Add to login page
            add_action('login_head', function() use ($css) {
                echo "\n<!-- BeVision Fonts Login Output -->\n";
                echo "<style id='bevision-fonts-login'>\n";
                echo $css;
                echo "</style>\n";
            }, 1);
            
            error_log('BeVision Fonts Debug: Registered font families: ' . implode(', ', $registered_families));
            error_log('BeVision Fonts Debug: CSS: ' . $css);
        } else {
            error_log('BeVision Fonts ERROR: No CSS generated for fonts');
        }

        add_filter('wp_theme_json_data_theme', [$this, 'add_fonts_to_theme_json']);
    }
    
    private function generate_hardcoded_font_css($only_fonts = null) {
        // Hardcoded font declarations as a last resort
        $fonts = [
            'HelveticaNeue-Heavy' => [
                'url' => $this->fonts_url . '/' . rawurlencode('Helvetica-Neue-LT-Std-85-Heavy.otf'),
                'format' => 'opentype',
                'weight' => '900'
            ],
            'HelveticaNeue-Bold' => [
                'url' => $this->fonts_url . '/' . rawurlencode('Helvetica-Neue-LT-Std-75-Bold.otf'),
                'format' => 'opentype',
                'weight' => '700'
            ],
            'HelveticaNeue-Roman' => [
                'url' => $this->fonts_url . '/' . rawurlencode('Helvetica-Neue-LT-55-Roman.ttf'),
                'format' => 'truetype',
                'weight' => '400'
            ]
        ];
        
        // Check if the font files exist
        foreach ($fonts as $family => $font) {
            $file_path = $this->fonts_dir . '/' . rawurldecode(basename($font['url']));
            if (!file_exists($file_path)) {
                error_log('BeVision Fonts WARNING: Hardcoded font file does not exist: ' . $file_path);
            } else {
                error_log('BeVision Fonts Debug: Hardcoded font file exists: ' . $file_path);
            }
        }
        
        $css = '';
        
        foreach ($fonts as $family => $font) {
            // Skip if not in the requested list
            if ($only_fonts !== null && !in_array($family, $only_fonts)) {
                continue;
            }
            
            $css .= "/* Hardcoded font declaration for {$family} */\n";
            $css .= "@font-face {
                font-family: '{$family}';
                src: url('{$font['url']}') format('{$font['format']}');
                font-weight: {$font['weight']};
                font-style: normal;
                font-display: swap;
            }\n";
            
            error_log('BeVision Fonts Debug: Added hardcoded font declaration for ' . $family);
        }
        
        return $css;
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

    private function get_font_weight($filename) {
        if (stripos($filename, 'Heavy') !== false) {
            return '900';
        } elseif (stripos($filename, 'Bold') !== false) {
            return '700';
        } elseif (stripos($filename, 'Roman') !== false) {
            return '400';
        }
        return '400';
    }

    private function get_font_family_name($filename) {
        // For new font files, use unified family name
        if (stripos($filename, 'Helvetica') !== false) {
            return 'HelveticaNeue';
        }
        return $filename;
    }

    private function get_unique_font_family_name($filename) {
        // Direct mapping for exact font file names (without extension)
        $exact_mappings = [
            // New file names
            'Helvetica-Neue-LT-Std-85-Heavy' => 'HelveticaNeue-Heavy',
            'Helvetica-Neue-LT-Std-75-Bold' => 'HelveticaNeue-Bold',
            'Helvetica-Neue-LT-55-Roman' => 'HelveticaNeue-Roman',
            // Old file names (keeping for backward compatibility)
            'Helvetica Neue LT Std 85 Heavy' => 'HelveticaNeue-Heavy',
            'Helvetica Neue LT Std 75 Bold' => 'HelveticaNeue-Bold',
            'Helvetica Neue LT 55 Roman' => 'HelveticaNeue-Roman'
        ];
        
        // Check for exact match first
        if (isset($exact_mappings[$filename])) {
            error_log('BeVision Fonts Debug: Exact font mapping found for: ' . $filename . ' → ' . $exact_mappings[$filename]);
            return $exact_mappings[$filename];
        }
        
        // Fallback to pattern matching if no exact match
        if (stripos($filename, '85') !== false || stripos($filename, 'Heavy') !== false) {
            error_log('BeVision Fonts Debug: Pattern match for Heavy font: ' . $filename);
            return 'HelveticaNeue-Heavy';
        } elseif (stripos($filename, '75') !== false || stripos($filename, 'Bold') !== false) {
            error_log('BeVision Fonts Debug: Pattern match for Bold font: ' . $filename);
            return 'HelveticaNeue-Bold';
        } elseif (stripos($filename, '55') !== false || stripos($filename, 'Roman') !== false) {
            error_log('BeVision Fonts Debug: Pattern match for Roman font: ' . $filename);
            return 'HelveticaNeue-Roman';
        }
        
        // Log if no mapping found
        error_log('BeVision Fonts WARNING: No font mapping found for: ' . $filename);
        return $filename;
    }

    private function get_font_weight_from_name($filename) {
        if (stripos($filename, '85') !== false || stripos($filename, 'Heavy') !== false) {
            return '900';
        } elseif (stripos($filename, '75') !== false || stripos($filename, 'Bold') !== false) {
            return '700';
        } elseif (stripos($filename, '55') !== false || stripos($filename, 'Roman') !== false) {
            return '400';
        }
        return '400';
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
            $family_name = $this->get_unique_font_family_name($name);
            $data['settings']['typography']['fontFamilies'][] = [
                'name' => $family_name,
                'slug' => sanitize_title($family_name),
                'fontFamily' => "'{$family_name}', sans-serif"
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
            'bevision-fonts',
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
                    <?php wp_nonce_field('bevision_font_upload', 'font_upload_nonce'); ?>
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
                    <?php wp_nonce_field('bevision_font_delete', 'font_delete_nonce'); ?>
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

        if (!wp_verify_nonce($_POST['font_upload_nonce'], 'bevision_font_upload')) {
            wp_die('Invalid nonce');
        }

        $file = $_FILES['font_file'];
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);

        if (!in_array($ext, ['ttf', 'otf', 'woff', 'woff2'])) {
            add_settings_error(
                'bevision_fonts',
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
                'bevision_fonts',
                'font_uploaded',
                'Font uploaded successfully.',
                'success'
            );
        } else {
            add_settings_error(
                'bevision_fonts',
                'upload_failed',
                'Failed to upload font.',
                'error'
            );
        }
    }

    private function delete_font($font_name) {
        if (!isset($_POST['font_delete_nonce']) || 
            !wp_verify_nonce($_POST['font_delete_nonce'], 'bevision_font_delete')) {
            wp_die('Invalid nonce');
        }

        if (isset($this->fonts[$font_name])) {
            $file = $this->fonts_dir . '/' . $this->fonts[$font_name]['file'];
            if (file_exists($file) && unlink($file)) {
                unset($this->fonts[$font_name]);
                add_settings_error(
                    'bevision_fonts',
                    'font_deleted',
                    'Font deleted successfully.',
                    'success'
                );
            }
        }
    }
}
