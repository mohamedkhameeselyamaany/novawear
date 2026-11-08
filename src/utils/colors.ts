export interface ColorTheme {
  bg: string;
  cards: string;
  secondary: string;
  text: string;
  accent: string;
  success: string;
  danger: string;
}

export const colors = {
  dark: {
    bg: '#0D0D0D',
    cards: '#161616',
    secondary: '#222222',
    text: '#FFFFFF',
    accent: '#C8A963',
    success: '#22C55E',
    danger: '#EF4444',
  },
  light: {
    bg: '#F2EDE4',
    cards: '#FFFFFF',
    text: '#0D0D0D',
    secondary: '#555555',
    accent: '#C8A963',
    success: '#22C55E',
    danger: '#EF4444',
  },
  primary: '#0D0D0D',
  secondary: '#222222',
  gold: '#C8A963',
  ivory: '#F2EDE4',
  white: '#FFFFFF',
  success: '#22C55E',
  danger: '#EF4444',
};

export const getThemeColors = (isDark: boolean): ColorTheme => {
  return isDark ? colors.dark : colors.light;
};

export default colors;

