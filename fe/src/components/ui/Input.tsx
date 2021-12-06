import React from 'react';
import { SizeType } from 'src/styles/themes';
import styled, { css } from 'styled-components';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        InputStyleProps {
    name?: string;
    type?: string;
    placeholder?: string;
    value?: any;
}

interface InputStyleProps {
    fontSize: SizeType;
}

const StyledInput = styled.input<InputStyleProps>`
    outline: none;
    ${({ theme, fontSize }) => css`
        padding: 0.7rem 1.3rem;
        font-size: ${theme.size[fontSize]}rem;
        border: 0.1rem solid ${theme.color.text};
    `}
`;

const Input = ({ fontSize, ...rest }: InputProps) => {
    return <StyledInput fontSize={fontSize} {...rest} />;
};

Input.defaultProps = {
    fontSize: 'md',
};

export default Input;
