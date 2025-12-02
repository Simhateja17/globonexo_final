// Design System Configuration
// Adjust these values to change sizes across all screen sizes proportionally

export const lightSwitchConfig = {
  // Base size for 1440px screens (in pixels)
  base: {
    width: 58,
    height: 58,
    padding: 9,
    borderRadius: 15,
  },
  
  // Medium screens (tablets, smaller desktops)
  medium: {
    width: 34,
    height: 34,
    padding: 8,
    borderRadius: 8,
  },
  
  // Small screens (mobile)
  small: {
    width: 32,
    height: 32,
    padding: 7,
    borderRadius: 6,
  },
};

// Join Now Button Configuration
export const joinButtonConfig = {
  navbar: {
    minWidth: 105,
    height: 38,
    paddingX: 24,
    paddingY: 8,
    borderRadius: 8,
  },
  hero: {
    minWidth: 180,
    height: 38,
    paddingX: 24,
    paddingY: 8,
    borderRadius: 8,
  },
};

// Color Configuration
export const colors = {
  primaryGreen: '#95DE64',
  primaryGreenHover: '#7bc653',
  textLight: '#F0F0F0',
  textMuted: '#BFBFBF',
  darkBg: '#000000',
  black: '#000000',
};

// Typography Configuration
export const typography = {
  navItem: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
  },
  heroHeading: {
    fontSize: 38,
    fontWeight: 500,
    lineHeight: 46,
  },
  heroDescription: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 22,
  },
  button: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 22,
  },
};
