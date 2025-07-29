<?php
/**
 * WordPress Menu Rendering Functions for BeVision Theme
 */

/**
 * Register shortcode for displaying WordPress menus in blocks
 */
function bevision_menu_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => 0,
    ), $atts);
    
    $menu_id = intval($atts['id']);
    
    if ($menu_id <= 0) {
        return '<nav class="bevision-wp-menu"><ul class="bevision-menu-items empty-menu"><li>Menu not found</li></ul></nav>';
    }
    
    // Check if the menu exists
    $menu_object = wp_get_nav_menu_object($menu_id);
    if (!$menu_object) {
        return '<nav class="bevision-wp-menu"><ul class="bevision-menu-items empty-menu"><li>Menu not found</li></ul></nav>';
    }
    
    // Custom walker to include descriptions and style submenu items
    class Bevision_Menu_Walker extends Walker_Nav_Menu {
        function start_lvl(&$output, $depth = 0, $args = array()) {
            // Start submenu container
            $output .= '<div class="submenu-container"><ul class="sub-menu">';
        }
        
        function end_lvl(&$output, $depth = 0, $args = array()) {
            // Close submenu container
            $output .= '</ul></div>';
        }
        
        function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
            $classes = empty($item->classes) ? array() : (array) $item->classes;
            
            // Get description from post meta if it's a product
            if ($item->object === 'bevision_product' && empty($item->description)) {
                // Try to get the description directly from post meta
                $product_id = $item->object_id;
                
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
                
                if (!empty($description)) {
                    // Set the description directly on the menu item
                    $item->description = $description;
                }
            }
            
            // Add 'has-description' class if menu item has a description
            if (!empty($item->description)) {
                $classes[] = 'has-description';
            }
            
            // Add special class for submenu items
            if ($depth > 0) {
                $classes[] = 'submenu-item';
            }
            
            // Add menu-item-has-children class for items with children
            if (in_array('menu-item-has-children', $classes) || !empty($args->walker->has_children)) {
                $classes[] = 'menu-item-has-children';
            }
            
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
            
            // Handle submenu items differently - make li clickable
            if ($depth > 0) {
                // For submenu items, add onclick to li element
                $href = !empty($item->url) ? esc_url($item->url) : '';
                $onclick_attr = !empty($href) ? ' onclick="window.location.href=\'' . $href . '\'" style="cursor: pointer;"' : '';
                $output .= '<li' . $class_names . $onclick_attr . '>';
                
                $title = apply_filters('the_title', $item->title, $item->ID);
                $item_output = $args->before;
                $item_output .= '<span class="submenu-item-title">';
                $item_output .= $args->link_before . $title . $args->link_after;
                $item_output .= '</span>';
            } else {
                // Regular menu items keep original structure
                $output .= '<li' . $class_names . '>';
                
                $atts = array();
                $atts['title']  = !empty($item->attr_title) ? $item->attr_title : '';
                $atts['target'] = !empty($item->target) ? $item->target : '';
                $atts['rel']    = !empty($item->xfn) ? $item->xfn : '';
                $atts['href']   = !empty($item->url) ? $item->url : '';
                $atts['class'] = 'menu-item-title';
                
                $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);
                
                $attributes = '';
                foreach ($atts as $attr => $value) {
                    if (!empty($value)) {
                        $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                        $attributes .= ' ' . $attr . '="' . $value . '"';
                    }
                }
                
                $title = apply_filters('the_title', $item->title, $item->ID);
                
                $item_output = $args->before;
                $item_output .= '<a' . $attributes . '>';
                $item_output .= $args->link_before . $title . $args->link_after;
                $item_output .= '</a>';
            }
            
            // Add description if available - ALWAYS TRY TO SHOW FOR PRODUCTS
            if (!empty($item->description)) {
                $item_output .= '<span class="menu-item-description">' . esc_html($item->description) . '</span>';
            } elseif ($item->object === 'bevision_product') {
                // Last resort - get description directly from product meta as a fallback
                $product_id = $item->object_id;
                $direct_desc = get_post_meta($product_id, '_bevision_product_description', true);
                if (!empty($direct_desc)) {
                    $item_output .= '<span class="menu-item-description">' . esc_html($direct_desc) . '</span>';
                }
            }
            
            $item_output .= $args->after;
            
            $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
        }
    }
    
    // Get the menu HTML with our custom walker
    $menu_html = wp_nav_menu(array(
        'menu' => $menu_id,
        'container' => 'nav',
        'container_class' => 'bevision-wp-menu',
        'menu_class' => 'bevision-menu-items',
        'depth' => 2,
        'echo' => false,
        'fallback_cb' => false,
        'walker' => new Bevision_Menu_Walker(),
    ));
    
    return $menu_html;
}
add_shortcode('bevision_menu', 'bevision_menu_shortcode');

