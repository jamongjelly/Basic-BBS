import quillStyles from 'src/styles/quillStyles';
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    ${quillStyles}

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100vh;
    }

    html {
        font-size: 62.5%;
    }

    body {
        ${({ theme }) => css`
            background-color: ${theme.color.background};
            color: ${theme.color.text};
            font-family: ${theme.font};
            font-size: ${theme.size.md}rem;
        `}
    }

    #root {
        display: flex;
        flex-shrink: 0;
    }

    button {
        ${({ theme }) => css`
            color: ${theme.color.text};
        `}
    }

    a {
        text-decoration: none;
        ${({ theme }) => css`
            color: ${theme.color.text};
        `}
    }

    input, select, textarea {
        ${({ theme }) => css`
            font-size: ${theme.size.md}rem;
        `}
    }

    strong {
        ${({ theme }) =>
            css`
                font-weight: ${theme.fontWeight.bold};
            `}
    }

    em {
        font-style: italic;
    }

    b {
        ${({ theme }) => `font-weight: ${theme.fontWeight.bold};`}
    }

    h1 {
        ${({ theme }) => `font-size: ${theme.size.h1}rem;`}
    }

    h2 {
        ${({ theme }) => `font-size: ${theme.size.h2}rem;`}
    }

    h3 {
        ${({ theme }) => `font-size: ${theme.size.h3}rem;`}
    }

    h4 {
        ${({ theme }) => `font-size: ${theme.size.xl}rem;`}
    }

    h5 {
        ${({ theme }) => `font-size: ${theme.size.lg}rem;`}
    }

    h6 {
        ${({ theme }) => `font-size: ${theme.size.md}rem;`}
    }
`;

export default GlobalStyles;
