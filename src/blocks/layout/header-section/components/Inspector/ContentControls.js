import React from 'react';
import { PanelBody, TextControl, Button, TabPanel, ToggleControl, SelectControl } from '@wordpress/components';
import { MediaUpload } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

const HeaderContent = ({ attributes, setAttributes }) => (
    <PanelBody title="ლოგოს პარამეტრები" initialOpen={true}>
        <div className="components-base-control">
            <MediaUpload
                onSelect={(media) => setAttributes({ logo: media.url })}
                allowedTypes={['image']}
                value={attributes.logo}
                render={({ open }) => (
                    <div style={{ marginBottom: '16px' }}>
                        {attributes.logo ? (
                            <div>
                                <img
                                    src={attributes.logo}
                                    alt="Selected logo"
                                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                                />
                                <Button
                                    onClick={open}
                                    variant="secondary"
                                    style={{ width: '100%' }}
                                >
                                    ლოგოს შეცვლა
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={open}
                                variant="secondary"
                                style={{ width: '100%' }}
                            >
                                აირჩიეთ ლოგო
                            </Button>
                        )}
                    </div>
                )}
            />
        </div>
    </PanelBody>
);

const NavigationContent = ({ attributes, setAttributes, updateMenuItem }) => {
    // Get all WordPress menus
    const menus = useSelect(select => {
        const { getMenus } = select(coreDataStore);
        return getMenus();
    }, []);
    
    // Create menu options for SelectControl
    const menuOptions = menus ? [
        { label: 'აირჩიეთ მენიუ', value: 0 },
        ...menus.map(menu => ({ 
            label: menu.name, 
            value: menu.id 
        }))
    ] : [
        { label: 'მენიუ ვერ მოიძებნა', value: 0 }
    ];
    
    return (
    <>
        <PanelBody title="WordPress მენიუ" initialOpen={true}>
            <ToggleControl
                label="გამოიყენეთ WordPress მენიუ"
                help={attributes.useWordPressMenu ? 'WordPress მენიუ გამოყენებულია' : 'ხელით შექმნილი მენიუ გამოყენებულია'}
                checked={attributes.useWordPressMenu}
                onChange={(value) => setAttributes({ useWordPressMenu: value })}
            />
            
            {attributes.useWordPressMenu && (
                <SelectControl
                    label="აირჩიეთ მენიუ"
                    value={attributes.selectedMenuId}
                    options={menuOptions}
                    onChange={(value) => setAttributes({ selectedMenuId: parseInt(value) })}
                />
            )}
        </PanelBody>
        
        <PanelBody 
            title="ხელით შექმნილი მენიუს ბმულები" 
            initialOpen={!attributes.useWordPressMenu}>
            {attributes.menuItems.map((item, index) => (
                <div key={index} className="menu-item-control" style={{ 
                    marginBottom: '16px',
                    padding: '12px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px'
                }}>
                    <TextControl
                        label={`ბმული ${index + 1} - ტექსტი`}
                        value={item.text}
                        onChange={(value) => updateMenuItem(index, 'text', value)}
                    />
                    <TextControl
                        label={`ბმული ${index + 1} - URL`}
                        value={item.url}
                        onChange={(value) => updateMenuItem(index, 'url', value)}
                    />
                    <TextControl
                        label={`ბმული ${index + 1} - აღწერა`}
                        value={item.description || ''}
                        onChange={(value) => updateMenuItem(index, 'description', value)}
                    />
                    <Button 
                        isDestructive
                        onClick={() => {
                            const newItems = [...attributes.menuItems];
                            newItems.splice(index, 1);
                            setAttributes({ menuItems: newItems });
                        }}
                    >
                        Remove
                    </Button>
                </div>
            ))}
        </PanelBody>

        <PanelBody title="ენის პარამეტრები" initialOpen={true}>
            <div className="language-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginBottom: '15px'
            }}>
                <TextControl
                    label="მიმდინარე ენის ტექსტი"
                    value={attributes.languageText}
                    onChange={(value) => setAttributes({ languageText: value })}
                />
                <MediaUpload
                    onSelect={(media) => setAttributes({ languageFlag: media.url })}
                    allowedTypes={['image']}
                    value={attributes.languageFlag}
                    render={({ open }) => (
                        <div style={{ marginBottom: '16px' }}>
                            {attributes.languageFlag ? (
                                <div>
                                    <div style={{ marginBottom: '8px' }}>მიმდინარე ენის დროშა:</div>
                                    <img
                                        src={attributes.languageFlag}
                                        alt="ენის დროშა"
                                        style={{ maxWidth: '100%', marginBottom: '10px', maxHeight: '40px' }}
                                    />
                                    <Button
                                        onClick={open}
                                        variant="secondary"
                                        style={{ width: '100%' }}
                                    >
                                        დროშის შეცვლა
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={open}
                                    variant="secondary"
                                    style={{ width: '100%' }}
                                >
                                    აირჩიეთ დროშა
                                </Button>
                            )}
                        </div>
                    )}
                />
                <TextControl
                    label="მიმდინარე ენის ბმული"
                    value={attributes.languageUrl}
                    onChange={(value) => setAttributes({ languageUrl: value })}
                />
            </div>
            
            <div className="languages-list">
                <h3 style={{ marginBottom: '12px' }}>ენების სია</h3>
                
                {attributes.languages.map((language, index) => (
                    <div key={index} className="language-item" style={{ 
                        marginBottom: '16px',
                        padding: '12px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px'
                    }}>
                        <TextControl
                            label={`ენა ${index + 1} - კოდი`}
                            value={language.code}
                            onChange={(value) => {
                                const newLanguages = [...attributes.languages];
                                newLanguages[index] = { ...newLanguages[index], code: value };
                                setAttributes({ languages: newLanguages });
                            }}
                        />
                        <TextControl
                            label={`ენა ${index + 1} - სახელი`}
                            value={language.name}
                            onChange={(value) => {
                                const newLanguages = [...attributes.languages];
                                newLanguages[index] = { ...newLanguages[index], name: value };
                                setAttributes({ languages: newLanguages });
                            }}
                        />
                        <TextControl
                            label={`ენა ${index + 1} - დროშის URL`}
                            value={language.flag}
                            onChange={(value) => {
                                const newLanguages = [...attributes.languages];
                                newLanguages[index] = { ...newLanguages[index], flag: value };
                                setAttributes({ languages: newLanguages });
                            }}
                        />
                        <MediaUpload
                            onSelect={(media) => {
                                const newLanguages = [...attributes.languages];
                                newLanguages[index] = { ...newLanguages[index], flag: media.url };
                                setAttributes({ languages: newLanguages });
                            }}
                            allowedTypes={['image']}
                            value={language.flag}
                            render={({ open }) => (
                                <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    {language.flag ? (
                                        <>
                                            <img
                                                src={language.flag}
                                                alt={`${language.name} Flag`}
                                                style={{ height: '24px', marginBottom: '8px' }}
                                            />
                                            <Button
                                                onClick={open}
                                                variant="secondary"
                                            >
                                                შეცვალე დროშა
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            onClick={open}
                                            variant="secondary"
                                        >
                                            აირჩიე დროშა
                                        </Button>
                                    )}
                                </div>
                            )}
                        />
                        <TextControl
                            label={`ენა ${index + 1} - URL`}
                            value={language.url}
                            onChange={(value) => {
                                const newLanguages = [...attributes.languages];
                                newLanguages[index] = { ...newLanguages[index], url: value };
                                setAttributes({ languages: newLanguages });
                            }}
                        />
                        
                        <Button 
                            isDestructive
                            onClick={() => {
                                const newLanguages = [...attributes.languages];
                                newLanguages.splice(index, 1);
                                setAttributes({ languages: newLanguages });
                            }}
                            style={{ marginTop: '8px' }}
                        >
                            წაშლა
                        </Button>
                    </div>
                ))}
                
                <Button 
                    isPrimary
                    onClick={() => {
                        const newLanguages = [...attributes.languages];
                        newLanguages.push({ code: '', name: '', flag: '', url: '#' });
                        setAttributes({ languages: newLanguages });
                    }}
                >
                    ენის დამატება
                </Button>
            </div>
        </PanelBody>
    </>
    );
};