/**
 * Mobile Menu Shortcode - Renders WordPress menu in mobile format
 */
function bevision_mobile_menu_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => 0,
    ), $atts);
    
    $menu_id = intval($atts['id']);
    
    if (empty($menu_id)) {
        return '';
    }
    
    // Custom walker for mobile menu
    class Bevision_Mobile_Menu_Walker extends Walker_Nav_Menu {
        
        // Start Level - Start the menu (ul)
        function start_lvl(&$output, $depth = 0, $args = null) {
            $indent = str_repeat("\t", $depth);
            $output .= "\n$indent<div class=\"mobile-submenu hidden\">\n";
        }
        
        // End Level - End the menu (ul)
        function end_lvl(&$output, $depth = 0, $args = null) {
            $indent = str_repeat("\t", $depth);
            $output .= "$indent</div>\n";
        }
        
        // Start Element - Start the menu item (li)
        function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
            $indent = ($depth) ? str_repeat("\t", $depth) : '';
            
            $classes = empty($item->classes) ? array() : (array) $item->classes;
            $classes[] = 'menu-item-' . $item->ID;
            
            // Get description from post meta if it's a product (same logic as desktop walker)
            if ($item->object === 'bevision_product' && empty($item->description)) {
                // Try to get the description directly from post meta
                $product_id = $item->object_id;
                
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
                
                if (!empty($description)) {
                    // Set the description directly on the menu item
                    $item->description = $description;
                }
            }
            
            $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
            $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
            
            $id = apply_filters('nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args);
            $id = $id ? ' id="' . esc_attr($id) . '"' : '';
            
            if ($depth == 0) {
                // Top level menu item
                $has_children = in_array('menu-item-has-children', $classes);
                
                if ($has_children) {
                    // Menu item with submenu
                    $output .= $indent . '<div class="mobile-menu-item">';
                    $output .= '<button class="mobile-submenu-toggle" data-submenu-index="' . $item->ID . '">';
                    $output .= '<span>' . apply_filters('the_title', $item->title, $item->ID) . '</span>';
                    $output .= '<span class="submenu-arrow">';
                    $output .= '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">';
                    $output .= '<path d="M6 9L12 15L18 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>';
                    $output .= '</svg>';
                    $output .= '</span>';
                    $output .= '</button>';
                } else {
                    // Regular menu item
                    $output .= $indent . '<div class="mobile-menu-item">';
                    $atts = array();
                    $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
                    $atts['target'] = !empty($item->target) ? $item->target : '';
                    $atts['rel'] = !empty($item->xfn) ? $item->xfn : '';
                    $atts['href'] = !empty($item->url) ? $item->url : '';
                    $atts['class'] = 'mobile-menu-link';
                    
                    $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);
                    
                    $attributes = '';
                    foreach ($atts as $attr => $value) {
                        if (!empty($value)) {
                            $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                            $attributes .= ' ' . $attr . '="' . $value . '"';
                        }
                    }
                    
                    $output .= '<a' . $attributes . '>' . apply_filters('the_title', $item->title, $item->ID) . '</a>';
                }
            } else {
                // Submenu item
                $atts = array();
                $atts['title'] = !empty($item->attr_title) ? $item->attr_title : '';
                $atts['target'] = !empty($item->target) ? $item->target : '';
                $atts['rel'] = !empty($item->xfn) ? $item->xfn : '';
                $atts['href'] = !empty($item->url) ? $item->url : '';
                $atts['class'] = 'mobile-submenu-item';
                
                $atts = apply_filters('nav_menu_link_attributes', $atts, $item, $args, $depth);
                
                $attributes = '';
                foreach ($atts as $attr => $value) {
                    if (!empty($value)) {
                        $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                        $attributes .= ' ' . $attr . '="' . $value . '"';
                    }
                }
                
                $title = apply_filters('the_title', $item->title, $item->ID);
                $description = !empty($item->description) ? $item->description : '';
                
                $output .= $indent . '<a' . $attributes . '>';
                $output .= '<div class="mobile-submenu-item-content">';
                $output .= '<div class="mobile-submenu-title">' . $title . '</div>';
                if (!empty($description)) {
                    $output .= '<div class="mobile-submenu-description">' . esc_html($description) . '</div>';
                }
                $output .= '</div>';
                $output .= '</a>';
            }
        }
        
        // End Element - End the menu item (li)
        function end_el(&$output, $item, $depth = 0, $args = null) {
            if ($depth == 0) {
                $output .= "</div>\n";
            }
        }
    }
    
    // Get the mobile menu HTML with our custom walker
    $menu_html = wp_nav_menu(array(
        'menu' => $menu_id,
        'container' => false,
        'menu_class' => '',
        'depth' => 2,
        'echo' => false,
        'fallback_cb' => false,
        'walker' => new Bevision_Mobile_Menu_Walker(),
    ));
    
    return $menu_html;
}
add_shortcode('bevision_mobile_menu', 'bevision_mobile_menu_shortcode');

