const styles = {
    clientTestimonials: {
        marginBottom: '70px',
        marginTop: '70px',
    },
    subtitle: {
        color: '#6653C6',
        textAlign: 'center',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0px 0px 5px'
    },
    title: {
        color: '#221A4C',
        textAlign: 'center',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        margin: '0px 0px 60px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        maxWidth: '1250px',
        margin: '0 auto',
        padding: '0 20px'
    },
    carousel: {
        width: '100%',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        boxSizing: 'border-box'
    },
    carouselInner: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        padding: '20px 0',
        width: '100%',
    },
    testimonialCard: {
        background: '#fff',
        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
        borderRadius: '20px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '31%', // Just under 1/3 to account for gaps
        flex: '0 0 31%',
        minHeight: '400px',
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70px',
        marginBottom: '30px',
    },
    companyLogo: {
        height: '45px', 
        width: 'auto',
        maxWidth: '170px',
        objectFit: 'contain',
        objectPosition: 'center center',
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
        '&:hover': {
            transform: 'scale(1.15)'
        }
    },
    content: {
        color: '#221A4C',
        fontSize: '16px',
        lineHeight: 1.6,
        margin: 0,
        fontWeight: 400,
        flex: 1,
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginTop: '30px'
    },
    authorImage: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    authorInfo: {
        margin: 0
    },
    authorName: {
        margin: 0,
        fontSize: '20px',
        fontWeight: 600,
        color: '#221A4C'
    },
    authorPosition: {
        margin: 0,
        fontSize: '18px',
        color: '#6653C6',
        fontWeight: 500
    },
    controls: {
        display: 'flex',
        gap: '10px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1
    },
    actionButton: {
        backgroundColor: '#fff',
        color: '#6653C6',
        padding: '8px',
        border: '1px solid #6653C6',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    addButton: {
        backgroundColor: '#6653C6',
        color: '#fff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    removeButton: {
        backgroundColor: '#fff',
        color: '#6653C6',
        padding: '10px 20px',
        border: '1px solid #6653C6',
        borderRadius: '5px',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px'
    },
    // Frontend dots styles
    dotContainerStyles: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '30px',
        position: 'relative',
        zIndex: '10'
    },
    dotsStyles: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px'
    },
    // TestimonialLoader styles
    testimonialLoaderContainer: {
        marginTop: '30px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #eee',
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    error: {
        color: '#e53e3e',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#fff5f5',
        border: '1px solid #fed7d7',
    },
    noTestimonials: {
        padding: '10px',
        backgroundColor: '#ebf8ff',
        borderRadius: '5px',
        border: '1px solid #bee3f8',
    },
    testimonialsLoaded: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0fff4',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #c6f6d5',
    },
    refreshButton: {
        backgroundColor: '#6653C6',
        color: '#fff',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default styles;
