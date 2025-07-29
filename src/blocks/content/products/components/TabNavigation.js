import { Button } from '@wordpress/components';

const styles = {
    navigation: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        listStyle: 'none',
        padding: 0,
        marginBottom: '60px'
    },
    navContainer: {
        position: 'relative',
        marginBottom: '30px'
    },
    navItem: {
        color: '#221A4C',
        fontSize: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '12px 24px',
        borderRadius: '5px',
        fontWeight: '700',
        background: '#fff',
        ':hover': {
            color: '#6653C6',
            background: '#ecf0f8',
        }
    },
    navItemActive: {
        color: '#6653C6',
        background: '#ecf0f8',
        borderRadius: '5px'
    }
};

const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
    <div style={styles.navContainer} className="products-tabs-container">
        <ul style={styles.navigation} className="products-tabs-nav">
            {tabs.map((tab) => (
                <li
                    key={tab.id}
                    style={{
                        ...styles.navItem,
                        ...(activeTab === tab.id ? styles.navItemActive : {})
                    }}
                    data-tab={tab.id}
                    className="products-tab-item"
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.name}
                </li>
            ))}
        </ul>
    </div>
);

export default TabNavigation;