/**
 * Process blocks to add the menu shortcode
 */
function bevision_process_blocks($block_content, $block) {
    // Handle desktop WordPress menu
    if (isset($block['attrs']['useWordPressMenu']) && $block['attrs']['useWordPressMenu'] &&
        isset($block['attrs']['selectedMenuId']) && $block['attrs']['selectedMenuId'] > 0) {
        
        // Look for the menu placeholder div
        if (strpos($block_content, 'wp-menu-container') !== false) {
            $menu_id = $block['attrs']['selectedMenuId'];
            $shortcode = "[bevision_menu id='{$menu_id}']";
            $processed_content = preg_replace(
                '/<div[^>]*class="[^"]*wp-menu-container[^"]*"[^>]*>.*?<\/div>/s',
                do_shortcode($shortcode),
                $block_content
            );
            
            $block_content = $processed_content;
        }
    }
    
    // Handle mobile WordPress menu
    if (isset($block['attrs']['useMobileWordPressMenu']) && $block['attrs']['useMobileWordPressMenu'] &&
        isset($block['attrs']['selectedMobileMenuId']) && $block['attrs']['selectedMobileMenuId'] > 0) {
        
        // Look for the mobile menu placeholder div
        if (strpos($block_content, 'wp-mobile-menu-container') !== false) {
            $menu_id = $block['attrs']['selectedMobileMenuId'];
            $shortcode = "[bevision_mobile_menu id='{$menu_id}']";
            
            $processed_content = preg_replace(
                '/<div[^>]*class="[^"]*wp-mobile-menu-container[^"]*"[^>]*>.*?<\/div>/s',
                do_shortcode($shortcode),
                $block_content
            );
            
            if ($processed_content !== $block_content) {
                $block_content = $processed_content;
            }
        }
    }
    
    return $block_content;
}
add_filter('render_block', 'bevision_process_blocks', 10, 2);