const ActionContent = ({ attributes, setAttributes }) => (
    <PanelBody title="ღილაკის პარამეტრები" initialOpen={true}>
        <div className="button-control" style={{ 
            padding: '12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px'
        }}>
            <TextControl
                label="ღილაკის ტექსტი"
                value={attributes.buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
            />
            <TextControl
                label="ღილაკის URL"
                value={attributes.buttonUrl}
                onChange={(value) => setAttributes({ buttonUrl: value })}
            />
        </div>
    </PanelBody>
);

const MobileMenuContent = ({ attributes, setAttributes }) => {
    // Get all WordPress menus
    const menus = useSelect(select => {
        const { getMenus } = select(coreDataStore);
        return getMenus();
    }, []);
    
    // Create menu options for SelectControl
    const menuOptions = menus ? [
        { label: 'აირჩიეთ მენიუ', value: 0 },
        ...menus.map(menu => ({ 
            label: menu.name, 
            value: menu.id 
        }))
    ] : [
        { label: 'მენიუ ვერ მოიძებნა', value: 0 }
    ];

    const addMobileMenuItem = () => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        newItems.push({
            text: 'ახალი ბმული',
            url: '#',
            hasSubmenu: false,
            submenu: []
        });
        setAttributes({ mobileMenuItems: newItems });
    };

    const updateMobileMenuItem = (index, field, value) => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setAttributes({ mobileMenuItems: newItems });
    };

    const removeMobileMenuItem = (index) => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        newItems.splice(index, 1);
        setAttributes({ mobileMenuItems: newItems });
    };

    const addSubmenuItem = (parentIndex) => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        if (!newItems[parentIndex].submenu) {
            newItems[parentIndex].submenu = [];
        }
        newItems[parentIndex].submenu.push({
            url: '#',
            title: 'ახალი სათაური',
            description: 'აღწერითი ტექსტი'
        });
        setAttributes({ mobileMenuItems: newItems });
    };

    const updateSubmenuItem = (parentIndex, submenuIndex, field, value) => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        newItems[parentIndex].submenu[submenuIndex] = {
            ...newItems[parentIndex].submenu[submenuIndex],
            [field]: value
        };
        setAttributes({ mobileMenuItems: newItems });
    };

    const removeSubmenuItem = (parentIndex, submenuIndex) => {
        const newItems = [...(attributes.mobileMenuItems || [])];
        newItems[parentIndex].submenu.splice(submenuIndex, 1);
        setAttributes({ mobileMenuItems: newItems });
    };

    return (
        <>
            <PanelBody title="მობილური WordPress მენიუ" initialOpen={true}>
                <ToggleControl
                    label="გამოიყენეთ WordPress მენიუ მობილურზე"
                    help={attributes.useMobileWordPressMenu ? 'WordPress მენიუ გამოყენებულია მობილურზე' : 'ხელით შექმნილი მენიუ გამოყენებულია მობილურზე'}
                    checked={attributes.useMobileWordPressMenu}
                    onChange={(value) => {
                        const updates = { useMobileWordPressMenu: value };
                        // When enabling mobile WordPress menu, automatically use the same menu as desktop if available
                        if (value && attributes.useWordPressMenu && attributes.selectedMenuId > 0) {
                            updates.selectedMobileMenuId = attributes.selectedMenuId;
                        }
                        setAttributes(updates);
                    }}
                />
                
                {attributes.useMobileWordPressMenu && (
                    <>
                        <SelectControl
                            label="აირჩიეთ მობილური მენიუ"
                            value={attributes.selectedMobileMenuId}
                            options={menuOptions}
                            onChange={(value) => setAttributes({ selectedMobileMenuId: parseInt(value) })}
                        />
                        {attributes.useWordPressMenu && attributes.selectedMenuId === attributes.selectedMobileMenuId && attributes.selectedMenuId > 0 && (
                            <div style={{ 
                                padding: '8px 12px',
                                backgroundColor: '#e7f3ff',
                                border: '1px solid #72aee6',
                                borderRadius: '4px',
                                fontSize: '12px',
                                color: '#1e1e1e',
                                marginTop: '8px'
                            }}>
                                📱 მობილური მენიუ იყენებს იგივე მენიუს, რაც დესკტოპ ვერსია
                            </div>
                        )}
                    </>
                )}
            </PanelBody>

            <PanelBody 
                title="ხელით შექმნილი მობილური მენიუ" 
                initialOpen={!attributes.useMobileWordPressMenu}>
                <div style={{ marginBottom: '16px' }}>
                    <Button 
                        isPrimary 
                        onClick={addMobileMenuItem}
                        style={{ width: '100%' }}
                    >
                        + ახალი მენიუ ბმული
                    </Button>
                </div>
                
                {(attributes.mobileMenuItems || []).map((item, index) => (
                <div key={index} className="mobile-menu-item-control" style={{ 
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e1e5e9'
                }}>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '12px'
                    }}>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                            მენიუ ბმული #{index + 1}
                        </h4>
                        <Button 
                            isDestructive
                            isSmall
                            onClick={() => removeMobileMenuItem(index)}
                        >
                            წაშლა
                        </Button>
                    </div>
                    
                    <TextControl
                        label="ტექსტი"
                        value={item.text}
                        onChange={(value) => updateMobileMenuItem(index, 'text', value)}
                        style={{ marginBottom: '12px' }}
                    />
                    
                    <TextControl
                        label="URL"
                        value={item.url}
                        onChange={(value) => updateMobileMenuItem(index, 'url', value)}
                        style={{ marginBottom: '12px' }}
                    />
                    
                    <ToggleControl
                        label="აქვს ქვემენიუ"
                        help={item.hasSubmenu ? 'ქვემენიუ ჩართულია' : 'ქვემენიუ გამორთულია'}
                        checked={item.hasSubmenu}
                        onChange={(value) => updateMobileMenuItem(index, 'hasSubmenu', value)}
                    />
                    
                    {item.hasSubmenu && (
                        <div style={{ 
                            marginTop: '16px',
                            padding: '12px',
                            backgroundColor: '#ffffff',
                            borderRadius: '6px',
                            border: '1px solid #ddd'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                marginBottom: '12px'
                            }}>
                                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: '600' }}>
                                    ქვემენიუ ბმულები
                                </h5>
                                <Button 
                                    isSecondary
                                    isSmall
                                    onClick={() => addSubmenuItem(index)}
                                >
                                    + ქვემენიუ
                                </Button>
                            </div>
                            
                            {(item.submenu || []).map((subItem, subIndex) => (
                                <div key={subIndex} style={{ 
                                    marginBottom: '12px',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px'
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        marginBottom: '8px'
                                    }}>
                                        <span style={{ fontSize: '11px', fontWeight: '500' }}>
                                            ქვემენიუ #{subIndex + 1}
                                        </span>
                                        <Button 
                                            isDestructive
                                            isSmall
                                            onClick={() => removeSubmenuItem(index, subIndex)}
                                        >
                                            წაშლა
                                        </Button>
                                    </div>
                                    
                                    <TextControl
                                        label="სათაური"
                                        value={subItem.title || ''}
                                        onChange={(value) => updateSubmenuItem(index, subIndex, 'title', value)}
                                        style={{ marginBottom: '8px' }}
                                        help="ქვემენიუს მთავარი სათაური"
                                    />
                                    
                                    <TextControl
                                        label="აღწერა"
                                        value={subItem.description || ''}
                                        onChange={(value) => updateSubmenuItem(index, subIndex, 'description', value)}
                                        style={{ marginBottom: '8px' }}
                                        help="ქვემენიუს აღწერითი ტექსტი"
                                    />
                                    
                                    <TextControl
                                        label="URL"
                                        value={subItem.url}
                                        onChange={(value) => updateSubmenuItem(index, subIndex, 'url', value)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            </PanelBody>
        </>
    );
};

const ContentControls = ({ attributes, setAttributes, updateMenuItem }) => {
    return (
        <TabPanel
            className="bevision-content-tabs"
            activeClass="is-active"
            tabs={[
                {
                    name: 'header',
                    title: 'ჰედერი',
                    className: 'tab-header'
                },
                {
                    name: 'navigation',
                    title: 'ნავიგაცია',
                    className: 'tab-navigation'
                },
                {
                    name: 'mobile',
                    title: 'მობილური მენიუ',
                    className: 'tab-mobile'
                },
                {
                    name: 'actions',
                    title: 'მოქმედებები',
                    className: 'tab-actions'
                }
            ]}
        >
            {(contentTab) => {
                if (contentTab.name === 'header') {
                    return <HeaderContent attributes={attributes} setAttributes={setAttributes} />;
                }
                if (contentTab.name === 'navigation') {
                    return <NavigationContent attributes={attributes} setAttributes={setAttributes} updateMenuItem={updateMenuItem} />;
                }
                if (contentTab.name === 'mobile') {
                    return <MobileMenuContent attributes={attributes} setAttributes={setAttributes} />;
                }
                if (contentTab.name === 'actions') {
                    return <ActionContent attributes={attributes} setAttributes={setAttributes} />;
                }
            }}
        </TabPanel>
    );
};

export default ContentControls;
