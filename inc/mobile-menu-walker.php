<?php
/**
 * Custom Walker for WordPress Mobile Menu
 * 
 * This walker class formats WordPress menu items to match the custom mobile menu design
 */
class Mobile_Menu_Walker extends Walker_Nav_Menu {
    /**
     * Starts the list before the elements are added.
     */
    public function start_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        
        if ($depth === 0) {
            // This is a top-level submenu (like Products submenu)
            $output .= "\n$indent<div class=\"mobile-section-content\">\n";
        } else {
            // This is a deeper level submenu
            $output .= "\n$indent<div class=\"mobile-subsection-content\">\n";
        }
    }

    /**
     * Ends the list of after the elements are added.
     */
    public function end_lvl(&$output, $depth = 0, $args = array()) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</div>\n";
    }

    /**
     * Start the element output.
     */
    public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        
        // Check if the item has children
        $has_children = in_array('menu-item-has-children', $classes);
        
        // Get item description from title attribute or custom field
        $description = !empty($item->attr_title) ? $item->attr_title : '';
        
        // For top level items
        if ($depth === 0) {
            if ($has_children) {
                // This is a parent item with submenu (like Products)
                $output .= $indent . '<div class="mobile-menu-section">';
                $output .= '<div class="mobile-section-header">';
                $output .= '<span>' . $item->title . '</span>';
                $output .= '<span class="section-arrow">';
                $output .= '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
                $output .= '<path d="M6 9L12 15L18 9" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
                $output .= '</svg>';
                $output .= '</span>';
                $output .= '</div>';
            } else {
                // This is a regular top level menu item without submenu
                $output .= $indent . '<div class="mobile-menu-item">';
                $output .= '<a href="' . $item->url . '" class="mobile-menu-link">';
                $output .= $item->title;
                $output .= '</a>';
                $output .= '</div>';
            }
        } 
        // For submenu items (like BiRetail, BiFinance, etc.)
        else if ($depth === 1) {
            $output .= $indent . '<div class="mobile-product-item">';
            $output .= '<a href="' . $item->url . '" class="product-link">';
            $output .= '<div class="product-title">' . $item->title . '</div>';
            if ($description) {
                $output .= '<div class="product-description">' . $description . '</div>';
            }
            $output .= '</a>';
            $output .= '</div>';
        }
        // For deeper submenu items if any
        else {
            $output .= $indent . '<div class="mobile-submenu-item">';
            $output .= '<a href="' . $item->url . '">' . $item->title . '</a>';
            $output .= '</div>';
        }
    }

    /**
     * Ends the element output.
     */
    public function end_el(&$output, $item, $depth = 0, $args = array()) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $has_children = in_array('menu-item-has-children', $classes);
        
        if ($depth === 0 && $has_children) {
            $output .= "</div>\n"; // Close mobile-menu-section
        } else if ($depth === 0) {
            // Already closed in start_el
        }
    }
}

/**
 * Function to render the WordPress menu with custom styling
 */
function render_custom_mobile_menu($menu_id) {
    if (!$menu_id) return '';
    
    wp_nav_menu(array(
        'menu' => $menu_id,
        'container' => 'nav',
        'container_class' => 'mobile-navigation',
        'menu_class' => 'custom-mobile-menu',
        'walker' => new Mobile_Menu_Walker(),
        'items_wrap' => '%3$s', // Don't wrap items in ul
        'echo' => true
    ));
}

/**
 * Hook into wp_footer to add JavaScript for processing the mobile menu
 */
add_action('wp_footer', 'mobile_menu_script');
function mobile_menu_script() {
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Find all WordPress menu containers that need custom styling
        const wpMenuContainers = document.querySelectorAll('.wp-mobile-menu-container[data-menu-style="custom"]');
        
        wpMenuContainers.forEach(container => {
            const menuId = container.getAttribute('data-menu-id');
            if (menuId) {
                // This will be replaced by PHP with the actual menu
                container.setAttribute('data-menu-loaded', 'true');
                // PHP will render the menu here
                
                // After menu is loaded, add event listeners for section headers
                const sectionHeaders = container.querySelectorAll('.mobile-section-header');
                
                // Initialize all section contents with maxHeight 0
                const allSectionContents = container.querySelectorAll('.mobile-section-content');
                allSectionContents.forEach(content => {
                    content.style.maxHeight = '0px';
                });
                
                sectionHeaders.forEach(header => {
                    header.addEventListener('click', function() {
                        const section = this.closest('.mobile-menu-section');
                        const content = section.querySelector('.mobile-section-content');
                        const arrow = this.querySelector('.section-arrow');
                        
                        // Toggle section content visibility
                        if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                            arrow.style.transform = 'rotate(180deg)';
                        } else {
                            content.style.maxHeight = '0px';
                            arrow.style.transform = 'rotate(0)';
                        }
                    });
                });
            }
        });
        
        // Add event listener for mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileCloseButton = document.querySelector('.mobile-close-button');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenu.classList.remove('hidden');
                document.body.classList.add('mobile-menu-open');
            });
        }
        
        if (mobileCloseButton && mobileMenu) {
            mobileCloseButton.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('mobile-menu-open');
            });
        }
    });
    </script>
    <?php
}

/**
 * Hook into the_content to process WordPress menu placeholders
 */
add_filter('the_content', 'process_mobile_menu_placeholders');
function process_mobile_menu_placeholders($content) {
    // Look for WordPress menu placeholders in the content
    if (strpos($content, 'data-menu-style="custom"') !== false) {
        $content = preg_replace_callback(
            '/<div[^>]*class="wp-mobile-menu-container[^"]*"[^>]*data-menu-id="(\d+)"[^>]*data-menu-style="custom"[^>]*><\/div>/',
            function($matches) {
                $menu_id = $matches[1];
                ob_start();
                render_custom_mobile_menu($menu_id);
                return ob_get_clean();
            },
            $content
        );
    }
    return $content;
}
