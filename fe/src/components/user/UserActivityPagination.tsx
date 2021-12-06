import React from 'react';
import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
} from 'react-icons/fi';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

interface UserActivityPaginationProps {
    pageNum: number;
    totalPages: number;
    onClickPageButton: (page: number) => void;
}

const Container = styled.div`
    display: flex;

    & > button + button,
    & > a + a {
        margin-left: 1rem;
    }
`;

const buttonSize = 2.5;

const PageButton = styled.button<{ active: boolean }>`
    background-color: transparent;
    outline: none;
    border: none;

    width: ${buttonSize}rem;
    height: ${buttonSize}rem;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: color font-weight 0.2s linear;

    ${({ theme, active }) => css`
        font-size: ${theme.size.sm}rem;
        ${active &&
        `color: ${palette.coral[0]};
        font-weight: ${theme.fontWeight.bold};
        `}
    `}
`;

const arrowIconSize = 2.5;

const PageNavButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;

    width: ${buttonSize}rem;
    height: ${buttonSize}rem;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme, disabled }) => css`
        ${disabled &&
        `
            color: ${theme.color.disabled};
            cursor: default;
            pointer-events: none;`}
    `}

    svg {
        width: ${arrowIconSize}rem;
        height: ${arrowIconSize}rem;
    }
`;

const UserActivityPagination = ({
    pageNum,
    totalPages,
    onClickPageButton,
}: UserActivityPaginationProps) => {
    const pageSize = 10;

    const startPage = Math.floor((pageNum - 1) / pageSize) * pageSize + 1;
    const tempEndPage = startPage + pageSize - 1;
    const endPage = tempEndPage < totalPages ? tempEndPage : totalPages;

    const goFirst = pageNum !== 1;
    const goPrev = startPage > 1;
    const goNext = endPage < totalPages;
    const goLast = pageNum !== totalPages && totalPages !== 0;

    let pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <PageButton
                key={i}
                active={i === pageNum}
                onClick={() => onClickPageButton(i)}
            >
                {i}
            </PageButton>
        );
    }

    return (
        <Container>
            <PageNavButton disabled={!goFirst} onClick={() => onClickPageButton(1)}>
                <FiChevronsLeft />
            </PageNavButton>
            <PageNavButton
                disabled={!goPrev}
                onClick={() => onClickPageButton(startPage - 1)}
            >
                <FiChevronLeft />
            </PageNavButton>
            {pageButtons}
            <PageNavButton
                disabled={!goNext}
                onClick={() => onClickPageButton(endPage + 1)}
            >
                <FiChevronRight />
            </PageNavButton>
            <PageNavButton
                disabled={!goLast}
                onClick={() => onClickPageButton(totalPages)}
            >
                <FiChevronsRight />
            </PageNavButton>
        </Container>
    );
};

export default React.memo(UserActivityPagination);
