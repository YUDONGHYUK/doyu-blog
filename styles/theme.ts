type ThemeVariables = {
  font1: string;
  font2: string;
  font3: string;
  font4: string;
  font5: string;
  font6: string;
  font8: string;
  font10: string;
  font12: string;
  font16: string;
  font20: string;
  font40: string;
  bg_page: string;
  bg_element: string;
  text1: string;
  text2: string;
  text3: string;
  border: string;
  blue1: string;
  blue2: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const defaultTheme = {
  font1: '0.25rem',
  font2: '0.5rem',
  font3: '0.75rem',
  font4: '1rem',
  font5: '1.25rem',
  font6: '1.5rem',
  font8: '2rem',
  font10: '2.5rem',
  font12: '3rem',
  font16: '4rem',
  font20: '5rem',
  font40: '10rem',
};

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    ...defaultTheme,
    bg_page: '#f8f7f4',
    bg_element: '#ffffff',
    text1: '#252525',
    text2: '#374151',
    text3: '#566573',
    border: '#566573',
    blue1: '#2e86c1',
    blue2: '#5dade2',
  },
  dark: {
    ...defaultTheme,
    bg_page: '#1e1e1e',
    bg_element: '#232323',
    text1: '#f0f0f0',
    text2: '#d1d5db',
    text3: '#9ca3af',
    border: '#9ca3af',
    blue1: '#5dade2',
    blue2: '#2e86c1',
  },
};

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as VariableKey[];
  return keys.reduce(
    (acc, key) =>
      acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    ''
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};

const cssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;

const variableKeys = Object.keys(themeVariableSets.light) as VariableKey[];

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce(
  (acc, current) => {
    acc[current] = cssVar(current);
    return acc;
  },
  {} as ThemedPalette
);
