import { TextControl } from '@wordpress/components';
import FeatureList from './FeatureList';
import ProductImage from './ProductImage';

const styles = {
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: '48px',
        alignItems: 'top'
    },
    productItem: {
        padding: '0'
    },
    subtitle: {
        color: '#7B61FF',
        fontSize: '18px',
        fontWeight: '600',
        margin: '0px 0px 5px'
    },
    title: {
        color: '#333',
        fontSize: '24px',
        fontWeight: '600',
        margin: '0px 0px 40px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '16px',
        marginTop: '32px'
    },
    button: {
        padding: '14px 28px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    primaryButton: {
        backgroundColor: '#6653C6',
        color: '#fff',
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#6B4FFF'
        }
    },
    secondaryButton: {
        backgroundColor: '#2FCA02',
        color: '#fff',
        padding: '15px 40px',
        fontSize: '18px',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#3CC954'
        }
    }
};

const TabContent = ({ 
    tab, 
    isEditing = false,
    onUpdateField,
    onUpdateFeature,
    onAddFeature,
    onRemoveFeature,
    onSelectImage,
    onRemoveImage,
    primaryButtonText = 'გაიგე მეტი',
    secondaryButtonText = 'მოითხოვე დემო'
}) => {
    if (isEditing) {
        return (
            <div style={styles.productsGrid} className="products-grid">
                <div style={styles.productItem} className="products-content-left">
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
                        onChange={(value) => onUpdateField('subtitle', value)}
                        style={{ margin: 0 }}
                    />
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
                        onChange={(value) => onUpdateField('title', value)}
                        style={{ margin: 0 }}
                    />
                    <FeatureList
                        features={tab.features}
                        isEditing={true}
                        onUpdate={onUpdateFeature}
                        onAdd={onAddFeature}
                        onRemove={onRemoveFeature}
                    />
                </div>
                <ProductImage
                    image={tab.image}
                    onSelect={onSelectImage}
                    onRemove={onRemoveImage}
                    isEditing={true}
                    className="products-content-right products-content-right-desktop"
                />
            </div>
        );
    }

    return (
        <div style={styles.productsGrid} className="products-grid">
            <div style={styles.productItem} className="products-content-left">
                <h4 style={styles.subtitle} className="products-subtitle">{tab.subtitle}</h4>
                <h3 style={styles.title} className="products-title">{tab.title}</h3>
                <FeatureList features={tab.features} className="products-feature-list" />
                <div style={styles.buttonGroup} className="products-button-group">
                    <button style={{...styles.button, ...styles.primaryButton}} className="products-button products-button-primary">
                        {primaryButtonText}
                    </button>
                    <button style={{...styles.button, ...styles.secondaryButton}} className="products-button products-button-secondary">
                        {secondaryButtonText}
                    </button>
                </div>
            </div>
            <ProductImage image={tab.image} className="products-content-right products-content-right-desktop" />
        </div>
    );
};

export default TabContent;