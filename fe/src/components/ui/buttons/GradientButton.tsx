import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { SizeType } from 'src/styles/themes';
import styled, { css } from 'styled-components';

export interface GradientButtonProps
    extends StyledButtonProps,
        ButtonHTMLAttributes<HTMLButtonElement> {}

interface StyledButtonProps {
    color?: string;
    fontSize: SizeType;
}

const buttonPaddingStyle = (size: SizeType) => {
    let vPadding = 0;
    let hPadding = 0;

    if (size === 'h1') {
        vPadding = 2;
        hPadding = 6;
    } else if (size === 'h2') {
        vPadding = 1.5;
        hPadding = 4.5;
    } else if (size === 'h3') {
        vPadding = 1.2;
        hPadding = 3.6;
    } else if (size === 'xl') {
        vPadding = 1;
        hPadding = 3;
    } else if (size === 'lg') {
        vPadding = 0.8;
        hPadding = 2.4;
    } else if (size === 'md') {
        vPadding = 0.7;
        hPadding = 2.1;
    } else if (size === 'sm') {
        vPadding = 0.6;
        hPadding = 1.8;
    } else if (size === 'xs') {
        vPadding = 0.5;
        hPadding = 1.5;
    }

    return css`
        padding: ${vPadding}rem ${hPadding}rem;
    `;
};

const StyledButton = styled.button<StyledButtonProps>`
    background-image: linear-gradient(
        80deg,
        #8e008e 0%,
        #f2397d 40%,
        #f5509e 75%,
        #f87fb8 100%
    );
    background-size: 300% 100%;
    border: none;
    outline: none;
    cursor: pointer;

    ${({ theme: { size, shadow, fontWeight }, color, fontSize }) => css`
        box-shadow: 0 0 0.3rem ${shadow.level2};
        border-radius: ${size[fontSize]}rem;
        ${buttonPaddingStyle(fontSize)}
        color: ${color};
        font-size: ${size[fontSize]}rem;
        font-weight: ${fontWeight.bold};
    `}
`;

const GradientButton = ({ color, fontSize, children, ...rest }: GradientButtonProps) => {
    return (
        <StyledButton color={color} fontSize={fontSize} {...rest}>
            {children}
        </StyledButton>
    );
};

GradientButton.defaultProps = {
    color: '#fff',
    fontSize: 'md',
};

export default GradientButton;
