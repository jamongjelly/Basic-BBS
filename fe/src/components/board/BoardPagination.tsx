import { darken } from 'polished';
import React, { useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Pagination } from 'src/models';
import styled, { css } from 'styled-components';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaAngleLeft,
    FaAngleRight,
} from 'react-icons/fa';
import palette from 'src/styles/palette';

interface BoardPaginationProps {
    path: string;
    pagination: Pagination;
    searchQuery?: string;
    subjectQuery?: string;
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > * + * {
        margin-left: 0.5rem;
    }
`;

const buttonSize = 3;

const pageButtonStyle = css`
    min-width: ${buttonSize}rem;
    height: ${buttonSize}rem;
    padding: 0.7rem;
    background-color: transparent;
    border: 0.1rem solid ${({ theme: { shadow } }) => shadow.level2};
    border-radius: 0.3rem;
    outline: none;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageButton = styled(NavLink)`
    ${pageButtonStyle}

    transition: all 0.2s ease-out;

    ${({ theme }) => css`
        &.active {
            background-color: ${theme.color.highlight};
            color: ${palette.white[0]};
            font-weight: ${theme.fontWeight.bold};
            border-color: transparent;
        }
        &:hover:not(.active) {
            background-color: ${darken(0.15, theme.color.background)};
        }
    `}
`;

const PageNavButton = styled(Link)<{ disabled?: boolean }>`
    ${pageButtonStyle}

    ${({ theme, disabled }) => css`
        ${disabled &&
        `
            color: ${theme.color.disabled};
            cursor: default;
            pointer-events: none;`}
    `}
`;

const BoardPagination = ({
    path,
    pagination: { pageNum, pageSize, totalPages },
    searchQuery,
    subjectQuery,
}: BoardPaginationProps) => {
    const startPage = Math.floor((pageNum - 1) / pageSize) * pageSize + 1;
    const tempEndPage = startPage + pageSize - 1;
    const endPage = tempEndPage < totalPages ? tempEndPage : totalPages;

    const goFirst = pageNum !== 1;
    const goPrev = startPage > 1;
    const goNext = endPage < totalPages;
    const goLast = pageNum !== totalPages && totalPages !== 0;

    const queryWithoutPageNum = `&pageSize=${pageSize}${searchQuery}${subjectQuery}`;

    let pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <PageButton
                key={i}
                to={{
                    pathname: `/board/${path}`,
                    search: `?pageNum=${i}${queryWithoutPageNum}`,
                }}
                isActive={() => {
                    return i === pageNum;
                }}
            >
                {i}
            </PageButton>
        );
    }

    const deactivateButton = useCallback((event, enabled) => {
        if (enabled) return;
        event.preventDefault();
    }, []);

    return (
        <Wrapper>
            <PageNavButton
                to={{
                    pathname: `/board/${path}`,
                    search: `?pageNum=1${queryWithoutPageNum}`,
                }}
                disabled={!goFirst}
                onClick={(event) => deactivateButton(event, goFirst)}
            >
                <FaAngleDoubleLeft />
            </PageNavButton>
            <PageNavButton
                to={{
                    pathname: `/board/${path}`,
                    search: `?pageNum=${startPage - 1}${queryWithoutPageNum}`,
                }}
                disabled={!goPrev}
                onClick={(event) => deactivateButton(event, goPrev)}
            >
                <FaAngleLeft />
            </PageNavButton>
            {pageButtons}
            <PageNavButton
                to={{
                    pathname: `/board/${path}`,
                    search: `?pageNum=${endPage + 1}${queryWithoutPageNum}`,
                }}
                disabled={!goNext}
                onClick={(event) => deactivateButton(event, goNext)}
            >
                <FaAngleRight />
            </PageNavButton>
            <PageNavButton
                to={{
                    pathname: `/board/${path}`,
                    search: `?pageNum=${totalPages}${queryWithoutPageNum}`,
                }}
                disabled={!goLast}
                onClick={(event) => deactivateButton(event, goLast)}
            >
                <FaAngleDoubleRight />
            </PageNavButton>
        </Wrapper>
    );
};

export default React.memo(BoardPagination);
