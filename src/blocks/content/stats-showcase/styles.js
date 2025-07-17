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
  graphicsContainer: (isMobile = getResponsiveStyles()) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    height: '300px'
  }),
  title: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color: '#221A4C',
    fontSize: isMobile ? '35px' : '50px',
    fontStyle: 'normal',
    fontWeight: 750,
    lineHeight: isMobile ? '35px' : '50px',
    marginBottom: isMobile ? '15px' : '40px',
    marginTop: '0px',
    whiteSpace: 'pre-wrap'
  }),
  description: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color: '#8399AF',
    fontSize: isMobile ? '16px' : '18px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
    marginBottom: 0,
    maxWidth: isMobile ? '100%' : '90%'
  }),
  // Graphics styles
  card: (backgroundColor = '#FFFFFF', isMobile = getResponsiveStyles()) => ({
    backgroundColor,
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }),
  topCard: (isMobile = getResponsiveStyles()) => ({
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '180px',
    height: '100px',
    zIndex: 3
  }),
  middleCard: (isMobile = getResponsiveStyles()) => ({
    top: '120px',
    left: '20%',
    width: '120px',
    height: '80px',
    zIndex: 2
  }),
  bottomCard: (isMobile = getResponsiveStyles()) => ({
    top: '120px',
    right: '20%',
    width: '120px',
    height: '80px',
    zIndex: 2
  }),
  cardValue: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.9, 18)}px` : `${fontSize}px`,
    fontWeight: 700,
    marginBottom: '5px'
  }),
  cardLabel: (color, fontSize, isMobile = getResponsiveStyles()) => ({
    color,
    fontSize: isMobile ? `${Math.max(fontSize * 0.9, 14)}px` : `${fontSize}px`,
    fontWeight: 500
  }),
  chart: (isMobile = getResponsiveStyles()) => ({
    width: '100%',
    height: '40px',
    marginTop: '10px',
    position: 'relative'
  }),
  chartBar: (color, width) => ({
    backgroundColor: color,
    height: '8px',
    width: `${width}%`,
    borderRadius: '4px'
  }),
  donutChart: (isMobile = getResponsiveStyles()) => ({
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'conic-gradient(#6E56CF 0% 45%, #4ADE80 45% 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px'
  }),
  donutHole: (isMobile = getResponsiveStyles()) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 700,
    color: '#333333'
  })
};