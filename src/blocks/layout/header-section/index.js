import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

// Import components
import Header from './components/Header';
import Inspector from './components/Inspector';
import Save from './components/Save';

registerBlockType('bevision/header-section', {
    title: 'Header Section',
    icon: 'menu',
    category: 'design',
    attributes: {
        backgroundColor: {
            type: 'string',
            default: '#ffffff'
        },
        buttonColor: {
            type: 'string',
            default: '#00E640'
        },
        buttonTextColor: {
            type: 'string',
            default: '#ffffff'
        },
        buttonPaddingV: {
            type: 'number',
            default: 10
        },
        buttonPaddingH: {
            type: 'number',
            default: 40
        },
        buttonBorderRadius: {
            type: 'number',
            default: 4
        },
        buttonFontSize: {
            type: 'number',
            default: 18
        },
        buttonFontWeight: {
            type: 'string',
            default: '500'
        },
        logo: {
            type: 'string',
            default: '/wp-content/themes/BeVision/assets/images/logo.svg'
        },
        logoHeight: {
            type: 'number',
            default: 40
        },
        logoWidth: {
            type: 'string',
            default: 'auto'
        },
        menuItems: {
            type: 'array',
            default: [
                { text: 'Products', url: '#', description: 'Lorem ipsum dolor sit amet' },
                { text: 'Clients', url: '#', description: 'Sed tincidunt, sapien ut aliquam dapibus' },
                { text: 'About us', url: '#', description: 'Proin nec tortor nec justo consequat luctus' }
            ]
        },
        mobileMenuItems: {
            type: 'array',
            default: [
                { text: 'Products', url: '#', hasSubmenu: false, submenu: [] },
                { text: 'Services', url: '#', hasSubmenu: true, submenu: [
                    { url: '#', title: 'Business Consulting', description: 'Strategic business advisory services' },
                    { url: '#', title: 'Software Development', description: 'Custom software solutions and development services' }
                ]},
                { text: 'About Us', url: '#', hasSubmenu: false, submenu: [] }
            ]
        },
        submenuEnabled: {
            type: 'boolean',
            default: false
        },
        languageText: {
            type: 'string',
            default: 'GE'
        },
        languageFlag: {
            type: 'string',
            default: '/wp-content/themes/BeVision/assets/images/ge-flag.svg'
        },
        languageFlagSize: {
            type: 'number',
            default: 24
        },
        languageUrl: {
            type: 'string',
            default: '#'
        },
        languages: {
            type: 'array',
            default: [
                { code: 'GE', name: 'GE', flag: '/wp-content/themes/BeVision/assets/images/ge-flag.svg', url: '#' },
                { code: 'EN', name: 'EN', flag: '/wp-content/themes/BeVision/assets/images/en-flag.svg', url: '#' }
            ]
        },
        buttonText: {
            type: 'string',
            default: 'Request a demo'
        },
        buttonUrl: {
            type: 'string',
            default: '#'
        },
        headerHeight: {
            type: 'number',
            default: 100
        },
        headingColor: {
            type: 'string',
            default: '#333'
        },
        descriptionColor: {
            type: 'string',
            default: '#666'
        },
        useWordPressMenu: {
            type: 'boolean',
            default: false
        },
        selectedMenuId: {
            type: 'number',
            default: 0
        },
        useMobileWordPressMenu: {
            type: 'boolean',
            default: false
        },
        selectedMobileMenuId: {
            type: 'number',
            default: 0
        }
    },
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        const updateMenuItem = (index, field, value) => {
            const newMenuItems = [...attributes.menuItems];
            newMenuItems[index] = {
                ...newMenuItems[index],
                [field]: value
            };
            setAttributes({ menuItems: newMenuItems });
        };

        return (
            <>
                <Inspector 
                    attributes={attributes} 
                    setAttributes={setAttributes} 
                    updateMenuItem={updateMenuItem} 
                />
                
                <div {...blockProps}>
                    <Header 
                        attributes={attributes} 
                        setAttributes={setAttributes} 
                        updateMenuItem={updateMenuItem} 
                    />
                </div>
            </>
        );
    },
    save: ({ attributes }) => {
        return <Save attributes={attributes} />;
    }
});