/**
 * Add custom styles for the navigation menus
 */
function bevision_menu_styles() {
    ?>
    <style>
        /* Main navigation menu styling */
        .bevision-wp-menu {
            display: flex;
            margin: 0;
        }
        
        .bevision-menu-items {
            display: flex;
            gap: 2rem;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .bevision-menu-items li {
            position: relative;
        }
        
        /* Menu items with descriptions */
        .bevision-menu-items li .menu-item-description {
            display: block;
            color: #777;
            font-size: 14px;
            line-height: 1.4;
        }
        
        /* Menu with descriptions styling - we add a class in the walker */
        .bevision-menu-items li.has-description {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: none;
            transition: all 0.3s ease;
            width: 220px;
        }
        
        /* Menu item links */
        .bevision-menu-items a {
            color: var(--Dark-Blue, #221A4C);
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .bevision-menu-items a:hover {
            color: #6c5ce7;
        }
        
        /* Menu item title for items with descriptions */
        .bevision-menu-items a.menu-item-title {
            color: var(--Dark-Blue, #221A4C);
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-family: 'bold';
            font-weight: 700;
            line-height: normal;
            display: block;
        }
        
        .bevision-menu-items a:hover {
            color: #6c5ce7;
        }
        
        /* Arrow icon for menu items with submenus */
        .bevision-menu-items .menu-item-has-children > a.menu-item-title::after {
            content: '';
            display: inline-block;
            margin-left: 8px;
            width: 7px;
            height: 7px;
            border-style: solid;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            transition: transform 0.3s ease;
            position: relative;
            top: -2px;
            vertical-align: middle;
        }
        
        .bevision-menu-items .menu-item-has-children:hover > a.menu-item-title::after {
            transform: rotate(-135deg);
            top: 1px;
            vertical-align: middle;
        }
        
        /* Submenu styling - simple clean version */
        .bevision-menu-items .submenu-container {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            min-width: 303px;
            z-index: 1000;
            padding: 15px 0;
        }
        
        .bevision-menu-items li:hover > .submenu-container {
            display: block;
        }
        
        .bevision-menu-items .sub-menu {
            display: block;
            background: #fff;
            border-radius: 8px;
            padding: 10px 15px;
            width: 100%;
            box-shadow: 0px 10px 60px 0px rgba(102, 83, 198, 0.15);
            border: 1px solid #f0f0f0;
        }
        
        .bevision-menu-items .sub-menu li {
            padding: 10px 0;
            width: 100%;
            list-style: none;
            border-bottom: none;
            cursor: pointer;
        }
        
        .bevision-menu-items .sub-menu li:last-child {
            margin-bottom: 0;
        }
        
        /* Submenu item title - styled to match the image */
        .bevision-menu-items .sub-menu span.submenu-item-title {
            text-align: left;
            font-size: 16px;
            font-weight: 700;
            font-family: 'bold'!important;
            color: #221A4C!important;
            display: block;
            text-decoration: none;
        }

        .bevision-menu-items .sub-menu li:hover span.submenu-item-title {
            color: #6c5ce7 !important;
        }
        
        /* Submenu item description - styled to match the image */
        .bevision-menu-items .sub-menu li .menu-item-description {
            font-size: 14px;
            color: #8399AF;
            font-family: 'roman';
            line-height: 1.5;
            display: block;
            font-weight: 400;
        }
        
        /* Mobile menu adjustments */
        @media (max-width: 768px) {
            .bevision-wp-menu {
                display: none;
            }
            
            /* Show mobile menu WordPress content */
            .mobile-menu .bevision-wp-menu {
                display: block;
            }
            
            /* Style all mobile menu items consistently */
            .mobile-menu .mobile-menu-item {
                margin-bottom: 0;
                position: relative;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            }
            
            /* Style for mobile menu links and submenu toggles - ensure identical styling */
            .mobile-menu .mobile-menu-link,
            .mobile-menu .mobile-submenu-toggle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 16px 20px;
                font-size: 18px;
                font-weight: 700;
                color: #333;
                text-decoration: none;
                background: none;
                font-family: 'bold';
                border: none;
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s ease;
            }
            
            /* Ensure spans inside buttons have the same styling as links */
            .mobile-menu .mobile-submenu-toggle span:first-child {
                font-size: 18px;
                font-weight: 700;
                color: #333;
                text-align: left;
                flex-grow: 1;
            }
            
            /* Hover states - identical for both links and buttons */
            .mobile-menu .mobile-menu-link:hover,
            .mobile-menu .mobile-submenu-toggle:hover {
                background-color: rgba(108, 92, 231, 0.1);
                color: #6c5ce7;
            }
            
            .mobile-menu .mobile-submenu-toggle:hover span:first-child {
                color: #6c5ce7;
            }

            /* Hide submenu containers by default on mobile */
            .mobile-menu .mobile-submenu {
                display: none;
                position: static;
                width: 100%;
                padding: 0;
                margin: 0;
                background-color: #f8f9fa;
            }
            
            /* Show submenu when opened */
            .mobile-menu .mobile-submenu:not(.hidden) {
                display: block;
            }
            
            /* Style submenu items consistently */
            .mobile-menu .mobile-submenu-item {
                display: block;
                padding: 16px 20px 16px 20px;
                color: #333;
                text-decoration: none;
                font-size: 14px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                transition: background-color 0.2s ease;
            }
            
            .mobile-menu .mobile-submenu-item:hover {
                background-color: rgba(108, 92, 231, 0.1);
                color: #6c5ce7;
            }
            
            /* Style submenu titles and descriptions */
            .mobile-menu .mobile-submenu-title {
                font-size: 16px;
                font-family: 'bold';
                font-style: normal;
                font-weight: 700;
                color: #221A4C;
                margin-bottom: 4px;
                display: block;
            }
            
            .mobile-menu .mobile-submenu-description {
                font-size: 12px;
                color: #8399AF;
                line-height: normal;
                font-weight: 400;
                font-family: 'roman';
                display: block;
            }
            
            /* Hover effect for submenu titles */
            .mobile-menu .mobile-submenu-item:hover .mobile-submenu-title {
                color: #221A4C;
            }
            
            .mobile-menu .mobile-submenu-item:hover .mobile-submenu-description {
                color: #8399AF;
            }
            
            /* Arrow styling for submenu toggles - Fixed positioning */
            .mobile-menu .submenu-arrow {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 16px;
                height: 16px;
                min-width: 16px;
                flex-shrink: 0;
                transition: transform 0.3s ease;
                transform-origin: center;
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
            
            .mobile-menu .submenu-arrow svg {
                width: 16px;
                height: 16px;
                display: block;
            }
            
            /* Rotate arrow when submenu is open - arrow stays in fixed position */
            .mobile-menu .mobile-submenu-toggle[aria-expanded="true"] .submenu-arrow {
                transform: translateY(-50%) rotate(180deg);
            }
            
            /* Adjust padding for submenu toggles to make room for fixed arrow */
            .mobile-menu .mobile-submenu-toggle {
                padding-right: 50px !important;
                position: relative;
            }
            
            /* Ensure consistent spacing and borders */
            .mobile-menu .mobile-menu-item:last-child {
                border-bottom: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_menu_styles');

/**
 * Register and enqueue mobile submenu script
 */
function bevision_register_mobile_submenu_script() {
    wp_enqueue_script(
        'bevision-mobile-submenu',
        get_template_directory_uri() . '/assets/js/mobile-submenu.js',
        array(),
        filemtime(get_template_directory() . '/assets/js/mobile-submenu.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'bevision_register_mobile_submenu_script');
