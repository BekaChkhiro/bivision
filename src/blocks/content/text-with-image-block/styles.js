// Helper function to get responsive styles based on window width
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false; // Default to desktop view when server-side rendering
};

export const styles = {
  container: (isMobile = getResponsiveStyles()) => ({
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isMobile ? '32px' : '64px',
    maxWidth: '1250px',
    margin: '0 auto',
    padding: '64px 0px',
    boxSizing: 'border-box',
    width: '100%'
  }),
  textColumn: (isMobile = getResponsiveStyles()) => ({
    flex: isMobile ? '1' : '0.55',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  }),
  title: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '24px' : '32px',
    fontWeight: 700,
    color: '#2D2A5F',
    margin: '0 0 8px 0',
    lineHeight: 1.2,
    letterSpacing: '-0.02em'
  }),
  content: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '16px' : '18px',
    lineHeight: 1.5,
    color: '#4E4B66',
    margin: 0
  }),
  imageColumn: (isMobile = getResponsiveStyles()) => ({
    flex: isMobile ? '1' : '0.45',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  imageContainer: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    overflow: 'hidden'
  }),
  image: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    borderRadius: '16px'
  }),
  imagePlaceholder: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#f0f0f0',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#8399AF',
    fontSize: isMobile ? '14px' : '16px'
  })
};
