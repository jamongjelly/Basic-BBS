import { DEFAULT_SETTINGS, withThemesProvider } from 'themeprovider-storybook';
import { lightTheme, darkTheme } from '../src/styles/themes';
import GlobalStyles from '../src/styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

const themes = [
    {
        name: 'Light Theme',
        ...lightTheme,
    },
    {
        name: 'Dark Theme',
        ...darkTheme,
    },
];

export const decorators = [
    withThemesProvider(themes, DEFAULT_SETTINGS, ({ theme, children }) => (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </BrowserRouter>
    )),
];
