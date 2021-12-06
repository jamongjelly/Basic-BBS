import React, { ButtonHTMLAttributes, ReactChild } from 'react';
import { SizeType } from 'src/styles/themes';
import styled, { css } from 'styled-components';

interface TransparentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactChild;
    width?: number;
    height?: number;
    size?: number;
    fontSize: SizeType;
    fontColor?: string;
}

const StyledButton = styled.button<TransparentButtonProps>`
    background-color: transparent;
    border: none;
    outline: none;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme, width, height, fontSize, fontColor }) => css`
        color: ${fontColor || 'inherit'};
        width: ${`${width}rem` || '100%'};
        height: ${`${height}rem` || '100%'};
        font-size: ${theme.size[fontSize]}rem;
    `}
`;

const TransparentButton = ({
    children,
    width,
    height,
    size,
    fontSize = 'md',
    fontColor,
    onClick,
    ...rest
}: TransparentButtonProps) => {
    const buttonWidth = size || width;
    const buttonHeight = size || height;
    return (
        <StyledButton
            width={buttonWidth}
            height={buttonHeight}
            fontSize={fontSize}
            fontColor={fontColor}
            onClick={onClick}
            {...rest}
        >
            {children}
        </StyledButton>
    );
};

TransparentButton.defaultProps = {
    fontSize: 'md',
};

export default TransparentButton;
