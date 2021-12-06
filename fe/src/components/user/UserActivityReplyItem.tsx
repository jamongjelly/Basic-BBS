import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changePostDateFormat } from 'src/lib/utils/dateUtils';
import { UserReply } from 'src/models';
import styled, { css } from 'styled-components';

interface UserActivityReplyItemProps {
    reply: UserReply;
}

const Tr = styled.tr<{ mouseOver: boolean }>`
    transition: all 0.3s linear;

    ${({ theme, mouseOver }) => css`
        ${mouseOver && `background-color: ${theme.color.menu}`};
    `}
`;

const ReplyContainer = styled.div`
    padding: 0 1.5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
`;

const PostInfo = styled.div`
    margin-bottom: 1rem;

    ${({ theme }) => css`
        padding: ${theme.unit * 2}rem 0;
    `}

    &::before {
        background-color: green;
        height: 100%;
        content: '.';
        color: transparent;
        margin-right: 1rem;
    }
`;

const ReplyContent = styled.div`
    min-height: 6rem;
`;

const UserActivityReplyItem = ({ reply }: UserActivityReplyItemProps) => {
    const [mouseOver, setMouseOver] = useState(false);
    return (
        <Tr
            mouseOver={mouseOver}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >
            <td>
                <ReplyContainer>
                    <PostInfo>
                        <Link to={`/board/${reply.postId}`}>
                            {`${reply.board.name} | ${reply.postTitle}`}
                        </Link>
                    </PostInfo>
                    <ReplyContent>
                        <Link to={`/board/${reply.postId}`}>{reply.content}</Link>
                    </ReplyContent>
                </ReplyContainer>
            </td>
            <td>{changePostDateFormat(reply.createdAt)}</td>
        </Tr>
    );
};

export default UserActivityReplyItem;
