import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';
import ContentControls from './ContentControls';
import StyleControls from './StyleControls';

const Inspector = ({ attributes, setAttributes, updateMenuItem }) => {
    return (
        <InspectorControls>
            <TabPanel
                className="bevision-tab-panel"
                activeClass="is-active"
                tabs={[
                    {
                        name: 'content',
                        title: 'კონტენტი',
                        className: 'tab-content'
                    },
                    {
                        name: 'style',
                        title: 'სტილი',
                        className: 'tab-style'
                    }
                ]}
            >
                {(tab) => {
                    if (tab.name === 'content') {
                        return <ContentControls 
                            attributes={attributes} 
                            setAttributes={setAttributes} 
                            updateMenuItem={updateMenuItem} 
                        />;
                    } else {
                        return <StyleControls 
                            attributes={attributes} 
                            setAttributes={setAttributes} 
                        />;
                    }
                }}
            </TabPanel>
        </InspectorControls>
    );
};

export default Inspector;
