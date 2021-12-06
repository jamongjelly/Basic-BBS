import React from 'react';
import styled, { css } from 'styled-components';

interface SelectorProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const StyledSelect = styled.select`
    border: none;
    outline: none;

    ${({ theme }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.subText};
        padding: ${theme.unit}rem ${theme.unit * 2}rem;
        border-bottom: 0.2rem solid ${theme.color.subMenu};
    `}
`;

const Selector = ({ children, ...rest }: SelectorProps) => {
    return <StyledSelect {...rest}>{children}</StyledSelect>;
};

export default React.memo(Selector);
