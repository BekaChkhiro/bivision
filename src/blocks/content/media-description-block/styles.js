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
    gap: isMobile ? '30px' : '40px',
    alignItems: 'stretch',
    background: 'rgba(47, 202, 2, 0.05)',
    padding: isMobile ? '24px 16px' : '60px',
    maxWidth: '1320px',
    margin: '0 auto',
    width: '100%',
    borderRadius: '12px',
  }),
  mediaColumn: (isMobile = getResponsiveStyles()) => ({
    flex: '0 0 auto',
    position: 'relative',
    borderRadius: '8px',
    overflow: 'hidden',
    width: isMobile ? '100%' : '40%',
  }),
  mediaWrapper: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    width: '100%',
    height: isMobile ? '0' : '309.27px',
    paddingBottom: isMobile ? '75%' : '0', // Only use padding-bottom for mobile
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    overflow: 'hidden',
    flexShrink: 0,
  }),
  mediaImage: (isMobile = getResponsiveStyles()) => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  }),
  videoOverlay: (isMobile = getResponsiveStyles()) => ({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }),
  playButton: (isMobile = getResponsiveStyles()) => ({
    width: isMobile ? '80px' : '120px',
    height: isMobile ? '80px' : '120px',
    borderRadius: '50%',
    backgroundColor: '#4CD137',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  }),
  playIcon: (isMobile = getResponsiveStyles()) => ({
    width: '0',
    height: '0',
    borderStyle: 'solid',
    borderWidth: isMobile ? '18px 0 18px 30px' : '24px 0 24px 40px',
    borderColor: 'transparent transparent transparent #ffffff',
    marginLeft: '8px',
  }),
  contentColumn: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: isMobile ? '0' : '20px',
    width: isMobile ? '100%' : '60%',
  }),
  title: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '24px' : '32px',
    fontWeight: '700',
    color: '#4CD137',
    marginBottom: '16px',
    lineHeight: '1.2',
  }),
  descriptionText: (isMobile = getResponsiveStyles()) => ({
    fontSize: isMobile ? '16px' : '18px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    color: '#8399AF',
    marginBottom: '16px',
  }),
  placeholderMedia: (isMobile = getResponsiveStyles()) => ({
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#999',
    fontSize: '14px',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
  })
};
