// Helper function to get responsive styles based on window width
const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  return false; // Default to desktop view when server-side rendering
};

export const styles = {
  container: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: isMobile ? '100%' : '1250px',
    margin: '0 auto',
    backgroundColor: '#F7F5FF',
    borderRadius: '20px'
  }),
  heroContent: (isMobile = getResponsiveStyles()) => ({
    margin: '0 auto',
    padding: isMobile ? '30px 20px' : '60px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: isMobile ? '30px' : '40px',
    borderRadius: '20px',
    position: 'relative'
  }),
  leftContent: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    textAlign: 'left'
  }),
  rightContent: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  title: (isMobile = getResponsiveStyles()) => ({
    color: '#221A4C',
    fontSize: isMobile ? '35px' : '50px',
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: isMobile ? '35px' : '50px',
    marginBottom: isMobile ? '15px' : '40px',
    marginTop: '0px',
    whiteSpace: 'pre-wrap'
  }),
  description: (isMobile = getResponsiveStyles()) => ({
    color: '#8399AF',
    fontSize: isMobile ? '16px' : '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: 0,
    maxWidth: isMobile ? '100%' : '100%',
    textAlign: isMobile ? 'center' : 'left',
  })
};
