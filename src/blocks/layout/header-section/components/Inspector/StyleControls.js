import React from 'react';
import { PanelBody, RangeControl, ColorPalette, TabPanel } from '@wordpress/components';

const SubmenuTab = ({ attributes, setAttributes }) => (
    <div>
        <div className="components-base-control">
            <div className="components-base-control__field">
                <span className="components-checkbox-control__input-container">
                    <input
                        id="submenu-enabled-checkbox"
                        className="components-checkbox-control__input"
                        type="checkbox"
                        checked={attributes.submenuEnabled}
                        onChange={() => setAttributes({ submenuEnabled: !attributes.submenuEnabled })}
                    />
                </span>
                <label htmlFor="submenu-enabled-checkbox">Enable description under menu items</label>
            </div>
        </div>
        <p>When enabled, descriptions will be displayed under each menu item as shown in the reference design.</p>
    </div>
);

const LayoutTab = ({ attributes, setAttributes }) => (
    <>
        <PanelBody title="ჰედერის განლაგება" initialOpen={true}>
            <div className="spacing-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
            }}>
                <RangeControl
                    label="ჰედერის სიმაღლე"
                    value={attributes.headerHeight}
                    onChange={(value) => setAttributes({ headerHeight: value })}
                    min={50}
                    max={200}
                />
            </div>
        </PanelBody>

        <PanelBody title="ღილაკის განლაგება" initialOpen={true}>
            <div className="button-spacing-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
            }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <RangeControl
                        label="ვერტიკალური padding"
                        value={attributes.buttonPaddingV}
                        onChange={(value) => setAttributes({ buttonPaddingV: value })}
                        min={5}
                        max={30}
                    />
                    <RangeControl
                        label="ჰორიზონტალური padding"
                        value={attributes.buttonPaddingH}
                        onChange={(value) => setAttributes({ buttonPaddingH: value })}
                        min={10}
                        max={50}
                    />
                </div>
                <RangeControl
                    label="ღილაკის მომრგვალება"
                    value={attributes.buttonBorderRadius}
                    onChange={(value) => setAttributes({ buttonBorderRadius: value })}
                    min={0}
                    max={50}
                />
            </div>
        </PanelBody>
    </>
);

const ColorsTab = ({ attributes, setAttributes }) => (
    <>
        <PanelBody title="ძირითადი ფერები" initialOpen={true}>
            <div className="color-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
            }}>
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ფონის ფერი</p>
                <ColorPalette
                    value={attributes.backgroundColor}
                    onChange={(color) => setAttributes({ backgroundColor: color })}
                />
            </div>
        </PanelBody>

        <PanelBody title="ღილაკის ფერები" initialOpen={true}>
            <div className="button-color-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
            }}>
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ღილაკის ფერი</p>
                <ColorPalette
                    value={attributes.buttonColor}
                    onChange={(color) => setAttributes({ buttonColor: color })}
                />
                
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>ტექსტის ფერი</p>
                <ColorPalette
                    value={attributes.buttonTextColor}
                    onChange={(color) => setAttributes({ buttonTextColor: color })}
                />
            </div>
        </PanelBody>

        <PanelBody title="ტექსტის ფერები" initialOpen={true}>
            <div className="text-color-control" style={{ 
                padding: '12px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px'
            }}>
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>სათაურის ფერი</p>
                <ColorPalette
                    value={attributes.headingColor}
                    onChange={(color) => setAttributes({ headingColor: color })}
                />
                
                <p style={{ marginBottom: '8px', fontWeight: '500' }}>აღწერის ფერი</p>
                <ColorPalette
                    value={attributes.descriptionColor}
                    onChange={(color) => setAttributes({ descriptionColor: color })}
                />
            </div>
        </PanelBody>
    </>
);

const TypographyTab = ({ attributes, setAttributes }) => (
    <PanelBody title="ღილაკის ტიპოგრაფია" initialOpen={true}>
        <div className="button-typography-control" style={{ 
            padding: '12px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px'
        }}>
            <RangeControl
                label="ტექსტის ზომა"
                value={attributes.buttonFontSize}
                onChange={(value) => setAttributes({ buttonFontSize: value })}
                min={12}
                max={24}
            />

            <RangeControl
                label="ტექსტის სისქე"
                value={attributes.buttonFontWeight}
                onChange={(value) => setAttributes({ buttonFontWeight: value })}
                min={300}
                max={900}
                step={100}
            />
        </div>
    </PanelBody>
);

const StyleControls = ({ attributes, setAttributes }) => {
    return (
        <TabPanel
            className="bevision-style-tabs"
            activeClass="is-active"
            tabs={[
                {
                    name: 'layout',
                    title: 'განლაგება',
                    className: 'tab-layout'
                },
                {
                    name: 'colors',
                    title: 'ფერები',
                    className: 'tab-colors'
                },
                {
                    name: 'typography',
                    title: 'ტიპოგრაფია',
                    className: 'tab-typography'
                },
                {
                    name: 'submenu',
                    title: 'ქვემენიუ',
                    className: 'tab-submenu'
                }
            ]}
        >
            {(styleTab) => {
                if (styleTab.name === 'submenu') {
                    return <SubmenuTab attributes={attributes} setAttributes={setAttributes} />;
                }
                if (styleTab.name === 'layout') {
                    return <LayoutTab attributes={attributes} setAttributes={setAttributes} />;
                }
                if (styleTab.name === 'colors') {
                    return <ColorsTab attributes={attributes} setAttributes={setAttributes} />;
                }
                if (styleTab.name === 'typography') {
                    return <TypographyTab attributes={attributes} setAttributes={setAttributes} />;
                }
            }}
        </TabPanel>
    );
};

export default StyleControls;
