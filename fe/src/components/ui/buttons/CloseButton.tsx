import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import styled, { css } from 'styled-components';

interface CloseButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        CloseButtonStyleProps {}

interface CloseButtonStyleProps {
    size?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

const StyledButton = styled.button<CloseButtonStyleProps>`
    background-color: transparent;
    border: none;
    outline: none;

    cursor: pointer;

    position: absolute;

    ${({ theme, size, top, bottom, left, right }) => css`
        color: ${theme.color.subText};
        ${top && `top: ${top}rem;`}
        ${bottom && `bottom: ${bottom}rem;`}
        ${left && `left: ${left}rem;`}
        ${right && `right: ${right}rem;`}

        svg {
            width: ${size}rem;
            height: ${size}rem;
        }
    `}
`;

const CloseButton = ({ size, ...rest }: CloseButtonProps) => {
    return (
        <StyledButton size={size} {...rest}>
            <IoCloseSharp />
        </StyledButton>
    );
};

CloseButton.defaultProps = {
    size: 2,
};

export default CloseButton;
