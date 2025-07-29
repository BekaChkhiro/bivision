// Helper function to get responsive styles based on window width
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false; // Default to desktop view when server-side rendering
};

export const styles = {
  container: (isMobile = getResponsiveStyles()) => ({
    background: '#fff',
    border: '2px solid #6E56CF',
    borderRadius: '16px',
    maxWidth: '500px',
    margin: '0 auto',
    padding: isMobile ? '32px 12px' : '40px 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }),
  testimonialContent: (isMobile = getResponsiveStyles()) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  }),
  quoteContainer: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    marginBottom: '10px'
  }),
  quote: (isMobile = getResponsiveStyles()) => ({
    color: '#2D2A5F',
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: 500,
    textAlign: 'center',
    margin: 0,
    marginBottom: '32px',
    lineHeight: '1.4',
    letterSpacing: '-0.01em',
    width: '100%'
  }),
  quoteMarks: () => ({
    fontSize: '60px',
    lineHeight: '1',
    fontFamily: 'Georgia, serif',
    color: '#E0E0E0',
    position: 'absolute',
    top: '-20px',
    left: '-10px',
    zIndex: 0
  }),
  authorContainer: (isMobile = getResponsiveStyles()) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0',
    marginTop: '0',
    width: '100%'
  }),
  authorImageContainer: (isMobile = getResponsiveStyles()) => ({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #fff',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
    marginBottom: '8px'
  }),
  authorImagePlaceholder: (isMobile = getResponsiveStyles()) => ({
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  authorImage: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%'
  }),
  authorInfo: (isMobile = getResponsiveStyles()) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }),
  authorName: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '16px' : '18px',
    fontWeight: 700,
    margin: 0,
    marginBottom: '2px',
    color: '#2D2A5F',
    textAlign: 'center',
    letterSpacing: '-0.01em'
  }),
  authorTitle: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '12px' : '14px',
    fontWeight: 500,
    margin: 0,
    color: '#8399AF',
    textAlign: 'center'
  })
};
