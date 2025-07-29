import React from 'react';
import { TextControl, Button } from '@wordpress/components';

const styles = {
    featuresList: {
        listStyle: 'none',
        padding: 0,
        marginBottom: '32px'
    },
    featureItem: {
        position: 'relative',
        paddingLeft: '28px',
        marginBottom: '20px',
        color: '#333',
        fontSize: 18,
        fontWeight: '400'
    },
    checkmark: {
        position: 'absolute',
        left: 0,
        top: '2px',
        color: '#4CD964',
        fontSize: 18
    },
    featureControl: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
        background: '#f9f9f9',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #e2e4e7'
    },
    dragHandle: {
        color: '#999',
        fontSize: '16px',
        cursor: 'move'
    }
};

const FeatureList = ({ features, isEditing = false, onUpdate, onAdd, onRemove, className = '' }) => {
    if (isEditing) {
        return (
            <div>
                {features.map((feature, index) => (
                    <div key={index} style={styles.featureControl}>
                        <span className="dashicons dashicons-menu" style={styles.dragHandle} />
                        <TextControl
                            value={feature}
                            onChange={(value) => onUpdate(index, value)}
                            style={{ margin: 0, flex: 1 }}
                            placeholder="Enter feature text"
                        />
                        <Button 
                            isDestructive
                            icon="no-alt"
                            onClick={() => onRemove(index)}
                            style={{
                                padding: '0',
                                minWidth: '28px',
                                height: '28px',
                                border: 'none'
                            }}
                        />
                    </div>
                ))}
                <Button
                    isSecondary
                    icon="plus"
                    onClick={onAdd}
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
        );
    }

    // Create a style element to enforce icon size
    React.useEffect(() => {
        // Add a style element for feature icons
        const styleEl = document.createElement('style');
        styleEl.innerHTML = `
            .products-feature-icon { font-size: 18px !important; }
            .products-feature-item { font-size: 18px !important; }
            .products-feature-text { font-size: 18px !important; }
        `;
        document.head.appendChild(styleEl);
        
        return () => {
            document.head.removeChild(styleEl);
        };
    }, []);
    
    return (
        <ul style={styles.featuresList} className={`products-feature-list ${className}`}>
            {features.map((feature, index) => (
                <li key={index} style={{...styles.featureItem, fontSize: 18}} className="products-feature-item">
                    <span 
                        style={{...styles.checkmark, fontSize: 18}} 
                        className="products-feature-icon"
                        size="18px"
                    >✓</span>
                    <span className="products-feature-text" style={{fontSize: 18}}>{feature}</span>
                </li>
            ))}
        </ul>
    );
};

export default FeatureList;