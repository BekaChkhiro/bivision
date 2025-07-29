# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build Commands
- `npm run build` - Build production assets using wp-scripts
- `npm run start` - Start development server with watch mode
- `npm run packages-update` - Update WordPress packages

### WordPress Development
This is a WordPress block theme, so use standard WordPress development practices:
- Use `wp-cli` for WordPress operations if available
- Test changes in both editor and frontend
- Check block editor compatibility when modifying blocks

## Architecture Overview

### WordPress Block Theme Structure
This is a modern WordPress block theme built with Full Site Editing (FSE) capabilities. The theme uses:
- **WordPress Block API** for custom blocks
- **TailwindCSS** for styling (with preflight disabled to avoid conflicts)
- **Webpack** with @wordpress/scripts for build process
- **Custom font management system** for uploadable fonts

### Key Directories
- `/src/blocks/` - Custom block source code
  - `layout/` - Theme layout blocks (header, footer, hero)
  - `content/` - Content blocks (products, testimonials, etc.)
  - `product/` - Product-specific blocks
- `/inc/` - PHP includes and functionality
- `/build/` - Compiled assets (webpack output)
- `/assets/` - Static assets (images, fonts, additional CSS/JS)

### Block Registration
Blocks are registered in `inc/blocks.php` using `register_block_type()`. Each block has:
- `index.js` - Block registration and editor interface
- `frontend.js` - Frontend-only JavaScript (optional)
- `frontend.css` - Frontend styles (optional)
- `styles.js` - Shared styles (optional)

### Custom Features
- **Font Management**: Custom font upload system in `inc/class-bevision-fonts.php`
- **AJAX Post Loading**: Dynamic post filtering in posts-tab block
- **Lead Popup System**: Custom lead generation popup functionality
- **Mobile Menu System**: JavaScript-driven mobile navigation with body scroll lock
- **Custom Post Types**: Product CPT and testimonial fields
- **REST API Extensions**: Custom endpoints for dynamic content
- **Carousel Libraries**: Uses Swiper.js, Slick Carousel, and Tiny Slider for various components

## Block Development Patterns

### Block Structure
Each block follows this pattern:
```
src/blocks/[category]/[block-name]/
├── index.js          # Block registration
├── frontend.js       # Frontend JavaScript
├── frontend.css      # Frontend styles
├── styles.js         # Shared styles
└── components/       # React components (for complex blocks)
```

### Component Organization
Complex blocks like `client-testimonials`, `products`, and `why-bivision` use component-based architecture with:
- Separate edit/save components
- Inspector controls for block settings
- Modular sub-components in `components/` directory

### Styling Approach
- **TailwindCSS** for utility classes
- **Custom CSS** for component-specific styles
- **Inline styles** for dynamic styling (passed from block attributes)
- Preflight disabled to prevent conflicts with WordPress editor styles

## Development Workflows

### Adding New Blocks
1. Create block directory in appropriate category
2. Add block registration to `inc/blocks.php`
3. Follow existing block patterns for structure
4. Use WordPress block API conventions
5. Test in both editor and frontend

### Modifying Styles
1. Use TailwindCSS utilities when possible
2. Add custom CSS to block's frontend.css file
3. Run `npm run build` to compile changes
4. Test responsive behavior

### JavaScript Development
- Use modern ES6+ syntax
- WordPress packages are available (@wordpress/element, @wordpress/components, etc.)
- Frontend JavaScript should be added to block's frontend.js file
- AJAX requests should use WordPress localized script data

## Theme Configuration

### theme.json
Contains WordPress theme settings including:
- Layout sizes (contentSize: 840px, wideSize: 1100px)
- Color palette
- Typography settings
- Font families (including custom uploaded fonts)

### Webpack Configuration
- Uses @wordpress/scripts as base with custom webpack.config.js
- Extends with TailwindCSS and PostCSS processing
- Outputs to `/build/` directory with custom publicPath
- Processes CSS with autoprefixer and MiniCssExtractPlugin
- Handles font assets (woff, woff2, eot, ttf, otf) with hash naming

## Important Notes

### Font Management
- Custom fonts are uploaded via admin interface
- Font files stored in `/wp-content/uploads/useanyfont/`
- Font registration handled by BeVision_Fonts class
- Fonts automatically added to theme.json

### AJAX Functionality
- Uses WordPress AJAX hooks (wp_ajax_* actions)
- Localized script data in `window.bevisionSettings`
- Follows WordPress nonce security practices

### Block Editor Compatibility
- Blocks support WordPress editor features (align, color, etc.)
- Inspector controls use WordPress components
- Follow WordPress block development guidelines

### Security Considerations
- All user inputs are sanitized
- WordPress nonces used for AJAX requests
- File uploads restricted to allowed types
- Debug mode should be disabled in production

This theme is designed for flexibility and follows WordPress best practices for block theme development.