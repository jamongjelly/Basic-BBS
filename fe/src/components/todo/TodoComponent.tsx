import React, { useCallback, useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import TodoInput from 'src/components/todo/TodoInput';
import Avatar from 'src/components/ui/Avatar';
import CloseButton from 'src/components/ui/buttons/CloseButton';
import FloatingButton from 'src/components/ui/buttons/FloatingButton';
import ModalOverlay from 'src/components/ui/ModalOverlay';
import useInput from 'src/lib/hooks/useInput';
import styledCSS from 'src/lib/styles/styledCSS';
import { validateTodoForm } from 'src/lib/utils/validationUtils';
import { UserSummary } from 'src/models';
import { TodoListContainer } from 'src/pages/containers';
import palette from 'src/styles/palette';
import styled, { css } from 'styled-components';

interface TodoComponentProps extends TodoComponentWrapperProps {
    user: UserSummary;
    onAddTodo: (text: string) => void;
}

interface TodoComponentWrapperProps {
    width: number;
}

const sidePadding = 7;

const Wrapper = styled.div<TodoComponentWrapperProps>`
    width: 50%;
    min-height: 50vh;
    max-height: calc(100vh - 4rem);
    border-radius: 3rem;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    ${({ width, theme: { color } }) => css`
        background-color: ${color.background};
        min-width: ${width}rem;
    `}

    & > div {
        width: 100%;
        padding-left: ${sidePadding}rem;
        padding-right: ${sidePadding}rem;
    }
`;

const TodoHeader = styled.div`
    height: 8rem;
    margin-top: ${sidePadding}rem;
    display: flex;
`;

const TodoTitle = styled.h3`
    ${({ theme: { size, fontWeight } }) => css`
        font-size: ${size.h3}rem;
        font-weight: ${fontWeight.bold};
    `}
`;

const AvatarBox = styled.div`
    margin-left: auto;
    flex: none;
`;

const TodoBody = styled.div`
    flex: 1;
    overflow: scroll;
`;

const TodoFooter = styled.div`
    height: 9rem;

    ${styledCSS.flexCenter};
    position: relative;
    flex: none;
`;

const AddButton = styled(FloatingButton)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 4rem;
`;

const TodoForm = styled.form`
    width: 40rem;
    height: 15rem;

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${({ theme }) => css`
        background-color: ${theme.color.background};
        padding: ${theme.unit * 6}rem;
        border-radius: ${theme.unit * 3}rem;
    `}
`;

const TodoFormTitle = styled.h5`
    width: 100%;
    margin-bottom: 2rem;
    ${({ theme }) => css`
        color: ${theme.color.subText};
        font-weight: ${theme.fontWeight.bold};
    `}
`;

const TodoComponent = ({ width, user, onAddTodo }: TodoComponentProps) => {
    const [show, setShow] = useState(false);
    const [text, onChangeText, onResetText] = useInput('');

    const toggleTodoInput = useCallback(() => {
        setShow((prev) => !prev);
        onResetText();
    }, []);

    const handleSubmitTodo = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (validateTodoForm(text)) {
                onAddTodo(text);
                toggleTodoInput();
            }
        },
        [text]
    );

    return (
        <Wrapper width={width}>
            <TodoHeader>
                <TodoTitle>Todo List</TodoTitle>
                <AvatarBox>
                    <Avatar src={user.imgUrl} size={4.8} />
                </AvatarBox>
            </TodoHeader>
            <TodoBody>
                <TodoListContainer />
            </TodoBody>
            <TodoFooter>
                <AddButton
                    size={4}
                    bgColor={palette.mint[0]}
                    fontColor={palette.white[0]}
                    fontSize={2.3}
                    onClick={toggleTodoInput}
                >
                    <GoPlus />
                </AddButton>
            </TodoFooter>
            <ModalOverlay visible={show} onClick={toggleTodoInput}>
                <TodoForm onSubmit={handleSubmitTodo}>
                    <TodoFormTitle>할 일 추가</TodoFormTitle>
                    <TodoInput
                        show={show}
                        name="text"
                        placeholder="할 일을 입력하세요"
                        value={text}
                        onChange={onChangeText}
                    />
                    <CloseButton top={1} right={1} />
                </TodoForm>
            </ModalOverlay>
        </Wrapper>
    );
};

export default TodoComponent;
