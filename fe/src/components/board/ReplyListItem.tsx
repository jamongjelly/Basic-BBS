import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'src/components/ui/buttons/Button';
import TransparentButton from 'src/components/ui/buttons/TransparentButton';
import UserIcon from 'src/components/ui/UserIcon';
import WordCounter from 'src/components/ui/WordCounter';
import { REPLY_MAX_LENGTH } from 'src/constants';
import { changePostDateFormat } from 'src/lib/utils/dateUtils';
import { validateReplyForm } from 'src/lib/utils/validationUtils';
import { Reply, UserSummary } from 'src/models';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

interface ReplyListItemProps {
    reply: Reply;
    currentUser?: UserSummary;
    editReplyId: number | null;
    editMode: boolean;
    onClickUpdate: (replyId: number, content: string) => void;
    onClickDelete: (replyId: number) => void;
    onClickOpenEditor: (replyId: number | null) => void;
    onClickCloseEditor: () => void;
}

const Wrapper = styled.div`
    position: relative;

    ${({ theme }) => css`
        padding: ${theme.unit * 3}rem 0;
        font-size: ${theme.size.sm}rem;

        & + & {
            border-top: 0.1rem solid ${theme.color.subMenu};
        }
    `}
`;

const ReplyHeader = styled.div`
    display: flex;
    align-items: center;
`;

const CreatedAt = styled.p`
    ${({ theme }) => css`
        margin-left: ${theme.unit * 2}rem;
        color: ${theme.color.subText};
    `}
`;

const ReplyEditModeButton = styled(TransparentButton)`
    ${({ theme }) => css`
        color: ${theme.color.subText};
    `}
`;

const OwnerButtonBox = styled.div`
    margin-left: auto;
    flex: none;
    display: flex;
    align-items: center;
`;

const ReplyBody = styled.div`
    display: flex;
    flex-direction: column;

    ${({ theme }) => css`
        margin-top: ${theme.unit * 1.5}rem;
    `}
`;

const ReplyModEditor = styled.textarea`
    width: 100%;
    border: 0.1rem solid transparent;
    outline: none;
    resize: none;

    ${({ theme, readOnly }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        padding: ${theme.unit * 3}rem;
        ${readOnly
            ? css`
                  cursor: default;
              `
            : css`
                  border-color: ${theme.color.subText};
              `}
    `}
`;

const ReplyListItem = ({
    reply,
    currentUser,
    editReplyId,
    editMode,
    onClickUpdate,
    onClickDelete,
    onClickOpenEditor,
    onClickCloseEditor,
}: ReplyListItemProps) => {
    const [replyContent, setReplyContent] = useState(reply.content);
    const replyEditor = useRef<HTMLTextAreaElement>(null);

    const onChangeReply = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length <= REPLY_MAX_LENGTH) {
            setReplyContent(event.target.value);
        }
    }, []);

    const handleCloseEditMode = useCallback(() => {
        if (
            reply.content === replyContent ||
            (reply.content !== replyContent &&
                window.confirm(
                    '편집을 취소하시겠습니까? 작성 중인 내용이 모두 사라집니다.'
                ))
        ) {
            onClickCloseEditor();
            setReplyContent(reply.content);
        }
    }, [reply, replyContent, onClickCloseEditor]);

    const handleUpdateReply = useCallback(
        (replyId: number, content: string) => {
            if (validateReplyForm(content)) {
                onClickUpdate(replyId, content);
                onClickCloseEditor();
            }
        },
        [onClickUpdate, onClickCloseEditor]
    );

    useEffect(() => {
        if (editReplyId && !editMode) {
            setReplyContent(reply.content);
        }
    }, [reply, editReplyId, editMode]);

    useEffect(() => {
        const target = replyEditor.current;
        if (target) {
            target.style.height = '';
            target.style.height = `${target.scrollHeight + 2}px`;
        }
    }, [replyEditor, replyContent]);

    return (
        <Wrapper>
            <ReplyHeader>
                <UserIcon avatar={reply.avatar} nickname={reply.writer} />
                <CreatedAt>{changePostDateFormat(reply.createdAt, true)}</CreatedAt>
                {currentUser && currentUser.id === reply.createdBy && (
                    <OwnerButtonBox>
                        <ReplyEditModeButton
                            fontSize="sm"
                            onClick={() =>
                                editMode
                                    ? handleCloseEditMode()
                                    : onClickOpenEditor(reply.id)
                            }
                        >
                            Edit
                        </ReplyEditModeButton>
                        <TransparentButton
                            fontSize="sm"
                            fontColor={palette.red[0]}
                            onClick={() => onClickDelete(reply.id)}
                        >
                            Delete
                        </TransparentButton>
                    </OwnerButtonBox>
                )}
            </ReplyHeader>
            <ReplyBody>
                <ReplyModEditor
                    ref={replyEditor}
                    readOnly={!editMode}
                    maxLength={REPLY_MAX_LENGTH}
                    placeholder="댓글을 입력해주세요"
                    value={replyContent}
                    onChange={onChangeReply}
                />
                {editMode && (
                    <>
                        <WordCounter
                            style={{ padding: '0.5rem' }}
                            length={replyContent?.length}
                            maxLength={REPLY_MAX_LENGTH}
                        />
                        <Button
                            style={{ marginTop: '0.7rem' }}
                            bgColor={palette.coral[0]}
                            color={palette.white[0]}
                            fontWeight="bold"
                            onClick={() => handleUpdateReply(reply.id, replyContent)}
                        >
                            댓글 수정
                        </Button>
                    </>
                )}
            </ReplyBody>
        </Wrapper>
    );
};

export default React.memo(ReplyListItem);
