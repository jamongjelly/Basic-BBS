import React from 'react';
import TodoItem from 'src/components/todo/TodoItem';
import { Todo } from 'src/models';
import styled, { css } from 'styled-components';

interface TodoListProps {
    title: string;
    todos: Todo[];
    onClickUpdate: (todo: Todo) => void;
    onClickDelete: (todoId: number) => void;
}

const Wrapper = styled.article`
    padding-bottom: 2rem;

    & + & {
        margin-top: 1rem;
    }
`;

const ListTitle = styled.h4`
    margin-bottom: 1rem;
    padding: 1.3rem 0;

    text-transform: capitalize;

    ${({ theme: { size, fontWeight, color } }) => css`
        border-bottom: 0.2rem solid ${color.text};
        font-size: ${size.lg}rem;
        font-weight: ${fontWeight.bold};
    `}
`;

const Items = styled.div`
    padding: 0 1rem;
`;

const EmptyList = styled.div`
    padding: 3rem;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const TodoList = ({ title, todos, onClickUpdate, onClickDelete }: TodoListProps) => {
    return (
        <Wrapper>
            <ListTitle>{title}</ListTitle>
            <Items>
                {todos.length === 0 && <EmptyList>새 할 일을 추가해 주세요</EmptyList>}
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onClickUpdate={onClickUpdate}
                        onClickDelete={onClickDelete}
                    />
                ))}
            </Items>
        </Wrapper>
    );
};

export default TodoList;
