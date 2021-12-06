import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GradientButton from 'src/components/ui/buttons/GradientButton';
import Selector from 'src/components/ui/Selector';
import { imageHandler } from 'src/lib/utils/quillUtils';
import { Board, PostDetail, Subject, UserSummary } from 'src/models';
import { UpdatePostPayload, WritePostPayload } from 'src/redux/modules/post';
import styled, { css } from 'styled-components';

interface PostEditorProps {
    user: UserSummary;
    boards: Board[];
    boardId: number;
    currentPost: PostDetail | null;
    subjects?: Subject[];
    onClickAdd: (payload: WritePostPayload) => void;
    onClickEdit: (payload: UpdatePostPayload) => void;
    changeSubjects: (boardId: number) => void;
}

const Wrapper = styled.div`
    padding-bottom: 3rem;
    position: relative;

    .ql-editor {
        height: 60vh;
        overflow-y: scroll;
    }
`;

const TitleBar = styled.div`
    display: flex;
    margin-bottom: 1rem;

    & > * + * {
        margin-left: 1rem;
    }
`;

const TitleTextArea = styled.textarea`
    width: 100%;
    margin-bottom: 1rem;
    padding: 1rem 1.5rem;
    outline: none;
    resize: none;
    white-space: nowrap;

    display: flex;
    align-items: center;

    ${({ theme }) => css`
        background-color: ${theme.color.background};
        color: ${theme.color.text};
        border: 0.1rem solid ${theme.color.subMenu};
        line-height: ${theme.lineHeight.md};
        font-size: ${theme.size.lg}rem;
        font-weight: ${theme.fontWeight.bold};

        &::placeholder {
            color: ${theme.color.subText};
        }
    `}
`;

const ShowReplies = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;

    ${({ theme }) => css`
        font-size: ${theme.size.sm}rem;
    `}
    label {
        cursor: pointer;
    }
`;

const ButtonBox = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`;

type PostEditorState = {
    title: string;
    content: string;
    boardId: number;
    subjectId?: number;
    showReply: boolean;
};

const PostEditor = ({
    user,
    boards,
    boardId,
    currentPost,
    subjects,
    onClickAdd,
    onClickEdit,
    changeSubjects,
}: PostEditorProps) => {
    const quill = useRef<ReactQuill>(null);

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, false] }, { font: [] }, { size: [] }],
                    [{ align: [] }],
                    [{ color: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    [{ script: 'sub' }, { script: 'super' }],
                    ['clean'],
                    ['link', 'image', 'video'],
                ],
                handlers: {
                    image: () => imageHandler(quill.current),
                },
            },
        }),
        [quill]
    );

    const initState = {
        title: currentPost?.title || '',
        content: currentPost?.content || '',
        boardId: boardId,
        subjectId: currentPost?.subject?.id || undefined,
        showReply: currentPost?.showReply || true,
    };

    const [state, setState] = useState<PostEditorState>(initState);

    const handleChange = useCallback((name: string, value: string | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    useEffect(() => {
        if (state.boardId) {
            changeSubjects(state.boardId);
        }
    }, [state.boardId]);

    return (
        <Wrapper>
            <TitleBar>
                <Selector
                    value={state.boardId}
                    onChange={(event) => handleChange('boardId', event.target.value)}
                >
                    <option value="">게시판 선택</option>
                    {boards.map((board) => (
                        <option key={board.id} value={board.id}>
                            {board.name}
                        </option>
                    ))}
                </Selector>
                <Selector
                    value={state.subjectId}
                    onChange={(event) => handleChange('subjectId', event.target.value)}
                >
                    <option value="">말머리 선택</option>
                    {subjects &&
                        subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                </Selector>
            </TitleBar>
            <TitleTextArea
                rows={1}
                placeholder="제목을 입력하세요"
                value={state.title}
                onChange={(event) => handleChange('title', event.target.value)}
            />
            <ReactQuill
                ref={quill}
                theme="snow"
                modules={modules}
                placeholder="내용을 입력하세요"
                value={state.content}
                onChange={(value) => handleChange('content', value)}
            />
            <ShowReplies>
                <input
                    id="showReply"
                    type="checkbox"
                    checked={state.showReply}
                    onChange={(event) => handleChange('showReply', event.target.checked)}
                />
                <label htmlFor="showReply">댓글 보이기</label>
            </ShowReplies>
            <ButtonBox>
                {currentPost ? (
                    <GradientButton
                        color="#fff"
                        onClick={() =>
                            onClickEdit({
                                id: currentPost.id,
                                title: state.title,
                                content: state.content,
                                showReply: state.showReply,
                                boardId: state.boardId,
                                subjectId: state.subjectId,
                            })
                        }
                    >
                        수정
                    </GradientButton>
                ) : (
                    <GradientButton
                        color="#fff"
                        onClick={() =>
                            onClickAdd({
                                title: state.title,
                                writer: user.nickname,
                                content: state.content,
                                showReply: state.showReply,
                                boardId: state.boardId,
                                subjectId: state.subjectId,
                            })
                        }
                    >
                        글쓰기
                    </GradientButton>
                )}
            </ButtonBox>
        </Wrapper>
    );
};

export default PostEditor;
