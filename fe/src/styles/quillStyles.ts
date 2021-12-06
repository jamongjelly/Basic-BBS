import { css } from 'styled-components';

const quillStyles = css`
    .ql-toolbar {
        ${({ theme }) => css`
            .ql-fill {
                fill: ${theme.color.text};
            }
            .ql-stroke {
                stroke: ${theme.color.text};
            }
        `}
    }

    .ql-editor {
        min-height: 20em;
        padding: 1.2rem 1.5rem;

        &.ql-blank::before {
            left: 1.5rem;
            right: 1.5rem;
        }

        ${({ theme }) => css`
            font-size: ${theme.size.md}rem;
            &.ql-blank::before {
                color: ${theme.color.subText};
            }
        `}
    }

    .ql-snow.ql-toolbar,
    .ql-snow .ql-toolbar {
        button {
            height: 2.4rem;
            padding: 0.3rem 0.5rem;
            width: 2.8rem;
        }
    }

    .ql-snow.ql-toolbar {
        border: 0.1rem solid #ccc;
        padding: 0.8rem;

        .ql-formats {
            margin-right: 1.5rem;
        }
        .ql-picker-label,
        .ql-picker-options {
            border: 0.1rem solid transparent;
        }
    }

    .ql-snow {
        .ql-picker {
            font-size: 1.4rem;
            height: 2.4rem;

            &:not(.ql-color-picker):not(.ql-icon-picker) svg {
                margin-top: -0.9rem;
                width: 1.8rem;
            }

            &.ql-header {
                width: 9.8rem;
            }

            &.ql-font {
                width: 10.8rem;
            }

            &.ql-size {
                width: 9.8rem;
            }
        }

        .ql-picker-label {
            padding-left: 0.8rem;
            padding-right: 0.2rem;
            &::before {
                line-height: 2.2rem;

                ${({ theme }) => css`
                    color: ${theme.color.text};
                `}
            }
        }

        .ql-picker-options {
            padding: 0.4rem 0.8rem;

            .ql-picker-item {
                padding-bottom: 0.5rem;
                padding-top: 0.5rem;
            }

            ${({ theme }) => css`
                background-color: ${theme.color.background};
                color: ${theme.color.text};
            `}
        }

        .ql-color-picker {
            .ql-picker-options {
                padding: 0.3rem 0.5rem;
                width: 15.2rem;
            }

            .ql-picker-item {
                border: 0.1rem solid transparent;
                height: 1.6rem;
                margin: 0.2rem;
                width: 1.6rem;
            }
        }

        .ql-color-picker,
        .ql-icon-picker {
            width: 2.8rem;

            .ql-picker-label {
                padding: 0.2rem 0.4rem;
            }
        }

        .ql-tooltip {
            border: 0.1rem solid #ccc;
            box-shadow: 0 0 0.5rem #ddd;
            padding: 0.5rem 1.2rem;
            left: unset !important;
            right: 2rem !important;
            top: 0 !important;

            a {
                line-height: 2.6rem;

                &.ql-preview {
                    max-width: 20rem;
                }
            }

            input[type='text'] {
                border: 0.1rem solid #ccc;
                font-size: 1.3rem;
                height: 2.6rem;
                padding: 0.3rem 0.5rem;
                width: 17rem;
            }
        }
    }

    .ql-snow.ql-container {
        border: 0.1rem solid #ccc;
    }

    .ql-container {
        font-size: 1.3rem;
    }

    .ql-clipboard {
        left: -100000rem;
        height: 0.1rem;
    }
`;

export default quillStyles;
