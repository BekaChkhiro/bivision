export const styles = {
    container: () => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1250px',
        margin: '0 auto',
        padding: '0',
    }),
    
    title: () => ({
        fontSize: '36px',
        fontWeight: '700',
        marginBottom: '15px',
        color: '#323377',
        lineHeight: '1.2',
    }),
    

    content: () => ({
        marginBottom: '20px',
    }),
    
    paragraph: () => ({
        fontSize: '16px',
        lineHeight: '1.7',
        marginBottom: '20px',
        color: '#221A4C',
    }),
    
    // Responsive styles
    '@media (max-width: 768px)': {
        title: () => ({
            fontSize: '28px',
            marginBottom: '10px',
        }),
        paragraph: () => ({
            fontSize: '14px',
            lineHeight: '1.6',
        }),
    }
};
