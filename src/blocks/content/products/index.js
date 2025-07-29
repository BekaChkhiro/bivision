import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, TabPanel } from '@wordpress/components';
import TabNavigation from './components/TabNavigation';
import TabContent from './components/TabContent';

const styles = {
    productsSection: {
        margin: '0px 0px 60px',
        padding: '70px 0 60px 0', // Vertical padding only
        color: '#333',
        position: 'relative',
        overflow: 'hidden'
    },
    glowEffect: {
        position: 'absolute',
        top: '50%',
        right: '-20%',
        width: '60%',
        height: '60%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 1
    },
    container: {
        maxWidth: '1250px',
        margin: '0 auto',
        padding: '0 60px', // Desktop padding - increased for better spacing
        position: 'relative',
        zIndex: 2
    },
    sectionTitle: {
        color: '#6653C6',
        textAlign: 'center',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0px 0px 5px'
    },
    sectionSubtitle: {
        color: 'var(--Dark-Blue, #221A4C)',
        textAlign: 'center',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0px 0px 60px'
    }
};

registerBlockType('bevision/products', {
    title: 'Products Tabs',
    icon: 'grid-view',
    category: 'design',
    attributes: {
        sectionTitle: {
            type: 'string',
            source: 'html',
            selector: '.products-section-title',
            default: 'PRODUCTS'
        },
        sectionSubtitle: {
            type: 'string',
            source: 'html',
            selector: '.products-section-subtitle',
            default: 'What we offer'
        },
        tabs: {
            type: 'array',
            default: [
                {
                    id: 'biretail',
                    name: 'BiRetail',
                    subtitle: 'Retail',
                    title: 'Sales analytics',
                    features: [
                        'Client segmentation and service personalization',
                        'RFM-analysis and client preferences tracking',
                        'Smart SKU management and inventory analysis',
                        'KPI reporting and sales personnel performance tracking',
                        'Demand prediction, trend and seasonality analysis'
                    ],
                    image: '/wp-content/themes/BeVision/src/images/retail-analytics.png'
                }
            ]
        },
        activeTab: {
            type: 'string',
            default: 'biretail'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { sectionTitle, sectionSubtitle, tabs, activeTab } = attributes;

        const addNewTab = () => {
            const newTab = {
                id: `tab${tabs.length + 1}`,
                name: `Tab ${tabs.length + 1}`,
                subtitle: 'Subtitle',
                title: 'Title',
                features: ['New Feature'],
                image: ''
            };
            setAttributes({ tabs: [...tabs, newTab] });
        };

        const duplicateTab = (tabId) => {
            const tabToDuplicate = tabs.find(tab => tab.id === tabId);
            if (!tabToDuplicate) return;
            const newTab = {
                ...tabToDuplicate,
                id: `tab${tabs.length + 1}`,
                name: `${tabToDuplicate.name}`
            };
            setAttributes({ tabs: [...tabs, newTab] });
        };

        const removeTab = (tabId) => {
            const newTabs = tabs.filter(tab => tab.id !== tabId);
            let newActiveTab = activeTab;
            if (activeTab === tabId && newTabs.length > 0) {
                newActiveTab = newTabs[0].id;
            }
            setAttributes({ tabs: newTabs, activeTab: newActiveTab });
        };

        const updateTab = (tabId, field, value) => {
            const newTabs = tabs.map(tab => 
                tab.id === tabId ? { ...tab, [field]: value } : tab
            );
            setAttributes({ tabs: newTabs });
        };

        const updateFeature = (tabId, featureIndex, value) => {
            const newTabs = tabs.map(tab => {
                if (tab.id === tabId) {
                    const newFeatures = [...tab.features];
                    newFeatures[featureIndex] = value;
                    return { ...tab, features: newFeatures };
                }
                return tab;
            });
            setAttributes({ tabs: newTabs });
        };

        const addFeature = (tabId) => {
            const newTabs = tabs.map(tab => {
                if (tab.id === tabId) {
                    return {
                        ...tab,
                        features: [...tab.features, 'New Feature']
                    };
                }
                return tab;
            });
            setAttributes({ tabs: newTabs });
        };

        const removeFeature = (tabId, featureIndex) => {
            const newTabs = tabs.map(tab => {
                if (tab.id === tabId) {
                    const newFeatures = [...tab.features];
                    newFeatures.splice(featureIndex, 1);
                    return { ...tab, features: newFeatures };
                }
                return tab;
            });
            setAttributes({ tabs: newTabs });
        };

        return (
            <>
                <InspectorControls>
                    <div style={{ padding: '16px' }}>
                        <div style={{ 
                            background: '#fff',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            marginBottom: '24px'
                        }}>
                            <h2 style={{ 
                                margin: '0 0 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1e1e1e'
                            }}>
                                Section Settings
                            </h2>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <h3 style={{ 
                                    margin: '0 0 12px',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: '#1e1e1e'
                                }}>
                                    Default Tab
                                </h3>
                                <div style={{ marginBottom: '8px' }}>
                                    <select 
                                        value={activeTab}
                                        onChange={(e) => setAttributes({ activeTab: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid #8d96a0'
                                        }}
                                    >
                                        {tabs.map(tab => (
                                            <option key={tab.id} value={tab.id}>
                                                {tab.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div style={{ marginBottom: '12px' }}>
                                <TextControl
                                    label={
                                        <span style={{ 
                                            fontSize: '12px', 
                                            fontWeight: '500',
                                            color: '#1e1e1e',
                                            marginBottom: '4px',
                                            display: 'block'
                                        }}>
                                            Section Title
                                        </span>
                                    }
                                    value={sectionTitle}
                                    onChange={(value) => setAttributes({ sectionTitle: value })}
                                    style={{ margin: 0 }}
                                />
                            </div>
                            
                            <div style={{ marginBottom: '0' }}>
                                <TextControl
                                    label={
                                        <span style={{ 
                                            fontSize: '12px', 
                                            fontWeight: '500',
                                            color: '#1e1e1e',
                                            marginBottom: '4px',
                                            display: 'block'
                                        }}>
                                            Section Subtitle
                                        </span>
                                    }
                                    value={sectionSubtitle}
                                    onChange={(value) => setAttributes({ sectionSubtitle: value })}
                                    style={{ margin: 0 }}
                                />
                            </div>
                        </div>

                        <div style={{ 
                            background: '#fff',
                            padding: '16px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            marginBottom: '24px'
                        }}>
                            <h2 style={{ 
                                margin: '0 0 16px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1e1e1e'
                            }}>
                                Tab Management
                            </h2>

                            <Button 
                                isPrimary
                                onClick={addNewTab}
                                icon="plus-alt2"
                                style={{ 
                                    marginBottom: '16px', 
                                    width: '100%',
                                    justifyContent: 'center',
                                    height: '40px',
                                    gap: '8px',
                                    fontSize: '13px',
                                    fontWeight: '500'
                                }}
                            >
                                Add New Tab
                            </Button>

                            <div style={{ 
                                display: 'flex',
                                overflowX: 'auto',
                                gap: '8px',
                                paddingBottom: '4px',
                                marginBottom: '-4px',
                                WebkitOverflowScrolling: 'touch',
                                msOverflowStyle: '-ms-autohiding-scrollbar',
                                scrollbarWidth: 'thin',
                                '&::-webkit-scrollbar': {
                                    height: '4px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: '#f1f1f1',
                                    borderRadius: '4px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#888',
                                    borderRadius: '4px'
                                }
                            }}>
                                {tabs.map((tab, index) => (
                                    <Button
                                        key={tab.id}
                                        isSecondary={activeTab !== tab.id}
                                        isPrimary={activeTab === tab.id}
                                        onClick={() => setAttributes({ activeTab: tab.id })}
                                        style={{
                                            minWidth: 'auto',
                                            padding: '8px 16px',
                                            height: '36px',
                                            whiteSpace: 'nowrap',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            borderRadius: '6px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {tab.name || `Tab ${tabIndex + 1}`}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {tabs.map((tab, tabIndex) => (
                            <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-admin-generic" style={{ fontSize: '16px' }} />
                                        Basic Information
                                    </h2>
                                    
                                    <div style={{ marginBottom: '16px' }}>
                                        <div style={{ marginBottom: '12px' }}>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Tab Name
                                                    </span>
                                                }
                                                value={tab.name}
                                                onChange={(value) => updateTab(tab.id, 'name', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Subtitle
                                                    </span>
                                                }
                                                value={tab.subtitle}
                                                onChange={(value) => updateTab(tab.id, 'subtitle', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                        <div>
                                            <TextControl
                                                label={
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        fontWeight: '500',
                                                        color: '#1e1e1e',
                                                        marginBottom: '4px',
                                                        display: 'block'
                                                    }}>
                                                        Title
                                                    </span>
                                                }
                                                value={tab.title}
                                                onChange={(value) => updateTab(tab.id, 'title', value)}
                                                style={{ margin: 0 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-editor-ul" style={{ fontSize: '16px' }} />
                                        Features List
                                    </h2>

                                    <div style={{ marginBottom: '12px' }}>
                                        {tab.features.map((feature, featureIndex) => (
                                            <div 
                                                key={featureIndex} 
                                                style={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    marginBottom: '8px',
                                                    background: '#f9f9f9',
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #e2e4e7'
                                                }}
                                            >
                                                <span className="dashicons dashicons-menu" style={{ 
                                                    color: '#999',
                                                    fontSize: '16px',
                                                    cursor: 'move'
                                                }} />
                                                <TextControl
                                                    value={feature}
                                                    onChange={(value) => updateFeature(tab.id, featureIndex, value)}
                                                    style={{ margin: 0, flex: 1 }}
                                                    placeholder="Enter feature text"
                                                />
                                                <Button 
                                                    isDestructive
                                                    icon="no-alt"
                                                    onClick={() => removeFeature(tab.id, featureIndex)}
                                                    style={{
                                                        padding: '0',
                                                        minWidth: '28px',
                                                        height: '28px',
                                                        border: 'none'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        isSecondary
                                        icon="plus"
                                        onClick={() => addFeature(tab.id)}
                                        style={{ 
                                            width: '100%', 
                                            justifyContent: 'center', 
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Add Feature
                                    </Button>
                                </div>

                                <div style={{
                                    background: '#fff',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    marginBottom: '16px'
                                }}>
                                    <h2 style={{ 
                                        margin: '0 0 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        color: '#1e1e1e',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <span className="dashicons dashicons-format-image" style={{ fontSize: '16px' }} />
                                        Tab Image
                                    </h2>

                                    <MediaUploadCheck>
                                        <div style={{ 
                                            border: '1px dashed #c3c4c7',
                                            borderRadius: '6px',
                                            padding: '16px',
                                            textAlign: 'center',
                                            background: '#f9f9f9',
                                            transition: 'all 0.2s ease'
                                        }}>
                                            {tab.image ? (
                                                <>
                                                    <div style={{
                                                        position: 'relative',
                                                        marginBottom: '12px'
                                                    }}>
                                                        <img 
                                                            src={tab.image} 
                                                            alt="" 
                                                            style={{ 
                                                                width: '100%',
                                                                height: '160px',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px',
                                                                display: 'block'
                                                            }}
                                                        />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            right: '8px',
                                                            display: 'flex',
                                                            gap: '4px'
                                                        }}>
                                                <MediaUpload
                                                    onSelect={(media) => updateTab(tab.id, 'image', media.url)}
                                                    allowedTypes={['image']}
                                                    value={tab.image}
                                                    render={({ open }) => (
                                                        <Button 
                                                            onClick={open}
                                                            icon="update"
                                                            style={{
                                                                padding: '0',
                                                                width: '28px',
                                                                height: '28px',
                                                                background: 'rgba(255,255,255,0.9)',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                            }}
                                                        />
                                                    )}
                                                />
                                                <Button 
                                                    isDestructive
                                                    icon="no-alt"
                                                    onClick={() => updateTab(tab.id, 'image', '')}
                                                    style={{
                                                        padding: '0',
                                                        width: '28px',
                                                        height: '28px',
                                                        background: 'rgba(255,255,255,0.9)',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <MediaUpload
                                                    onSelect={(media) => updateTab(tab.id, 'image', media.url)}
                                                    allowedTypes={['image']}
                                                    value={tab.image}
                                                    render={({ open }) => (
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            padding: '24px 16px',
                                                            cursor: 'pointer'
                                                        }} onClick={open}>
                                                            <span className="dashicons dashicons-upload" style={{ 
                                                                fontSize: '24px',
                                                                width: '24px',
                                                                height: '24px',
                                                                color: '#007cba'
                                                            }} />
                                                            <span style={{
                                                                fontSize: '13px',
                                                                color: '#1e1e1e'
                                                            }}>
                                                                Click to upload image
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </MediaUploadCheck>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    marginBottom: '16px'
                                }}>
                                    <Button 
                                        icon="admin-page"
                                        onClick={() => duplicateTab(tab.id)}
                                        style={{ 
                                            flex: 1,
                                            justifyContent: 'center',
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Duplicate Tab
                                    </Button>
                                    <Button 
                                        isDestructive
                                        icon="trash"
                                        onClick={() => removeTab(tab.id)}
                                        style={{ 
                                            flex: 1,
                                            justifyContent: 'center',
                                            height: '36px',
                                            gap: '8px',
                                            fontSize: '13px'
                                        }}
                                    >
                                        Remove Tab
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </InspectorControls>

                <div {...blockProps}>
                    <div style={styles.productsSection}>
                        <div style={styles.glowEffect}></div>
                        <div style={styles.container}>
                            <RichText
                                tagName="h2"
                                className="products-section-title"
                                value={sectionTitle}
                                onChange={(value) => setAttributes({ sectionTitle: value })}
                                style={styles.sectionTitle}
                                placeholder="Enter section title"
                            />
                            <RichText
                                tagName="h3"
                                className="products-section-subtitle"
                                value={sectionSubtitle}
                                onChange={(value) => setAttributes({ sectionSubtitle: value })}
                                style={styles.sectionSubtitle}
                                placeholder="Enter section subtitle"
                            />
                            
                            <TabNavigation
                                tabs={tabs}
                                activeTab={activeTab}
                                onTabChange={(tabId) => setAttributes({ activeTab: tabId })}
                            />

                            {tabs.map((tab) => (
                                <div key={tab.id} style={{ display: activeTab === tab.id ? 'block' : 'none' }}>
                                    <TabContent
                                        tab={tab}
                                        isEditing={true}
                                        onUpdateField={(field, value) => updateTab(tab.id, field, value)}
                                        onUpdateFeature={(index, value) => updateFeature(tab.id, index, value)}
                                        onAddFeature={() => addFeature(tab.id)}
                                        onRemoveFeature={(index) => removeFeature(tab.id, index)}
                                        onSelectImage={(url) => updateTab(tab.id, 'image', url)}
                                        onRemoveImage={() => updateTab(tab.id, 'image', '')}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { tabs, activeTab } = attributes;
        const blockProps = useBlockProps.save();

        return (
            <div {...blockProps}>
                <div style={styles.productsSection} className="products-section">
                    <div style={styles.glowEffect}></div>
                    <div style={styles.container}>
                        <RichText.Content
                            tagName="h2"
                            className="products-section-title"
                            value={attributes.sectionTitle}
                            style={styles.sectionTitle}
                        />
                        <RichText.Content
                            tagName="h3"
                            className="products-section-subtitle"
                            value={attributes.sectionSubtitle}
                            style={styles.sectionSubtitle}
                        />
                        
                        <TabNavigation
                            tabs={tabs}
                            activeTab={activeTab}
                        />

                        <div className="products-tabs-content">
                            {tabs.map((tab) => (
                                <div 
                                    key={tab.id}
                                    style={{ display: activeTab === tab.id ? 'block' : 'none' }}
                                    data-tab-content={tab.id}
                                    className="products-tab-content"
                                >
                                    <TabContent tab={tab} />
                                </div>
                            ))}
                        </div>

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                document.addEventListener('DOMContentLoaded', function() {
                                    const tabsNav = document.querySelector('.products-tabs-nav');
                                    if (!tabsNav) return;

                                    // Make sure first 4 tabs are always in first row on mobile
                                    const ensureFirstFourTabsInRow = () => {
                                        if (window.innerWidth <= 767) {
                                            const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                            // Force first 4 items to have exact 25% - 6px width
                                            for (let i = 0; i < Math.min(4, tabItems.length); i++) {
                                                tabItems[i].style.flex = '0 0 calc(25% - 6px)';
                                            }
                                        }
                                    };
                                    
                                    // Call it on load and resize
                                    ensureFirstFourTabsInRow();
                                    window.addEventListener('resize', ensureFirstFourTabsInRow);
                                    
                                    const tabItems = tabsNav.querySelectorAll('.products-tab-item');
                                    const tabContents = document.querySelectorAll('.products-tab-content'); 

                                    const style = document.createElement('style');
                                    style.innerHTML = '.products-tab-item:hover { color: #6653C6 !important; background: #ecf0f8 !important; }' +
                                    '.products-tabs-nav { display: flex; justify-content: center; gap: 10px; list-style: none; padding: 0; margin-bottom: 30px; }' +
                                    '@media screen and (max-width: 1024px) and (min-width: 768px) {' +
                                    '  .products-section { padding: 60px 40px !important; }' +
                                    '}' +
                                    '@media screen and (max-width: 767px) {' +
                                    '  .products-tabs-nav { display: flex; flex-wrap: wrap; justify-content: space-between; padding: 0 10px 10px; margin-bottom: 20px !important; width: auto; overflow: visible !important; }' +
                                    '  .products-tab-item { flex: 0 0 auto; width: calc(25% - 8px); white-space: normal !important; font-size: 16px !important; padding: 8px 5px !important; margin: 0 0 8px; text-align: center; overflow: visible !important; text-overflow: unset !important; }' +
                                    '  .products-tab-item:nth-child(-n+4) { margin-bottom: 8px; }' +
                                    '  .products-grid { display: flex !important; flex-direction: column !important; gap: 20px !important; padding: 0; }' +
                                    '  .products-content-left { width: 100% !important; order: 2; }' +
                                    '  .products-content-right { width: 100% !important; order: 1; margin-bottom: 0; height: 220px !important; border-radius: 12px !important; }' +
                                    '  .products-subtitle { font-size: 20px !important; font-weight: 600 !important; text-align: center !important;}' +
                                    '  .products-title { font-size: 24px !important; font-weight: 600 !important; margin-bottom: 16px !important; }' +
                                    '  .products-feature-list { margin-bottom: 20px; }' +
                                    '  .products-feature-list li { font-size: 20px !important; margin-bottom: 8px !important; line-height: 1.4 !important; padding-left: 24px !important; background-position: 0 4px !important; }' +
                                    '  .products-button-group { display: flex; flex-direction: row !important; gap: 20px !important; justify-content: space-between; margin-bottom:20px; margin-top:20px !important; }' +
                                    '  .products-button { flex: 1; padding: 15px 30px !important; font-size: 16px !important; font-weight: 600 !important; text-align: center; border-radius: 6px !important; white-space: nowrap; }' +
                                    '  .products-section { padding: 40px 20px !important; margin: 0 !important; }' +
                                    '  .products-section h2 { font-size: 20px !important; }' +
                                    '  .products-section h3 { font-size: 28px !important; margin-bottom: 20px !important;text-align: center; }' +
                                    '};';
                                    document.head.appendChild(style);

                                    function setActiveTab(tabId) {
                                        tabItems.forEach(item => {
                                            if (item.dataset.tab === tabId) {
                                                item.style.color = '#6653C6';
                                                item.style.background = '#ecf0f8';
                                                item.style.borderRadius = '5px';
                                            } else {
                                                item.style.color = '#221A4C';
                                                item.style.background = '#fff';
                                                item.style.borderRadius = '5px';
                                            }
                                        });

                                        tabContents.forEach(content => {
                                            if (content.dataset.tabContent === tabId) {
                                                content.style.display = 'block';
                                            } else {
                                                content.style.display = 'none';
                                            }
                                        });
                                    }

                                    tabItems.forEach(tab => {
                                        tab.addEventListener('click', () => {
                                            const tabId = tab.dataset.tab;
                                            setActiveTab(tabId);
                                        });
                                    });
                                });
                                `
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
});
