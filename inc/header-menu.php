<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
<?php
/**
 * BeVision Header Menu Functions
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Render the header menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'primary'.
 */
function bevision_render_header_menu($menu_location = 'primary') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-primary-menu',
            'menu_class'     => 'bevision-menu',
            'container'      => 'div',
            'container_class' => 'bevision-menu-container',
            'fallback_cb'    => false,
            'depth'          => 2,
        ));
    } else {
        // Display message if no menu is assigned (only for logged-in admins)
        if (current_user_can('edit_theme_options')) {
            echo '<div class="bevision-no-menu-notice">';
            echo '<p>' . __('Please assign a menu to the "Primary Menu" location in the WordPress menu settings.', 'bevision') . '</p>';
            echo '<a href="' . esc_url(admin_url('nav-menus.php')) . '">' . __('Go to Menus', 'bevision') . '</a>';
            echo '</div>';
        }
    }
}

/**
 * Render the mobile menu for the BeVision theme
 * 
 * @param string $menu_location Optional. Menu location to display. Default 'mobile'.
 */
function bevision_render_mobile_menu($menu_location = 'mobile') {
    if (has_nav_menu($menu_location)) {
        wp_nav_menu(array(
            'theme_location' => $menu_location,
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    } else if ($menu_location !== 'primary' && has_nav_menu('primary')) {
        // Fall back to primary menu if specified menu doesn't exist
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'menu_id'        => 'bevision-mobile-menu',
            'menu_class'     => 'bevision-mobile-menu',
            'container'      => 'div',
            'container_class' => 'bevision-mobile-menu-container',
            'fallback_cb'    => false,
            'depth'          => 1,
        ));
    }
}

/**
 * Add header menu styles
 */
function bevision_header_menu_styles() {
    ?>
    <style>
        /* Primary menu styling */
        .bevision-menu-container {
            width: 100%;
        }
        .bevision-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 2rem;
            justify-content: center;
        }
        .bevision-menu li {
            position: relative;
        }
        .bevision-menu a {
            color: #333;
            font-size: 18px;
            font-weight: 500;
            text-decoration: none;
            padding: 8px 0;
            display: block;
        }
        .bevision-menu a:hover {
            color: #6c5ce7;
        }
        .bevision-menu .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            min-width: 200px;
            border-radius: 8px;
            padding: 8px;
            display: none;
            z-index: 100;
        }
        .bevision-menu li:hover > .sub-menu {
            display: block;
        }
        .bevision-menu .sub-menu a {
            padding: 8px;
            font-size: 16px;
        }
        
        /* Mobile menu styling */
        .bevision-mobile-menu-container {
            width: 100%;
        }
        .bevision-mobile-menu {
            display: flex;
            flex-direction: column;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1rem;
        }
        .bevision-mobile-menu a {
            color: #333;
            font-size: 20px;
            font-weight: 500;
            text-decoration: none;
            padding: 10px 0;
            display: block;
        }
        .bevision-mobile-menu a:hover {
            color: #6c5ce7;
        }
        
        /* Menu notice styling */
        .bevision-no-menu-notice {
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px dashed #ccc;
            text-align: center;
        }
        .bevision-no-menu-notice a {
            display: inline-block;
            margin-top: 5px;
            padding: 5px 10px;
            background-color: #6c5ce7;
            color: white;
            text-decoration: none;
            border-radius: 4px;
        }
        
        @media (max-width: 768px) {
            .bevision-menu-container {
                display: none;
            }
        }
    </style>
    <?php
}
add_action('wp_head', 'bevision_header_menu_styles');
