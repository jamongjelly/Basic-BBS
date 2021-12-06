import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface FloatingButtonProps
    extends ButtonStyleProps,
        ButtonHTMLAttributes<HTMLButtonElement> {}

interface ButtonStyleProps {
    bgColor?: string;
    fontColor?: string;
    size?: number;
    fontSize?: number;
    square?: boolean;
}

const StyledButton = styled.button<ButtonStyleProps>`
    padding: 0;
    border: none;
    outline: none;
    box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.3);

    color: #fff;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme: { color }, bgColor, fontColor, size, fontSize, square }) => css`
        width: ${size}rem;
        height: ${size}rem;
        background-color: ${bgColor || color.text};
        border-radius: ${square ? 15 : 50}%;

        &,
        a {
            color: ${fontColor || color.background};
        }

        svg {
            font-size: ${fontSize}rem;
        }
    `}

    &:hover {
        filter: brightness(110%);
    }
`;

const FloatingButton = ({
    children,
    bgColor,
    fontColor,
    size,
    fontSize,
    ...rest
}: FloatingButtonProps) => {
    return (
        <StyledButton
            size={size}
            fontSize={fontSize}
            bgColor={bgColor}
            fontColor={fontColor}
            {...rest}
        >
            {children}
        </StyledButton>
    );
};

FloatingButton.defaultProps = {
    size: 3,
    fontSize: 1.8,
};

export default FloatingButton;
