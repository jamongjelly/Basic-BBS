import React from 'react';
import { GoCheck, GoX } from 'react-icons/go';
import { Todo } from 'src/models';
import styled, { css } from 'styled-components';

interface TodoItemProps {
    todo: Todo;
    onClickUpdate: (todo: Todo) => void;
    onClickDelete: (todoId: number) => void;
}

const checkBoxSize = 2.5;

const RemoveButton = styled.div`
    display: none;
    flex: none;
    margin-left: auto;

    ${({ theme }) => css`
        color: ${theme.color.red};
    `}

    svg {
        cursor: pointer;
        width: ${checkBoxSize * 0.8}rem;
        height: ${checkBoxSize * 0.8}rem;
    }
`;

const Wrapper = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    &:hover {
        ${RemoveButton} {
            display: block;
        }
    }
`;

const Content = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;

type todoDoneType = {
    done: boolean;
};

const CheckBox = styled.div<todoDoneType>`
    width: ${checkBoxSize}rem;
    height: ${checkBoxSize}rem;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ theme }) => css`
        border: 0.17rem solid ${theme.color.text};
    `}
    ${({ done }) =>
        done &&
        css`
            background-color: #315fbe;
            border-color: transparent;
            color: #fff;
        `}

    svg {
        width: ${checkBoxSize - 0.5}rem;
        height: ${checkBoxSize - 0.5}rem;
    }
`;

const ItemText = styled.p<todoDoneType>`
    margin-left: 1.2rem;

    ${({ theme, done }) =>
        done &&
        css`
            color: ${theme.color.subText};
            text-decoration: line-through;
        `}
`;

const TodoItem = ({ todo, onClickUpdate, onClickDelete }: TodoItemProps) => {
    return (
        <Wrapper>
            <Content onClick={() => onClickUpdate({ ...todo, done: !todo.done })}>
                <CheckBox done={todo.done}>{todo.done && <GoCheck />}</CheckBox>
                <ItemText done={todo.done}>{todo.text}</ItemText>
            </Content>
            <RemoveButton onClick={() => onClickDelete(todo.id)}>
                <GoX />
            </RemoveButton>
        </Wrapper>
    );
};

export default React.memo(TodoItem);
