import React from 'react';
import { Board } from 'src/models';
import styled, { css } from 'styled-components';

interface BoardMenubarProps {
    board?: Board;
}

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 3rem;
    padding: 2rem 3.7rem;
    border-radius: 1rem;
    ${({ theme: { shadow } }) => css`
        box-shadow: 0 0 0.5rem ${shadow.level2};
    `}

    display: flex;
`;

const BoardName = styled.div`
    display: flex;
    align-items: center;
    ${({ theme: { size, fontWeight } }) => css`
        font-size: ${size.h3}rem;
        font-weight: ${fontWeight.bold};
    `}
`;

const MenuBox = styled.div`
    width: 40%;
    max-width: 30rem;
    flex: none;
    margin-left: auto;
`;

const TopSection = styled.div`
    height: 3rem;
    margin-bottom: 1rem;
`;

const BottomSection = styled.div`
    display: flex;

    & > * + * {
        margin-left: 1.5rem;
    }
    & > * {
        flex: 1;
    }
`;

const BoardMenubar = ({ board }: BoardMenubarProps) => {
    return (
        <Wrapper>
            <BoardName>{board ? board.name : '전체'}</BoardName>
        </Wrapper>
    );
};

export default BoardMenubar;
