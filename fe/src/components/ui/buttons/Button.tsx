import { darken } from 'polished';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import palette from 'src/styles/palette';
import { SizeType } from 'src/styles/themes';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {}

interface ButtonStyleProps {
    bgColor: string;
    color?: string;
    size: SizeType;
    fontWeight: 'light' | 'normal' | 'bold';
    wide?: boolean;
    width?: string;
    height?: string;
}

const buttonPaddingStyle = (size: SizeType) => {
    let vPadding = 0;
    let hPadding = 0;

    if (size === 'h1') {
        vPadding = 2;
        hPadding = 2;
    } else if (size === 'h2') {
        vPadding = 1.5;
        hPadding = 1.8;
    } else if (size === 'h3') {
        vPadding = 1.2;
        hPadding = 1.6;
    } else if (size === 'xl') {
        vPadding = 1;
        hPadding = 1.4;
    } else if (size === 'lg') {
        vPadding = 0.8;
        hPadding = 1.2;
    } else if (size === 'md') {
        vPadding = 0.7;
        hPadding = 1;
    } else if (size === 'sm') {
        vPadding = 0.6;
        hPadding = 0.8;
    } else if (size === 'xs') {
        vPadding = 0.5;
        hPadding = 0.7;
    }

    return css`
        padding: ${vPadding}rem ${hPadding}rem;
    `;
};

const StyledButton = styled.button<ButtonStyleProps>`
    border: none;
    outline: none;
    white-space: nowrap;

    ${({ theme, bgColor, size, color, fontWeight, wide, width, height, disabled }) => css`
        width: ${wide ? '100%' : width && `${width}`};
        ${height && `height: ${height};`}
        background-color: ${disabled ? theme.color.disabled : bgColor};
        ${buttonPaddingStyle(size)}

        ${color && `color: ${color};`}
        font-size: ${theme.size[size]}rem;
        font-weight: ${theme.fontWeight[fontWeight]};
        ${
            !disabled &&
            css`
                cursor: pointer;
                &:hover {
                    background-color: ${darken(0.1, bgColor)};
                }
            `
        }
    `}
`;

const Button = ({
    bgColor,
    color,
    size,
    fontWeight,
    wide,
    width,
    height,
    children,
    ...rest
}: ButtonProps) => {
    return (
        <StyledButton
            bgColor={bgColor}
            color={color}
            size={size}
            fontWeight={fontWeight}
            wide={wide}
            width={width}
            height={height}
            {...rest}
        >
            {children}
        </StyledButton>
    );
};

Button.defaultProps = {
    bgColor: palette.gray[0],
    color: '#000',
    size: 'md',
    fontWeight: 'normal',
};

export default React.memo(Button);
