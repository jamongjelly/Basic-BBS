import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserIcon from 'src/components/ui/UserIcon';
import { changePostDateFormat } from 'src/lib/utils/dateUtils';
import { PostItem } from 'src/models';
import styled, { css } from 'styled-components';

interface PostItemProps {
    post: PostItem;
    active: boolean;
    path: string;
    query?: string;
}

interface TrStyles {
    mouseOver: boolean;
    active: boolean;
}

const Tr = styled.tr<TrStyles>`
    transition: all 0.1s ease-out;
    ${({ mouseOver, active, theme }) => css`
        ${(mouseOver || active) && `background-color: ${theme.color.menu};`}
    `}
`;

const Td = styled.td`
    height: 5rem;
`;

const BoardSubjectLink = styled(Link)`
    text-transform: capitalize;

    transition: all 0.1s linear;

    ${({ theme }) => css`
        &:hover {
            color: ${theme.color.highlight};
        }
    `}
`;

const PostTitle = styled(Link)`
    width: 100%;
    height: 100%;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const CountInfo = styled.div`
    span {
        margin-top: 0.3rem;
        ${({ theme: { color, size } }) => css`
            color: ${color.subText};
            font-size: ${size.xs}rem;
        `}
    }
`;

const PostListItem = ({ post, active, path, query }: PostItemProps) => {
    const [mouseOver, setMouseOver] = useState(false);

    const columns = [
        path === 'total' ? (
            <BoardSubjectLink to={{ pathname: `/board/${post.board.path}` }}>
                {post.board.name}
            </BoardSubjectLink>
        ) : (
            <BoardSubjectLink
                to={{
                    pathname: `/board/${path}`,
                    search: `?subjectId=${post.subject?.id}`,
                }}
            >
                {post.subject?.name}
            </BoardSubjectLink>
        ),
        <PostTitle
            to={{
                pathname: `/board/${path}/${post.id}`,
                search: query,
            }}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            {post.title}
        </PostTitle>,
        <UserIcon avatar={post.avatar} nickname={post.writer} />,
        <span>{changePostDateFormat(post.createdAt)}</span>,
        <CountInfo>
            <div>{post.viewCnt}</div>
            <span>Views</span>
        </CountInfo>,
        <CountInfo>
            <div>{post.likeCnt}</div>
            <span>Likes</span>
        </CountInfo>,
    ];

    return (
        <Tr mouseOver={mouseOver} active={active}>
            {columns.map((item, idx) => (
                <Td key={idx}>{item}</Td>
            ))}
        </Tr>
    );
};

export default React.memo(PostListItem);
