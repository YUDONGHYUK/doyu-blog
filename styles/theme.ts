export type ThemeType = typeof lightTheme;

const defaultTheme = {
  font: {
    size1: '0.25rem',
    size2: '0.5rem',
    size3: '0.75rem',
    size4: '1rem',
    size5: '1.25rem',
    size6: '1.5rem',
    size8: '2rem',
    size10: '2.5rem',
    size12: '3rem',
    size16: '4rem',
    size20: '5rem',
    size40: '10rem',
  },
};

export const lightTheme = {
  ...defaultTheme,
  bgColor: {
    primary: '#f8f7f4',
    secondary: '#ffffff',
  },
  text: {
    primary: '#252525',
    secondary: '#374151',
    tertiary: '#566573',
  },
  blue: {
    primary: '#2e86c1',
    secondary: '#5dade2',
  },
};

export const darkTheme = {
  ...defaultTheme,
  bgColor: {
    primary: '#1e1e1e',
    secondary: '#232323',
  },
  text: {
    primary: '#f0f0f0',
    secondary: '#d1d5db',
    tertiary: '#9ca3af',
  },
  blue: {
    primary: '#5dade2',
    secondary: '#2e86c1',
  },
};
