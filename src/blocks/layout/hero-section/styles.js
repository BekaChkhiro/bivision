/**
 * Helper function to determine if current view is mobile based on window width
 * @returns {boolean} True if viewport width is 768px or less
 */
export const getResponsiveStyles = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 768;
  }
  // Default to desktop view when server-side rendering
  return false;
};

// Common font families used throughout the component
const FONTS = {
  heavy: "inherit", // Will inherit from CSS classes
  roman: "inherit", // Will inherit from CSS classes
  bold: "inherit"   // Will inherit from CSS classes
};

// Common colors used throughout the component
const COLORS = {
  darkBlue: 'var(--Dark-Blue, #221A4C)',
  lightGray: '#8399AF',
  purple: '#6B46C1',
  green: '#2FCA02'
};

/**
 * Style definitions for the hero section block
 */
export const styles = {
  /**
   * Container styles for the entire hero section
   * @returns {Object} Style object
   */
  container: () => ({
    position: 'relative',
    overflow: 'hidden',
    maxWidth: '1250px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box'
  }),
  /**
   * Styles for the hero content wrapper
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
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
    width: '100%',
    maxWidth: '1250px',
    overflow: 'hidden',
    boxSizing: 'border-box'
  }),
  /**
   * Styles for the background image
   * @returns {Object} Style object
   */
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
    zIndex: 'auto'
  }),
  /**
   * Styles for the text content container
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  heroText: (isMobile = getResponsiveStyles()) => ({
    flex: '1',
    maxWidth: isMobile ? '100%' : '50%',
    width: isMobile ? '100%' : 'auto',
    zIndex: isMobile ? 1 : 'auto',
    position: isMobile ? 'relative' : 'static',
    textAlign: isMobile ? 'center' : 'left',
    display: isMobile ? 'flex' : 'block',
    flexDirection: isMobile ? 'column' : 'unset',
    alignItems: isMobile ? 'center' : 'flex-start',
    padding: isMobile ? '30px 20px' : '0',
    marginBottom: isMobile ? '20px' : '0'
  }),
  /**
   * Styles for the subtitle element
   * @param {string} color - Text color
   * @param {number} fontSize - Font size in pixels
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  subtitle: (color, fontSize = 24, isMobile = getResponsiveStyles()) => ({
    color: isMobile ? '#2FCA02' : color,
    fontSize: isMobile ? '22px' : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: '750',
    fontFamily: FONTS.heavy,
    lineHeight: 'normal',
    display: 'block',
    marginBottom: isMobile ? '10px' : '10px',
    textAlign: isMobile ? 'center' : 'left'
  }),
  /**
   * Styles for the second title element
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  secondTitle: (isMobile = getResponsiveStyles()) => ({
    color: COLORS.darkBlue,
    fontSize: isMobile ? '30px' : '40px',
    fontStyle: 'normal',
    fontWeight: '750',
    fontFamily: FONTS.heavy,
    lineHeight: '50px',
    display: 'block',
    marginBottom: isMobile ? '0' : '20px',
    textAlign: isMobile ? 'center' : 'left'
  }),
  /**
   * Styles for the main title element
   * @param {string} color - Text color
   * @param {number} fontSize - Font size in pixels
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  title: (color, fontSize = 50, isMobile = getResponsiveStyles()) => ({
    color: isMobile ? '#221A4C' : color,
    fontSize: isMobile ? '36px' : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: FONTS.heavy,
    lineHeight: isMobile ? '1.2' : '50px',
    marginBottom: isMobile ? '20px' : '0px',
    marginTop: '0px',
    textAlign: isMobile ? 'center' : 'left'
  }),
  /**
   * Styles for the description paragraph
   * @param {string} color - Text color
   * @param {number} fontSize - Font size in pixels
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  description: (color, fontSize = 18, isMobile = getResponsiveStyles()) => ({
    color: isMobile ? '#8399AF' : color,
    fontSize: isMobile ? '16px' : `${fontSize}px`,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: FONTS.roman,
    lineHeight: isMobile ? '1.5' : 'normal',
    marginBottom: isMobile ? '30px' : '40px',
    maxWidth: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left'
  }),
  /**
   * Styles for the button element
   * @param {string} bgColor - Background color
   * @param {string} textColor - Text color
   * @param {number} fontSize - Font size in pixels
   * @param {boolean} isMobile - Whether the current view is mobile
   * @returns {Object} Style object
   */
  button: (bgColor, textColor, fontSize = 16, isMobile = getResponsiveStyles()) => ({
    backgroundColor: isMobile ? '#6B46C1' : bgColor,
    color: isMobile ? 'white' : textColor,
    display: 'flex',
    width: isMobile ? '80%' : 'auto',
    height: '50px',
    padding: '12px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    flexShrink: 0,
    border: 'none',
    borderRadius: '10px',
    fontSize: isMobile ? '16px' : `${fontSize}px`,
    fontWeight: '700',
    fontFamily: FONTS.bold,
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: 'none',
    margin: isMobile ? '0 auto 30px auto' : 'initial'
  })
};