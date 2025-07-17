// Helper function to get responsive styles based on window width
export const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false; // Default to desktop view when server-side rendering
};

export const styles = {
  container: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    overflow: 'hidden'
  }),
  heroContent: (isMobile = getResponsiveStyles()) => ({
    margin: '0 auto',
    padding: isMobile ? '20px' : '60px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0',
    borderRadius: isMobile ? '0' : '20px',
    background: isMobile ? 'none' : 'rgba(102, 83, 198, 0.05)',
    position: 'relative',
    textAlign: isMobile ? 'center' : 'left',
    width: isMobile ? '100%' : 'auto'
  }),
  heroImageContainer: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    display: isMobile ? 'none' : 'block', // Hide on mobile, show on desktop
    textAlign: 'center'
  }),
  heroImage: (isMobile = getResponsiveStyles()) => ({
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  }),
  heroMobileImageContainer: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    marginTop: '20px',
    display: isMobile ? 'block' : 'none', // Show on mobile, hide on desktop
    textAlign: 'center'
  }),
  heroMobileImage: () => ({
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  }),
  // Keeping the old backgroundImage style for reference
  backgroundImage: () => ({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    height: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.7,
    zIndex: 'auto',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  }),
  heroText: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    zIndex: isMobile ? 1 : 'auto',
    position: isMobile ? 'relative' : 'static',
    textAlign: isMobile ? 'center' : 'left',
    display: isMobile ? 'flex' : 'block',
    flexDirection: isMobile ? 'column' : 'unset',
    alignItems: isMobile ? 'center' : 'flex-start'
  }),
  subtitle: (color, fontSize = 24, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? '18px' : '24px',
    fontStyle: 'normal',
    fontWeight: isMobile ? 600 : 750,
    lineHeight: 'normal',
    display: 'block',
    marginBottom: isMobile ? '5px' : '10px'
  }),
  secondTitle: (isMobile = getResponsiveStyles()) => ({
    color: 'var(--Dark-Blue, #221A4C)',
    fontSize: isMobile ? '32px' : '40px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '40px',
    display: 'block',
    marginBottom: isMobile ? '10px' : '20px'
  }),
  title: (color, fontSize = 50, isMobile = getResponsiveStyles()) => ({
    color: isMobile ? 'var(--Dark-Blue, #221A4C)' : color,
    fontSize: isMobile ? '30px' : '50px',
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: isMobile ? '40px' : '50px',
    marginBottom: isMobile ? '16px' : '0px',
    marginTop: '0px',
    textAlign: isMobile ? 'center' : 'left'
  }),
  description: (color, fontSize = 18, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.9, 16)}px` : '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: isMobile ? '18px' : '40px'
  }),
  button: (bgColor, textColor, fontSize = 16, isMobile = getResponsiveStyles()) => ({
    backgroundColor: isMobile ? '#6B46C1' : bgColor,
    color: isMobile ? 'white' : textColor,
    display: 'flex',
    width: isMobile ? 'auto' : 'auto',
    height: '50px',
    padding: '10px 40px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    border: 'none',
    borderRadius: '10px',
    fontSize: isMobile ? '18px' : '16px',
    fontWeight: isMobile ? '600' : '700',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: isMobile ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(74, 222, 128, 0.2)',
    margin: isMobile ? '0 auto 22px auto' : 'initial'
  })
};