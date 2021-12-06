import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePostDateFormat } from 'src/lib/utils/dateUtils';
import { UserPostItem } from 'src/models';
import styled, { css } from 'styled-components';

interface UserActivityPostItemProps {
    type: string;
    post: UserPostItem;
}

const Tr = styled.tr<{ mouseOver: boolean }>`
    transition: all 0.3s ease-out;

    ${({ mouseOver, theme }) => css`
        ${mouseOver && `background-color: ${theme.color.menu};`}
    `}

    a {
        transition: all 0.1s ease-out;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    td {
        position: relative;
    }
`;

const Marker = styled.div<{ type: string }>`
    background-color: ${({ type }) => (type === 'post' ? 'orange' : 'red')};
    width: 0.3rem;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
`;

const BoardLink = styled(Link)`
    ${({ theme }) => css`
        &:hover {
            color: ${theme.color.highlight};
        }
    `}
`;

const UserActivityPostItem = ({ type, post }: UserActivityPostItemProps) => {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <Tr mouseOver={mouseOver}>
            <td>
                <Marker type={type} />
                <BoardLink to={`/board/${post.board.path}`}>{post.board.name}</BoardLink>
            </td>
            <td
                onMouseOver={() => setMouseOver(true)}
                onMouseOut={() => setMouseOver(false)}
            >
                <Link to={`/board/${post.id}`}>{post.title}</Link>
            </td>
            <td>{changePostDateFormat(post.createdAt)}</td>
        </Tr>
    );
};

export default UserActivityPostItem;
