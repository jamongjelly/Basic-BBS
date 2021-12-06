import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReplyEditor from 'src/components/board/ReplyEditor';
import ReplyList from 'src/components/board/ReplyList';
import { validateReplyForm } from 'src/lib/utils/validationUtils';
import { RootState } from 'src/redux';
import { replyActions } from 'src/redux/modules/reply';

interface ReplyContainerProps {
    postId: number;
}

const ReplyContainer = ({ postId }: ReplyContainerProps) => {
    const dispatch = useDispatch();
    const { currentUser, replies } = useSelector((state: RootState) => ({
        currentUser: state.user.currentUser,
        replies: state.reply.replies,
    }));

    const onClickAdd = useCallback(
        (value: string, callback: Function) => {
            if (!validateReplyForm(value)) return;

            if (currentUser) {
                dispatch(
                    replyActions.writeReplyAsync.request({
                        writer: currentUser?.nickname,
                        content: value,
                        postId,
                    })
                );
                callback();
            } else {
                alert('로그인 해주세요');
            }
        },
        [currentUser, postId]
    );

    const onClickUpdate = useCallback(
        (replyId: number, content: string) => {
            dispatch(
                replyActions.updateReplyAsync.request({
                    id: replyId,
                    content,
                    postId,
                })
            );
        },
        [postId]
    );

    const onClickDelete = useCallback((replyId: number) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            dispatch(replyActions.deleteReplyAsync.request(replyId));
        }
    }, []);

    useEffect(() => {
        dispatch(replyActions.getRepliesByPostIdAsync.request(postId));
        return () => {
            dispatch(replyActions.initReplies());
        };
    }, [postId]);

    if (!replies) return <div>로딩 중</div>;

    return (
        <>
            <ReplyList
                replies={replies}
                currentUser={currentUser || undefined}
                onClickUpdate={onClickUpdate}
                onClickDelete={onClickDelete}
            />
            <ReplyEditor onClickAdd={onClickAdd} />
        </>
    );
};

export default ReplyContainer;
