import React from 'react';
import styled, { css } from 'styled-components';

interface ToggleButtonProps {
    id: string;
    value: boolean;
    onChange: (value?: any) => void;
    style?: React.CSSProperties;
}

const buttonHeight = 2;
const buttonPadding = 0.3;

const Wrapper = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;

    position: relative;
`;

const Label = styled.label`
    width: ${buttonHeight * 2}rem;
    height: ${buttonHeight}rem;
    border-radius: ${buttonHeight}rem;

    cursor: pointer;

    ${({ theme }) => css`
        background-color: ${theme.color.toggle};
    `}
`;

const CheckBox = styled.input`
    width: 0;
    height: 0;
    opacity: 0;
`;

const Marker = styled.div<{ checked: boolean }>`
    width: ${buttonHeight - 2 * buttonPadding}rem;
    height: ${buttonHeight - 2 * buttonPadding}rem;
    border-radius: 50%;

    pointer-events: none;

    position: absolute;

    transition: left 0.2s linear;

    ${({ theme, checked }) => css`
        background-color ${theme.color.menu};
        left: ${checked ? buttonPadding : buttonHeight + buttonPadding}rem;
    `}
`;

const ToggleButton = ({ id, value, onChange, ...rest }: ToggleButtonProps) => {
    return (
        <Wrapper {...rest}>
            <Label htmlFor={id}>
                <CheckBox
                    aria-hidden
                    id={id}
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                />
            </Label>
            <Marker aria-hidden checked={value}></Marker>
        </Wrapper>
    );
};

export default ToggleButton;
