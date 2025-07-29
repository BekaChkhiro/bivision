import React from 'react';
import { RichText } from '@wordpress/block-editor';

const Navigation = ({ menuItems, submenuEnabled, updateMenuItem }) => {
    return (
        <nav className="main-navigation" style={{
            display: 'flex',
            gap: '2rem'
        }}>
            {menuItems.map((item, index) => (
                submenuEnabled ? (
                    <div key={index} className="menu-item-with-description" style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <RichText
                            tagName="a"
                            value={item.text}
                            onChange={(text) => updateMenuItem(index, 'text', text)}
                            style={{ 
                                color: '#333', 
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontFamily: 'bold',
                                fontSize: '20px',
                                marginBottom: '5px'
                            }}
                        />
                        <RichText
                            tagName="span"
                            value={item.description || ''}
                            onChange={(description) => updateMenuItem(index, 'description', description)}
                            style={{
                                color: '#777',
                                fontSize: '14px',
                                lineHeight: '1.4',
                                fontFamily: 'roman'
                            }}
                        />
                    </div>
                ) : (
                    <RichText
                        key={index}
                        tagName="a"
                        value={item.text}
                        onChange={(text) => updateMenuItem(index, 'text', text)}
                        style={{ color: '#333', textDecoration: 'none', fontSize: '20px', fontFamily: 'bold' }}
                    />
                )
            ))}
        </nav>
    );
};

export default Navigation;
