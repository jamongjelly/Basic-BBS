import React from 'react';
import styled, { css } from 'styled-components';

interface WordCounterProps
    extends WordCounterStyleProps,
        React.HTMLAttributes<HTMLDivElement> {
    length?: number;
    maxLength: number;
    show?: boolean;
}

interface WordCounterStyleProps {
    show?: boolean;
}

const Counter = styled.div<WordCounterStyleProps>`
    margin-left: auto;
    text-align: right;
    ${({ theme, show }) => css`
        opacity: ${show ? 1 : 0};
        color: ${theme.color.subText};
        font-size: ${theme.size.xs}rem;
    `}
`;

const WordCounter = ({
    length = 0,
    maxLength,
    show = true,
    ...rest
}: WordCounterProps) => {
    return <Counter show={show} {...rest}>{`${length} / ${maxLength}`}</Counter>;
};

export default WordCounter;
