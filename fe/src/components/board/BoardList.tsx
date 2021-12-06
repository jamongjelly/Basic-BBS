import { darken } from 'polished';
import React from 'react';
import { Link } from 'react-router-dom';
import { Board } from 'src/models';
import styled, { css } from 'styled-components';
import * as qs from 'query-string';

interface BoardListProps {
    boards: Board[];
}

const Wrapper = styled.ul`
    height: 6rem;
    display: flex;
`;

const BoardMenuItem = styled.li`
    width: 12rem;

    a {
        height: 100%;
        text-transform: capitalize;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    transition: all 0.3s ease-out;

    ${({ theme: { color } }) => css`
        &:hover {
            background-color: ${darken(0.1, color.background)};
        }
    `}
`;

const BoardList = ({ boards }: BoardListProps) => {
    const query = qs.parse(location.search);
    const pageSize = query.pageSize?.toString();
    const newSearchQuery = pageSize && `?pageSize=${pageSize}`;

    return (
        <Wrapper>
            <BoardMenuItem>
                <Link
                    to={{
                        pathname: `/board`,
                        search: newSearchQuery,
                    }}
                >
                    전체
                </Link>
            </BoardMenuItem>
            {boards &&
                boards.map((board) => (
                    <BoardMenuItem key={board.id}>
                        <Link
                            to={{
                                pathname: `/board/${board.path}`,
                                search: newSearchQuery,
                            }}
                        >
                            {board.name}
                        </Link>
                    </BoardMenuItem>
                ))}
        </Wrapper>
    );
};

export default BoardList;
