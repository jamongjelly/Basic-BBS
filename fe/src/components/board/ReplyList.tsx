import React, { useCallback, useEffect, useState } from 'react';
import { Prompt, RouteComponentProps, withRouter } from 'react-router';
import ReplyListItem from 'src/components/board/ReplyListItem';
import { Reply, UserSummary } from 'src/models';
import styled, { css } from 'styled-components';

interface ReplyListProps extends RouteComponentProps {
    replies: Reply[];
    currentUser?: UserSummary;
    onClickUpdate: (replyId: number, content: string) => void;
    onClickDelete: (replyId: number) => void;
}

const Article = styled.article`
    ${({ theme }) => css`
        padding: ${theme.unit * 2}rem 0;
    `}
`;

const leaveMsg = '정말 떠나시겠습니까? 작성 중인 내용이 모두 사라집니다.';

const ReplyList = ({
    replies,
    currentUser,
    onClickUpdate,
    onClickDelete,
    history,
}: ReplyListProps) => {
    const [editReplyId, setEditReplyId] = useState<number | null>(null);

    const onClickOpenEditor = useCallback(
        (replyId: number | null) => {
            if (!editReplyId) {
                setEditReplyId(replyId);
            } else if (editReplyId !== replyId) {
                if (window.confirm(leaveMsg)) {
                    setEditReplyId(replyId);
                }
            }
        },
        [editReplyId]
    );

    const onClickCloseEditor = useCallback(() => {
        setEditReplyId(null);
    }, []);

    const handleClickDelete = useCallback(
        (replyId: number) => {
            onClickDelete(replyId);
            setEditReplyId(null);
        },
        [onClickDelete]
    );

    return (
        <Article>
            {replies.map((reply) => (
                <ReplyListItem
                    key={reply.id}
                    reply={reply}
                    currentUser={currentUser}
                    editReplyId={editReplyId}
                    editMode={editReplyId === reply.id}
                    onClickUpdate={onClickUpdate}
                    onClickDelete={handleClickDelete}
                    onClickOpenEditor={onClickOpenEditor}
                    onClickCloseEditor={onClickCloseEditor}
                />
            ))}
            <Prompt when={!!editReplyId} message={leaveMsg} />
        </Article>
    );
};

export default withRouter(ReplyList);
